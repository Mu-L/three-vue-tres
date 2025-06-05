<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 08:09:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-05 16:09:50
-->

<template>
    <TresCanvas clearColor="#999999" window-size>
        <TresPerspectiveCamera :position="[-15, 15, -15]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <TresAmbientLight :intensity="1.0" />

        <TresDirectionalLight :position="[3, 4, 2]" :intensity="1" color="#fff" />

        <TresMesh :position="[0, 1.5, 1]">
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshNormalMaterial />
        </TresMesh>

        <reflectorRoundedBox v-bind="rtState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import reflectorRoundedBox from '../components/reflectorRoundedBox.vue'

const paneControl = new Pane({
    expanded: true,
})

const rtState = reactive({
    color: '#898989',
    width: 6,
    height: 1.6,
    depth: 6,
    radius: 0.28, // 圆角半径
    roughness: 0.5,
    metalness: 0.6,
    reflectorOffset: 0.1,
})
paneControl.addBinding(rtState, 'color', { label: '颜色' })
paneControl.addBinding(rtState, 'width', { label: '宽度', min: 1, max: 10, step: 0.01 })
paneControl.addBinding(rtState, 'height', { label: '高度', min: 1, max: 10, step: 0.01 })
paneControl.addBinding(rtState, 'depth', { label: '深度', min: 1, max: 10, step: 0.01 })
paneControl.addBinding(rtState, 'radius', { label: '圆角半径', min: 0.01, max: 1, step: 0.01 })
paneControl.addBinding(rtState, 'metalness', { label: '金属度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rtState, 'roughness', { label: '粗糙度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(rtState, 'reflectorOffset', { label: 'reflectorOffset', min: -1, max: 1, step: 0.01 })
</script>
