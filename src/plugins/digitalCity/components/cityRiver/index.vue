<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 17:05:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 14:33:34
-->
<template>
	<TresGroup :position="[0, 0, -2]">
		<primitive v-if="pState" :object="pState?.scene" />
		<threeWater2 v-if="pState" :position-y="0.0001" :waterGeometry="nodes.mesh_0.geometry" v-bind="water2State" />
	</TresGroup>
</template>

<script setup lang="ts">
import threeWater2 from 'PLS/water/components/threeWater2.vue'
import { useGLTF } from '@tresjs/cientos'
import { reactive } from 'vue'

import { Pane } from 'tweakpane'

import { watch } from 'vue'

const { state: pState, nodes } = useGLTF('https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf')

watch(
	() => pState.value,
	(state) => {
		if (!state?.scene) return
		state.scene.renderOrder = 9999

		nodes.value.mesh_0.material.transparent = true
		nodes.value.mesh_0.material.depthWrite = true
		nodes.value.mesh_0.material.depthTest = true
		nodes.value.mesh_0.material.opacity = 0.7
	},
)


const water2State = reactive({
	color: '#f857cc',
	scale: 3.1,
	modelVisible: true,
})

const paneControl = new Pane({
	title: '河流参数',
	expanded: true,
});
paneControl.addBinding(water2State, 'modelVisible', { label: '模型显示', })
	.on('change', (ev) => {
		nodes.value.mesh_0.visible = ev.value
	})
paneControl.addBinding(water2State, 'scale', {
	label: '分辨率', min: 0.1,
	max: 10.0,
	step: 0.1,
})
paneControl.addBinding(water2State, 'color', { label: '河水颜色', })
</script>
