<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-27 16:43:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-18 09:13:15
-->
<script setup lang="ts">
import { watch } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import * as THREE from 'three'
import { default as SPE } from '../../common/ShaderParticleEngine/build/SPE'

const props = withDefaults(defineProps<{
  cPosition: Array<number>
}>(), {
  cPosition: [0, 200, 0]
})

// useTexture (cientos v4) -> 返回一个 state ref
const { state: pTexture } = useTexture('./plugins/digitalCity/image/cloud.png')

// 创建 particleGroup（先不传 texture，纹理加载后再注入）
const particleGroup = new SPE.Group({
  // 先不传 texture.value，后面 watch 到纹理时注入
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

// objCloud 对应 SPE 生成的 mesh
const objCloud = particleGroup.mesh

// 当纹理加载后，设置过滤器并注入到 particleGroup.texture.value
watch(
  () => pTexture.value,
  (mapv) => {
    if (!mapv) return
    // 设置过滤（跟原来保持一致）
    mapv.magFilter = THREE.LinearMipMapLinearFilter
    mapv.minFilter = THREE.LinearMipMapLinearFilter

    // 将纹理注入 SPE.Group
    // SPE.Group 中 texture 为 { value: Texture }，确保字段存在再赋值
    try {
      // 如果 particleGroup.texture 存在则直接赋值
      if ((particleGroup as any).texture) {
        ;(particleGroup as any).texture.value = mapv
      } else {
        ;(particleGroup as any).texture = { value: mapv }
      }
    } catch (err) {
      // 容错：如果 SPE 的内部结构有不同，可考虑重新构造 group（此处先打印）
      // eslint-disable-next-line no-console
      console.warn('Failed to set particleGroup texture:', err)
    }
  },
  { immediate: true }
)

// useLoop -> onRender 替代原来的 useRenderLoop.onLoop
const { onRender, onBeforeRender } = useLoop()

onRender(({ delta, elapsedTime }) => {
  // delta 等价于之前的 dt
  particleGroup.tick(delta)
})

// （可选）如果你需要在每帧前做一些操作，使用 onBeforeRender
// onBeforeRender(({ delta, elapsedTime }) => {
//   // ...
// })
</script>

<template>
  <primitive :object="objCloud" :position="cPosition" :renderOrder="3000" />
</template>
