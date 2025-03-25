<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-27 11:36:30
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-25 09:28:21
-->

<template>
    <TresCanvas clearColor="#201919" window-size antialias>
        <TresPerspectiveCamera :position="[1000, 1000, -100]" :fov="60" :near="1" :far="10000" />
        <OrbitControls enableDamping />

        <cesiumIon3DTile />
        <TresAxesHelper :args="[100]" />
    </TresCanvas>
		<h1 class="text-center text-white w-full absolute">若没加载成功，请更换自己的Cesium-Key</h1>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import cesiumIon3DTile from '../components/cesiumIon3DTile.vue'
</script>
