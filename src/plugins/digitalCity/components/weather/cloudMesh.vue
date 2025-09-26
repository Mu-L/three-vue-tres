<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 11:12:54
-->
<script setup lang="ts">
import { watch, ref, toRaw } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

const { state: pTexture } = useTexture('./plugins/digitalCity/image/cloud.png')

let particleGroup = null as any
const objCloud = ref<THREE.Mesh | null>(null)
watch(
  () => pTexture.value,
  (mapv) => {
    if (!mapv) return
    mapv.magFilter = THREE.LinearMipMapLinearFilter
    mapv.minFilter = THREE.LinearMipMapLinearFilter

    try {
      // 创建 particleGroup（先不传 texture，纹理加载后再注入）
      particleGroup = new SPE.Group({
        texture: {
          value: mapv
        },
        blending: THREE.NormalBlending,
        // fog: true,
        depthTest: false,
        depthWrite: false,
      })

      // 创建 emitter（配置与原来一致）
      const emitter = new SPE.Emitter({
        type: SPE.distributions.BOX,
        particleCount: 26,
        maxAge: {
          value: 10,
        },
        position: {
          value: new THREE.Vector3(0, 0, 0),
          spread: new THREE.Vector3(2000, 100, 2000),
        },
        velocity: {
          value: new THREE.Vector3(0, 0, 30),
        },
        wiggle: {
          spread: 10,
        },
        size: {
          value: 520,
          spread: [100, 220],
          randomise: true,
        },
        drag: {
          value: 220,
        },
        opacity: {
          value: [0, 1, 0],
          randomise: true,
        },
        color: {
          value: new THREE.Color(1, 1, 1),
          spread: new THREE.Color(0.1, 0.1, 0.1),
        },
        angle: {
          value: [0, Math.PI * 1 / 8],
        },
      })
      particleGroup.addEmitter(emitter)
      objCloud.value = particleGroup.mesh
    } catch (err) {
      console.warn('Failed to set particleGroup texture:', err)
    }
  }
)

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (particleGroup) {
    particleGroup.tick(delta)
  }
})
</script>

<template>
  <primitive v-if="objCloud" :object="toRaw(objCloud)" :position="[0, 200, 0]" :renderOrder="3000" />
</template>
