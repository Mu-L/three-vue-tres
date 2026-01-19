<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-27 11:22:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-19 09:30:36
-->
<template>
	<TresCanvas window-size>
		<TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="0.1" :far="1000" />
		<OrbitControls />
		<TresAmbientLight :intensity="0.5" />
		<TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />

		<meshList :count="paneState.count" />
		<bannerLabel :position="[0.5, 2, 0]" v-bind="paneState" />

		<gridPlus :args="[3, 3]" />
	</TresCanvas>
	<goViewCom :dataJson="dataJson" :maskRightWidth="0" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { gridPlus } from 'PLS/floor'
import { bannerLabel } from 'PLS/UIdemo'
import { goViewCom } from 'PLS/goView'
import meshList from '../components/meshList.vue'
// @ts-ignore
import dataJson from '../common/chartDataGOVIEW.json'

declare global {
	interface Window {
		TvtTmpPaneState: any
	}
}

const paneState = reactive({
	text: '标识',
	fontSize: 48,
	fontColor: '#ffffff',
	backgroundColor: '#F8BD8666',
	padding: { y: 20, x: 80 },
	align: 'left-center',
	scaleFactor: 0.01,
	borderColor: '#ffffff',
	borderWidth: 1,
	borderRadius: 2,
	dpi: 2,
	isSprite: false,
	count: 8
}) as any

(window as any).TvtTmpPaneState = paneState

</script>
