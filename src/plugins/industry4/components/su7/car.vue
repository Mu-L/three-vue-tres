<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-14 17:59:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-02-06 09:17:46
-->
<template>
    <primitive :object="scene" :rotation-y="Math.PI" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults, watch } from 'vue'
import { useTexture, useRenderLoop } from '@tresjs/core'
// import { useGLTF } from '@tresjs/cientos'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { flatModel } from './utils'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { useSu7Store } from 'PLS/industry4/stores/su7'
import gsap from 'gsap'

const su7Store = useSu7Store()

const props = withDefaults(
    defineProps<{
        run?: boolean
    }>(),
    {
        run: false,
    },
)
// const { scene, materials } = await useGLTF('./plugins/industry4/model/su7_car/sm_car.gltf', { draco: false }, (gltfLoader) => {
//     gltfLoader.setMeshoptDecoder(MeshoptDecoder)
// })
const loader = new GLTFLoader()
loader.setMeshoptDecoder(MeshoptDecoder)
const { scene } = await loader.loadAsync('./plugins/industry4/model/su7_car/sm_car.gltf')
function getAllMaterials(object) {
    let materialsMap = new Map()
    object.traverse((child) => {
        if (child.isMesh) {
            if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                    if (material.name) {
                        materialsMap.set(material.name, material)
                    }
                })
            } else {
                if (child.material.name) {
                    materialsMap.set(child.material.name, child.material)
                }
            }
        }
    })
    return Object.fromEntries(materialsMap)
}
const materials = getAllMaterials(scene)
const pTexture = await useTexture([
    './plugins/industry4/texture/t_car_body_AO.raw.jpg',
    './plugins/industry4/texture/t_cat_car_body_bc.webp',
    './plugins/industry4/texture/t_gm_car_body_bc.webp',
])
pTexture[0].colorSpace = THREE.LinearSRGBColorSpace
pTexture[0].minFilter = THREE.NearestFilter
pTexture[0].magFilter = THREE.NearestFilter
pTexture[0].channel = 1
for (let i = 0; i < pTexture.length; i++) {
    pTexture[i].flipY = false
}

const carModel = flatModel(scene)

const body = carModel[2] as THREE.Mesh
const bodyMat = body.material as THREE.MeshStandardMaterial
bodyMat.envMapIntensity = 4
bodyMat.color = new THREE.Color('#26d6e9')
carModel.forEach((item: THREE.Mesh) => {
    if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial
        mat.aoMap = pTexture[0]
    }
})
const wheel = carModel[35] as THREE.Mesh
wheel.children.forEach((child) => {
    const mesh = child as THREE.Mesh
    const mat = mesh.material as THREE.MeshStandardMaterial
    mat.envMapIntensity = 4
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(({ delta }) => {
    if (props.run) {
        wheel.children.forEach((child) => {
            child.rotateZ(-delta * 30 * 0.5)
        })
    }
})

watch(
    () => props.run,
    (newVal) => {
        if (newVal) {
            wheel.children.forEach((child) => {
                const mesh = child as THREE.Mesh
                const mat = mesh.material as THREE.MeshStandardMaterial
                mat.roughness = 0
                mat.envMapIntensity = 3
            })
        } else {
            wheel.children.forEach((child) => {
                const mesh = child as THREE.Mesh
                const mat = mesh.material as THREE.MeshStandardMaterial
                mat.roughness = 1
                mat.envMapIntensity = 4
            })
        }
    },
)
const carColor = {
    color: new THREE.Color(),
    targetColor: new THREE.Color(),
}
watch(
    () => su7Store.selColorData,
    (newVal) => {
        gsap.killTweensOf(carColor)
        if (newVal === 'c8.webp') {
            materials.Car_body.color.set('#ffffff')
            materials.Car_body.map = pTexture[1]
            materials.Car_body.envMapIntensity = 2
        } else if (newVal === 'c9.webp') {
            materials.Car_body.color.set('#ffffff')
            materials.Car_body.map = pTexture[2]
            materials.Car_body.envMapIntensity = 2
        } else {
            materials.Car_body.map = null
            carColor.color = materials.Car_body.color
            carColor.targetColor = new THREE.Color(newVal)
            gsap.to(carColor.color, {
                duration: 0.66,
                ease: 'power1.out',
                r: carColor.targetColor.r,
                g: carColor.targetColor.g,
                b: carColor.targetColor.b,
                onUpdate: () => {
                    materials.Car_body.color.set(carColor.color)
                },
                onComplete: () => {
                    materials.Car_body.envMapIntensity = 4
                    materials.Car_body.needsUpdate = true
                },
            })
        }
        materials.Car_body.needsUpdate = true
    },
)
</script>
