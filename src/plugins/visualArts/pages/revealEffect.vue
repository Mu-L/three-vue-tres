<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-06 15:52:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-06 18:31:05
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 0, 30]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />

        <Suspense>
            <revealEffectMesh v-bind="pcssConfig" />
        </Suspense>

        <Suspense>
            <reflectorDUDV :position="[0, -6, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { Pane } from 'tweakpane'
import revealEffectMesh from '../components/revealEffectMesh.vue'

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
    uProgress: 0,
})
const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(pcssConfig, 'uProgress', {
    label: '进度',
    min: 0,
    max: 1,
    step: 0.01,
}).disabled = true

useRenderLoop().onLoop(({ elapsed }) => {
    pcssConfig.uProgress = (Math.sin(elapsed) + 1) / 2
    paneControl.refresh()
})
</script>
