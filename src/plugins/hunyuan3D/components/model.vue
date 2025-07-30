<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 15:31:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-30 10:35:07
-->
<template>
    <TresGroup v-if="model" :scale="0.5">
        <TresMesh :position="model.position" :rotation="model.rotation" :scale="model.scale" :geometry="model.geometry" cast-shadow>
            <materialDiy />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useGLTF } from '@tresjs/cientos'
import { useMaterialDiyStore } from 'PLS/hunyuan3D/stores/index'
import materialDiy from './materialDiy.vue'
import { loadGLTFBufferIntoScene } from 'PLS/hunyuan3D/common/util'

const model = ref(null as any)
const materialDiyStore = useMaterialDiyStore()

watch(
    () => materialDiyStore.curModelArrayBuffer,
    async (ab) => {
        if (ab) {
            const gltfModel = await loadGLTFBufferIntoScene(ab)
            model.value = gltfModel.scene.children[0].children[0] as any
        } else {
            model.value = null
        }
    },
    { immediate: true },
)

// const arrayBuffer = await loadArrayBufferFromRelativePath('./plugins/hunyuan3D/model/icegl-bm.glb')
// if (arrayBuffer) {
//     const gltfModel = await loadGLTFBufferIntoScene(arrayBuffer)
//     model.value = gltfModel.scene.children[0].children[0] as any
// }

// const { scene } = await useGLTF('./plugins/hunyuan3D/model/icegl-bm.glb', {
//     draco: true,
//     decoderPath: './draco/',
// })
// const model = scene.children[0].children[0] as any
</script>
