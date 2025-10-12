<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-02 08:21:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-18 16:17:23
-->
<template>
   <primitive :object="pState?.scene" v-if="pState"/>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useGLTF } from '@tresjs/cientos'

const { state: pState  } = await useGLTF(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn' }/model/operationTool/湖中小亭/湖中小亭.gltf`)

onMounted(() => {})
watchEffect(() => {})
</script>
<style>
.selectBox {
    border: 1px solid #55aaff;
    background-color: rgba(75, 160, 255, 0.3);
    position: fixed;
}
</style>
