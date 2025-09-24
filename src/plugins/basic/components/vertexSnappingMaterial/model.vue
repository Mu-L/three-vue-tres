<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-10 09:25:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-24 16:11:28
-->
<template>
    <primitive v-if="pState" :object="pState?.scene" :scale="5" :position="[0, -2, 0]" />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { transToVertexSnappingMaterial } from './index'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        uSnappingResolution?: number
    }>(),
    {
        uSnappingResolution: 6,
    },
)

const { state: pState, materials } = useGLTF(
    (process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/model/industry4/MRBike.glb',
    {
        draco: true,
        decoderPath: './draco/',
    },
)

const resolutionList = [] as any
watch(
    () => pState.value,
    (state) => {
        if (!state?.scene) return
        Object.values(materials.value).forEach((material: any) => {
            resolutionList.push(transToVertexSnappingMaterial(material, props.uSnappingResolution))
        })
    },
)

watch(
    () => props.uSnappingResolution,
    (newValue) => {
        resolutionList.forEach((item: any) => {
            item.value = newValue
        })
    },
)
</script>
