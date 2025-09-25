<template>
  <TresGroup :rotateX="-Math.PI / 2" ref="coneGroup" :renderOrder="10000">
    <TresMesh :rotateX="Math.PI / 2" :position="[0, 0, height * 1.25]" :scale-y="0.5">
      <TresConeGeometry :args="[15, height, 4, 1, true]" />
      <TresMeshLambertMaterial
        :map="pTexture.value"
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
        :map="pTexture.value"
        :transparent="true"
        :depthTest="occlusion"
        :side="THREE.DoubleSide"
        :color="color"
        :depthWrite="true"
      />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { useTexture } from '@tresjs/cientos'
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

// ---------- 纹理 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/midGradient.png')

// ---------- group ref ----------
const coneGroup = ref<THREE.Group>()

// ---------- 渲染循环 ----------
const { onRender } = useLoop()
onRender(() => {
  coneGroup.value?.rotateZ(props.speed)
})
</script>
