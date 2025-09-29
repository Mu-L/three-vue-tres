<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 11:00:37
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 10, 15]" :fov="25" :near="0.1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" :intensity="2" />

        <Suspense>
            <reflectorDUDV :position="[0, -1.562, 0]" :reflectivity="2.6" :showGridHelper="false" :scale="1.5" />
        </Suspense>

        <flexiblePipe2 v-bind="flexiblePipeState" />

    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import flexiblePipe2 from '../components/flexiblePipe2.vue'

const state = {
    clearColor: '#15151a',
    antialias: false,
    logarithmicDepthBuffer: true,
}
const controlsState = {
    autoRotate: true,
}

const flexiblePipeState = reactive({
    color: '#ff0000',
    uGapColor: '#ffffff',
    radius: 0.1,
    bodyLength: 2,
    headLength: 1,
    tailLength: 0.5,
    headAngle: 0,
    radialSegments: 16,
    tailAngle: 0,
    filletRadius: 0.3,
    speed: 0.01,
    metalness: 0.3,
    roughness: 0.5,
    reflectivity: 0.5,
    ior: 1.5,
    uStripeScale: 10,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(flexiblePipeState, 'color', {
    label: '管体颜色',
})
paneControl.addBinding(flexiblePipeState, 'uGapColor', {
    label: '间隔颜色',
})
paneControl.addBinding(flexiblePipeState, 'uStripeScale', {
    label: '条纹数量',
    min: 0,
    max: 20,
    step: 0.1,
})
paneControl.addBinding(flexiblePipeState, 'radius', {
    label: '管道粗细',
    min: 0.001,
    max: 1,
    step: 0.001,
})
paneControl.addBinding(flexiblePipeState, 'bodyLength', {
    label: '中间长度',
    min: 0.1,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(flexiblePipeState, 'headLength', {
    label: '前段长度',
    min: 0,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(flexiblePipeState, 'headAngle', {
    label: '前段角度',
    min: 0,
    max: 359,
    step: 1,
})
paneControl.addBinding(flexiblePipeState, 'tailLength', {
    label: '后段长度',
    min: 0,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(flexiblePipeState, 'tailAngle', {
    label: '后段角度',
    min: 0,
    max: 359,
    step: 1,
})
paneControl.addBinding(flexiblePipeState, 'radialSegments', {
    label: '管平滑',
    min: 2,
    max: 16,
    step: 1,
})
paneControl.addBinding(flexiblePipeState, 'filletRadius', {
    label: '转角平滑',
    min: 0.1,
    max: 1.2,
    step: 0.01,
})
paneControl.addBinding(flexiblePipeState, 'speed', {
    label: '速度',
    min: -0.1,
    max: 0.1,
    step: 0.001,
})
paneControl.addBinding(flexiblePipeState, 'metalness', {
    label: '金属度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(flexiblePipeState, 'roughness', {
    label: '粗糙度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(flexiblePipeState, 'reflectivity', {
    label: '反射率',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(flexiblePipeState, 'ior', {
    label: '折射率',
    min: 1,
    max: 2.33,
    step: 0.01,
})
</script>
