<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-10-13 09:05:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 10:49:38
-->
<script setup lang="ts">
import { useGLTF } from 'PLS/basic'
import { useLoop } from '@tresjs/core'
import Airplane from './airplane.vue'
import Cloud from './cloud.vue'
import { toRaw } from 'vue'

const { nodes } = await useGLTF(
  './plugins/earthSample/model/lowpolyPlanet/planet.gltf',
)

const planet = nodes.Planet
const icosphere = nodes.Icosphere
planet.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (!planet) return
  planet.rotation.y += delta * 0.04
  planet.rotation.z += delta * 0.02
  planet.rotation.x += delta * 0.05
  planet.updateMatrixWorld()
})
</script>

<template>
  <primitive :object="toRaw(planet)" />
  <Airplane :planet="toRaw(icosphere)" />
  <Cloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="toRaw(icosphere)" />
</template>
