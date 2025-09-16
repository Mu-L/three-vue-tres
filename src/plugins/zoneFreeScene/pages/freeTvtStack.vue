<template>
    <loading useResourceManager />
    <TresCanvas v-bind="tcConfig"
        ><TresPerspectiveCamera :position="[-9.77, 42.01, -41.41]" :fov="75" :aspect="1" :near="0.01" :far="10000" />
        <OrbitControls makeDefault :target="new THREE.Vector3(-4.25, -9.78, -13.23)" />
        <TresAmbientLight :color="0xffffff" :intensity="0.5" />
        <viewportGizmo v-bind="viewportConfig" />

        <floor :fState="fState" :gridState="gridState" />
        <skylight v-bind="sState" />
        <extendMeshes v-if="Resource.hasAllFinished.value" />
        <tresProcessing :postProcessing="pState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { viewportGizmo } from 'PLS/useViewportGizmo'
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import floor from '../components/freeTvtStack/floor.vue'
import skylight from '../components/freeTvtStack/skylight.vue'
import tresProcessing from '../components/freeTvtStack/tresProcessing.vue'
import extendMeshes from '../components/freeTvtStack/extendMeshes.vue'

const fState = { color: '#FFFFFF', shadowColor: '#b8b59e', receiveShadow: true, edge: 0.35, scale: 9.27 }
const gridState = {
    cellSize: 1.24,
    cellThickness: 0.62,
    cellColor: '#CDCACA',
    sectionColor: '#AEAEAE',
    sectionSize: 5,
    sectionThickness: 1.26,
    fadeDistance: 69,
    fadeStrength: 1,
    infiniteGrid: true,
}
const sState = { curTime: 8, direct: 0.1, intensity: 0.9, shadowIntensity: 0.31 }
const pState = {
    isOpenList: { Bloom: false, chromaticAberration: false },
    configList: {
        Bloom: { radius: 0.85, intensity: 4, 'luminance-threshold': 0.1, 'luminance-smoothing': 0.3, 'mipmap-blur': false },
        chromaticAberration: { offsetX: 0.02, offsetY: 0.01, radialModulation: true, modulationOffset: 0.22 },
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

Resource.hasAllFinished.value = true
</script>
