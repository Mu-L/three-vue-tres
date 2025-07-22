<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-22 10:03:17
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-22 11:27:19
-->
<template>
    <TresGroup>
        <TresMesh :rotate-x="-Math.PI / 2">
            <TresPlaneGeometry :args="[40, 40]" />
            <TresShaderMaterial :vertexShader="iceVertex" :fragmentShader="iceFragment" transparent :uniforms="uniforms" />
        </TresMesh>
    </TresGroup>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { useTexture } from '@tresjs/core'
import iceVertex from '../shaders/ice/vertex.glsl'
import iceFragment from '../shaders/ice/fragment.glsl'

const pTexture = await useTexture(['./plugins/water/images/textures/cracks-3.png', './plugins/water/images/textures/super-perlin-2.png'])

pTexture[0].wrapS = THREE.RepeatWrapping
pTexture[0].wrapT = THREE.RepeatWrapping
pTexture[1].wrapS = THREE.RepeatWrapping
pTexture[1].wrapT = THREE.RepeatWrapping

const uniforms = {
    uTrailMap: { value: null },
    uCracksMap: new THREE.Uniform(pTexture[0]),
    uPerlin: new THREE.Uniform(pTexture[1]),
    uParallaxDistance: { value: 1 },
    uTintColor: new THREE.Uniform(new THREE.Color(0.0, 1.0, 0.0)), // 偏色，默认白色
    uTintStrength: { value: 0 }, // 偏色强
}
</script>
