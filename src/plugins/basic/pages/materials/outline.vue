<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-11 15:11:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-08 08:20:06
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

        <TresMesh :position="[0, 0.9, 0]" name="torus">
            <TresTorusKnotGeometry :args="[1, 0.35, 100, 32]" />
            <TresMeshStandardMaterial color="#ff33ff" :roughness="0.3" :metalness="0.5" />
            <outlineCom v-bind="outlineState" />
        </TresMesh>

        <TresMesh :position="[-2.5, 0.5, 2.5]" receive-shadow cast-shadow name="cube">
            <TresCylinderGeometry :args="[1.5, 1.5, 2]" />
            <TresMeshStandardMaterial :color="0x33ffff" :roughness="0" :metalness="0" />
            <outlineCom />
        </TresMesh>

        <Suspense>
            <outlineModel v-bind="outlineModelState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import outlineCom from '../../components/outlineCom.vue'
import outlineModel from '../../components/outlineModel.vue'

const state = reactive({
    alpha: true,
    toneMapping: ACESFilmicToneMapping,
    windowSize: true,
    clearColor: '#000000',
})
const controlsState = reactive({
    enableDamping: true,
    autoRotate: false,
})

const outlineState = reactive({
    color: '#ff00ae',
    thickness: 0.1,
    screenspace: false,
})
const paneControl = new Pane()
paneControl.addBinding(outlineState, 'color', {
    label: '颜色',
})
paneControl.addBinding(outlineState, 'thickness', {
    label: 'thickness',
    min: 0,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(outlineState, 'screenspace', {
    label: 'space',
})

const outlineModelState = reactive({
    color: '#ffffff',
    thickness: 0.026,
    screenspace: false,
})
paneControl.addBinding(outlineModelState, 'color', {
    label: '模型边框颜色',
})
paneControl.addBinding(outlineModelState, 'thickness', {
    label: '模型边框粗细',
    min: 0,
    max: 0.2,
    step: 0.001,
})
paneControl.addBinding(outlineModelState, 'screenspace', {
    label: '模型边框类型',
})
</script>
