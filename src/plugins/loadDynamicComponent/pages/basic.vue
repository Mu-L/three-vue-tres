<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-26 15:03:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-31 11:45:19
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" />
        <OrbitControls />
        <component :is="theExperienceCom"></component>
        <TresGridHelper :position-y="0.1" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, shallowRef } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
// @ts-ignore
import { __federation_method_setRemote, __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const theExperienceCom = shallowRef(null)
__federation_method_setRemote('tvt', {
    url: () => Promise.resolve('https://dcser.icegl.cn/assets/remoteEntry.js'),
    format: 'esm',
    from: 'vite'
})
__federation_method_getRemote('tvt', './testBase')
    .then((moduleWraped: any) => __federation_method_unwrapDefault(moduleWraped))
    .then((module: any) => {
        theExperienceCom.value = module
    })

</script>
