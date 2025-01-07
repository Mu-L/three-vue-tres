<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-06 15:52:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-07 19:48:57
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 3, 38]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />

        <Suspense>
            <imgParticleMesh v-bind="pcssConfig" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -6, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import imgParticleMesh from '../components/imgParticleMesh.vue'

const state = {
    clearColor: '#050505',
    antialias: false,
}

const reflectorState = {
    reflectivity: 0.8,
    showGridHelper: false,
    scale: 6,
}

const pcssConfig = reactive({
    zPos: 1,
    useCustomColor: false,
    customColor: '#ff0000',
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(pcssConfig, 'zPos', {
    label: '厚度',
    min: 0.5,
    max: 10,
    step: 0.5,
})
paneControl.addBinding(pcssConfig, 'useCustomColor', {
    label: '使用自定义颜色',
})
paneControl.addBinding(pcssConfig, 'customColor', {
    label: '自定义颜色',
})
</script>
