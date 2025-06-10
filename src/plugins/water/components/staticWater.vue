<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-05 08:42:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-10 11:43:36
-->
<template>
    <TresGroup>
        <primitive v-if="modelScene" :object="toRaw(modelScene)" />
    </TresGroup>
</template>
<script lang="ts" setup>
import { watch, ref, toRaw } from 'vue'
import { Resource } from 'PLS/resourceManager'

const props = withDefaults(
    defineProps<{
        waterColor?: string
        metalness?: number
        roughness?: number
    }>(),
    {
        waterColor: '#52a7f7',
        metalness: 0.64,
        roughness: 0,
    },
)
const lateWatchProp = () => {
    if (modelScene.value) {
        ;(modelScene.value.children[1] as any).material.color.set(props.waterColor)
        ;(modelScene.value.children[1] as any).material.metalness = props.metalness
        ;(modelScene.value.children[1] as any).material.roughness = props.roughness
    }
}

Resource.getResource('GLTFLoader', './plugins/water/model/staticWater.glb', 'staticWater.glb')
const modelR = Resource.getReactiveItem('staticWater.glb') as any
const modelScene = ref(null)
watch(
    modelR,
    (model) => {
        if (model) {
            modelScene.value = toRaw(model.scene).clone()
            if (modelScene.value) {
                modelScene.value.children[1].material = modelScene.value.children[1].material.clone()
                modelScene.value.scale.set(0.2, 0.2, 0.2)
                lateWatchProp()
            }
        }
    },
    { immediate: true },
)

watch(
    () => [props.waterColor, props.metalness, props.roughness],
    () => {
        lateWatchProp()
    },
    { immediate: true },
)
</script>
