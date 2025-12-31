<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-30 10:27:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-31 11:45:11
-->
<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NSpace, useMessage } from 'naive-ui'
import { remoteRegistry } from '../common/RemoteRegistry'

const emit = defineEmits<{
	(e: 'loaded', data: any): void
}>()

const message = useMessage()
const serviceUrl = ref('https://dcser.icegl.cn') // https://dcser.icegl.cn http://localhost:5000
const loading = ref(false)

const handleApply = async () => {
	if (!serviceUrl.value) {
		message.warning('请输入服务地址')
		return
	}
	loading.value = true
	try {
		remoteRegistry.registerRemote(
			'base',
			serviceUrl.value + '/',
			serviceUrl.value + '/assets/remoteEntry.js'
		)
		const config = await remoteRegistry.loadRemoteConfig('base')
		emit('loaded', config)
		message.success('服务加载成功')
	} catch (e) {
		message.error('服务加载失败')
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<NSpace vertical size="large">
		<NInput v-model:value="serviceUrl" placeholder="请输入服务地址" clearable />
		<NButton type="primary" block :loading="loading" @click="handleApply">
			应用服务
		</NButton>
	</NSpace>
</template>
