<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-13 10:17:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-25 18:31:43
-->

<template>
    <TresCanvas clearColor="#201919" v-bind="state">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 0, 200]" :look-at="[0, 0, 0]"/>
        <TresAmbientLight :intensity="2" />
        <OrbitControls v-bind="controlsState" />
        <Suspense>
           <tagging />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import tagging from  "../components/tagging.vue"

const state = reactive({
    windowSize: true,
    alpha: true,
    antialias: true,
})
const controlsState = reactive({
    enableDamping: true,
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    makeDefault: true,
})

</script>

<style >

</style>