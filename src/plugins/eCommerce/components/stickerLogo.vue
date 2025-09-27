<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-17 18:16:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-27 11:16:31
-->
<script setup lang="ts">
import { UseTexture } from '@tresjs/cientos'
import { DoubleSide } from 'three'

</script>
<template>
    <UseTexture v-slot="{ state: texture }" path="./logo.png">
        <TresMesh>
            <TresPlaneGeometry />
            <TresMeshPhysicalMaterial :map="texture" :transparent="true" :clearcoat="1" :roughness="1" :metalness="0.8"
                :side="DoubleSide" />
        </TresMesh>
    </UseTexture>
</template>
