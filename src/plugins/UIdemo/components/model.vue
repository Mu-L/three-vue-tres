<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 15:29:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 15:19:23
-->

<template>
    <primitive v-if="pState" :object="pState?.scene" />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useGLTF } from '@tresjs/cientos'

const { state: pState } = useGLTF(
    `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/industry4/plane/scene.gltf`,
    { draco: true, decoderPath: './draco/' },
)

watch(
    () => pState.value,
    (state) => {
        if (!state?.scene) return
        //移除地板
        const floor = state.scene.getObjectByName('Floor').removeFromParent()

        //增加阴影产生
        const cubeAvion = state.scene.getObjectByName('Cube006_Avion_0')
        cubeAvion.castShadow = true
    },
)
</script>
