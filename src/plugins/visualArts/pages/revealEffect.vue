<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-06 15:52:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-30 09:20:56
-->
<template>
    <TresCanvas v-bind="state" window-size @loop="onLoop">
        <TresPerspectiveCamera :position="[0, 0, 30]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />

        <Suspense>
            <revealEffectMesh v-bind="pcssConfig" />
        </Suspense>

        <reflectorDUDV :position="[0, -6, 0]" v-bind="reflectorState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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

const onLoop = ({ elapsed }: { elapsed: number }) => {
    pcssConfig.uProgress = (Math.sin(elapsed) + 1) / 2
    paneControl.refresh()
}
</script>
