<template>
	<TresCanvas clearColor="#201919" window-size>
		<TresPerspectiveCamera :position="[15, 20, 0]" :fov="45" :near="0.1" :far="10000" />
		<OrbitControls enableDamping />
		<TresAmbientLight :intensity="6.0" />

		<dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[2, -0.6, 2]" v-bind="configState" />

		<dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[2, 0.1, 2]" color="#f605ff" type="imgB" />
    <dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[-2, 0, -2]" color="#02a7ff" type="imgC" /> 

		<dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[0, 0, -10]"color="#f605ff"  type="videoB" />
    <dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[0, -0.7, -10]" color="#02a7ff" type="videoC" /> 
		<dynamicRotatingBase :rotation-x="-Math.PI / 2" :position="[0, -0.5, 10]"color="#f605ff"  type="imgA" />

		<reflectorDUDV :position="[0, -1, 0]" v-bind="reflectorState" />

	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import reflectorDUDV from '../components/reflectorDUDV.vue'
import { dynamicRotatingBase } from 'PLS/floor'

const reflectorState = reactive({
	reflectivity: 2.6,
	showGridHelper: false,
	scale: 4,
})
const configState = reactive({
	type: "videoA",
	color: '#fff',
	opacity: 0.95,
	rotationZ: 0.01,
	videoLoop: false,
})

const paneControl = new Pane()
paneControl
	.addBlade({
		view: 'list',
		label: '底座类型',
		options: ['imgA', 'imgB', 'imgC', 'videoA', 'videoB', 'videoC'].map((v) => ({ text: v, value: v })),
		value: configState.type,
	})
	.on('change', (e: any) => {
		configState.type = e.value
	})
paneControl.addBinding(configState, 'videoLoop', { label: '视频重复' })
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'opacity', {
	label: '透明度',
	min: 0.0,
	max: 1.0,
	step: 0.01,
})
paneControl.addBinding(configState, 'rotationZ', {
	label: '自转速度',
	min: -0.1,
	max: 0.1,
	step: 0.01,
})
</script>
