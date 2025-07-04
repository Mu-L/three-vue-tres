<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-04 08:49:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-04 10:46:59
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <rectangleGlow :renderOrder="9998" :position="[93, 28, 28]" lColor="#ff0000" />
						
            <rectangleGlow :position-y="58" v-bind="rectangleState" />
</template>
    </pagesShow>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { rectangleGlow } from 'PLS/digitalCity'
import pagesShow from '../components/pagesShow.vue'

const rectangleState = reactive({
    pColor: '#00ffdd',
    w: 160,
    h: 90,
    gradientWidth: 0.99,
    glowWidth: 0.99,
    nNumber: 8.0,
    lineWidth: 2.0,
    lColor: '#0022ff',
})

const paneControl = new Pane({
    title: '区域边界发光',
    expanded: true,
})

paneControl.addBinding(rectangleState, 'pColor', { label: '颜色' })
paneControl.addBinding(rectangleState, 'w', { label: '矩形宽', min: 1, max: 500, step: 1 })
paneControl.addBinding(rectangleState, 'h', { label: '矩形高', min: 1, max: 500, step: 1 })
paneControl.addBinding(rectangleState, 'gradientWidth', { label: '作用宽度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rectangleState, 'glowWidth', { label: '渐变宽度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rectangleState, 'nNumber', { label: 'nNumber', min: 0, max: 20, step: 0.1 })
paneControl.addBinding(rectangleState, 'lineWidth', { label: '边框宽度', min: 0, max: 10, step: 0.1 })
paneControl.addBinding(rectangleState, 'lColor', { label: '边框颜色' })
</script>
