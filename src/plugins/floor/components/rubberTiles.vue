<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-05 09:50:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-07 09:47:09
-->
<template>
    <TresGroup>
        <TresMesh :rotateX="-Math.PI / 2" :receiveShadow="receiveShadow">
            <TresPlaneGeometry :args="[10, 10]" />
            <TresMeshStandardMaterial
                :color="props.color"
                :map="pTexture[0]"
                :normalMap="pTexture[1]"
                :metalnessMap="pTexture[2]"
                :roughnessMap="pTexture[2]"
                :metalness="metalness"
                :roughness="roughness"
                :normalScale="normalScale"
                :side="THREE.DoubleSide"
            />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useTexture } from '@tresjs/core'

const props = withDefaults(
    defineProps<{
        color?: string
        repeat?: any
        metalness?: number
        roughness?: number
        normalScale?: number
        receiveShadow?: boolean
    }>(),
    {
        color: '#FFFFFF',
        repeat: { x: 1, y: 1 },
        metalness: 1,
        roughness: 0.66,
        normalScale: 1,
        receiveShadow:false
    },
)

const pTexture = await useTexture([
    './plugins/floor/image/rubber_tiles_diff_1k.jpg',
    './plugins/floor/image/rubber_tiles_nor_gl_1k.jpg',
    './plugins/floor/image/rubber_tiles_arm_1k.jpg',
])

for (let i = 0; i < pTexture.length; i++) {
    pTexture[i].colorSpace = THREE.LinearSRGBColorSpace
    pTexture[i].wrapS = THREE.RepeatWrapping
    pTexture[i].wrapT = THREE.RepeatWrapping
    pTexture[i].magFilter = THREE.LinearFilter
    pTexture[i].minFilter = THREE.LinearMipmapLinearFilter
    pTexture[i].repeat.set(props.repeat.x, props.repeat.y)
}

watch(
    () => props.repeat,
    (repeat) => {
        for (let i = 0; i < pTexture.length; i++) {
            pTexture[i].repeat.set(repeat.x, repeat.y)
        }
    },
    { deep: true },
)
</script>
