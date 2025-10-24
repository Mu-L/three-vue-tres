<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-24 08:52:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-24 11:02:10
-->

<template>
	<div class="MaterialSelectorCcontrolPanel">
		<n-card title="材质调试面板" size="small">
			<n-form label-placement="left" :label-width="130" size="small">
				<n-form-item label="材质类型">
					<n-select v-model:value="type" :options="typeOptions" />
				</n-form-item>
				<template v-for="(value, key) in materialProps" :key="key">
					<n-form-item :label="key"
						v-if="(getControlType(value, key) !== 'texture' && getControlType(value, key) !== 'vector2') && getControlType(value, key) !== 'aboutMap' ">
						<n-color-picker :show-alpha="false" v-if="getControlType(value, key) === 'color'" size="small"
							v-model:value="materialProps[key]" />
						<n-slider size="tiny" v-else-if="getControlType(value, key) === 'number'" v-model:value="materialProps[key]"
							:min="0" :max="1" :step="0.01" />
						<n-switch size="small" v-else-if="getControlType(value, key) === 'boolean'"
							v-model:value="materialProps[key]" />
						<n-select size="tiny" v-else-if="getControlType(value, key) === 'enum-side'"
							v-model:value="materialProps[key]" :options="sideOptions" />
						<n-select size="tiny" v-else-if="getControlType(value, key) === 'enum-blending'"
							v-model:value="materialProps[key]" :options="blendingOptions" />
					</n-form-item>
				</template>
			</n-form>
		</n-card>
	</div>
</template>
<script setup lang="ts">
import { watch, inject, Ref } from 'vue'
import { NCard, NSelect, NSlider, NColorPicker, NSwitch, NForm, NFormItem } from 'naive-ui'
import { materialPresets, type MaterialType, sideOptions, blendingOptions } from './materials'

// 明确告诉 TS 可以作为 materialPresets 的键
type PresetKeys = keyof typeof materialPresets

const type = inject('MaterialSelectorType') as Ref<MaterialType>
const materialProps = inject('MaterialSelectorProps') as Ref<Record<string, any>>

// 切换材质类型时，自动重置 props
watch(type, (key) => {
	materialProps.value = { ...materialPresets[(key as PresetKeys)].props }
}, { immediate: true })

// 选项数据（用于 <n-select>）
const typeOptions = Object.keys(materialPresets).map(key => ({
	label: key,
	value: key
}))

function getControlType(value: any, key: string) {
	if (key === 'side') return 'enum-side'
	if (key === 'blending') return 'enum-blending'
	if (key.includes('Map')) return 'aboutMap'
	if (typeof value === 'string' && value.startsWith('#')) return 'color'
	if (typeof value === 'number') return 'number'
	if (typeof value === 'boolean') return 'boolean'
	if (value === null && (key.endsWith('Map') || key.endsWith('map'))) return 'texture'
	if (typeof value === 'object' && value && 'x' in value && 'y' in value) return 'vector2'
	return 'text'
}

</script>
<style lang="less">
.MaterialSelectorCcontrolPanel {
	.n-form-item .n-form-item-feedback-wrapper {
		min-height: 12px;
		line-height: 12px;
	}
}
</style>
<style scoped>
.MaterialSelectorCcontrolPanel {
	width: 360px;
	overflow-y: auto;
	padding: 0px;
	background: #f5f5f5;
	right: 6px;
	top: 6px;
	position: absolute;
	border-radius: 8px;
	max-height: calc(100vh - 60px);
}
</style>