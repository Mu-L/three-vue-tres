<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 10:09:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-30 11:28:05
-->
<template>
	<n-message-provider>
		<ServiceLoader v-if="!serviceData" @loaded="handleLoaded"
			style="z-index: 99999;position: absolute;left: 10px;top: 50px;" />
		<ServiceViewer v-else :data="serviceData" :selectedType="comState?.comName" @select="handleSelectComponent" @reset="handleReset"
			style="z-index: 99999;position: absolute;left: 10px;top: 50px;" />
	</n-message-provider>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[5, 5, 5]" />
		<OrbitControls />
		<Suspense>
			<oneRemoteCom v-if="comState" v-bind="comState" :attrsData="attrsData" :config="comConfig" />
		</Suspense>
		<TresGridHelper :position-y="0.1" />
	</TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { nextTick, reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { NMessageProvider } from 'naive-ui'
import ServiceLoader from '../components/ServiceLoader.vue'
import ServiceViewer from '../components/ServiceViewer.vue'
import oneRemoteCom from '../components/oneRemoteCom.vue'

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
const comState = ref(null) as any
const attrsData = ref<any>(null)
const comConfig = ref<any>(null)
const handleSelectComponent = (item: any) => {
	console.log('选中组件', item)
	if (comState.value && comState.value.comName === item.type) {
		return
	}
	comState.value = null
	attrsData.value = {}
	comConfig.value = null
	nextTick(() => {
		attrsData.value = item?.default || {}
		comConfig.value = item?.config || null
		comState.value = {
			remoteName: 'base',
			comName: item.type,
			position: [0, 0, 0],
			rotation: [0, 0, 0],
			scale: [1, 1, 1],
		}
		if (item.defaultObject3D?.position) {
			comState.value.position = [
				item.defaultObject3D.position.x,
				item.defaultObject3D.position.y,
				item.defaultObject3D.position.z,
			]
		}
		if (item.defaultObject3D?.rotation) {
			comState.value.rotation = [
				item.defaultObject3D.rotation.x,
				item.defaultObject3D.rotation.y,
				item.defaultObject3D.rotation.z,
			]
		}
		if (item.defaultObject3D?.scale) {
			comState.value.scale = [
				item.defaultObject3D.scale.x,
				item.defaultObject3D.scale.y,
				item.defaultObject3D.scale.z,
			]
		}
	})
}

const handleReset = () => {
	comState.value = null
	serviceData.value = null
}
</script>