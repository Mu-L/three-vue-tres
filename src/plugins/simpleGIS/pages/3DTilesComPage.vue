<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-28 09:23:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-28 11:28:17
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[400, 400, 400]" :fov="60" :near="1" :far="10000" />
        <MapControls />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.25" />
        <TresAxesHelper :args="[100]" />

        <tilesCom />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { MapControls } from '@tresjs/cientos'
import tilesCom from '../components/tilesCom.vue'

const state = {
    clearColor: '#201919',
    windowSize: true,
    shadows: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFSoftShadowMap,
}
</script>
