<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 10:09:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-29 11:25:02
-->
<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" />
		<OrbitControls />
		<Suspense>
			<oneRemoteCom v-bind="comState" />
		</Suspense>
		<TresGridHelper :position-y="0.1" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { remoteRegistry } from '../common/RemoteRegistry'
import oneRemoteCom from '../components/oneRemoteCom.vue'

const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,

	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})

remoteRegistry.registerRemote(
	'base',
	'http://localhost:5000/',
	'http://localhost:5000/assets/remoteEntry.js'
)
const config = await remoteRegistry.loadRemoteConfig('base')
const comState = {
	remoteName: 'base',
	comName: 'dynamicRotatingBase' //config.components[1].type
}
</script>