<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-30 10:27:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-30 10:37:39
-->
<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NSpace, useMessage } from 'naive-ui'
import { remoteRegistry } from '../common/RemoteRegistry'

const emit = defineEmits<{
	(e: 'loaded', data: any): void
}>()

const message = useMessage()
const serviceUrl = ref('')
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

	// loading.value = true
	// try {
	//   /**
	//    * 🔌 接口伪代码（你实现）
	//    * const json = await fetch(serviceUrl.value).then(res => res.json())
	//    */

	//   await new Promise(r => setTimeout(r, 600))

	//   const json = {
	//     name: 'baseSample',
	//     version: '1.0.0',
	//     description: '动态组件服务示例组件库',
	//     components: [
	//       { name: '测试空组件', type: 'testBase' },
	//       { name: '动态旋转基座', type: 'dynamicRotatingBase' },
	//     ],
	//   }

	//   emit('loaded', json)
	//   message.success('服务加载成功')
	// } catch (e) {
	//   message.error('服务加载失败')
	// } finally {
	//   loading.value = false
	// }
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
