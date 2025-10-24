<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 14:18:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-24 11:07:11
-->
<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[-5, 3, 5]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls />
		<TresAmbientLight />
		<TresDirectionalLight :intensity="2" :position="[2, 2, 2]" />

		<generalFont :position="[0, 0.5, 0]" v-bind="generalFontState" :materialType="materialType"
			:materialProps="materialProps" />
		<reflectorShaderMesh v-bind="configState" />
	</TresCanvas>
	<MaterialSelectorUI :style="{ top: '39px', left: '0px' }" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { generalFont } from 'PLS/UIdemo'
import { reactive, ref, provide } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import reflectorShaderMesh from 'PLS/floor/components/reflectorShaderMesh.vue'
import { Pane } from 'tweakpane'
import { materialPresets, type MaterialType as mType } from 'PLS/basic/components/forCientos/MaterialSelector/materials'
import MaterialSelectorUI from 'PLS/basic/components/forCientos/MaterialSelector/ui.vue'

const tcConfig = {
	clearColor: '#201919',
	windowSize: true,
	shadows: true,
	toneMapping: THREE.NoToneMapping,
	toneMappingExposure: 1,
	shadowMapType: THREE.PCFSoftShadowMap,
}

const configState = reactive({
	reflectivity: 0.941,
	mirror: 113.25,
	mixStrength: 12,
	showGridHelper: false,
	scale: 1.0,
})

const generalFontState = reactive({
	text: '3D文字展示组件',
	size: 0.5,
	height: 0.2,
	curveSegments: 5,
	bevelEnabled: true,
	bevelThickness: 0.05,
	bevelSize: 0.02,
	bevelOffset: 0,
	bevelSegments: 4,
	center: true,
})

const pane = new Pane({
	title: '参数',
	expanded: true,
})
pane.addBinding(generalFontState, 'text', { label: '文字内容' })
pane.addBinding(generalFontState, 'size', { label: '字体大小', min: 0.1, max: 2, step: 0.1 })
pane.addBinding(generalFontState, 'height', { label: '厚度', min: 0.01, max: 1, step: 0.01 })
pane.addBinding(generalFontState, 'curveSegments', { label: '曲线段数', min: 1, max: 20, step: 1 })
pane.addBinding(generalFontState, 'bevelEnabled', { label: '启用倒角' })
pane.addBinding(generalFontState, 'bevelThickness', { label: '倒角厚度', min: 0, max: 0.2, step: 0.01 })
pane.addBinding(generalFontState, 'bevelSize', { label: '倒角大小', min: 0, max: 0.1, step: 0.01 })
pane.addBinding(generalFontState, 'bevelOffset', { label: '倒角偏移', min: -0.1, max: 0.1, step: 0.01 })
pane.addBinding(generalFontState, 'bevelSegments', { label: '倒角段数', min: 1, max: 10, step: 1 })
pane.addBinding(generalFontState, 'center', { label: '居中显示' })


const materialType = ref<mType>('MeshStandardMaterial')
const materialProps = ref({ ...materialPresets[materialType.value].props })
provide('MaterialSelectorType', materialType)
provide('MaterialSelectorProps', materialProps)
</script>
