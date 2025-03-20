<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-02-07 16:14:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 14:14:13
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[6, 6, 6]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 0.5, 0]" :scale="0.2">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0" :metalness="1" />
        </TresMesh>

        <gridFloor v-bind="gridState" />

        <Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                :path="(isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/images/skyBox/6jpg/'"
            />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { OrbitControls, Environment } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import gridFloor from '../components/gridFloor.vue'

const isDev = process.env.NODE_ENV === 'development'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x333333,
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const gridState = reactive({
    gridColor: '#ffffff',
    crossColor: '#ef57ff',
    floorColor: '#000000',
    gridThickness: 0.02,
    crossThickness: 0.03,
    uCross: 0.29,
})

const paneControl = new Pane()
paneControl.addBinding(gridState, 'gridColor', {
    label: '网格颜色',
})
paneControl.addBinding(gridState, 'gridThickness', {
    label: '网格厚度',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(gridState, 'crossColor', {
    label: '十字颜色',
})
paneControl.addBinding(gridState, 'crossThickness', {
    label: '十字厚度',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(gridState, 'uCross', {
    label: '十字大小',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(gridState, 'floorColor', {
    label: '地板颜色',
})
</script>
