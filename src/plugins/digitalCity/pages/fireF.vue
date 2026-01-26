<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-03 15:24:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-26 17:51:28
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <fireF :position="[0, 20, 10]" :scale="40" />
            <fireF :position="[posX, posY, posZ]" :scale="scale" v-bind="lightConfig"/>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { ref, watch,reactive,onMounted } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import fireF from '../components/fire/fireF.vue'
import { Pane } from 'tweakpane'

const pagesShowRef = ref() as any
watch(
    () => pagesShowRef.value?.contextReady,
    (newVal: any) => {
        if (newVal) {
            pagesShowRef.value.context.context.camera.activeCamera.value.position.set(580, 360, 500)
        }
    }
)

onMounted(() => {
    debugger
})
const posX = ref(100)
const posY = ref(100)
const posZ = ref(100)
const scale = ref(100)
const lightConfig = reactive({
    intensity: 10,
    intensityFlux: 2,
    color: '#ffaa33',
})
const paneControl = new Pane()
paneControl.addBinding(posX, 'value', {
    label: 'x',
    min: -100.0,
    max: 100.0,
    step: 10,
})
paneControl.addBinding(posY, 'value', {
    label: 'y',
    min: -100.0,
    max: 100.0,
    step: 10,
})
paneControl.addBinding(posZ, 'value', {
    label: 'z',
    min: -100.0,
    max: 100.0,
    step: 10,
})
paneControl.addBinding(scale, 'value', {
    label: 'scale',
    min: 0.1,
    max: 100,
    step: 0.1,
})

paneControl.addBinding(lightConfig, 'intensity', {
    label: 'intensity',
    min: 0.1,
    max: 10,
    step: 0.1,
})
paneControl.addBinding(lightConfig, 'intensityFlux', {
    label: 'intensityFlux',
    min: 0.1,
    max: 20,
    step: 0.1,
})
paneControl.addBinding(lightConfig, 'color', {
    label: 'lightcolor',
})
</script>
