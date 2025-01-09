<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-09 10:24:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-09 15:02:51
-->
<template>
    <TresCanvas clearColor="#000" window-size>
        <TresPerspectiveCamera :position="[6, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping autoRotate />

        <yuriBrainModel v-bind="yuriBrainConfig" />

        <Suspense>
            <reflectorDUDV :position="[0, -1.36, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import yuriBrainModel from '../components/yuriBrain/index.vue'

const reflectorState = reactive({
    reflectivity: 0.8,
    showGridHelper: false,
    scale: 1,
})

const yuriBrainConfig = reactive({
    tubesColor: '#59b5ff',
    particlesColor: '#97ffcc',
    speed: 1,
})

const paneControl = new Pane({
    title: '参数',
    expanded: true,
})
paneControl.addBinding(yuriBrainConfig, 'tubesColor', {
    label: '线条颜色',
})
paneControl.addBinding(yuriBrainConfig, 'particlesColor', {
    label: '粒子颜色',
})
paneControl.addBinding(yuriBrainConfig, 'speed', {
    label: '粒子速度',
    min: 0.01,
    max: 2,
    step: 0.01,
})
</script>
