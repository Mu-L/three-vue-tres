<script setup lang="ts">
import { watch } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

// ---------- 纹理加载 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/smokeparticle.png')

// ---------- 创建 SPE 粒子组 ----------
const particleGroup = new SPE.Group({
  blending: THREE.AdditiveBlending,
  depthTest: true,
  depthWrite: false,
  // 先不传 texture，纹理加载后赋值
})

// ---------- 创建 Emitter ----------
const emitter = new SPE.Emitter({
  type: SPE.distributions.SPHERE,
  particleCount: 150,
  maxAge: { value: 3 },
  position: {
    value: new THREE.Vector3(0, 0, 0),
    spread: new THREE.Vector3(1, 1, 1),
    radius: 1,
  },
  velocity: {
    value: new THREE.Vector3(0, 20, 0),
    spread: new THREE.Vector3(12, 40, 12),
    distribution: SPE.distributions.BOX,
  },
  size: { value: [200, 100, 10] },
  color: { value: new THREE.Color('#ff0000'), spread: new THREE.Vector3(0.05, 0.05, 0.01) },
})

particleGroup.addEmitter(emitter)

// ---------- 获取 mesh ----------
const objCloud = particleGroup.mesh

// ---------- 纹理加载完成后注入 ----------
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
onRender(() => {
  particleGroup.tick()
})
</script>

<template>
  <primitive :object="objCloud" :renderOrder="3001" />
</template>
