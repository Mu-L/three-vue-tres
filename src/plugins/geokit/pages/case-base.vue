<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <GeoCSS2DRenderer />
        <GeoControls v-model:position="cameraPosition" :min-distance="1" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { GeoControls, GeoCSS2DRenderer, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import DevTDTTiles from '../components/DevTDTTiles.vue'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const sceneConfig = ref({
    effectProps: {
        enabled: false,
        focusArea: 0.7,
        feather: 0.1,
    },
    ambientLight: {
        color: '#fff',
        intensity: 1,
    },
    directionalLight: {
        color: '#fff',
        intensity: 2,
        position: [-1500, 500, 500] as [number, number, number],
    },
    background: '/plugins/earthSample/image/menuA/bg-img.png',
})

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 1000,
    longitude: 116.391,
    latitude: 39.906,
})
</script>
<style scoped></style>
