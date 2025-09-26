<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-17 15:53:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 09:45:16
-->
<template>
    <loading></loading>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <diffuseCircle :position="[0, 20, 0]" v-bind="cmConfig" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { defaultLoading as loading } from 'PLS/UIdemo'
import { diffuseCircle } from 'PLS/digitalCity'
import { Pane } from 'tweakpane'
import { reactive, ref, watch } from 'vue'
import pagesShow from '../components/pagesShow.vue'

const cmConfig = reactive({
    ballColor: '#ff7a3a',
    wallColor: '#ffff00',
    speed: 0.5,
    radius: 158,
})
const paneControl = new Pane()
paneControl.addBinding(cmConfig, 'ballColor', { label: '球颜色' })
paneControl.addBinding(cmConfig, 'wallColor', { label: '墙颜色' })
paneControl.addBinding(cmConfig, 'speed', { label: '速度', min: 0.01, max: 1, step: 0.01 })
paneControl.addBinding(cmConfig, 'radius', { label: '大小', min: 10, max: 200, step: 1 })

const pagesShowRef = ref(null) as any

watch(
    () => pagesShowRef.value?.contextReady,
    (newVal: any) => {
        if (newVal) {
            pagesShowRef.value.context.context.camera.activeCamera.value.position.set(-135, 250, 320)
        }
    }
)
</script>
