<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-28 15:10:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-05-16 17:42:36
-->
<template>
	<TransformControls :object="props.model" :mode="modelc" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TransformControls } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'

const props = withDefaults(
	defineProps<{
		model: any
	}>(),
	{

	},
)

const modelc = ref("translate")
// const { pane } = useTweakPane()
// pane.addBlade({
// 	view: 'list',
// 	label: '模式',
// 	options: [
// 		{ text: '移动', value: 'translate' },
// 		{ text: '旋转', value: 'rotate' },
// 		{ text: '缩放', value: 'scale' },
// 	],
// 	value: modelc.value,
// })
// 	.on('change', (e: any) => {
// 		modelc.value = e.value
// 	})

const { onLoop } = useRenderLoop()
onLoop(() => {
	console.log(props.model.position)
	console.log(props.model.rotation)
	console.log(props.model.scale)
})
</script>