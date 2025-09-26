<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-15 08:43:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 10:05:28
-->
<template>
    <TresGroup>
        <TresMesh ref="meshRef" :geometry="nodes.Cylinder.geometry" :renderOrder="999991">
            <meshSpiralMaterial :frontColor="frontColor" :backColor="backColor" :intensity="2.7" :powerOffset="12"
                colorBoth />
        </TresMesh>
    </TresGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import { Resource } from 'PLS/resourceManager'
import meshSpiralMaterial from './materials/meshSpiralMaterial.vue'

const meshRef = ref(null)

const { nodes } = Resource.getItem('spiral-middle.glb')
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta, elapsed }) => {
    if (meshRef.value) {
        const time = elapsed * 3.4
        const scale = 0.2 * Math.sin(time) + 0.8
        meshRef.value.rotation.y += delta * 6
        meshRef.value.scale.set(scale, scale, scale)
    }
})

const props = withDefaults(
    defineProps<{
        frontColor?: string
        backColor?: string
    }>(),
    {
        frontColor: '#111111',
        backColor: '#ff810c',
    },
)
</script>
