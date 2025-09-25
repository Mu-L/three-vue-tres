<script setup lang="ts">
import { watchEffect } from 'vue'
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

// ---------- 纹理加载 (cientos v4) ----------
const { state: fireTex } = useTexture('./plugins/digitalCity/image/fire.png')

// ---------- Shader 材质 ----------
const fireShader = {
  defines: {
    ITERATIONS: '20',
    OCTIVES: '3',
  },
  uniforms: {
    fireScale: { value: props.fireScale },
    offsetPositin: { value: 0 },
    fireTex: { value: null }, // 先占位，纹理加载后赋值
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

// ---------- 纹理加载完成后赋值 ----------
watchEffect(() => {
  if (fireTex.value) {
    fireShader.uniforms.fireTex.value = fireTex.value
  }
})

// ---------- 渲染循环 ----------
const { onRender } = useLoop()
onRender(() => {
  fireShader.uniforms.time.value += 0.01
})

// ---------- props 变化监听 ----------
watchEffect(() => {
  if (props.fireScale !== undefined) fireShader.uniforms.fireScale.value = props.fireScale
  if (props.magnitude !== undefined) fireShader.uniforms.magnitude.value = props.magnitude
  if (props.lacunarity !== undefined) fireShader.uniforms.lacunarity.value = props.lacunarity
  if (props.gain !== undefined) fireShader.uniforms.gain.value = props.gain
})
</script>

<template>
  <TresMesh :position="[100, 19, 0]" :renderOrder="9999">
    <TresSphereGeometry :args="[1, 32, 16]" />
    <!-- <TresBoxGeometry :args="[1, 1, 1]" /> -->
    <TresShaderMaterial v-bind="fireShader" />
  </TresMesh>
</template>
