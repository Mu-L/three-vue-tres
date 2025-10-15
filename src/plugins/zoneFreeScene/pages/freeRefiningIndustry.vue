<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-11 08:59:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-15 09:38:44
-->

<template>
    <loading useResourceManager />
    <TresCanvas v-bind="tcConfig">
        <TresOrthographicCamera :position="[-2.82, 8.65, 12.56]" :left="-widths" :right="widths" :top="heights"
            :bottom="-heights" :zoom="108.8" :near="-100" :far="10000" />
        <OrbitControls makeDefault :target="new THREE.Vector3(2.53, 1.78, -0.12)" />
        <TresAmbientLight :color="0xffffff" :intensity="0.5" />
        <viewportGizmo v-bind="viewportConfig" />

        <floor :fState="fState" :gridState="gridState" />
        <skylight v-bind="sState" />
        <glbsList v-if="Resource.hasAllFinished.value" />
        <extendMeshes v-if="Resource.hasAllFinished.value" />
        <tresProcessing :postProcessing="pState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from '@tresjs/cientos'
import { viewportGizmo } from 'PLS/useViewportGizmo'
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import floor from '../components/freeRefiningIndustry/floor.vue'
import skylight from '../components/freeRefiningIndustry/skylight.vue'
import glbsList from '../components/freeRefiningIndustry/glbsList.vue'
import tresProcessing from '../components/freeRefiningIndustry/tresProcessing.vue'
import extendMeshes from '../components/freeRefiningIndustry/extendMeshes.vue'

const widths = 1000
const { width, height } = useWindowSize()
const heights = computed(() => {
    return 1000 * height.value / width.value
})

const fState = { color: '#C2C2C2', shadowColor: '#8C8C8C', receiveShadow: true, edge: 0.35, scale: 2.93 }
const gridState = {
    cellSize: 0.59,
    cellThickness: 1,
    cellColor: '#404040',
    sectionColor: '#2F2F2F',
    sectionSize: 3.1,
    sectionThickness: 2.38,
    fadeDistance: 22,
    fadeStrength: 1,
    infiniteGrid: true,
}
const sState = { curTime: 14.2, direct: 0.5, intensity: 1, shadowIntensity: 0.78 }
const pState = {
    isOpenList: { Bloom: false, chromaticAberration: false },
    configList: {
        Bloom: { radius: 0.85, intensity: 4, 'luminance-threshold': 0.1, 'luminance-smoothing': 0.3, 'mipmap-blur': false },
        chromaticAberration: { offsetX: 0.07, offsetY: 0.07, radialModulation: true, modulationOffset: 0 },
    },
}

const tcConfig = {
    clearColor: '#201919',
    windowSize: true,
    shadows: true,
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFSoftShadowMap,
}

const viewportConfig = {
    size: 100,
    lineWidth: 2,
    type: 'sphere',
    placement: 'bottom-right',
    offset: {
        right: 10,
    },
}

Resource.loadResources([
    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/0游乐场/models/floor.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/gasTank.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/oilTruck.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/cCringUnit.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/house.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/ccUnit.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/oilHeater.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/tower.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/oilTank.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/machine.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/srUnit.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/tank2.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/gtUnit.glb' },

    { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/2低像素炼油/models/flaringDevice.glb' },
])
</script>
