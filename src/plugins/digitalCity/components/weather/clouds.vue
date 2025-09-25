<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop, useTres } from '@tresjs/core'
import { Clouds, Cloud } from '@pmndrs/vanilla'
import * as THREE from 'three'

const props = withDefaults(
  defineProps<{
    color?: string
    segments?: number
    volume?: number
    opacity?: number
    seed?: number
    fade?: number
    growth?: number
    speed?: number
    bounds?: {
      x: number
      y: number
      z: number
    }
  }>(),
  {
    color: '#ffffff',
    segments: 20,
    volume: 6,
    opacity: 1.0,
    seed: 0,
    fade: 10,
    growth: 4,
    speed: 0,
    bounds: {
      x: 5,
      y: 1,
      z: 1,
    },
  },
)

// ---------- 纹理加载 (cientos v4) ----------
const { state: cloudTex } = useTexture('./plugins/digitalCity/image/cloud.png')

// ---------- 创建云层 ----------
const clouds = new Clouds({
  texture: undefined, // 先占位，等纹理加载好再赋值
  material: THREE.MeshBasicMaterial,
  frustumCulled: false,
})

const cloud0 = new Cloud({ color: new THREE.Color(props.color) })
clouds.add(cloud0)

// ---------- 监听纹理加载后赋值 ----------
watch(
  () => cloudTex.value,
  (mapv) => {
    if (mapv) {
      clouds.texture = mapv
    }
  },
  { immediate: true },
)

// ---------- Tres 上下文 ----------
const { camera } = useTres()

// ---------- 渲染循环 ----------
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta, elapsed }) => {
  if (camera.value) {
    clouds.update(camera.value, elapsed, delta)
  }
})

// ---------- 属性变化监听 ----------
watch(
  () => props.color,
  (value) => {
    cloud0.color.set(value)
  },
)

watchEffect(() => {
  if (props.segments) cloud0.segments = props.segments
  if (props.volume) cloud0.volume = props.volume
  if (props.opacity) cloud0.opacity = props.opacity
  if (props.seed) cloud0.seed = props.seed
  if (props.fade) cloud0.fade = props.fade
  if (props.growth) cloud0.growth = props.growth
  if (props.speed) cloud0.speed = props.speed
  if (props.bounds) {
    cloud0.bounds.x = props.bounds.x
    cloud0.bounds.y = props.bounds.y
    cloud0.bounds.z = props.bounds.z
  }
  cloud0.updateCloud()
})
</script>

<template>
  <primitive :object="clouds" :renderOrder="3000" />
</template>
