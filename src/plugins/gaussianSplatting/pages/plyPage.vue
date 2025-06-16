<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-15 19:16:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-16 08:23:04
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[3, 3, 3]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls />
        <TresAmbientLight :intensity="3" />
        <Suspense>
            <ply :position="[0, 0.7, 0]" />
        </Suspense>

        <TresDirectionalLight :position="[6, 2, 4]" :intensity="2" />

        <TresGridHelper />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import ply from '../components/ply.vue'

const state = reactive({
    clearColor: '#ffffff',
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})
</script>
