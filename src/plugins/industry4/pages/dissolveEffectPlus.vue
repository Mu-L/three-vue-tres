<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-03 15:58:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 15:01:52
-->
<template>
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
        <OrbitControls enableDamping />

        <torusKnot v-bind="torusKnotConfigState" :color="meshConfig.torusKnotColor" />
        <Suspense>
            <skyBoxDmesh
                :texture="(isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/images/skyBox/workshop_blur.jpg'"
            />
        </Suspense>
        <bloomPass />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { skyBoxDmesh } from 'PLS/skyBox'
import { Pane } from 'tweakpane'
import torusKnot from '../components/dissolveEffectPlus/torusKnot.vue'
import bloomPass from '../components/dissolveEffectPlus/bloomPass.vue'

const isDev = process.env.NODE_ENV === 'development'
const tcConfig = {
    clearColor: '#201919',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    renderMode: 'manual',
}

const torusKnotConfigState = reactive({
    uEdgeColor: '#ff784d',
    uEdge: 6,
    uFreq: 0.41,
    uAmp: 20.0,
    uProgress: -4.9,
    uPointSize: 576,
    particleData: {
        particleSpeedFactor: 0.02,
        velocityFactor: { x: 2.5, y: 2 },
        waveAmplitude: 0,
    },
})

const meshConfig = reactive({
    torusKnotColor: '#7a8c87',
})

const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(meshConfig, 'torusKnotColor', { label: 'torusKnotColor' })
paneControl.addBinding(torusKnotConfigState, 'uEdgeColor', { label: '边缘颜色' })
paneControl.addBinding(torusKnotConfigState, 'uEdge', {
    label: '边缘宽度',
    min: 0,
    max: 9.0,
    step: 0.01,
})
paneControl.addBinding(torusKnotConfigState, 'uFreq', {
    label: '密度',
    min: 0.002,
    max: 2.0,
    step: 0.002,
})
paneControl.addBinding(torusKnotConfigState, 'uAmp', {
    label: '幅度',
    min: 3,
    max: 22,
    step: 0.01,
})
paneControl.addBinding(torusKnotConfigState, 'uProgress', {
    label: '进度',
    min: -25,
    max: 20.0,
    step: 0.1,
})
paneControl.addBinding(torusKnotConfigState, 'uPointSize', {
    label: '粒子大小',
    min: 10,
    max: 800,
    step: 5,
})
paneControl.addBinding(torusKnotConfigState.particleData, 'particleSpeedFactor', {
    label: '粒子速度',
    min: 0.0001,
    max: 0.1,
    step: 0.0001,
})
paneControl.addBinding(torusKnotConfigState.particleData, 'velocityFactor', {
    picker: 'inline',
    label: '粒子飘逸方向',
    expanded: true,
    x: { min: -10, max: 10, step: 0.01 },
    y: { min: -10, max: 10, step: 0.01 },
})
paneControl.addBinding(torusKnotConfigState.particleData, 'waveAmplitude', {
    label: '粒子扰动幅度',
    min: 0,
    max: 5,
    step: 0.01,
})
</script>
