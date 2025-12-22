<script setup lang="ts">
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { shallowRef, watch, useAttrs } from 'vue'
import * as THREE from 'three'

interface CustomShaderMaterialProps {
	baseMaterial?: string
	vertexShader?: string
	fragmentShader?: string
	uniforms?: { [uniform: string]: any }
}
const attrs = useAttrs()
const props = defineProps<CustomShaderMaterialProps>()
const material = shallowRef(null) as any
watch(() => props.baseMaterial, (bm) => {
	if (material.value) {
		material.value.dispose()
  }
	material.value = new CustomShaderMaterial({
		baseMaterial: THREE[bm as keyof typeof THREE],
		vertexShader: props.vertexShader,
		fragmentShader: props.fragmentShader,
		uniforms: props.uniforms,
	})
}, { immediate: true })
watch(
  () => ({ ...attrs }),
  (newAttrs : any) => {
    const mat = material.value
    if (!mat) return

    Object.keys(newAttrs).forEach((key) => {
      // 1️⃣ three 材质必须真实存在该属性
      if (!(key in mat)) return

      const value = (newAttrs as any)[key]

      // 2️⃣ 过滤 Vue attrs 中的无意义 true
      // （如 <Comp foo />，但 three 中 foo 不是 boolean）
      if (
        value === true &&
        typeof (mat as any)[key] !== 'boolean'
      ) {
        return
      }

      // 3️⃣ 值真的发生变化才赋值（避免无意义更新）
      if ((mat as any)[key] !== value) {
        ;(mat as any)[key] = value
        mat.needsUpdate = true
      }
    })
  },
  {
    immediate: true,
    deep: false, // attrs 本身不需要 deep
  }
)
</script>

<template>
	<primitive :object="material" />
</template>
