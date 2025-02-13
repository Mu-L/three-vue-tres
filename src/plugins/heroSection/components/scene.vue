<template>
  <TresCanvas
    window-size
    :camera-controls="true"
    shadows
    alpha
    preset="realistic"
  >
    <TresPerspectiveCamera
      :fov="34"
      :position="[0, 0, 3]"
      :look-at="[0, 0, 0]"
    />

      <!-- 基础光照 -->
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
        cast-shadow
      />
  <Suspense>
    <MapModel />
  </Suspense>
  </TresCanvas>
</template>

<script setup>
import { OrbitControls } from '@tresjs/cientos'
import MapModel from './mapModel.vue'
// 可以添加一些交互和动画逻辑
</script>
