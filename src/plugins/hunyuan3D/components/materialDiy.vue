<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 16:41:34
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-30 10:26:06
-->
<template>
    <component :is="materialMap" v-bind="materialDiyStore.curState" transparent flatShading />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMaterialDiyStore } from 'PLS/hunyuan3D/stores/index'

const materialDiyStore = useMaterialDiyStore() as any

// const props = defineProps({
//     materialName: {
//         type: String,
//         default: 'MeshBasicMaterial',
//     },
//     materialProps: {
//         type: Object,
//         default: () => ({
//             color: '#ffff00',
//         }),
//     },
// })

const materialMap = computed(() => `Tres${materialDiyStore.curType}`)
</script>
