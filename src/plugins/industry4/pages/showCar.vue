<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 10:14:21
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 1, 15]" :fov="30" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="3" />
        <TresDirectionalLight color="#ffffff" :intensity="5" castShadow :position="[0, 3, 0]" />
        <TresSpotLight ref="spotLight" :position="[0, 10, 0]" :angle="Math.PI / 4" :distance="20" :penumbra="0.1"
            castShadow :intensity="60" :decay="1.5" :focus="0.5" />
        <Suspense>
            <carModel />
        </Suspense>
        <reflectorShaderMesh v-bind="configState" :scale="[3, 1, 3]" :position="[0, -1.17, 0]" />
        <Suspense>
            <envLightForCar />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import * as THREE from 'three'

import { reflectorShaderMesh } from 'PLS/floor'
import { randomLoading as loading } from 'PLS/UIdemo'
import envLightForCar from '../components/envLightForCar.vue'
import carModel from '../components/carModel.vue'

const spotLight = ref(null as THREE.SpotLight | null)
watchEffect(() => {
    if (spotLight.value) {
        spotLight.value.shadow.mapSize.width = 1024
        spotLight.value.shadow.mapSize.height = 1024
        spotLight.value.shadow.camera.near = 1
        spotLight.value.shadow.camera.far = 100
        spotLight.value.shadow.bias = -0.0001
    }
})

const configState = reactive({
    reflectivity: 1,
    mirror: 0.9, // 去除纹理 镜面化
    mixStrength: 1.8,
    showGridHelper: false,
})

const state = reactive({
    clearColor: '#111111',
    shadows: true,
    alpha: false,
    antialias: true,
    pixelRatio: window.devicePixelRatio,
    outputColorSpace: THREE.SRGBColorSpace,
    toneMappingExposure:2.0,
    toneMapping: THREE.ACESFilmicToneMapping,
    useLegacyLights: true,
    physicallyCorrectLights: true,
})
const controlsState = reactive({
    autoRotate: true,
})
</script>
