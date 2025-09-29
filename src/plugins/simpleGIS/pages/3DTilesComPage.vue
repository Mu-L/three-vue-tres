<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-28 09:23:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-28 16:38:23
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[400, 400, 400]" :fov="60" :near="1" :far="20000" />
        <MapControls />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[1, 2, 3]" :intensity="1.25" />
        <TresAxesHelper :args="[100]" />

        <tilesCom v-bind="configState" />

        <reflectorDUDV :position="[0, -120, 0]" v-bind="reflectorState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as THREE from 'three'
import { MapControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { reflectorDUDV } from 'PLS/floor'
import tilesCom from '../components/tilesCom.vue'
import { is3DTilesetJson } from '../common/utils'

const state = {
    clearColor: '#201919',
    windowSize: true,
    shadows: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFSoftShadowMap,
}
const reflectorState = {
    reflectivity: 1,
    showGridHelper: false,
    scale: 500,
}

const configState = reactive({
    tilesUrl: 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/tileset.json',
    bulidingsColor: '#447eff',
    topColor: '#00efd1',
    lightColor: '#99ff9f',
    borderWidth: 5,
    opacity: 1,
    gradient: true,
    speed: 1.0,
    lineOpacity: 1.0,
    linewidth: 1.0,
    lineColor: '#000000',
})
const tilesUrl = ref(configState.tilesUrl)

const paneControl = new Pane()
paneControl.addBinding(tilesUrl, 'value', { label: 'tiles地址' })
const btn = paneControl.addButton({
    title: '应用',
    label: '从url读取tiles',
})
btn.on('click', () => {
    if (tilesUrl.value === configState.tilesUrl) {
        return
    }
    paneControl.disabled = true
    is3DTilesetJson(tilesUrl.value).then((isValid) => {
        if (isValid) {
            configState.tilesUrl = tilesUrl.value
        } else {
            alert('这不是一个有效的3D Tiles地址')
        }
        paneControl.disabled = false
    })
})

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
