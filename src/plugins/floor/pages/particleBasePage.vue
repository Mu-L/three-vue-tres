<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-07 16:26:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-07 17:27:34
-->
<template>
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="2" />

        <TresMesh :position="[2, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="yellow" />
        </TresMesh>

        <TresMesh :position="[-4, 0.5, 2]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="white" />
        </TresMesh>

        <particleBase :position="[2, -1, 0]" v-bind="toRefsState" />

        <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import particleBase from '../components/particleBase.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: true,
    scale: 1,
})

const precipitationState = {
    speed: -0.03,
    randomness: 0.5,
    count: 100,
    size: 0.1,
    color: '#ff0',
    areaX: 3,
    areaY: 2,
    areaZ: 3,
    opacity: 1.0,
}
const toRefsState = reactive({
    ...precipitationState,
})

const f1 = new Pane({
    title: '配置',
    expanded: true,
})
f1.addBinding(toRefsState, 'areaX', {
    label: '影响区域宽',
    min: 1,
    max: 10,
    step: 0.1,
})
f1.addBinding(toRefsState, 'areaY', {
    label: '影响区域高',
    min: 1,
    max: 10,
    step: 0.1,
})
f1.addBinding(toRefsState, 'areaZ', {
    label: '影响区域长',
    min: 1,
    max: 10,
    step: 0.1,
})
f1.addBinding(toRefsState, 'speed', {
    label: '速度',
    min: -0.5,
    max: 0.5,
    step: 0.01,
})
f1.addBinding(toRefsState, 'color', {
    label: '颜色',
})
f1.addBinding(toRefsState, 'size', {
    label: '大小',
    min: 0.01,
    max: 1,
    step: 0.01,
})
f1.addBinding(toRefsState, 'count', {
    label: '数量',
    min: 1,
    max: 200,
    step: 1,
})
f1.addBinding(toRefsState, 'randomness', {
    label: '随机性',
    min: 0,
    max: 1,
    step: 0.01,
})
f1.addBinding(toRefsState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>
