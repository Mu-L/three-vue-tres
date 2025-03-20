<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-11 15:29:04
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-17 15:19:23
-->

<template>
    <primitive :object="nodes.Sketchfab_model" />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF(
    `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/industry4/plane/scene.gltf`,
    { draco: true, decoderPath: './draco/' },
)

//移除地板
const floor = nodes.Sketchfab_model.getObjectByName('Floor')
floor.removeFromParent()
//增加阴影产生
const cubeAvion = nodes.Sketchfab_model.getObjectByName('Cube006_Avion_0')

cubeAvion.castShadow = true
</script>
