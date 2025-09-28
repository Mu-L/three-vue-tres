<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-22 10:48:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 16:27:54
-->
<template>
    <TresCanvas clearColor="#000000" window-size>
        <TresPerspectiveCamera :position="[6, 6, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />

        <Suspense>
            <hexagonalFloor v-bind="rtState" :scale="2" :position="[0, 0.5, 0]"/>
        </Suspense>
        <reflectorDUDV :reflectivity="1.0" :showGridHelper="false" :scale="2" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import { hexagonalFloor } from 'PLS/floor'
import reflectorDUDV from 'PLS/floor/components/reflectorDUDV.vue'

const rtState = reactive({
    floorColor: '#ff0000',
    floorMetalness: 0.8,
    floorRoughness: 0.2,
    floorEnvMapIntensity: 2.5,
    sideColor: '#000000',
    sideOpacity: 0.56,
    speed: 0.1,
})
const paneControl = new Pane({
    expanded: true,
})
paneControl.addBinding(rtState, 'floorColor', { label: '地板颜色' })
paneControl.addBinding(rtState, 'floorMetalness', { label: '地板金属度', min: 0, max: 1 })
paneControl.addBinding(rtState, 'floorRoughness', { label: '地板粗糙度', min: 0, max: 1 })
paneControl.addBinding(rtState, 'floorEnvMapIntensity', { label: '地板环境光强度', min: 0, max: 10 })
paneControl.addBinding(rtState, 'sideColor', { label: '侧面颜色' })
paneControl.addBinding(rtState, 'sideOpacity', { label: '侧面透明度', min: 0, max: 1 })
paneControl.addBinding(rtState, 'speed', { label: '动画速度', min: 0, max: 1, step: 0.01 })
</script>
