<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-13 10:17:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-25 18:33:05
-->

<template>
    <div>
        <TresCanvas clearColor="#201919" v-bind="state">
            <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 0, 50]" :look-at="[0, 0, 0]" ref="navSceneCamera" />
            <TresAmbientLight :intensity="2" />
            <OrbitControls v-bind="controlsState" />
            <Suspense>
                <navScene />
            </Suspense>
        </TresCanvas>
        <navigation :message="navSceneCamera" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import navigation from '../components/navigation.vue'
import navScene from '../components/navScene.vue'
const navSceneCamera = ref(null)
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
#canvas {
    height: 500px;
    width: 500px;
}
</style>