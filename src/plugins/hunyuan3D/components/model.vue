<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 15:31:45
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 10:55:03
-->
<template>
    <TresGroup>
        <TresMesh :position="model.position" :rotation="model.rotation" :scale="model.scale" :geometry="model.geometry" cast-shadow>
            <materialDiy />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import materialDiy from './materialDiy.vue'

const { scene } = await useGLTF('./plugins/hunyuan3D/model/icegl-bm.glb', {
    draco: true,
    decoderPath: './draco/',
})

const model = scene.children[0].children[0] as any
</script>
