<template>
	<div class="shape-configurator">
		<n-card>
			<n-space vertical size="small">
				<n-select v-model:value="type" :options="shapeOptions" placeholder="选择图形类型" @update:value="resetDefaults(false)"/>

				<n-form v-if="meta" size="small" label-placement="left" :label-width="100">
					<div v-for="param in meta.params" :key="param.key" style="margin-bottom: 12px">
						<n-form-item :label="param.label">
							<n-slider size="tiny" v-if="param.type === 'number'" v-model:value="controls[param.key]" v-bind="getNumberAttrs(param)" style="width: 100%" />
							<n-switch size="small" v-else-if="param.type === 'boolean'" v-model:value="controls[param.key]" />
						</n-form-item>
					</div>
				</n-form>
			</n-space>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import {
	NCard,
	NSelect,
	NSpace,
	NForm,
	NFormItem,
	NSlider,
	NSwitch
} from "naive-ui"
import { ref, reactive, computed, watch, defineEmits } from "vue"
import { SHAPE_METADATA } from "./shapeMeta"

const props = defineProps<{
  modelValue?: {
    type?: keyof typeof SHAPE_METADATA;
    args?: any[];
  };
}>()

const emit = defineEmits(["update:modelValue"])

const shapeOptions = Object.keys(SHAPE_METADATA).map((k) => ({
	label: k,
	value: k,
}))

const type = ref<keyof typeof SHAPE_METADATA>(props.modelValue?.type ?? "Box");
const meta = computed(() => SHAPE_METADATA[type.value])

const controls = reactive<Record<string, number | boolean>>({})

function resetDefaults(setNewType = true) {
	const m = meta.value;
	if (!m) return;
	for (const p of m.params) {
		controls[p.key] = p.default as any
		if (setNewType && props.modelValue && props.modelValue.args) {
			// 覆盖默认值
			const index = m.params.findIndex(param => param.key === p.key);
			if (index !== -1 && props.modelValue.args[index] !== undefined) {
				controls[p.key] = props.modelValue.args[index];
			}
		}
	}
}

// 生成 args 数组
const args = computed(() => {
	const m = meta.value
	if (!m) return []
	return m.params.map((p: any) => controls[p.key])
})

// 监听变化，双向绑定给父组件
watch(
	() => ({ type: type.value, args: args.value }),
	(val) => emit("update:modelValue", val),
	{ deep: true, immediate: true }
)

// 初始化
resetDefaults()

function getNumberAttrs(param: any) {
	if (param.type !== "number") return {}
	return {
		min: param.min ?? 0.1,
		max: param.max ?? 5,
		step: param.step ?? 0.1,
	}
}
</script>
<style lang="less">
.shape-configurator {
	.n-form-item .n-form-item-feedback-wrapper {
		min-height: 12px;
		line-height: 12px;
	}
}
</style>
<style lang="scss" scoped>
.shape-configurator {
	z-index: 1999;
	position: absolute;
	width: 300px;
	top: 40px;
	left: 4px;
}
</style>