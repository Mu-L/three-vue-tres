<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-10 11:11:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-10 16:25:17
-->
<template>
    <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[10, 5, -8]" :fov="45" :near="0.1" :far="100000" />
        <OrbitControls enableDamping />

        <Suspense>
            <efanModel color="#ff8b04" />
        </Suspense>

        <TresAmbientLight :intensity="2" />
        <TresPointLight :position="[0, 0, 10]" :intensity="1" />
        <TresDirectionalLight :position="[3, 3, 3]" :intensity="3" />
    </TresCanvas>
    <n-message-provider>
        <widthMqtt />
    </n-message-provider>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace } from 'three'
import { NMessageProvider } from 'naive-ui'
import widthMqtt from '../components/widthMqtt.vue'
import efanModel from '../components/efanModel.vue'

const gl = {
    shadows: true,
    alpha: true,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    windowSize: true,
}

const animationPlay = ref(false)
provide('animationPlay', animationPlay)
</script>
<style lang="less">
#tvt-app {
    background-color: #ffffff;
}
</style>
