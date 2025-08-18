<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-05 08:36:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-18 16:31:40
-->
<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[6, 3, -2]" :fov="75" :near="0.01" :far="1000" />
        <OrbitControls />

        <Suspense>
            <Environment :background="true" :files="modepath" />
        </Suspense>
        <staticWater v-bind="waterState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Environment } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import staticWater from '../components/staticWater.vue'

const state = {
    clearColor: '#201919',
    shadows: true,
    alpha: false,
    windowSize: true,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
}


const modepath = `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/images/water/belfast_sunset_puresky_1k.hdr`

const waterState = reactive({
    waterColor: '#2CC2E8',
    metalness: 0.64,
    roughness: 0,
})

const paneControl = new Pane()
paneControl.addBinding(waterState, 'waterColor', {
    label: '水体颜色',
})
paneControl.addBinding(waterState, 'metalness', {
    label: '金属度',
    min: 0,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(waterState, 'roughness', {
    label: '粗糙度',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>
