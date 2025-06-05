<template>
    <TresGroup>
        <primitive :object="scene" />
    </TresGroup>
</template>
<script lang="ts" setup>
import { watch } from 'vue'
import { useGLTF } from '@tresjs/cientos'

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

const { scene } = await useGLTF('./plugins/water/model/staticWater.glb', { draco: true, decoderPath: './draco/' })
scene.scale.set(0.2, 0.2, 0.2)

watch(
    () => [props.waterColor, props.metalness, props.roughness],
    ([waterColor, metalness, roughness]) => {
        ;(scene.children[1] as any).material.color.set(waterColor)
        ;(scene.children[1] as any).material.metalness = metalness
        ;(scene.children[1] as any).material.roughness = roughness
    },
    { immediate: true },
)
</script>
