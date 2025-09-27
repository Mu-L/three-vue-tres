<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-17 17:50:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-27 11:17:30
-->
<template>
    <TresMesh :geometry="nodes.Object_4.geometry" :rotation="[Math.PI / 2, 0, 0]" :cast-shadow="true"
        :receive-shadow="true">
        <MeshTransmissionMaterial />
    </TresMesh>
</template>

<script setup lang="ts">
import { useGLTF } from 'PLS/basic'
import MeshTransmissionMaterial from './stickerTransmisionMaterial.vue'

const { nodes } = await useGLTF('./plugins/eCommerce/model/pack.glb')
</script>
