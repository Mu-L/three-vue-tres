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
Resource.getResource('GLTFLoader', './plugins/water/model/staticWater.glb', 'staticWater.glb')
const modelR = Resource.getReactiveItem('staticWater.glb') as any
const modelScene = ref(null)
watch(
    modelR,
    (model) => {
        if (model) {
            modelScene.value = toRaw(model.scene).clone()
            modelScene.value.scale.set(0.2, 0.2, 0.2)
        }
    },
    { immediate: true },
)

watch(
    () => [props.waterColor, props.metalness, props.roughness],
    ([waterColor, metalness, roughness]) => {
        if (modelScene.value) {
            ;(modelScene.value.children[1] as any).material.color.set(waterColor)
            ;(modelScene.value.children[1] as any).material.metalness = metalness
            ;(modelScene.value.children[1] as any).material.roughness = roughness
        }
    },
    { immediate: true },
)
</script>
