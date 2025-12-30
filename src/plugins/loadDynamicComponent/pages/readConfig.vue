<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 10:09:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-30 10:41:20
-->
<template>
	<n-message-provider>
		<ServiceLoader v-if="!serviceData" @loaded="handleLoaded"
			style="z-index: 99999;position: absolute;left: 10px;top: 50px;" />
		<ServiceViewer v-else :data="serviceData" @select="handleSelectComponent" @reset="handleReset"
			style="z-index: 99999;position: absolute;left: 10px;top: 50px;" />
	</n-message-provider>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" />
		<OrbitControls />
		<!-- <Suspense>
			<oneRemoteCom v-bind="comState" />
		</Suspense> -->
		<TresGridHelper :position-y="0.1" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { NMessageProvider } from 'naive-ui'
import ServiceLoader from '../components/ServiceLoader.vue'
import ServiceViewer from '../components/ServiceViewer.vue'
// import { remoteRegistry } from '../common/RemoteRegistry'
// import oneRemoteCom from '../components/oneRemoteCom.vue'

const state = reactive({
	clearColor: '#201919',
	shadows: true,
	alpha: false,

	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
})

const handleLoaded = (json: any) => {
	serviceData.value = json
	console.log('服务配置加载完成：', json)
}
const serviceData = ref<any | null>(null)

const handleSelectComponent = (item: any) => {
	// 🔥 你来实现
	// federation getRemote
	// 动态注册组件
	// 加入 Three.js / tvt.js 场景
	console.log('选中组件', item)
}

const handleReset = () => {
	serviceData.value = null
}
// remoteRegistry.registerRemote(
// 	'base',
// 	'http://dcser.icegl.cn/',
// 	'http://dcser.icegl.cn/assets/remoteEntry.js'
// )
// const config = await remoteRegistry.loadRemoteConfig('base')
// const comState = {
// 	remoteName: 'base',
// 	comName: 'dynamicRotatingBase' // config.components[1].type
// }
</script>