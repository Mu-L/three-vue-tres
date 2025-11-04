<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-11-04 08:52:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-04 10:22:01
-->

<template>
    <shapeConfigurator v-model="shape" />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 10, 5]" :fov="30" :near="1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight color="#ffffff" :intensity="2" />
        <reflectorDUDV :reflectivity="2.6" showGridHelper :position="[0, -0.6, 0]" />
        
        <shapeRenderer :position="[0, 0.5, 0]" :modelValue="shape" />
    </TresCanvas>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { shapeRenderer, shapeConfigurator } from 'PLS/basic'

const state = {
    clearColor: '#000000',
    shadows: true,
    alpha: false,
    antialias: true,
}

const shape = ref({
  type: "Box",
  args: [2, 1, 1],
})

</script>
