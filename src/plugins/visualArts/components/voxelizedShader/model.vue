<template>
    <primitive :object="scene" />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import vertexShader from '../../shaders/voxelized.vert'
import fragmentShader from '../../shaders/voxelized.frag'

const props = defineProps({
    mosaic: { default: 2.31 },
    progress: { default: 0.31 },
    triScale: { default: 1 },
})

const voxelizedMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        time: { value: 0 },
        mosaic: { value: props.mosaic },
        progress: { value: props.progress },
        triScale: { value: props.triScale },
    },
    vertexShader,
    fragmentShader,
})

const { scene } = (await useGLTF('./plugins/visualArts/model/LeePerrySmith.glb', { draco: true, decoderPath: './draco/' })) as any
scene.traverse((child: any) => {
    if (child.isMesh) {
        child.material = voxelizedMaterial
    }
})
scene.children[0].geometry = scene.children[0].geometry.toNonIndexed()
scene.children[0].geometry.center()
let pos = scene.children[0].geometry.attributes.position.array
//calculate center of each triangle
let centers = []
for (let i = 0; i < pos.length; i += 9) {
    let centerX = (pos[i] + pos[i + 3] + pos[i + 6]) / 3
    let centerY = (pos[i + 1] + pos[i + 4] + pos[i + 7]) / 3
    let centerZ = (pos[i + 2] + pos[i + 5] + pos[i + 8]) / 3

    centers.push(centerX, centerY, centerZ)
    centers.push(centerX, centerY, centerZ)
    centers.push(centerX, centerY, centerZ)
}
scene.children[0].geometry.setAttribute('center', new THREE.BufferAttribute(new Float32Array(centers), 3))

const { onLoop } = useRenderLoop()
onLoop(({}) => {
    voxelizedMaterial.uniforms.time.value += 0.05
})

watch(
    () => [props.mosaic, props.progress, props.triScale],
    ([mosaic, progress, triScale]) => {
        voxelizedMaterial.uniforms.mosaic.value = mosaic
        voxelizedMaterial.uniforms.progress.value = progress
        voxelizedMaterial.uniforms.triScale.value = triScale
    },
)
</script>
