/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-31 13:37:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-28 12:10:28
 */
import * as TWEEN from '@tweenjs/tween.js'
import { loadGeojson } from 'PLS/digitalCity/common/utils'
import * as D3 from 'd3-geo'
import * as THREE from 'three'

export const flyTo = (camera, target, controls, duration = 1000) => {
    const startPosition = camera.value.position.clone()
    const startLookAt = controls.value.target.clone()
    const targetPosition = target.clone()
    const targetLookAt = target.clone()
    targetLookAt.y = 0

    const tween = new TWEEN.Tween({
        x: startPosition.x,
        y: startPosition.y,
        z: startPosition.z,
        lookAtX: startLookAt.x,
        lookAtY: startLookAt.y,
        lookAtZ: startLookAt.z,
    })
        .to(
            {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                lookAtX: targetLookAt.x,
                lookAtY: targetLookAt.y,
                lookAtZ: targetLookAt.z,
            },
            duration,
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((e) => {
            camera.value.position.set(e.x, e.y, e.z)
            controls.value.target.set(e.lookAtX, e.lookAtY, e.lookAtZ)

            // 如下参数 若controls 的 enableDamping 拖动参数 为false时，不自动刷新 则需要加上
            // controls.value.position0.set(e.x, e.y, e.z)
            // camera.value.lookAt(e.x, e.y, e.z)
            // camera.value.updateProjectionMatrix()
            // controls.value.update()

            // 若移动后 最后一整会被重置 那么需要考虑 相机默认旋转朝上的 向量
            // <TresPerspectiveCamera :up="[0, 0, -1]" />
        })
        .start()
        .onComplete(() => {
            tween.stop()
        })

    return tween
}
export const flyToNative = (camera, target, controls, offsetZ = [-2000, -2000], duration = 1000) => {
    const startPosition = camera.position.clone()
    const startLookAt = controls.target.clone()
    const targetPosition = target.clone()
    const targetLookAt = target.clone()
    targetLookAt.y = 0
    targetLookAt.x = targetLookAt.x + offsetZ[0]
    targetLookAt.z = targetLookAt.z + offsetZ[1]

    const tween = new TWEEN.Tween({
        x: startPosition.x,
        y: startPosition.y,
        z: startPosition.z,
        lookAtX: startLookAt.x,
        lookAtY: startLookAt.y,
        lookAtZ: startLookAt.z,
    })
        .to(
            {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                lookAtX: targetLookAt.x,
                lookAtY: targetLookAt.y,
                lookAtZ: targetLookAt.z,
            },
            duration,
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate((e) => {
            camera.position.set(e.x, e.y, e.z)
            controls.target.set(e.lookAtX, e.lookAtY, e.lookAtZ)
        })
        .start()
        .onComplete(() => {
            tween.stop()
        })

    return tween
}

export const getlinePoints = async (geojson) => {
    const linePrimary = await loadGeojson(geojson)
    // 墨卡托投影转换
    const projection = D3.geoMercator().center(linePrimary[0].properties.center).translate([0, 0]).scale(1000)
    const points = []
    linePrimary[0].geometry.coordinates[0].forEach((iOne) => {
        iOne.forEach((lineOne) => {
            const [x, y] = projection(lineOne)
            points.push([x, 0, y])
        })
    })
    return points
}

// 输入: ECEF 笛卡尔坐标 (单位: 米)
// 输出: ENU 三个方向向量 (THREE.Vector3)
export const getENUAxesFromCartesian = (cartesian) => {
  const x = cartesian.x, y = cartesian.y, z = cartesian.z
  const lng = Math.atan2(y, x) // 经度

  // up 向量（指向地心->点，归一化）
  const up = cartesian.clone().normalize()

  // 初始 east（经度方向），z 分量为 0
  const east = new THREE.Vector3(-Math.sin(lng), Math.cos(lng), 0)

  // 把 east 在 up 上正交化（去掉 east 在 up 上的分量），然后归一化
  // 这样可以避免 east 与 up 不是严格正交引起的误差
  const proj = up.clone().multiplyScalar(east.dot(up))
  east.sub(proj).normalize()

  // north = up × east （保证右手坐标系）
  const north = new THREE.Vector3().crossVectors(up, east).normalize()

  return { east, north, up }
}

// 对齐 tiles center
export const alignmentCenter = (tiles) => {
  const box = new THREE.Box3()
  const sphere = new THREE.Sphere()
  const center = new THREE.Vector3()

  // 1) 获取中心（注意：不要把 tiles.group.position 传进去以免“篡改”它）
  if (tiles.getBoundingBox(box)) {
    box.getCenter(center) // 不会改变 tiles.group.position
  } else if (tiles.getBoundingSphere(sphere)) {
    center.copy(sphere.center)
  } else {
    console.warn('tiles 没有 bounding 信息')
    return
  }

  console.log('tiles center (ECEF?)', center, 'len=', center.length())

  // 2) 计算 ENU 轴
  const { east, north, up } = getENUAxesFromCartesian(center)

  // 3) 构建旋转矩阵：makeBasis(east,north,up) 会创建一个把 local axes -> ECEF 的矩阵（列为 axis）
  //    我们需要把 ECEF 坐标转换到 ENU（也就是做 R_transpose * (p - center)），所以需要转置
  const basis = new THREE.Matrix4().makeBasis(east, north, up) // columns = east,north,up
  const rotation = basis.clone().transpose() // ECEF -> ENU

  // 4) 平移矩阵（把 center 移到原点）
  const translation = new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z)

  // 5) 最终变换：先平移（T），再旋转（R）。注意矩阵乘法顺序：M = R * T
  const transform = new THREE.Matrix4().multiplyMatrices(rotation, translation)

  // 6) 把变换“设置”为 tiles.group 的矩阵（覆盖原有变换），避免重复平移
  tiles.group.matrixAutoUpdate = false
  tiles.group.matrix.identity()            // 清除原变换
  tiles.group.applyMatrix4(transform)      // 应用绝对变换
  tiles.group.updateMatrixWorld(true)

  console.log('applied transform to tiles.group')
}
