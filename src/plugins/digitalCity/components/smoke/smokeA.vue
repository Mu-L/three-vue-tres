<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-18 10:12:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 13:12:33
-->
<script setup lang="ts">
import { watch, ref, toRaw } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import SPE from '../../common/ShaderParticleEngine/build/SPE'

// ---------- 纹理加载 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/smokeparticle.png')
let particleGroup = null as any
const objCloud = ref<THREE.Mesh | null>(null)
watch(
  () => pTexture.value,
  (mapv) => {
    if (!mapv) return
    particleGroup = new SPE.Group({
      blending: THREE.NormalBlending,
      texture: {
        value: mapv
      },
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

    objCloud.value = particleGroup.mesh

  })

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (particleGroup) {
    particleGroup.tick(delta)
  }
})
</script>

<template>
  <primitive v-if="objCloud" :object="toRaw(objCloud)" :position="[-130, 26, 20]" :renderOrder="3000" />
</template>
