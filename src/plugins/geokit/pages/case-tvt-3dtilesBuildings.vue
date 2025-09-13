<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-01 14:44:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-01 15:42:20
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <GeoCSS2DRenderer />
        <GeoControls v-model:position="cameraPosition" :min-distance="1" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <tilesCom v-bind="configState" :position="[500, 100, 300]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { GeoControls, GeoCSS2DRenderer, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import DevTDTTiles from '../components/DevTDTTiles.vue'
import { tilesCom } from 'PLS/simpleGIS'
import { Pane } from 'tweakpane'

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
    heading: 102,
    pitch: -51,
    distance: 5368,
    longitude: 113.95,
    latitude: 22.53,
})

const configState = {
    tilesUrl: 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/tileset.json',
    isRotation: false,
    isRranslation: false,
    bulidingsColor: '#ffffff',
    topColor: '#82e8b3',
    lightColor: '#00f843',
    borderWidth: 8.5,
    opacity: 0.75,
    gradient: true,
    speed: 1.5,
    lineOpacity: 1.0,
    linewidth: 0.38,
    lineColor: '#954200',
}

const paneControl = new Pane()
paneControl.addBinding(configState, 'bulidingsColor', { label: '建筑物颜色' })
paneControl.addBinding(configState, 'topColor', { label: '顶部颜色' })
paneControl.addBinding(configState, 'gradient', { label: '是否渐变色' })
paneControl.addBinding(configState, 'lightColor', { label: '跑光颜色' })
paneControl.addBinding(configState, 'speed', {
    label: '跑光速度',
    min: -2,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(configState, 'borderWidth', {
    label: '跑光宽度',
    min: 0,
    max: 20,
    step: 0.1,
})
paneControl.addBinding(configState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(configState, 'lineColor', { label: '边框颜色' })
paneControl.addBinding(configState, 'linewidth', {
    label: '边框宽度',
    min: 0,
    max: 5,
    step: 0.01,
})
paneControl.addBinding(configState, 'lineOpacity', {
    label: '边框透明度',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>
<style scoped></style>
