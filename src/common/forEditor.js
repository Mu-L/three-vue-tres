/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-14 10:52:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-10 08:27:41
 */
import { ref, shallowReactive } from 'vue'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

function useAnimations(onBeforeRender, animations, modelRef) {
    const reference = ref(modelRef)

    const mixer = new THREE.AnimationMixer(reference.value)

    const actions = shallowReactive({})

    animations.forEach((animation) => {
        const action = mixer.clipAction(animation, reference.value)
        actions[animation.name] = action
    })

    onBeforeRender(({ delta }) => {
        mixer.update(delta)
    })

    return {
        actions,
        mixer,
    }
}

function containsSkinnedMesh(object) {
		let hasSkinnedMesh = false

		object.traverse((child) => {
				if (child.isSkinnedMesh) {
						hasSkinnedMesh = true
				}
		})

		return hasSkinnedMesh
}
function bakeWorldTransformToGeometryTree(object) {
		// 克隆保动画结构，包括骨骼引用、名字等
		let cloned = null
		if (containsSkinnedMesh(object)) {
				cloned = SkeletonUtils.clone(object)
				cloned.updateMatrixWorld(true)
		} else {
				cloned = object.clone()
		}
		return cloned
}

function centerObjectAtOrigin(object) {
		// 创建包围盒
		const box = new THREE.Box3().setFromObject(object)
		const center = new THREE.Vector3()
		box.getCenter(center)

		const size = new THREE.Vector3()
		box.getSize(size)
		const yOffset = box.min.y // 物体底部的 Y 坐标

		const wrapper = new THREE.Group()
		wrapper.name = 'centeredGroup'
		object.position.sub(center)
		object.position.y = -yOffset // 让底部贴地
		wrapper.add(object)

		return wrapper
}

function standardizationMeshCopy(mesh) {
		const ms = bakeWorldTransformToGeometryTree(mesh)
		return centerObjectAtOrigin(ms)
}

export { standardizationMeshCopy, useAnimations }