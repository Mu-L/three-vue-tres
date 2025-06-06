<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-18 08:51:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-06 14:48:16
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 10, 15]" :fov="25" :near="0.1" :far="10000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight color="#ffffff" :intensity="10" />

        <Suspense>
            <reflectorDUDV :position="[0, -1.562, 0]" :reflectivity="2.6" :showGridHelper="false" :scale="1.5" />
        </Suspense>

				<flexiblePipe />


        <Suspense>
            <Environment :resolution="512">
                <Lightformer :intensity="2" :position="[0, 1, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 0]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 3]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 6]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 9]" :scale="[10, 1, 1]" />
                <Lightformer :intensity="2" :rotation-y="Math.PI / 2" :position="[-50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[50, 2, 0]" :scale="[100, 2, 1]" />
                <Lightformer form="ring" color="red" :intensity="10" :scale="2" :position="[10, 5, 10]" />
            </Environment>
        </Suspense>
</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
import { reflectorDUDV } from 'PLS/floor'
import flexiblePipe from '../components/flexiblePipe.vue'

const state = reactive({
    clearColor: '#15151a',
    antialias: false,
    logarithmicDepthBuffer: true,
})
const controlsState = reactive({
    autoRotate: true,
})
</script>
