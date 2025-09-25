<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-12 15:54:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-15 12:17:26
-->
<template>
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[-5, 3, 5]" :fov="50" :near="0.1" :far="10000" />
        <OrbitControls />
        <TresAmbientLight />
        <TresDirectionalLight :intensity="2" :position="[-2, 1, 0]" />

        <lineArrow v-bind="lineArrowConfig" :position="[0, 1, 0]"/>
        <reflectorShaderMesh v-bind="configState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { lineArrow } from 'PLS/UIdemo'
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { Pane } from 'tweakpane'

const tcConfig = {
    clearColor: '#201919',
    windowSize: true,
    shadows: true,
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFSoftShadowMap,
}

const configState = reactive({
    reflectivity: 0.941,
    mirror: 113.25,
    mixStrength: 12,
    showGridHelper: false,
})

const lineArrowConfig = reactive({
    color: '#00ff97',
    hasArrow:true,
    radius: 0.1,
    length: 5,
    cutoffRatio: 0.9,
    roughness: 0.2,
    metalness: 0,
})
const pane = new Pane({
    title: '参数',
    expanded: true,
})
pane.addBinding(lineArrowConfig, 'color', { label: '颜色' })
pane.addBinding(lineArrowConfig, 'hasArrow', { label: '箭头' })
pane.addBinding(lineArrowConfig, 'radius', { label: '粗细', step: 0.01, min: 0.01, max: 0.2 })
pane.addBinding(lineArrowConfig, 'length', { label: '长度', step: 0.1, min: 0.1, max: 10 })
pane.addBinding(lineArrowConfig, 'cutoffRatio', { label: '箭头延展', step: 0.01, min: 0.01, max: 0.99 })
pane.addBinding(lineArrowConfig, 'roughness', { label: 'roughness', step: 0.01, min: 0.01, max: 1 })
pane.addBinding(lineArrowConfig, 'metalness', { label: 'metalness', step: 0.01, min: 0.01, max: 1 })
</script>
