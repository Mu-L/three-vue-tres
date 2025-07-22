<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-22 09:55:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-22 12:29:15
-->
<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[4, 8, 8]" :fov="60" :near="0.1" />
        <TresAmbientLight :intensity="1.0" />
        <OrbitControls />
        <Suspense>
            <iceFloor v-bind="iceState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import iceFloor from '../components/iceFloor.vue'

const gl = {
    clearColor: '#010A13',
    antialias: true,
}

const iceState = reactive({
    uParallaxDistance: 1.0,
    uTintColor: '#666666', // 偏色，默认白色
    uTintStrength: 0.1, // 偏色强度
    uStyle: 1, // 纹理样式
})
const paneControl = new Pane()
paneControl.addBinding(iceState, 'uTintColor', {
    label: '偏色',
})
paneControl.addBinding(iceState, 'uTintStrength', {
    label: '偏色强度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(iceState, 'uParallaxDistance', {
    label: '视觉差强度',
    min: 0.01,
    max: 2,
    step: 0.01,
})
paneControl.addBinding(iceState, 'uStyle', {
    label: '纹理样式',
    options: {
        样式1: 0,
        样式2: 1,
        样式3: 2,
        样式4: 3,
        样式5: 4,
        样式6: 5,
        样式7: 6,
    },
})
</script>
