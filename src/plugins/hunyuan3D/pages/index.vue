<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 15:11:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-28 15:34:42
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[2, 2, 2]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight />

        <Suspense>
            <model />
        </Suspense>

        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

        <TresGridHelper />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import model from '../components/model.vue'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})
</script>
