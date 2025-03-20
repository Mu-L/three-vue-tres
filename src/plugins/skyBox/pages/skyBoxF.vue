<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-26 14:55:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 15:12:22
-->

<template>
    <TresCanvas v-bind="tcConfig">
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="10000" :look-at="[0, 0, 0]" />
        <OrbitControls enableDamping />

        <Box :args="[3, 3, 3]" color="orange" :position="[-13, 0, 1]" />
        <TresMesh :position="[10, 2, -4]" cast-shadow>
            <TresBoxGeometry :args="[2, 2, 2]" />
            <TresMeshNormalMaterial />
        </TresMesh>

        <TresMesh :position="[0, 0, 0]">
            <TresTorusKnotGeometry :args="[3, 1, 64, 8, 2, 3]" />
            <TresMeshStandardMaterial color="#ffffff" :metalness="1" :roughness="0.14" />
        </TresMesh>

        <Suspense>
            <skyBox :texture="(isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/images/skyBox/6hdr/'" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'

import { OrbitControls, Box } from '@tresjs/cientos'

import skyBox from 'PLS/skyBox/components/skyBoxFmesh.vue'

const isDev = process.env.NODE_ENV === 'development'

const tcConfig = {
    clearColor: '#201919',
    windowSize: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.8,
}
</script>
