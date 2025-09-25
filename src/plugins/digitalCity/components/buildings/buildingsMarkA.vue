<template>
  <TresSprite ref="tsRef" :scale="0.1" renderOrder="99999">
    <TresSpriteMaterial v-bind="smState" :map="pTexture" />
  </TresSprite>
</template>

<script setup lang="ts">
import { reactive, shallowRef, watchEffect } from 'vue'
import { useTexture } from '@tresjs/cientos'

const props = withDefaults(
  defineProps<{
    color?: string
    img: string
    offset?: Array<number>
    foremost?: boolean
    sizeAttenuation?: boolean
  }>(),
  {
    color: '#fff',
    offset: [0.344, 0.394], // 图片偏移量
    foremost: true, // 是否在最前
    sizeAttenuation: false,
  },
)

// ---------- 纹理加载 (cientos v4 写法) ----------
const { state: pTexture } = useTexture(props.img)

// ---------- 材质配置 ----------
const smState = reactive({
  color: props.color,
  transparent: true,
  depthWrite: false,
  sizeAttenuation: props.sizeAttenuation, // 自动缩放
  toneMapped: false,
  depthTest: !props.foremost, // 深度检测 (是否遮挡)
})

// ---------- Sprite 引用 ----------
const tsRef: ShallowRef<TresInstance | null> = shallowRef(null)

// ---------- 根据 props.offset 修改几何体 ----------
watchEffect(() => {
  if (tsRef.value) {
    // 克隆 geometry，避免多个 Sprite 共享
    tsRef.value.geometry = tsRef.value.geometry.clone()
    tsRef.value.geometry.translate(props.offset[0], props.offset[1], 0)
  }
})
</script>
