<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-24 10:03:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 12:22:15
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[0, 0, 166]" :fov="75" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
		<OrbitControls v-bind="controlsState" />
		<Suspense>
			<chinaMapMesh />
		</Suspense>
	</TresCanvas>
</template>


<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import chinaMapMesh from '../components/chinaMapMesh.vue'

const state = {
	clearColor: '#201919',
	// alpha: false,
}

const controlsState = {
	enableDamping: true,
	dampingFactor: 0.05,
}


</script>