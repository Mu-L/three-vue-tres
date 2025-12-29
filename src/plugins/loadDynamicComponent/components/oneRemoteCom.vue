<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 10:19:47
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-29 10:41:14
-->
<template>
	<component v-if="moduleWraped" :is="moduleWraped"></component>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { remoteRegistry } from '../common/RemoteRegistry'

const props = defineProps<{
	remoteName: string,
	comName: string
}>()

const moduleWraped = shallowRef(null)
const ri = remoteRegistry.getRemote(props.remoteName)
if (ri) {
	moduleWraped.value = await ri.loadComponentModule(`./${props.comName}`)
}
</script>