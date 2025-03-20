<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-04 14:31:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 14:11:09
-->
<script setup>
import { OrbitControls } from '@tresjs/cientos'
import skyBox from 'PLS/skyBox/components/skyBoxDmesh.vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import stencilMaskMesh from '../components/stencilMaskBox.vue'
import stencilMaskModels from '../components/stencilMaskModels.vue'

const isDev = process.env.NODE_ENV === 'development'
</script>
<template>
    <loading />
    <TresCanvas ref="canvasRef" window-size clear-color="#111" stencil>
        <TresPerspectiveCamera :position="[-1, 0, 2]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
        <OrbitControls auto-rotate />

        <Suspense>
            <skyBox :texture="(isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/images/skyBox/workshop_blur.jpg'" />
        </Suspense>

        <Suspense>
            <stencilMaskMesh />
        </Suspense>

        <Suspense>
            <stencilMaskModels />
        </Suspense>

        <TresPointLight :position="[0, 0, 1]" :intensity="1" />
        <TresDirectionalLight :position="[1, 1, 1]" :intensity="3" />
        <TresAmbientLight :intensity="2" />
    </TresCanvas>
</template>
