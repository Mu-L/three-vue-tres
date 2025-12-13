<template>
  
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, markRaw } from 'vue'
import * as THREE from 'three'
import { useTres, useLoop } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ========== Props 定义 ==========
export interface DeviceConfig {
    id: string
    name: string
    type: 'cube' | 'sphere' | 'cone' | 'model'
    color: number
    position: [number, number, number]
    speed?: number
    modelUrl?: string
    modelScale?: number
    author?: string | number // 设备状态值，用于显示
}

const props = withDefaults(
    defineProps<{
        // 设备配置列表
        deviceConfig: DeviceConfig[]
        // 图例面板标题
        title?: string
        // 图例面板位置
        panelPosition?: {
            top?: string | number
            right?: string | number
            bottom?: string | number
            left?: string | number
        }
        // 图例面板宽度
        panelWidth?: string | number
        // 状态点颜色
        statusDotColor?: string
        // 场景背景色
        sceneBackground?: number | string
        // 场景雾色
        sceneFogColor?: number | string
        // 场景雾范围
        sceneFogRange?: [number, number]
        // 地面颜色
        groundColor?: number
        // 地面大小
        groundSize?: [number, number]
        // 网格大小和颜色
        gridSize?: number
        gridDivisions?: number
        gridColor1?: number
        gridColor2?: number
        // 环境光强度
        ambientLightIntensity?: number
        // 主光源强度
        directionalLightIntensity?: number
        // 主光源位置
        directionalLightPosition?: [number, number, number]
        // 补光强度
        fillLightIntensity?: number
        // 补光位置
        fillLightPosition?: [number, number, number]
        // 相机初始位置
        cameraInitialPosition?: [number, number, number]
        // 图例相机位置
        legendCameraPosition?: [number, number, number]
        // 图例相机视角
        legendCameraLookAt?: [number, number, number]
        // 图例相机 FOV
        legendCameraFov?: number
        // 自动旋转速度
        autoRotateSpeed?: number
        // 相机移动平滑度 (0-1)
        cameraMoveLerp?: number
        // 相机聚焦偏移
        cameraFocusOffset?: [number, number, number]
        // 设备旋转速度倍率
        deviceRotationSpeed?: number
        // 脉冲动画基础强度
        pulseBaseIntensity?: number
        // 脉冲动画变化范围
        pulseRange?: number
        // 脉冲动画频率
        pulseFrequency?: number
    }>(),
    {
        title: 'SYSTEM MONITOR',
        panelPosition: () => ({ top: '20px', right: '20px' }),
        panelWidth: '220px',
        statusDotColor: '#0f0',
        sceneBackground: 0x1a1a1a,
        sceneFogColor: 0x1a1a1a,
        sceneFogRange: () => [10, 30],
        groundColor: 0x151515,
        groundSize: () => [30, 30],
        gridSize: 30,
        gridDivisions: 30,
        gridColor1: 0x555555,
        gridColor2: 0x222222,
        ambientLightIntensity: 0.8,
        directionalLightIntensity: 1.2,
        directionalLightPosition: () => [5, 15, 7],
        fillLightIntensity: 0.3,
        fillLightPosition: () => [-5, 5, -5],
        cameraInitialPosition: () => [0, 5, 10],
        legendCameraPosition: () => [2, 1.5, 2.5],
        legendCameraLookAt: () => [0, 0, 0],
        legendCameraFov: 50,
        autoRotateSpeed: 0.5,
        cameraMoveLerp: 0.05,
        cameraFocusOffset: () => [0, 3, 5],
        deviceRotationSpeed: 0.01,
        pulseBaseIntensity: 0.3,
        pulseRange: 1.5,
        pulseFrequency: 3,
    },
)

const tresContext = useTres()
const { camera, renderer, scene, controls } = tresContext
const { onRender } = useLoop()

// ========== 状态管理 ==========
const clock = new THREE.Clock()
const devices = ref<Array<{
    config: DeviceConfig
    mainMesh: THREE.Object3D
    materials: THREE.MeshStandardMaterial[]
    originalPosition: THREE.Vector3
    anchorId: string
}>>([])

const sceneStaticObjects = ref<THREE.Object3D[]>([])
const legendCamera = ref<THREE.PerspectiveCamera | null>(null)

// 相机平滑移动
const targetPosition = ref(new THREE.Vector3())
const targetLookAt = ref(new THREE.Vector3())
const isMoving = ref(false)

// ========== 方法 ==========


// 创建基础材质
const createBaseMaterial = (color: number): THREE.MeshStandardMaterial => {
    return new THREE.MeshStandardMaterial({
        color: 0x555555,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.8,
    })
}

// 创建科幻风格立方体
const createSciFiCube = (material: THREE.MeshStandardMaterial): THREE.Group => {
    const group = new THREE.Group()
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), material)
    group.add(box)
    const wire = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 1.4, 1.4),
        new THREE.MeshBasicMaterial({
            color: material.emissive.getHex(),
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        }),
    )
    group.add(wire)
    return group
}

// 创建科幻风格球体
const createSciFiSphere = (material: THREE.MeshStandardMaterial): THREE.Group => {
    const group = new THREE.Group()
    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 1), material)
    group.add(sphere)
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.0, 0.05, 6, 30),
        new THREE.MeshBasicMaterial({
            color: material.emissive.getHex(),
            transparent: true,
            opacity: 0.5,
        }),
    )
    ring.rotation.x = Math.PI / 2
    group.add(ring)
    return group
}

// 创建科幻风格圆锥
const createSciFiCone = (material: THREE.MeshStandardMaterial): THREE.Group => {
    const group = new THREE.Group()
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.5, 6), material)
    cone.position.y = 0.2
    group.add(cone)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.1, 6), material)
    base.position.y = -0.6
    group.add(base)
    return group
}

// 从配置创建网格
const createMeshFromConfig = (config: DeviceConfig): Promise<THREE.Object3D> => {
    return new Promise((resolve, reject) => {
        if (config.type === 'model' && config.modelUrl) {
            const loader = new GLTFLoader()
            loader.load(
                config.modelUrl,
                (gltf) => {
                    const root = gltf.scene
                    const scale = config.modelScale || 1
                    root.scale.set(scale, scale, scale)
                    resolve(root)
                },
                undefined,
                reject,
            )
            return
        }

        // 简单几何体
        const material = createBaseMaterial(config.color)
        let mesh: THREE.Object3D
        if (config.type === 'cube') {
            mesh = createSciFiCube(material)
        } else if (config.type === 'sphere') {
            mesh = createSciFiSphere(material)
        } else {
            mesh = createSciFiCone(material)
        }
        resolve(mesh)
    })
}

// 构建设备
const buildDevices = async () => {
    const promises = props.deviceConfig.map(async (config) => {
        try {
            const mesh = await createMeshFromConfig(config)
            const materials: THREE.MeshStandardMaterial[] = []

            // 收集材质
            mesh.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.castShadow = true
                    obj.receiveShadow = true

                    const mat = obj.material
                    // 处理材质数组和单个材质
                    const matArray = Array.isArray(mat) ? mat : [mat]

                    matArray.forEach((singleMat) => {
                        if (singleMat instanceof THREE.MeshStandardMaterial) {
                            // 确保 emissive 属性存在且是 THREE.Color 对象
                            if (!singleMat.emissive || !(singleMat.emissive instanceof THREE.Color)) {
                                singleMat.emissive = new THREE.Color(config.color)
                            } else {
                                singleMat.emissive.set(config.color)
                            }
                            singleMat.emissiveIntensity = 0.5
                            // 使用 markRaw 确保材质不被响应式代理干扰
                            materials.push(markRaw(singleMat))
                        }
                    })
                }
            })

            mesh.position.set(...config.position)
            if (scene.value) {
                // 确保主场景也操作原始 mesh
                scene.value.add(markRaw(mesh)) // 再次确保添加到场景的是原始对象
            }

            const originalPosition = new THREE.Vector3(...config.position)

            devices.value.push({
                config,
                materials,
                mainMesh: markRaw(mesh), // <<< 核心修复：对 mainMesh 使用 markRaw
                originalPosition,
                anchorId: `anchor-${config.id}`,
            })
        } catch (err) {
            console.error(`加载模型 ${config.id} 失败`, err)
        }
    })

    await Promise.all(promises)
}

// 初始化场景
const initScene = () => {
    if (!scene.value || !renderer || !camera.value) return

    // 设置场景背景和雾
    if (typeof props.sceneBackground === 'number') {
        scene.value.background = new THREE.Color(props.sceneBackground)
    } else {
        scene.value.background = new THREE.Color(props.sceneBackground)
    }

    if (typeof props.sceneFogColor === 'number') {
        scene.value.fog = new THREE.Fog(
            props.sceneFogColor,
            props.sceneFogRange[0],
            props.sceneFogRange[1],
        )
    } else {
        scene.value.fog = new THREE.Fog(
            new THREE.Color(props.sceneFogColor),
            props.sceneFogRange[0],
            props.sceneFogRange[1],
        )
    }

    // 设置渲染器阴影
    if (renderer.shadowMap) {
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }

    // 创建地面
    const groundGeometry = new THREE.PlaneGeometry(...props.groundSize)
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: props.groundColor,
        metalness: 0.1,
        roughness: 0.8,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.value.add(ground)
    sceneStaticObjects.value.push(ground)

    // 创建网格
    const grid = new THREE.GridHelper(
        props.gridSize,
        props.gridDivisions,
        props.gridColor1,
        props.gridColor2,
    )
    scene.value.add(grid)
    sceneStaticObjects.value.push(grid)

    // 创建灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, props.ambientLightIntensity)
    scene.value.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, props.directionalLightIntensity)
    dirLight.position.set(...props.directionalLightPosition)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 50
    dirLight.shadow.camera.left = -15
    dirLight.shadow.camera.right = 15
    dirLight.shadow.camera.top = 15
    dirLight.shadow.camera.bottom = -15
    scene.value.add(dirLight)

    const fillLight = new THREE.PointLight(0xffffff, props.fillLightIntensity, 20)
    fillLight.position.set(...props.fillLightPosition)
    scene.value.add(fillLight)

    // 设置相机初始位置
    if (camera.value instanceof THREE.PerspectiveCamera) {
        camera.value.position.set(...props.cameraInitialPosition)
    }

    // 设置控制器自动旋转
    if (controls.value) {
        const controlsInstance = controls.value as any
        if ('autoRotate' in controlsInstance) {
            controlsInstance.autoRotate = true
            controlsInstance.autoRotateSpeed = props.autoRotateSpeed
        }
    }

    // 创建图例相机
    legendCamera.value = new THREE.PerspectiveCamera(
        props.legendCameraFov,
        1,
        0.1,
        50,
    )
    
    legendCamera.value.position.set(...props.legendCameraPosition)
    legendCamera.value.lookAt(...props.legendCameraLookAt)
}

// 相机平滑移动到设备
const zoomToDevice = (meshPosition: THREE.Vector3) => {
    if (!camera.value || !controls.value) return

    const controlsInstance = controls.value as any

    // 停止自动旋转
    if ('autoRotate' in controlsInstance) {
        controlsInstance.autoRotate = false
    }

    // 计算新的相机位置
    const offset = new THREE.Vector3(...props.cameraFocusOffset)
    const newCameraPosition = meshPosition.clone().add(offset)

    targetLookAt.value.copy(meshPosition)
    targetPosition.value.copy(newCameraPosition)
    isMoving.value = true

    // 启用阻尼
    if ('enableDamping' in controlsInstance) {
        controlsInstance.enableDamping = true
        controlsInstance.dampingFactor = 0.05
    }
}

// 处理设备点击
const handleDeviceClick = (deviceId: string) => {
    const device = devices.value.find((d) => d.config.id === deviceId)
    if (device) {
        zoomToDevice(device.mainMesh.position)
    }
}

// 渲染循环
const renderLoop = () => {
    if (!renderer || !scene.value || !camera.value || !legendCamera.value) return

    const time = clock.getElapsedTime()

    // 1. 相机平滑移动
    if (isMoving.value && camera.value instanceof THREE.PerspectiveCamera && controls.value) {
        const controlsInstance = controls.value as any
        camera.value.position.lerp(targetPosition.value, props.cameraMoveLerp)
        if ('target' in controlsInstance && controlsInstance.target instanceof THREE.Vector3) {
            controlsInstance.target.lerp(targetLookAt.value, props.cameraMoveLerp)
        }

        if (camera.value.position.distanceTo(targetPosition.value) < 0.01) {
            camera.value.position.copy(targetPosition.value)
            if ('target' in controlsInstance && controlsInstance.target instanceof THREE.Vector3) {
                controlsInstance.target.copy(targetLookAt.value)
            }
            isMoving.value = false
            if ('autoRotate' in controlsInstance) {
                controlsInstance.autoRotate = true
            }
            if ('dampingFactor' in controlsInstance) {
                controlsInstance.dampingFactor = 0.005
            }
        }
    }

    // 2. 更新设备动画
    devices.value.forEach((device) => {
        const speed = device.config.speed || 1.0
        const pulse =
            (Math.sin(time * props.pulseFrequency * speed) + 1) * 0.5

        // 更新材质发光强度
        device.materials.forEach((mat) => {
            mat.emissiveIntensity = props.pulseBaseIntensity + pulse * props.pulseRange
        })

        // 旋转动画
        device.mainMesh.rotation.y += props.deviceRotationSpeed * speed
    })

    // 3. 更新控制器
    if (controls.value) {
        const controlsInstance = controls.value as any
        if ('update' in controlsInstance && typeof controlsInstance.update === 'function') {
            controlsInstance.update()
        }
    }

    // 4. 渲染主场景
    const fullSize = renderer.getDrawingBufferSize(new THREE.Vector2())
    renderer.setViewport(0, 0, fullSize.x, fullSize.y)
    renderer.setScissor(0, 0, fullSize.x, fullSize.y)
    renderer.setScissorTest(false)
    renderer.clear()
    renderer.render(scene.value, camera.value)

    // 5. 渲染图例（画中画）
    renderer.setScissorTest(true)
    renderer.clearDepth()

    devices.value.forEach((device) => {
        const anchor = document.getElementById(device.anchorId)
        if (!anchor) return

        const rect = anchor.getBoundingClientRect()
        const dpr = renderer.getPixelRatio()

        if (rect.bottom < 0 || rect.top > window.innerHeight) return

        // 保存状态
        const savedPosition = device.mainMesh.position.clone()
        const savedVisible: boolean[] = []
        devices.value.forEach((d) => {
            savedVisible.push(d.mainMesh.visible)
            if (d !== device) {
                d.mainMesh.visible = false
            }
        })
        const savedStaticVisible: boolean[] = []
        sceneStaticObjects.value.forEach((obj) => {
            savedStaticVisible.push(obj.visible)
            obj.visible = false
        })

        // 临时调整位置
        device.mainMesh.position.set(0, 0, 0)
        device.mainMesh.visible = true

        // 设置裁剪区域
        const width = rect.width * dpr
        const height = rect.height * dpr
        const left = rect.left * dpr
        const bottom = (window.innerHeight - rect.bottom) * dpr

        renderer.setScissor(left, bottom, width, height)
        renderer.setViewport(left, bottom, width, height)

        // 渲染图例
        renderer.render(scene.value, legendCamera.value)

        // 恢复状态
        device.mainMesh.position.copy(savedPosition)
        devices.value.forEach((d, i) => {
            d.mainMesh.visible = savedVisible[i]
        })
        sceneStaticObjects.value.forEach((obj, i) => {
            obj.visible = savedStaticVisible[i]
        })
    })

    renderer.setScissorTest(false)
}

// ========== 生命周期 ==========
onMounted(async () => {
    await nextTick()
    initScene()
    await buildDevices()
    onRender(renderLoop)
})

// 监听设备配置变化 - 增量更新
watch(
    () => props.deviceConfig,
    async (newConfig, oldConfig) => {
        if (!oldConfig || oldConfig.length === 0) {
            // 初始化时构建所有设备
            await buildDevices()
            return
        }

        // 找出新增的设备
        const existingIds = new Set(devices.value.map(d => d.config.id))
        const newDevices = newConfig.filter(config => !existingIds.has(config.id))

        if (newDevices.length > 0) {
            // 只添加新设备
            for (const config of newDevices) {
                try {
                    const mesh = await createMeshFromConfig(config)
                    const materials: THREE.MeshStandardMaterial[] = []

                    // 收集材质
                    mesh.traverse((obj) => {
                        if (obj instanceof THREE.Mesh) {
                            obj.castShadow = true
                            obj.receiveShadow = true

                            const mat = obj.material
                            // 处理材质数组和单个材质
                            const matArray = Array.isArray(mat) ? mat : [mat]

                            matArray.forEach((singleMat) => {
                                if (singleMat instanceof THREE.MeshStandardMaterial) {
                                    // 确保 emissive 属性存在且是 THREE.Color 对象
                                    if (!singleMat.emissive || !(singleMat.emissive instanceof THREE.Color)) {
                                        singleMat.emissive = new THREE.Color(config.color)
                                    } else {
                                        singleMat.emissive.set(config.color)
                                    }
                                    singleMat.emissiveIntensity = 0.5
                                    // 使用 markRaw 确保材质不被响应式代理干扰
                                    materials.push(markRaw(singleMat))
                                }
                            })
                        }
                    })

                    mesh.position.set(...config.position)
                    if (scene.value) {
                        scene.value.add(markRaw(mesh))
                    }

                    const originalPosition = new THREE.Vector3(...config.position)

                    devices.value.push({
                        config,
                        materials,
                        mainMesh: markRaw(mesh),
                        originalPosition,
                        anchorId: `anchor-${config.id}`,
                    })
                } catch (err) {
                    console.error(`加载模型 ${config.id} 失败`, err)
                }
            }
        }

        // 找出需要删除的设备
        const currentIds = new Set(newConfig.map(c => c.id))
        const devicesToRemove = devices.value.filter(d => !currentIds.has(d.config.id))
        
        if (devicesToRemove.length > 0) {
            devicesToRemove.forEach((device) => {
                if (scene.value) {
                    scene.value.remove(device.mainMesh)
                    device.mainMesh.traverse((obj) => {
                        if (obj instanceof THREE.Mesh) {
                            if (obj.geometry) obj.geometry.dispose()
                            if (obj.material) {
                                if (Array.isArray(obj.material)) {
                                    obj.material.forEach((mat) => mat.dispose())
                                } else {
                                    obj.material.dispose()
                                }
                            }
                        }
                    })
                }
            })
            devices.value = devices.value.filter(d => currentIds.has(d.config.id))
        }
    },
    { deep: true },
)

// 随机添加 mesh 到场景 - 只返回配置，由 watch 处理实际创建
const addRandomMesh = (): DeviceConfig | null => {
    // 随机选择形状类型（映射到 DeviceConfig 支持的类型）
    const shapeMap: Record<string, 'cube' | 'sphere' | 'cone'> = {
        box: 'cube',
        sphere: 'sphere',
        cone: 'cone',
        cylinder: 'cube', // 圆柱用立方体代替
        torus: 'cube', // 圆环用立方体代替
        octahedron: 'sphere', // 八面体用球体代替
        tetrahedron: 'cone', // 四面体用圆锥代替
    }
    const shapes = ['box', 'sphere', 'cone', 'cylinder', 'torus', 'octahedron', 'tetrahedron']
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
    const deviceType: 'cube' | 'sphere' | 'cone' = shapeMap[shapeType] || 'cube'

    // 随机位置 (在场景范围内)
    const x = (Math.random() - 0.5) * 15
    const y = Math.random() * 3 + 0.5
    const z = (Math.random() - 0.5) * 15

    // 随机颜色
    const colors = [0x00ffff, 0xff0055, 0x44ff00, 0xffaa00, 0xaa00ff, 0x00ffaa, 0xff00aa]
    const color = colors[Math.floor(Math.random() * colors.length)]

    // 生成唯一 ID
    const id = `random-mesh-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // 生成名称（根据形状类型）
    const nameMap: Record<string, string> = {
        box: '立方体',
        sphere: '球体',
        cone: '圆锥',
        cylinder: '圆柱',
        torus: '圆环',
        octahedron: '八面体',
        tetrahedron: '四面体',
    }
    const name = nameMap[shapeType] || '形状'

    // 返回设备配置（由 watch 监听 deviceConfig 变化来创建实际的 mesh）
    const deviceConfig: DeviceConfig = {
        id,
        name,
        type: deviceType,
        color,
        position: [x, y, z],
        speed: 0.5 + Math.random() * 1.5,
        author: '随机生成',
    }

    return deviceConfig
}

// 暴露方法供父组件调用
defineExpose({
    handleDeviceClick,
    addRandomMesh,
})
</script>

