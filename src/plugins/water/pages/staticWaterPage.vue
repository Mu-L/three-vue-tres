<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[6, 3, -2]" :fov="75" :near="0.01" :far="1000" />
        <OrbitControls />

        <Suspense>
            <Environment :background="true" files="./plugins/water/images/belfast_sunset_puresky_1k.hdr" />
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
