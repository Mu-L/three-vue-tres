<template>
    <primitive :object="modelScene" />
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useTres } from '@tresjs/core'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

const MODEL_URL = './plugins/digitalPark/innovationHubAr/model/InnovationHubAR.glb'
const SKYBOX_URL = './plugins/skyBox/image/kloofendal_48d_partly_cloudy_puresky.jpg'

const { renderer, scene } = useTres()
const rendererInstance = ((renderer as any).value || renderer) as THREE.WebGLRenderer
const sceneInstance = ((scene as any).value || scene) as THREE.Scene

const previousBackground = sceneInstance.background
const previousEnvironment = sceneInstance.environment
const previousBackgroundBlurriness = sceneInstance.backgroundBlurriness
const previousBackgroundIntensity = sceneInstance.backgroundIntensity
const previousEnvironmentIntensity = sceneInstance.environmentIntensity
const previousToneMapping = rendererInstance.toneMapping
const previousToneMappingExposure = rendererInstance.toneMappingExposure

const dracoLoader = new DRACOLoader().setDecoderPath('./draco/')
const ktx2Loader = new KTX2Loader().setTranscoderPath('./basis/').detectSupport(rendererInstance)
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.setKTX2Loader(ktx2Loader)

const textureLoader = new THREE.TextureLoader()
const skyTexture = await textureLoader.loadAsync(SKYBOX_URL)
skyTexture.wrapS = skyTexture.wrapT = THREE.ClampToEdgeWrapping
skyTexture.generateMipmaps = false
skyTexture.magFilter = THREE.LinearFilter
skyTexture.minFilter = THREE.LinearFilter
skyTexture.colorSpace = THREE.SRGBColorSpace
skyTexture.mapping = THREE.EquirectangularReflectionMapping

const pmrem = new THREE.PMREMGenerator(rendererInstance)
const environmentTarget = pmrem.fromEquirectangular(skyTexture)
pmrem.dispose()

rendererInstance.toneMapping = THREE.LinearToneMapping
rendererInstance.toneMappingExposure = 1.45

sceneInstance.background = skyTexture
sceneInstance.environment = environmentTarget.texture
sceneInstance.backgroundBlurriness = 0.122
sceneInstance.backgroundIntensity = 0.85
sceneInstance.environmentIntensity = 1.15

const gltf = await gltfLoader.loadAsync(MODEL_URL)
const modelScene = gltf.scene

function cloneMaterial(material: THREE.Material | THREE.Material[]) {
    return Array.isArray(material) ? material.map((item) => item.clone()) : material.clone()
}

modelScene.traverse((object) => {
    object.frustumCulled = false

    if (object.name === 'MobileGlas') {
        object.visible = false
    }

    const mesh = object as THREE.Mesh
    if (!mesh.isMesh) return

    if (mesh.name === 'RoofFloorGreen') {
        mesh.material = cloneMaterial(mesh.material)
        mesh.renderOrder = 1
    }

    mesh.castShadow = true
    mesh.receiveShadow = true

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    materials.forEach((material) => {
        if (!material) return

        if (material.name === 'Glas') {
            mesh.renderOrder = -1
        }

        if (mesh.name === 'RoofFloorGreen') {
            material.polygonOffset = true
            material.polygonOffsetFactor = -0.25
            material.polygonOffsetUnits = -0.25
            material.needsUpdate = true
        }
    })
})

onBeforeUnmount(() => {
    sceneInstance.background = previousBackground
    sceneInstance.environment = previousEnvironment
    sceneInstance.backgroundBlurriness = previousBackgroundBlurriness
    sceneInstance.backgroundIntensity = previousBackgroundIntensity
    sceneInstance.environmentIntensity = previousEnvironmentIntensity
    rendererInstance.toneMapping = previousToneMapping
    rendererInstance.toneMappingExposure = previousToneMappingExposure

    skyTexture.dispose()
    environmentTarget.dispose()
    dracoLoader.dispose()
    ktx2Loader.dispose()

    modelScene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (!mesh.isMesh) return
        mesh.geometry?.dispose()
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((material) => material?.dispose())
    })
})
</script>
