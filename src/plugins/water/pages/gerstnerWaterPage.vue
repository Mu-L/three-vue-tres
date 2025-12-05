<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-05 10:15:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-05 14:58:45
-->
<template>
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[30, 30, 100]" :far="2000" :near="1" />
		<OrbitControls />
		<gerstnerWater v-bind="gwState" />

		<basiceEnv :on="true" :environmentIntensity="1" />

	</TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { reactive } from 'vue'
import { gerstnerWater } from 'PLS/water'
import { Pane } from 'tweakpane'
import { basiceEnv } from 'PLS/skyBox'

const gl = {
	clearColor: '#222',
	shadows: true,
	alpha: false,
}
const gwState = reactive({
	size: 1,
	wireframe: false,
	waterColor: '#001e0f',
	waves: {
		A: {
			direction: 0,
			steepness: 0.4,
			wavelength: 60
		},
		B: {
			direction: 30,
			steepness: 0.4,
			wavelength: 30
		},
		C: {
			direction: 60,
			steepness: 0.4,
			wavelength: 15
		},
	}
})

const paneControl = new Pane({
	title: '参数',
	expanded: true
})
paneControl.addBinding(gwState, 'size', {
	label: '水变化尺度', min: 0.1,
	max: 10,
	step: 0.1,
})
paneControl.addBinding(gwState, 'wireframe', {
	label: '线框模式',
})
paneControl.addBinding(gwState, 'waterColor', {
	label: '水颜色',
})

const adf = paneControl.addFolder({ title: '波浪A' })
adf.addBinding(gwState.waves.A, 'direction', {
	label: '方向', min: 0,
	max: 360,
	step: 1,
})
adf.addBinding(gwState.waves.A, 'steepness', {
	label: '陡峭度', min: 0,
	max: 1,
	step: 0.01,
})
adf.addBinding(gwState.waves.A, 'wavelength', {
	label: '波长', min: 1,
	max: 100,
	step: 1,
})

const bdf = paneControl.addFolder({ title: '波浪B' })
bdf.addBinding(gwState.waves.B, 'direction', {
	label: '方向', min: 0,
	max: 360,
	step: 1,
})
bdf.addBinding(gwState.waves.B, 'steepness', {
	label: '陡峭度', min: 0,
	max: 1,
	step: 0.01,
})
bdf.addBinding(gwState.waves.B, 'wavelength', {
	label: '波长', min: 1,
	max: 100,
	step: 1,
})
const cdf = paneControl.addFolder({ title: '波浪C' })
cdf.addBinding(gwState.waves.C, 'direction', {
	label: '方向', min: 0,
	max: 360,
	step: 1,
})
cdf.addBinding(gwState.waves.C, 'steepness', {
	label: '陡峭度', min: 0,
	max: 1,
	step: 0.01,
})
cdf.addBinding(gwState.waves.C, 'wavelength', {
	label: '波长', min: 1,
	max: 100,
	step: 1,
})
</script>