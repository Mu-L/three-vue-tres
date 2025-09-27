<!--
 * @Description:  :maxPolarAngle="1"
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-07-30 09:32:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-27 12:46:38
-->

<template>
    <Suspense>
        <loading />
    </Suspense>

    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[0, 0, 16]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls
            enableDamping
            :enablePan="false"
            :enableZoom="false"
            :maxPolarAngle="Math.PI / 1.7"
            :minPolarAngle="Math.PI / 2.4"
            :maxAzimuthAngle="0.1"
            :minAzimuthAngle="-0.1"
        />
        <TresAmbientLight :intensity="0.5" />

        <TresGroup @click="onClick">
            <background ref="bgRef"/>

            <Suspense>
                <model ref="modelRef" />
            </Suspense>
        </TresGroup>

        <Suspense>
            <Environment files="./plugins/eCommerce/platz.hdr" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { OrbitControls,Environment } from '@tresjs/cientos'
import background from '../components/zipTopCan/background.vue'
import model from '../components/zipTopCan/model.vue'

const tcConfig = {
    clearColor: '#ffffff',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
    shadows: true,
    outputColorSpace: THREE.SRGBColorSpace,
}

const bgRef = ref()
const modelRef = ref()

function onClick(ev: any) {
    console.log('outGroup', ev)
    bgRef.value?.onClick(ev)
    modelRef.value?.onClick(ev)
}
</script>
