<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 16:22:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-24 09:44:53
-->
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useMaterial } from './useMaterial'
import { type MaterialType } from './materials'

/**
 * 接收父组件传入的材质类型和属性对象
 */
const props = defineProps<{
  type: MaterialType
  materialProps?: Record<string, any>
}>()

// 使用 useMaterial 根据类型与属性生成对应 Tres 组件与 props
const component = ref<any>(null)
const matProps = ref<Record<string, any>>({})

watch(
	() => [props.type, props.materialProps],
	([type, materialProps] : any) => {
		const { component: comp, props: matP } = useMaterial(
			type,
			materialProps || {}
		)
		component.value = comp.value
		matProps.value = matP.value
	},
	{ immediate: true, deep: true }
)
</script>

<template>
  <component :is="component" v-bind="matProps" />
</template>
