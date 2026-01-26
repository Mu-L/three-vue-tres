<!--
 * @Description: shadows 全局不能用
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2026-01-26 09:53:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-26 11:36:56
-->
<template>
	<TresCanvas windowSize clearColor="#eee" :renderer="createWebGPURenderer">
		<TresPerspectiveCamera :fov="15" :position="[-5, 5, 5]" />
		<OrbitControls makeDefault />
		<TresSpotLight castShadow :decay="0" :angle="0.1" :penumbra="1" :intensity="Math.PI" :position="[5, 5, 5]"
			:shadow-mapSize="[1024, 1024]" />
		<TresSpotLight castShadow :decay="0" :angle="0.1" :penumbra="1" :intensity="Math.PI" :position="[-5, 15, 5]"
			:shadow-mapSize="[1024, 1024]" />
		<basiceEnv v-bind="basiceEnvState" />
		<model :position="[0, 0.025, 0]" :scale="0.2" v-bind="modelState" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { toValue, reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import type { TresRendererSetupContext } from '@tresjs/core'
import * as THREE from 'three/webgpu'
import { basiceEnv } from 'PLS/skyBox'
import model from 'PLS/industry4/components/tslGearsForked/model.vue'
import { Pane } from 'tweakpane'

const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
	const renderer = new THREE.WebGPURenderer({
		canvas: toValue(ctx.canvas),
		alpha: true,
		antialias: true,
	})
	return renderer
}

const basiceEnvState = {
	on: true,
	type: 'shanghai' as any,
	environmentIntensity: 1,
	environmentRotations: { x: 0, y: 0, z: 0 }
}

const modelState = reactive({
	sliceColor: '#0096ff',
	sliceStart: 1.75,
	sliceArc: 1.25,
})

const paneControl = new Pane({ title: '参数' })
paneControl.addBinding(modelState, 'sliceColor', {
	label: '颜色',
})
paneControl.addBinding(modelState, 'sliceStart', {
	label: '开始角度',
	min: 0, max: Math.PI
})
paneControl.addBinding(modelState, 'sliceArc', {
	label: '角度范围',
	min: 0, max: Math.PI
})
</script>