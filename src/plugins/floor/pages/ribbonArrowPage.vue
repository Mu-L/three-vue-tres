<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-22 10:48:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-27 16:46:16
-->
<template>
	<TresCanvas clearColor="#333" window-size>
		<TresPerspectiveCamera :position="[16, 30, -30]" :fov="45" :near="0.1" :far="10000" />
		<OrbitControls enableDamping />

		<ribbonArrow :position="[-2, 3, 0]" v-bind="raState" :rotation-x="Math.PI/2" />
		<reflectorDUDV :reflectivity="1.0" :showGridHelper="false" :scale="10" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import { ribbonArrow } from 'PLS/floor'
import reflectorDUDV from 'PLS/floor/components/reflectorDUDV.vue'

const paneControl = new Pane({
	expanded: true,
})

const raState = reactive({
	length: 20,
	speed: 1,
	width: 1,
	bendPosition: 0.5,
	curvature: 0.4,
	backgroundColor: '#00aaff',
	backgroundAlpha: 0.25,
	segments: 240,
	arrowColor: '#ffffff',
	arrowWidth: 2,
	arrowHeight: 2,
	arrowSpacing: 2,
	arrowOffset: 0,
	arrowLineWidth: 18,
	arrowStyle: 'chevron',
	pixelWorldScale: 0.03,
})


paneControl.addBinding(raState, 'length', { label: '长度', min: 1, max: 60, step: 1 })
paneControl.addBinding(raState, 'speed', { label: '速度', min: -5, max: 5, step: 0.01 })
paneControl.addBinding(raState, 'width', { label: '宽度', min: 0.1, max: 5, step: 0.1 })
paneControl.addBinding(raState, 'bendPosition', { label: '弯折位置', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(raState, 'curvature', { label: '弯曲度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(raState, 'backgroundColor', { label: '背景颜色' })
paneControl.addBinding(raState, 'backgroundAlpha', { label: '背景透明度', min: 0, max: 1, step: 0.01 })
paneControl.addBinding(raState, 'segments', { label: '分段数', min: 10, max: 500, step: 1 })
paneControl.addBinding(raState, 'arrowColor', { label: '箭头颜色' })
paneControl.addBinding(raState, 'arrowWidth', { label: '箭头高度', min: 0.1, max: 10, step: 0.1 })
paneControl.addBinding(raState, 'arrowHeight', { label: '箭头宽度', min: 0.1, max: 10, step: 0.1 })
paneControl.addBinding(raState, 'arrowSpacing', { label: '箭头间距', min: 0.1, max: 10, step: 0.1 })
paneControl.addBinding(raState, 'arrowOffset', { label: '箭头垂直偏移', min: -5, max: 5, step: 0.01 })
paneControl.addBinding(raState, 'arrowLineWidth', { label: '线条箭头粗细', min: 1, max: 50, step: 1 })
paneControl.addBinding(raState, 'arrowStyle', { label: '箭头样式', options: { Chevron: 'chevron', Double: 'double', Triangle: 'triangle', Diamond: 'diamond' } })
paneControl.addBinding(raState, 'pixelWorldScale', { label: '像素到世界单位比例', min: 0.001, max: 0.1, step: 0.001 })
</script>
