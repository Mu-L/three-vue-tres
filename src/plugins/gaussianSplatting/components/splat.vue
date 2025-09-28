<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-16 08:31:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 17:13:15
-->
<template>
    <primitive :object="toRaw(modelSplat)" />
</template>

<script setup lang="ts">
import { watch, onUnmounted, ref, toRaw } from 'vue'
import { useTres } from '@tresjs/core'
import { Splat, SplatLoader } from '@pmndrs/vanilla'

const props = defineProps({
    url: {
        type: String,
        default: './plugins/gaussianSplatting/model/luigi.splat',
    },
})

const { camera, renderer } = useTres() as any

const loader = new SplatLoader(renderer)

let oneSplat = await loader.loadAsync(props.url)

const modelSplat = ref(null) as any

modelSplat.value = new Splat(oneSplat, camera.value, { alphaTest: 0.1 })
watch(
    () => props.url,
    async (url) => {
        url && (oneSplat = await loader.loadAsync(url))
        disposeThis()
        modelSplat.value = new Splat(oneSplat, camera.value, { alphaTest: 0.1 })
    },
)

const disposeThis = () => {
    if (modelSplat.value) {
        modelSplat.value.geometry.dispose()
        if (modelSplat.value.material) {
            ;(modelSplat.value.material as any).dispose()
        }
    }
}   
onUnmounted(() => {
    disposeThis()
})
</script>
