<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-12 15:54:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-15 10:39:07
-->
<template>
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[-5, 3, 5]" :fov="50" :near="0.1" :far="10000" />
        <OrbitControls />
        <TresAmbientLight />

        <line2RoundedRect :position="[0, .5, 0]" v-bind="line2Config" />

        <reflectorShaderMesh v-bind="configState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { line2RoundedRect } from 'PLS/UIdemo'
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
    scale: 1.0,
})

const line2Config = reactive({
    linewidth: 10,
    color: '#ffff00',
    width: 2,
    height: 6,
    radius: 0.3,
    cornerSegments: 6,
})
const pane = new Pane({
    title: '参数',
    expanded: true,
})
pane.addBinding(line2Config, 'linewidth', { label: '线条宽度', step: 0.1, min: 0, max: 20 })
pane.addBinding(line2Config, 'color', { label: '线条颜色' })
pane.addBinding(line2Config, 'width', { label: '宽', step: 0.1, min: 0.1, max: 10 })
pane.addBinding(line2Config, 'height', { label: '长', step: 0.1, min: 0.1, max: 10 })
pane.addBinding(line2Config, 'radius', { label: '角度', step: 0.001, min: 0.001, max: 1 })
pane.addBinding(line2Config, 'cornerSegments', { label: '平滑', step: 0.1, min: 0.1, max: 6 })
</script>
