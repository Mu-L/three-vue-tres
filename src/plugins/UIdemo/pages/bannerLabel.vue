<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-05-14 11:35:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-05-14 13:28:37
-->
<template>
    <TresCanvas clearColor="#999" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <OrbitControls />

        <TresMesh>
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
        </TresMesh>

        <bannerLabel :position="[0.5, 1, 0]" v-bind="paneState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { bannerLabel } from 'PLS/UIdemo'

const paneState = reactive({
    text: '标识',
    fontSize: 32,
    fontColor: '#000000',
    backgroundColor: '#ffaa0066',
    padding: { y: 10, x: 20 },
    align: 'left-center',
    scaleFactor: 0.01,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 2,
    dpi: 2,
})
const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(paneState, 'text', {
    label: '文字内容',
})
paneControl.addBinding(paneState, 'fontSize', {
    label: '文字大小',
    min: 1,
    max: 100,
})
paneControl.addBinding(paneState, 'fontColor', {
    label: '文字颜色',
})
paneControl.addBinding(paneState, 'backgroundColor', {
    label: '背景色',
})
paneControl.addBinding(paneState, 'padding', {
    label: '内边距',
    x: { min: 1, max: 50 },
    y: { min: 1, max: 50 },
})

const dingwei = ['left-top', 'left-center', 'left-bottom', 'center-top', 'center', 'center-bottom', 'right-top', 'right-center', 'right-bottom']
const options = dingwei.map((d) => ({ text: d, value: d }))
const listBlade = paneControl.addBlade({
    view: 'list',
    label: '定位',
    options,
    value: paneState.align,
})
listBlade.on('change', (ev: any) => {
    paneState.align = ev.value
})

paneControl.addBinding(paneState, 'scaleFactor', {
    label: '缩放因子',
    min: 0.0009,
    max: 0.02,
})

paneControl.addBinding(paneState, 'borderColor', {
    label: '边框颜色',
})
paneControl.addBinding(paneState, 'borderWidth', {
    label: '边框粗细',
    min: 1,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(paneState, 'borderRadius', {
    label: '边框外弧度',
    min: 0,
    max: 20,
    step: 0.1,
})
paneControl.addBinding(paneState, 'dpi', {
    label: '清晰度',
    min: 1,
    max: 10,
    step: 0.1,
})
</script>
