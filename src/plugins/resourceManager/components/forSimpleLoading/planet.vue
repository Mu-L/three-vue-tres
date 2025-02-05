<script setup lang="ts">
import { Resource } from 'PLS/resourceManager'
import { useRenderLoop } from '@tresjs/core'
import Airplane from './airplane.vue'
import Cloud from './cloud.vue'

const { nodes } = Resource.getItem('planet.gltf')

const planet = nodes.Planet
const icosphere = nodes.Icosphere
planet.traverse((child: any) => {
    if (child.isMesh) {
        child.receiveShadow = true
    }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
    if (!planet) return
    planet.rotation.y += delta * 0.04
    planet.rotation.z += delta * 0.02
    planet.rotation.x += delta * 0.05
    planet.updateMatrixWorld()
})
</script>

<template>
    <primitive :object="planet" />
    <Airplane :planet="icosphere" />
    <Cloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="icosphere" />
</template>
