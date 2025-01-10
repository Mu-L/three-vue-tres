<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-10 11:30:03
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-10 15:03:43
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 0, 30]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />

        <Suspense>
            <voxelizedShaderModel :position="[0, 4, 0]" v-bind="voxelizedShaderConfig" />
        </Suspense>

        <Suspense>
            <reflectorDUDV v-bind="reflectorState" />
        </Suspense>

        <postProcessing v-bind="voxelizedShaderConfig" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import voxelizedShaderModel from '../components/voxelizedShader/model.vue'
import postProcessing from '../components/voxelizedShader/postProcessing.vue'

const state = {
    clearColor: '#050505',
    antialias: false,
}

const reflectorState = {
    reflectivity: 0.8,
    showGridHelper: false,
    scale: 6,
}

const voxelizedShaderConfig = reactive({
    mosaic: 2.31,
    progress: 0.31,
    triScale: 1,
    use: true,
    start: 0,
    translate: 0,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(voxelizedShaderConfig, 'progress', {
    label: '进度',
    min: 0,
    max: 0.5,
    step: 0.01,
})
paneControl.addBinding(voxelizedShaderConfig, 'mosaic', {
    label: '像素化',
    min: 0,
    max: 10,
    step: 0.01,
})
paneControl.addBinding(voxelizedShaderConfig, 'triScale', {
    label: '三角片大小',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(voxelizedShaderConfig, 'use', {
    label: '开启延迟',
})
paneControl.addBinding(voxelizedShaderConfig, 'start', {
    label: '曲折度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(voxelizedShaderConfig, 'translate', {
    label: '偏移量',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>
