<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-06 15:52:51
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-06 18:28:50
-->
<template>
    <TresMesh :position="[0, 0, -16]">
        <TresPlaneGeometry :args="[16, 10]" />
        <revealEffectMaterial v-bind="$attrs" :texture="texture" />
    </TresMesh>
</template>

<script lang="ts" setup>
import { useVideoTexture } from '@tresjs/cientos'
import revealEffectMaterial from './revealEffectMaterial.vue'

const texture = (await useVideoTexture('./plugins/visualArts/video/vlg.mp4', { loop: true })) || null
</script>
