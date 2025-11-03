<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 16:29:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-03 11:22:34
-->
<script setup lang="ts">
import * as THREE from 'three'
import { ref, provide } from 'vue'
import { MaterialSelector } from 'PLS/basic'
import { materialPresets, type MaterialType } from 'PLS/basic/components/forCientos/MaterialSelector/materials'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorShaderMesh } from 'PLS/floor'
import ui from 'PLS/basic/components/forCientos/MaterialSelector/ui.vue'

const tcConfig = {
	clearColor: '#201919',
	windowSize: true,
	shadows: true,
	toneMapping: THREE.NoToneMapping,
	toneMappingExposure: 1,
	shadowMapType: THREE.PCFSoftShadowMap,
}

const configState = {
	reflectivity: 0.941,
	mirror: 113.25,
	mixStrength: 12,
	showGridHelper: false,
}

// 当前选中材质类型
const currentType = ref<MaterialType>('MeshStandardMaterial')

// 初始化材质属性（克隆配置）
const currentProps = ref({ ...materialPresets[currentType.value].props })

provide('MaterialSelectorType', currentType)
provide('MaterialSelectorProps', currentProps)
</script>

<template>
	<TresCanvas v-bind="tcConfig">
		<TresPerspectiveCamera :position="[-5, 3, 5]" :fov="50" :near="0.1" :far="10000" />
		<OrbitControls />
		<TresAmbientLight :intensity="2" />
		<TresDirectionalLight :intensity="6" :position="[-2, 1, 0]" />

		<TresMesh :position="[1, 1, -1]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshNormalMaterial />
		</TresMesh>

		<TresMesh :position="[0, 1, 0]">
			<TresBoxGeometry />
			<MaterialSelector :type="currentType" :material-props="currentProps" />
		</TresMesh>
		<reflectorShaderMesh v-bind="configState" />
	</TresCanvas>
	<ui :type="currentType" :material-props="currentProps" />
</template>
