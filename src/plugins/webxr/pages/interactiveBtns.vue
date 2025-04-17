<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-17 11:10:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-17 11:40:34
-->
<template>
	<TresCanvas v-bind="state">
			<TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" />
			<OrbitControls />
			<TresAmbientLight :intensity="0.5" />
			<TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

			<customWaterMesh v-bind="customWaterState" :position="[0, 0, -5]" />
 			<Suspense>
            <Environment
                :files="['pos-x.jpg', 'neg-x.jpg', 'pos-y.jpg', 'neg-y.jpg', 'pos-z.jpg', 'neg-z.jpg']"
                :path="(isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/images/skyBox/6jpg/'"
            />
        </Suspense>

			<interactiveBtnsSence :customWaterState="customWaterState" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import customWaterMesh from 'PLS/water/components/customWaterMesh.vue'
import { Environment } from 'PLS/basic'
import interactiveBtnsSence from '../components/interactiveBtnsSence.vue'

const isDev = process.env.NODE_ENV === 'development'

const state = reactive({
    alpha: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    windowSize: true,
    clearColor: 0x999999,
})

const customWaterState = reactive({
    height: 0.6,
    Flatshading: false,
    waterColor: '#52a7f7',
    waterHighlight: '#b3ffff',
    brightness: 1,
    baseMaterial: 'MeshPhysicalMaterial',
})


</script>