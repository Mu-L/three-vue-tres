<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:03:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 16:27:18
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[15, 20, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="1.0" />
        <TresDirectionalLight :position="[8, 6, 10]" :intensity="2.0" />

        <topoBase selected="baseModelA" :position="[-6, 0, 0]" :scale="3.0" />
        <topoBase v-bind="baseState" :type="baseType" :scale="3.0" />
        <reflectorDUDV :position="[0, -2, 0]" v-bind="reflectorState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { topoBase } from 'PLS/floor'
import reflectorDUDV from '../components/reflectorDUDV.vue'

const reflectorState = reactive({
    reflectivity: 2.6,
    showGridHelper: false,
    scale: 4,
})

const baseType = ['baseModelA', 'baseModelB', 'baseModelC', 'baseModelD', 'baseModelE', 'baseModelF', 'baseModelG', 'baseModelH']
const baseState = reactive({
    selected: 'baseModelC',
    colorlist: ['#6381EE', '#FFFFFF', '#6381EE', '#FFFFFF', '#6381EE', '#FFFFFF'],
    roughness: 0.5,
    metalness: 0.6,
})

const pane = new Pane()
pane.addBlade({
    view: 'list',
    label: '类型',
    options: baseType.map((item) => ({
        text: item,
        value: item,
    })),
    value: baseState.selected,
}).on('change', (ev) => {
    baseState.selected = ev.value
})

pane.addBinding(baseState, 'metalness', { label: '金属度', min: 0, max: 1, step: 0.01 })
pane.addBinding(baseState, 'roughness', { label: '粗糙度', min: 0, max: 1, step: 0.01 })

pane.addBinding(baseState.colorlist, 0, { label: '颜色1' })
pane.addBinding(baseState.colorlist, 1, { label: '颜色2' })
pane.addBinding(baseState.colorlist, 2, { label: '颜色3' })
pane.addBinding(baseState.colorlist, 3, { label: '颜色4' })
pane.addBinding(baseState.colorlist, 4, { label: '颜色5' })
pane.addBinding(baseState.colorlist, 5, { label: '颜色6' })
</script>
