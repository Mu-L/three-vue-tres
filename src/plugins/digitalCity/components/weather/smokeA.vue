<script setup lang="ts">
import { shallowRef, computed, toRefs } from 'vue'
import type { TresColor } from '@tresjs/core'
import { useLoop } from '@tresjs/core'
import { useTexture } from '@tresjs/cientos'
import { useTres } from '@tresjs/core'
import type { Object3D } from 'three'

export interface SmokeProps {
  color?: TresColor
  opacity?: number
  speed?: number
  width?: number
  depth?: number
  segments?: number
  texture?: string
  depthTest?: boolean
}

const props = withDefaults(defineProps<SmokeProps>(), {
  opacity: 0.5,
  speed: 0.4,
  width: 10,
  depth: 1.5,
  segments: 20,
  texture: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png',
  color: '#ffffff',
  depthTest: true,
})

const { width, depth, segments, texture, color, depthTest, opacity, speed } = toRefs(props)

const smokeRef = shallowRef()
const groupRef = shallowRef()

defineExpose({ value: smokeRef })

// ---------- 初始化每片烟雾 ----------
const smoke = [...new Array(segments.value)].map((_, index) => ({
  x: width.value / 2 - Math.random() * width.value,
  y: width.value / 2 - Math.random() * width.value,
  scale: 0.4 + Math.sin(((index + 1) / segments.value) * Math.PI) * ((0.2 + Math.random()) * 10),
  density: Math.max(0.2, Math.random()),
  rotation: Math.max(0.002, 0.005 * Math.random()) * speed.value,
}))

// ---------- opacity 计算函数 ----------
const calculateOpacity = (scale: number, density: number) => (scale / 6) * density * opacity.value

// ---------- 纹理加载 ----------
const { state: map } = useTexture(texture.value)

// ---------- Tres 上下文 ----------
const { renderer, camera } = useTres()
const colorSpace = computed(() => renderer.value?.outputColorSpace)

// ---------- 渲染循环 ----------
const { onRender } = useLoop()
onRender(() => {
  if (smokeRef.value && camera.value && groupRef.value) {
    groupRef.value.children.forEach((child: Object3D, index: number) => {
      child.rotation.z += smoke[index].rotation
    })
  }
})
</script>

<template>
  <TresGroup ref="smokeRef" v-bind="$attrs">
    <TresGroup ref="groupRef" :position="[0, 0, (segments / 2) * depth]">
      <TresMesh
        v-for="({ scale, x, y, density }, index) in smoke"
        :key="index"
        :position="[x, y, -index * depth]"
      >
        <TresPlaneGeometry :scale="[10.0, 10.0, 10.0]" :rotation="[0,0,0]" />
        <TresMeshStandardMaterial
          :map="map.value"
          :depth-test="depthTest"
          :color="color"
          :depth-write="false"
          transparent
          :opacity="calculateOpacity(scale, density)"
        />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>
