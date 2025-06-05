<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-05 09:49:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-05 10:33:42
-->
<template>
    <TresCanvas clearColor="#000000" window-size>
        <TresPerspectiveCamera :position="[10, 12, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="1.0" />

        <TresDirectionalLight :position="[0, 8, 0]" :intensity="2" color="#fff" />
        <Suspense>
            <rubberTiles v-bind="rtState" />
        </Suspense>
        <TresGridHelper :args="[10, 10]" :position="[0, -0.8, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import { rubberTiles } from 'PLS/floor'

const rtState = reactive({
    color: '#cccccc',
    repeat: {
        x: 3,
        y: 3,
    },
    metalness: 1,
    roughness: 0.66,
    normalScale: 2,
})
const paneControl = new Pane({
    expanded: true,
})
paneControl.addBinding(rtState, 'color', { label: '颜色' })
paneControl.addBinding(rtState, 'repeat', { label: '贴图重复', x: { min: 0.1, max: 10, step: 0.1 }, y: { min: 0.1, max: 10, step: 0.1 } })
paneControl.addBinding(rtState, 'metalness', { label: '金属度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rtState, 'roughness', { label: '粗糙度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rtState, 'normalScale', { label: '法线缩放', min: 0.1, max: 30, step: 0.1 })
</script>
