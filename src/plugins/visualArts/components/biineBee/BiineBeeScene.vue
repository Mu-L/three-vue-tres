<template>
    <primitive :object="root" />
</template>

<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { markRaw, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import glassVertex from '../../shaders/biineBeeGlass.vert'
import glassFragment from '../../shaders/biineBeeGlass.frag'
import innerVertex from '../../shaders/biineBeeInner.vert'
import innerFragment from '../../shaders/biineBeeInner.frag'
import groundVertex from '../../shaders/biineBeeGround.vert'
import groundFragment from '../../shaders/biineBeeGround.frag'

type LabelConfig = {
    boneName: string
    offset: THREE.Vector3
}

const emit = defineEmits<{
    (event: 'progress', value: number): void
    (event: 'ready'): void
}>()

const ASSET_BASE = 'plugins/visualArts/biineBee/'
const MODEL_URL = `${ASSET_BASE}models/bee.glb`
const NORMAL_URL = `${ASSET_BASE}textures/bee_normal.webp`
const ORM_URL = `${ASSET_BASE}textures/bee_orm.webp`
const BLUE_NOISE_URL = `${ASSET_BASE}textures/bluenoise128.png`

const SCROLL_SPEEDS = [0, 0, 2.5]
const FADE_ENDS = [40, 70, 140]
const BLEND_DURATION = 1
const LABELS: Record<string, LabelConfig> = {
    Mandibula: {
        boneName: 'l_mandible_jnt018',
        offset: new THREE.Vector3(0, 0, 0.5),
    },
    Thorax: {
        boneName: 'body_jnt3',
        offset: new THREE.Vector3(-0.6, 1.3, 0),
    },
    Abdomen: {
        boneName: 'abdomen_jnt0435',
        offset: new THREE.Vector3(0, 2.8, 0),
    },
}

const root = shallowRef<THREE.Group>(markRaw(new THREE.Group()))
root.value.name = 'BiineBeeScene'

const { renderer, scene, camera, sizes } = useTres()
const { onBeforeRender } = useLoop()

const targetSize = new THREE.Vector2()
const tempColor = new THREE.Color()
const tempVec3 = new THREE.Vector3()
const shadowCenter = new THREE.Vector3()
const fallbackLabelAnchor = new THREE.Vector3()

const glassMeshes: THREE.SkinnedMesh[] = []
const labelBones = new Map<string, THREE.Bone>()

let normalMap: THREE.Texture | null = null
let ormMap: THREE.Texture | null = null
let blueNoiseTexture: THREE.Texture | null = null
let sceneRT: THREE.WebGLRenderTarget | null = null
let reflectionRT: THREE.WebGLRenderTarget | null = null
let glassMaterial: THREE.ShaderMaterial | null = null
let innerMaterial: THREE.ShaderMaterial | null = null
let groundMaterial: THREE.ShaderMaterial | null = null
let groundMesh: THREE.Mesh | null = null
let directionalLight: THREE.DirectionalLight | null = null
let modelScene: THREE.Group | null = null
let shadowTarget: THREE.SkinnedMesh | null = null
let mixer: THREE.AnimationMixer | null = null
let animations: THREE.AnimationClip[] = []
let currentAction: THREE.AnimationAction | null = null
let prevAction: THREE.AnimationAction | null = null
let blendProgress = 1
let scrollSpeed = 0
let scrollFrom = 0
let scrollTo = 0
let shadowTrackTime = 1
let dracoLoader: DRACOLoader | null = null
let disposed = false

function getRenderer() {
    return renderer as THREE.WebGLRenderer
}

function getDprSize() {
    const webgl = getRenderer()
    webgl.getDrawingBufferSize(targetSize)
    if (targetSize.x > 0 && targetSize.y > 0) {
        return {
            width: Math.floor(targetSize.x),
            height: Math.floor(targetSize.y),
        }
    }
    const ratio = webgl.getPixelRatio?.() || window.devicePixelRatio || 1
    return {
        width: Math.max(1, Math.floor((sizes.width.value || window.innerWidth || 1) * ratio)),
        height: Math.max(1, Math.floor((sizes.height.value || window.innerHeight || 1) * ratio)),
    }
}

function createRenderTarget(width: number, height: number) {
    const target = new THREE.WebGLRenderTarget(width, height, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearMipmapLinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        depthBuffer: true,
        stencilBuffer: false,
        samples: 0,
    })
    target.texture.generateMipmaps = true
    return target
}

function updateRTSize() {
    if (!sceneRT || !reflectionRT || !glassMaterial) return
    const { width, height } = getDprSize()
    sceneRT.setSize(width, height)
    reflectionRT.setSize(width, height)
    glassMaterial.uniforms.u_resolution.value.set(width, height)
}

function prepareTexture(texture: THREE.Texture) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.colorSpace = THREE.NoColorSpace
    texture.needsUpdate = true
    return texture
}

function prepareBlueNoise(texture: THREE.Texture) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.colorSpace = THREE.NoColorSpace
    texture.needsUpdate = true
    return texture
}

function loadTexture(loader: THREE.TextureLoader, url: string) {
    return new Promise<THREE.Texture>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject)
    })
}

function loadGltf(loader: GLTFLoader, url: string) {
    return new Promise<GLTF>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject)
    })
}

function createMaterials() {
    if (!normalMap || !ormMap || !sceneRT || !reflectionRT) return
    const { width, height } = getDprSize()

    glassMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_sceneTexture: { value: sceneRT.texture },
            u_reflectionTexture: { value: reflectionRT.texture },
            u_normalMap: { value: normalMap },
            u_ormMap: { value: ormMap },
            u_resolution: { value: new THREE.Vector2(width, height) },
            u_time: { value: 0 },
            u_baseColor: { value: new THREE.Color('#ffffff') },
            u_ior: { value: 1.5 },
            u_refractionStrength: { value: 0.025 },
            u_reflectionStrength: { value: 0.1 },
            u_refractionRoughness: { value: 0.3 },
            u_reflectionRoughness: { value: 0 },
            u_normalStrength: { value: 2 },
            u_saturation: { value: 1.2 },
            u_fresnelPower: { value: 1 },
            u_specularIntensity: { value: 1 },
            u_volumeColor: { value: new THREE.Color('#d0e8ff') },
            u_volumeDensity: { value: 1 },
            u_dispersion: { value: 0.006 },
            u_sssIntensity: { value: 0 },
            u_sssColor: { value: new THREE.Color('#aaddff') },
            u_edgeTint: { value: new THREE.Color('#ff9e9e') },
            u_edgeTintPower: { value: 4 },
            u_aoIntensity: { value: 0.75 },
            u_lightDir: { value: new THREE.Vector3(0, 1, 0) },
        },
        vertexShader: glassVertex,
        fragmentShader: glassFragment,
        transparent: true,
        extensions: { derivatives: true },
    })

    const innerUniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(THREE.UniformsLib.lights)
    Object.assign(innerUniforms, {
        u_color: { value: new THREE.Color('#cc4444') },
        u_lightDir: { value: new THREE.Vector3(0, 1, 0) },
        u_ormMap: { value: ormMap },
        u_aoIntensity: { value: 0.5 },
    })

    innerMaterial = new THREE.ShaderMaterial({
        uniforms: innerUniforms,
        vertexShader: innerVertex,
        fragmentShader: innerFragment,
        lights: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    })
}

function createGround() {
    if (!blueNoiseTexture) return

    const groundUniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(THREE.UniformsLib.lights)
    Object.assign(groundUniforms, {
        u_majorLineColor: { value: new THREE.Color('#000000') },
        u_minorLineColor: { value: new THREE.Color('#000000') },
        u_bgColor: { value: new THREE.Color('#ffffff') },
        u_majorLineWidth: { value: 0.01 },
        u_minorLineWidth: { value: 0.02 },
        u_gridScale: { value: 0.8 },
        u_majorGridDiv: { value: 4 },
        u_dotColor: { value: new THREE.Color('#000000') },
        u_dotRadius: { value: 0.025 },
        u_shadowColor: { value: new THREE.Color('#8a9baa') },
        u_shadowIntensity: { value: 0.8 },
        u_time: { value: 0 },
        u_blueNoise: { value: blueNoiseTexture },
        u_scrollOffset: { value: new THREE.Vector2(0, 0) },
        u_fadeStart: { value: 0 },
        u_fadeEnd: { value: 50 },
    })

    groundMaterial = new THREE.ShaderMaterial({
        name: 'BiineBeeGround',
        uniforms: groundUniforms,
        vertexShader: groundVertex,
        fragmentShader: groundFragment,
        transparent: true,
        lights: true,
    })

    groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), groundMaterial)
    groundMesh.rotation.x = -Math.PI * 0.5
    groundMesh.receiveShadow = true
    root.value.add(groundMesh)
}

function createDirectionalLight() {
    directionalLight = new THREE.DirectionalLight('#000000', 0)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 80
    directionalLight.shadow.camera.left = -20
    directionalLight.shadow.camera.right = 20
    directionalLight.shadow.camera.top = 20
    directionalLight.shadow.camera.bottom = -20
    directionalLight.shadow.bias = 0.0006
    directionalLight.shadow.normalBias = 0.02
    directionalLight.shadow.radius = 3
    root.value.add(directionalLight)
    root.value.add(directionalLight.target)
    updateLightPosition()
}

function updateLightPosition() {
    if (!directionalLight) return
    const azimuth = 45 * THREE.MathUtils.DEG2RAD
    const elevation = 60 * THREE.MathUtils.DEG2RAD
    const distance = 10
    const target = directionalLight.target.position
    directionalLight.position.set(
        target.x + distance * Math.cos(elevation) * Math.sin(azimuth),
        target.y + distance * Math.sin(elevation),
        target.z + distance * Math.cos(elevation) * Math.cos(azimuth),
    )
}

function cacheBone(bone: THREE.Bone) {
    labelBones.set(bone.name, bone)
    labelBones.set(bone.name.replace(/\./g, ''), bone)
}

function setupModel(gltf: GLTF) {
    if (!glassMaterial || !innerMaterial) return
    modelScene = markRaw(gltf.scene)
    modelScene.traverse((child) => {
        const maybeBone = child as THREE.Bone
        if (maybeBone.isBone) {
            cacheBone(maybeBone)
            return
        }

        const mesh = child as THREE.SkinnedMesh
        if (!mesh.isSkinnedMesh) return
        if (mesh.geometry?.attributes?.uv && !mesh.geometry.attributes.uv2) {
            mesh.geometry.setAttribute('uv2', mesh.geometry.attributes.uv)
        }
        mesh.material = glassMaterial
        mesh.renderOrder = 1
        mesh.frustumCulled = false

        const innerMesh = new THREE.SkinnedMesh(mesh.geometry, innerMaterial)
        innerMesh.name = `${mesh.name || 'bee'}_inner`
        innerMesh.skeleton = mesh.skeleton
        innerMesh.bindMatrix.copy(mesh.bindMatrix)
        innerMesh.bindMatrixInverse.copy(mesh.bindMatrixInverse)
        innerMesh.frustumCulled = false
        innerMesh.castShadow = true
        innerMesh.receiveShadow = true
        mesh.parent?.add(innerMesh)

        glassMeshes.push(mesh)
        shadowTarget = mesh
    })

    root.value.add(modelScene)
    mixer = new THREE.AnimationMixer(modelScene)
    animations = gltf.animations
    playAnimation(0)
}

function easeInOutQuad(value: number) {
    return value < 0.5 ? 2 * value * value : 1 - ((-2 * value + 2) ** 2) / 2
}

function setAnimationIndex(index: number) {
    scrollFrom = scrollSpeed
    scrollTo = SCROLL_SPEEDS[index] || 0
    if (groundMaterial) {
        gsap.to(groundMaterial.uniforms.u_fadeEnd, {
            value: FADE_ENDS[index] || 40,
            duration: 1,
            ease: 'power2.inOut',
        })
    }
}

function playAnimation(index: number) {
    setAnimationIndex(index)
    shadowTrackTime = BLEND_DURATION + 0.5
    if (!mixer || !animations[index]) return

    const action = mixer.clipAction(animations[index])
    if (currentAction === action) return

    if (currentAction) {
        prevAction = currentAction
        prevAction.enabled = true
    }
    action.reset().play()
    action.setEffectiveWeight(prevAction ? 0 : 1)
    currentAction = action
    blendProgress = 0
}

function updateAnimation(delta: number) {
    if (blendProgress < 1 && prevAction && currentAction) {
        blendProgress = Math.min(blendProgress + delta / BLEND_DURATION, 1)
        const weight = easeInOutQuad(blendProgress)
        currentAction.setEffectiveWeight(weight)
        prevAction.setEffectiveWeight(1 - weight)
        if (blendProgress >= 1) {
            prevAction.stop()
            prevAction = null
        }
    }
    mixer?.update(delta)
}

function updateGround(delta: number) {
    if (!groundMaterial) return
    groundMaterial.uniforms.u_time.value += delta
    const weight = currentAction?.getEffectiveWeight() ?? 1
    scrollSpeed = scrollFrom + (scrollTo - scrollFrom) * weight
    groundMaterial.uniforms.u_scrollOffset.value.y += delta * scrollSpeed
}

function updateLight(delta: number) {
    if (!directionalLight) return
    if (shadowTarget && shadowTrackTime > 0) {
        shadowTrackTime -= delta
        shadowTarget.geometry.computeBoundingBox()
        shadowTarget.geometry.boundingBox?.getCenter(shadowCenter)
        shadowCenter.applyMatrix4(shadowTarget.matrixWorld)
        directionalLight.target.position.copy(shadowCenter)
        directionalLight.target.updateMatrixWorld()
        updateLightPosition()
    }

    tempVec3.copy(directionalLight.position).normalize()
    glassMaterial?.uniforms.u_lightDir.value.copy(tempVec3)
    innerMaterial?.uniforms.u_lightDir.value.copy(tempVec3)
}

function renderSceneToRT() {
    const webgl = getRenderer()
    const activeScene = scene.value
    const activeCamera = camera.value
    if (!activeScene || !activeCamera || !sceneRT || !reflectionRT || glassMeshes.length === 0) return

    const previousTarget = webgl.getRenderTarget()
    const previousClearColor = webgl.getClearColor(tempColor)
    const previousClearAlpha = webgl.getClearAlpha()
    const previousCameraLayerMask = activeCamera.layers.mask
    const previousVisibility = glassMeshes.map(mesh => mesh.visible)

    glassMeshes.forEach((mesh) => {
        mesh.visible = false
    })
    webgl.setClearColor(0x000000, 0)

    try {
        webgl.setRenderTarget(sceneRT)
        webgl.clear()
        webgl.render(activeScene, activeCamera)

        activeCamera.layers.enable(1)
        webgl.setRenderTarget(reflectionRT)
        webgl.clear()
        webgl.render(activeScene, activeCamera)
    } finally {
        activeCamera.layers.mask = previousCameraLayerMask
        webgl.setRenderTarget(previousTarget)
        webgl.setClearColor(previousClearColor, previousClearAlpha)
        glassMeshes.forEach((mesh, index) => {
            mesh.visible = previousVisibility[index]
        })
    }
}

async function loadAssets() {
    const manager = new THREE.LoadingManager()
    manager.onProgress = (_, loaded, total) => {
        emit('progress', Math.min(99, Math.round((loaded / Math.max(total, 1)) * 100)))
    }
    manager.onLoad = () => emit('progress', 100)

    const textureLoader = new THREE.TextureLoader(manager)
    const gltfLoader = new GLTFLoader(manager)
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/gltf/')
    gltfLoader.setDRACOLoader(dracoLoader)

    try {
        const [loadedNormalMap, loadedOrmMap, loadedBlueNoise, gltf] = await Promise.all([
            loadTexture(textureLoader, NORMAL_URL).then(prepareTexture),
            loadTexture(textureLoader, ORM_URL).then(prepareTexture),
            loadTexture(textureLoader, BLUE_NOISE_URL).then(prepareBlueNoise),
            loadGltf(gltfLoader, MODEL_URL),
        ])

        if (disposed) {
            loadedNormalMap.dispose()
            loadedOrmMap.dispose()
            loadedBlueNoise.dispose()
            disposeObject(gltf.scene)
            return
        }

        normalMap = loadedNormalMap
        ormMap = loadedOrmMap
        blueNoiseTexture = loadedBlueNoise
        const { width, height } = getDprSize()
        sceneRT = createRenderTarget(width, height)
        reflectionRT = createRenderTarget(width, height)
        createMaterials()
        createGround()
        createDirectionalLight()
        setupModel(gltf)
        emit('ready')
    } catch (error) {
        console.warn('[biineBee] Failed to load local bee assets.', error)
        emit('ready')
    }
}

function getLabelAnchor(name: string) {
    const config = LABELS[name]
    if (!config) return null
    const bone = labelBones.get(config.boneName)
    if (!bone) return null
    bone.getWorldPosition(fallbackLabelAnchor)
    return fallbackLabelAnchor.clone().add(config.offset)
}

function disposeObject(object: THREE.Object3D | null) {
    if (!object) return
    const geometries = new Set<THREE.BufferGeometry>()
    const materials = new Set<THREE.Material>()
    object.traverse((child) => {
        const mesh = child as THREE.Mesh
        if (mesh.geometry) geometries.add(mesh.geometry)
        const material = mesh.material
        if (Array.isArray(material)) {
            material.forEach(item => materials.add(item))
        } else if (material) {
            materials.add(material)
        }
    })
    geometries.forEach(geometry => geometry.dispose())
    materials.forEach(material => material.dispose())
}

onBeforeRender(({ delta }) => {
    if (!glassMaterial) return
    const frameDelta = Math.min(delta, 0.05)
    updateAnimation(frameDelta)
    updateGround(frameDelta)
    updateLight(frameDelta)
    glassMaterial.uniforms.u_time.value += frameDelta
    renderSceneToRT()
})

watch(
    () => [sizes.width.value, sizes.height.value],
    () => updateRTSize(),
)

onMounted(() => {
    loadAssets()
})

onUnmounted(() => {
    disposed = true
    mixer?.stopAllAction()
    gsap.killTweensOf(groundMaterial?.uniforms.u_fadeEnd)
    dracoLoader?.dispose()
    sceneRT?.dispose()
    reflectionRT?.dispose()
    normalMap?.dispose()
    ormMap?.dispose()
    blueNoiseTexture?.dispose()
    disposeObject(modelScene)
    groundMesh?.geometry.dispose()
    groundMaterial?.dispose()
    glassMaterial?.dispose()
    innerMaterial?.dispose()
    root.value.clear()
})

defineExpose({
    playAnimation,
    setAnimationIndex,
    getLabelAnchor,
})
</script>
