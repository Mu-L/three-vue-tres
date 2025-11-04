<template>
	<shapeRenderer :position="[0, 0.5, 0]" :modelValue="shape">
		<MaterialSelector :type="materialType" :material-props="materialProps" />
	</shapeRenderer>
</template>
<script setup lang="ts">
import { shapeRenderer, MaterialSelector } from 'PLS/basic'
import { type MaterialType } from 'PLS/basic/components/forCientos/MaterialSelector/materials'

const props = defineProps({
	shape: {
		default: {
			type: "Box",
			args: [2, 1, 1],
		}
	},
	materialType: {
		type: String as () => MaterialType,
		default: 'MeshStandardMaterial',
	},
	materialProps: {
		type: Object,
		required: true
	},
})
</script>
