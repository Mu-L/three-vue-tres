<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-13 16:23:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-15 10:23:23
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[6, 6, 6]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls />
        <TresAmbientLight :intensity="3" />
        <Suspense>
            <GLTFModel path="./plugins/gaussianSplatting/model/BurntCar-v1.glb" draco decoderPath="./draco/" :position="[0, 1, 0]" />
        </Suspense>

        <TresDirectionalLight :position="[6, 2, 4]" :intensity="2" />

        <TresGridHelper />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const state = reactive({
    clearColor: '#ffffff',
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})
</script>
