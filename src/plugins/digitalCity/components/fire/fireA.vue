<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 16:54:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 13:39:41
-->
<script setup lang="ts">
import { watch, watchEffect, useAttrs } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { Vector4, Color, Matrix4, Vector3, DoubleSide } from 'three'
import vertex from '../../shaders/fireA.vert'
import fragment from '../../shaders/fireA.frag'

const props = withDefaults(
  defineProps<{
    fireScale?: number
    magnitude?: number
    lacunarity?: number
    gain?: number
  }>(),
  {
    fireScale: 60.0,
    magnitude: 1.3,
    lacunarity: 2.0,
    gain: 1.0,
  }
)

const { state: fireTex } = useTexture('./plugins/digitalCity/image/fire.png')
const attrs = useAttrs()
const fireShader = {
  defines: {
    ITERATIONS: '20',
    OCTIVES: '3',
  },
  uniforms: {
    fireScale: { value: props.fireScale },
    offsetPositin: { value: attrs.position },
    fireTex: { value: null },
    color: { value: new Color(0xffffff) },
    time: { value: 0.0 },
    seed: { value: Math.random() * 19.19 },
    invModelMatrix: { value: new Matrix4() },
    scale: { value: new Vector3(1, 1, 1) },
    noiseScale: { value: new Vector4(1, 2, 1, 0.3) },
    magnitude: { value: props.magnitude },
    lacunarity: { value: props.lacunarity },
    gain: { value: props.gain },
  },
  vertexShader: vertex,
  fragmentShader: fragment,
  transparent: true,
  depthWrite: true,
  depthTest: true,
  side: DoubleSide,
}

watch(
  () => fireTex.value,
  (mapv) => {
    if (!mapv) return
    fireShader.uniforms.fireTex.value = mapv
  }
)

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  fireShader.uniforms.time.value += 0.01
})

watchEffect(() => {
  if (props.fireScale) {
    fireShader.uniforms.fireScale.value = props.fireScale
  }
  if (props.magnitude) {
    fireShader.uniforms.magnitude.value = props.magnitude
  }
  if (props.lacunarity) {
    fireShader.uniforms.lacunarity.value = props.lacunarity
  }
  if (props.gain) {
    fireShader.uniforms.gain.value = props.gain
  }
})
</script>

<template>
  <TresMesh :scale="props.fireScale" :renderOrder="9999">
    <TresSphereGeometry :args="[1, 32, 16]" />
    <TresShaderMaterial v-bind="fireShader" />
  </TresMesh>
</template>
