<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-26 15:55:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-06 15:21:10
-->
<template>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
        <TresPlaneGeometry :args="[1, 1]" />
        <Suspense>
            <hexGridMaterial :baseMaterial="baseMaterial" v-bind="$attrs" maskTexture="./plugins/floor/image/logoBlack.png" />
        </Suspense>
    </TresMesh>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import hexGridMaterial from './hexGridMaterial.vue'

const baseMaterial = new THREE.MeshBasicMaterial() // MeshBasicMaterial  MeshPhongMaterial
</script>
