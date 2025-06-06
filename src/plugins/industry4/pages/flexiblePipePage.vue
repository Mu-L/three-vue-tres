<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-06 18:54:17
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 10, 15]" :fov="25" :near="0.1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" :intensity="2" />

        <Suspense>
            <reflectorDUDV :position="[0, -1.562, 0]" :reflectivity="2.6" :showGridHelper="false" :scale="1.5" />
        </Suspense>

        <flexiblePipe v-bind="flexiblePipeState" />

        <Suspense>
            <Environment :resolution="512">
                <Lightformer :intensity="2" :position="[0, 1, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 0]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 9]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-y="Math.PI / 2" :position="[-50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer form="ring" color="red" :intensity="10" :scale="2" :position="[10, 5, 10]" />
            </Environment>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import flexiblePipe from '../components/flexiblePipe.vue'

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
    radius: 0.1,
    bodyLength: 2,
    headLength: 1,
    tailLength: 0.5,
    headAngle: 0,
    radialSegments: 16,
	tailAngle: 0,
		speed:0.01
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(flexiblePipeState, 'color', {
    label: '颜色',
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
paneControl.addBinding(flexiblePipeState, 'speed', {
    label: '速度',
    min: -0.1,
    max: 0.1,
    step: 0.001,
})
</script>
