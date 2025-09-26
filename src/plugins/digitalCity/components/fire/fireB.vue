<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-08-24 22:59:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 13:45:53
-->
<script setup lang="ts">
import { watch, ref, toRaw } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

// ---------- 纹理加载 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/smokeparticle.png')

let particleGroup = null as any
const objCloud = ref<THREE.Mesh | null>(null)
watch(
  () => pTexture.value,
  (mapv) => {
    if (!mapv) return
    particleGroup = new SPE.Group({
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      texture: {
        value: mapv
      },
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

    objCloud.value = particleGroup.mesh

  })


const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  particleGroup?.tick()
})
</script>

<template>
  <primitive v-if="objCloud" :object="toRaw(objCloud)" :renderOrder="3001" />
</template>
