<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-22 09:55:14
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-22 10:53:54
-->
<template>
    <TresCanvas v-bind="gl" window-size>
        <TresPerspectiveCamera :position="[4, 8, 8]" :fov="60" :near="0.1" />
        <TresAmbientLight :intensity="1.0" />
        <OrbitControls />
        <Suspense>
            <iceFloor />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import iceFloor from '../components/iceFloor.vue'
// import { reactive } from 'vue'
// import { Pane } from 'tweakpane'

const gl = {
    clearColor: '#010A13',
    antialias: true,
}
</script>
