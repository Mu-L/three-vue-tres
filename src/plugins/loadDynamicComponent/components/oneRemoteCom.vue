<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 10:19:47
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-30 11:31:16
-->
<template>
	<component v-if="moduleWraped" :is="moduleWraped" v-bind="attrsData"></component>
</template>

<script setup lang="ts">
import { shallowRef,onBeforeUnmount } from 'vue'
import { remoteRegistry } from '../common/RemoteRegistry'
import { createConfigPane } from '../common/createConfigPane'

const props = defineProps<{
	remoteName: string,
	comName: string,
	attrsData: any,
	config: any
}>()

const moduleWraped = shallowRef(null)
const ri = remoteRegistry.getRemote(props.remoteName)
if (ri) {
	moduleWraped.value = await ri.loadComponentModule(`./${props.comName}`)
}
const pane = createConfigPane(document.getElementById('pane')!, props.config, props.attrsData)
onBeforeUnmount(() => {
  if (pane) {
    pane.dispose()
  }
})
</script>