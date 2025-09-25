<script setup lang="ts">
import { watch } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import SPE from '../../common/ShaderParticleEngine/build/SPE'

// ---------- 纹理加载 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/smokeparticle.png')

// ---------- 创建 SPE 粒子组 ----------
const particleGroup = new SPE.Group({
  blending: THREE.NormalBlending,
  depthTest: true,
  depthWrite: false,
  // 先不传 texture，纹理加载后赋值
})

// ---------- 创建 Emitter ----------
const emitter = new SPE.Emitter({
  type: SPE.distributions.BOX,
  particleCount: 100,
  maxAge: { value: 4 },
  position: {
    value: new THREE.Vector3(0, 0, 0),
    spread: new THREE.Vector3(2, 0, 2),
    radius: 1,
  },
  velocity: {
    value: new THREE.Vector3(0, 16, 0),
    spread: new THREE.Vector3(12, 40, 12),
    distribution: SPE.distributions.BOX,
  },
  size: {
    value: [200, 100, 100],
    spread: [14, 10, 8],
    randomise: true,
  },
  acceleration: {
    value: new THREE.Vector3(0, 10, 0),
  },
  angle: {
    value: 0,
    spread: 120,
  },
  opacity: {
    value: [0.5, 0.1],
    spread: [0.1, 0],
    randomise: true,
  },
  color: {
    value: new THREE.Color('#333333'),
  },
})

particleGroup.addEmitter(emitter)

// ---------- 获取 mesh ----------
const objSmoke = particleGroup.mesh

// ---------- 纹理加载完成后赋值 ----------
watch(
  () => pTexture.value,
  (mapv) => {
    if (mapv) {
      particleGroup.texture = { value: mapv }
    }
  },
  { immediate: true }
)

// ---------- 渲染循环 ----------
const { onRender } = useLoop()
onRender(({ dt }) => {
  particleGroup.tick(dt)
})
</script>

<template>
  <primitive
    :object="objSmoke"
    :position="[-130, 26, 20]"
    :renderOrder="3000"
  />
</template>
