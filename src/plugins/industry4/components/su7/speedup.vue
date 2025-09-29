<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-15 21:03:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 10:24:31
-->
<template>
    <primitive :object="scene" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexShader from '../../shaders/speedup.vert'
import fragmentShader from '../../shaders/speedup.frag'

const gltfLoader = new GLTFLoader()
gltfLoader.setMeshoptDecoder(MeshoptDecoder)
const { scene } = await gltfLoader.loadAsync(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/industry4/su7_car/sm_speedup.gltf`)

const uniforms = {
    uTime: { value: 0 },
    uSpeedFactor: { value: 0 },
}

const mat = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
})

scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = mat
    }
})
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
    mat.uniforms.uTime.value += delta
    mat.uniforms.uSpeedFactor.value = 1.0
})
</script>
