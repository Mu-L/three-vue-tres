<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-09 10:24:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-09 12:29:28
-->
<template>
	<TresCanvas clearColor="#000" window-size>
			<TresPerspectiveCamera :position="[6, 3, 0]" :fov="45" :near="0.1" :far="10000" />
			<OrbitControls enableDamping autoRotate />

			<yuriBrainModel />

			<Suspense>
					<reflectorDUDV :position="[0, -1.36, 0]" v-bind="reflectorState" />
			</Suspense>
	</TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import yuriBrainModel from '../components/yuriBrain/index.vue'

const reflectorState = reactive({
	reflectivity: 0.8,
	showGridHelper: false,
	scale: 1,
})

</script>