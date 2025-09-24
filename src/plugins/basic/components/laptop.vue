<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-06 11:18:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-24 17:15:51
-->

<template>
    <Levioso>
        <primitive v-if="pState" :object="pState?.scene">
            <Html transform wrapper-class="webpage" :distance-factor="1.1" :position="[0, 1.6, -1.4]" occlude :rotation-x="-0.256">
                <iframe class="rounded-lg w-[1024px] h-[670px]" src="https://www.icegl.cn" frameborder="0" />
            </Html>
        </primitive>
    </Levioso>
</template>

<script setup lang="ts">
import { Html, useGLTF, Levioso } from '@tresjs/cientos'

const { state: pState } = useGLTF('./plugins/basic/htmls/model/model.gltf', { draco: true, decoderPath: './draco/' })
</script>
