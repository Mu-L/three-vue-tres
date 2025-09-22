<template>
    <TresGroup>
        <primitive :object="scene" :position="[0, -0.1, 0]" />
    </TresGroup>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useTresContext, useTexture } from '@tresjs/core'

const { renderer, scene: sceneValue } = useTresContext()

const props = defineProps({
    floorColor: { default: '#ff0000' },
    floorMetalness: { default: 0.8 },
    floorRoughness: { default: 0.2 },
    floorEnvMapIntensity: { default: 2.5 },
    sideColor: { default: '#ffffff' },
    sideOpacity: { default: 0.9 },
})

const textures = await useTexture({
    normalMap: './plugins/floor/image/concrete_wet_floor_basecolor.jpg',
})
textures.normalMap.wrapS = THREE.RepeatWrapping
textures.normalMap.wrapT = THREE.RepeatWrapping
textures.normalMap.repeat.set(10, 10)
const { scene } = await useGLTF(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/floor/baseModelI.glb`, {
    draco: true,
    decoderPath: './draco/',
})

const meshData: Array<{
    mesh: THREE.Mesh
    originalPosition: THREE.Vector3
    scatteredPosition: THREE.Vector3
}> = []

scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
        const originalPosition = child.position.clone()

        const scatterRadius = 20 + Math.random() * 30
        const scatterAngle = Math.random() * Math.PI * 2
        const scatterHeight = (Math.random() - 0.5) * 20

        const scatteredPosition = new THREE.Vector3(
            originalPosition.x + Math.cos(scatterAngle) * scatterRadius,
            originalPosition.y + scatterHeight,
            originalPosition.z + Math.sin(scatterAngle) * scatterRadius,
        )

        meshData.push({
            mesh: child,
            originalPosition: originalPosition,
            scatteredPosition: scatteredPosition,
        })

        child.position.copy(scatteredPosition)

        if (child.name.includes('_')) {
            // 侧面材质
            child.material.emissiveIntensity = 2
            child.material.metalness = 1
            child.material.roughness = 0
            child.material.transparent = true
        } else {
            // 底板面材质
            child.material.map = textures.normalMap
        }
        child.material.needsUpdate = true
    }
})

const setupEnvironment = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer.value)
    const environment = new RoomEnvironment()
    const envMap = pmremGenerator.fromScene(environment).texture

    sceneValue.value.environment = envMap

    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
            child.material.envMap = envMap
            child.material.needsUpdate = true
        }
    })

    environment.dispose()
}
onMounted(() => {
    setupEnvironment()
})

watch(
    () => [props.sideColor, props.floorColor, props.sideOpacity, props.floorMetalness, props.floorRoughness, props.floorEnvMapIntensity],
    ([sideColor, floorColor, sideOpacity, floorMetalness, floorRoughness, floorEnvMapIntensity]) => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                if (child.name.includes('_')) {
                    // 侧面材质
                    child.material.emissive.set(sideColor)
                    child.material.opacity = sideOpacity
                } else {
                    // 底板面材质
                    child.material.color.set(floorColor)
                    child.material.metalness = floorMetalness
                    child.material.roughness = floorRoughness
                    child.material.envMapIntensity = floorEnvMapIntensity
                }
            }
        })
    },
    { immediate: true },
)
</script>
