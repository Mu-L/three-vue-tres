<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-13 08:00:52
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera ref="perspectiveCameraRef" :position="[600, 750, -1221]" :fov="45" :near="1"
            :far="10000" />
        <OrbitControls />
        <TresAmbientLight color="#ffffff" />
        <TresDirectionalLight :position="[400, 400, 400]" :intensity="1" color="red" />
        <Suspense>
            <lightEffect />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import lightEffect from '../components/lightEffect.vue'

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    useLegacyLights: true,
    renderMode: 'manual'
};
</script>
