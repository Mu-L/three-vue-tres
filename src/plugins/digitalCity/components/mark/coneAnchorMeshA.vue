<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-08-19 20:24:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 15:26:25
-->
<template>
  <TresGroup :rotateX="-Math.PI / 2" ref="coneGroup" :renderOrder="10000">
    <UseTexture v-slot="{ state: texture }" path="./plugins/digitalCity/image/midGradient.png">
    <TresMesh :rotateX="Math.PI / 2" :position="[0, 0, height * 1.25]" :scale-y="0.5">
      <TresConeGeometry :args="[15, height, 4, 1, true]" />
      <TresMeshLambertMaterial
        :map="texture"
        :transparent="true"
        :depthTest="occlusion"
        :side="THREE.DoubleSide"
        :color="color"
        :depthWrite="true"
      />
    </TresMesh>
    <TresMesh :rotateX="-Math.PI / 2" :position="[0, 0, height / 2]">
      <TresConeGeometry :args="[15, height, 4, 1, true]" />
      <TresMeshLambertMaterial
        :map="texture"
        :transparent="true"
        :depthTest="occlusion"
        :side="THREE.DoubleSide"
        :color="color"
        :depthWrite="true"
      />
    </TresMesh>
    </UseTexture>
  </TresGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { UseTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const props = withDefaults(
  defineProps<{
    height?: number
    color?: string
    occlusion?: boolean
    speed?: number
  }>(),
  {
    height: 40,
    color: '#b0ffff',
    occlusion: true,
    speed: 0.05,
  }
)

const coneGroup = ref<THREE.Group>()

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  coneGroup.value?.rotateZ(props.speed)
})
</script>
