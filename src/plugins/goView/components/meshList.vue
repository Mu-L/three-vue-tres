<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2026-01-19 09:27:30
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-19 09:28:37
-->
<template>
	<TresGroup>
		<TresMesh v-for="(n, i) in count" :key="i" :position="[startX + i * spacing, 0, 0]">
			<TresBoxGeometry />
			<TresMeshNormalMaterial />
		</TresMesh>
	</TresGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    count: { default: 11 },
})

// 每个 Mesh 间距（根据实体大小调）
const spacing = 2
// 整体宽度
const totalWidth = computed(() => (props.count - 1) * spacing)
// 起始 X，使得整体居中
const startX = computed(() => -totalWidth.value / 2)

</script>
