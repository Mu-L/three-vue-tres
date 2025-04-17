<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-16 16:08:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-17 11:14:51
-->
<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />

        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

        <XRcom />
        <TresGridHelper />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import XRcom from '../components/XRcom.vue'

const state = reactive({
    clearColor: '#444444',
    shadows: true,
    antialias: true,
    renderMode: 'demand',
    windowSize: true,
})
</script>
