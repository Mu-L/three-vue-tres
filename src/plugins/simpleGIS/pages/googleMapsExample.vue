<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-25 09:47:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-25 16:52:38
-->
<template>
    <TresCanvas clearColor="#201919" window-size antialias>
        <TresPerspectiveCamera :position="[4800000, 2570000, 14720000]" :fov="60" :near="1" :far="160000000" />
        <googleMaps />
    </TresCanvas>
    <h1 class="text-center text-white w-full absolute">若没加载成功，请自行梯子</h1>
</template>

<script setup lang="ts">
import googleMaps from '../components/googleMaps.vue'
//import { OrbitControls } from '@tresjs/cientos'
//<OrbitControls enableDamping makeDefault />
//<TresPerspectiveCamera :position="[4800000, 2570000, 14720000]" :fov="60" :near="1" :far="160000000" />
</script>
