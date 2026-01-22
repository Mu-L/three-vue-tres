<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-30 10:39:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-22 10:20:57
-->
<script setup lang="ts">
import {
	NDescriptions,
	NDescriptionsItem,
	NList,
	NListItem,
	NThing,
	NButton,
	NSpace,
	NTag,
	NElement
} from 'naive-ui'

const props = defineProps<{
	data: {
		name: string
		version: string
		description: string
		components: Array<{
			name: string
			type: string
		}>
	}
	selectedType: string | Undefined
}>()

const emit = defineEmits<{
	(e: 'select', item: any): void
	(e: 'reset'): void
}>()

const handleSelect = (item: any) => {
	emit('select', item)
}
</script>

<template>
	<div style="max-width:500px;">
	<NSpace vertical size="large">
		<!-- 基础信息 -->
		<NDescriptions bordered size="small">
			<NDescriptionsItem label="名称">
				{{ props.data.name }}
			</NDescriptionsItem>
			<NDescriptionsItem label="版本">
				<NTag type="info">{{ props.data.version }}</NTag>
			</NDescriptionsItem>
			<NDescriptionsItem label="描述">
				 <NElement tag="div" v-html="props.data.description" />
			</NDescriptionsItem>
		</NDescriptions>

		<!-- 组件列表 -->
		<NList bordered hoverable clickable>
			<NListItem :class="{ 'n-list-item--active': selectedType && item.type === selectedType }" v-for="item in props.data.components"
				:key="item.type" @click="handleSelect(item)">
				<NThing :title="item.name" :description="item.type">
					<template #header-extra>
						<NTag size="small">点击载入调试</NTag>
					</template>
				</NThing>
			</NListItem>
		</NList>

		<!-- 重置 -->
		<NButton type="warning" block @click="emit('reset')">
			删除当前服务 / 重新加载
		</NButton>
	</NSpace>
	</div>
</template>
<style lang="less" scoped>
.n-list-item--active {
	background: #9bb5ff!important;
}
</style>