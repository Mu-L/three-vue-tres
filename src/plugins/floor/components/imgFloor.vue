<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-12 17:42:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 15:52:58
-->
<template>
    <TresMesh v-if="!isLoading" ref="tmRef" :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="props.size" />
        <TresMeshBasicMaterial v-bind="tmsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watch, reactive, ref } from 'vue'
import { useLoop } from '@tresjs/core'
import { useTexture } from '@tresjs/cientos'
const tmRef = ref()
const { onRender } = useLoop()
onRender(() => {
    if (tmRef.value) {
        tmRef.value.rotation.z += props.rotationZ
    }
})

const props = withDefaults(
    defineProps<{
        size?: Array<number>
        imgSrcPath: string
        color?: string
        opacity?: number
        rotationZ?: number
        textureRepeat?: Array<number>
    }>(),
    {
        size: [10, 10],
        color: '#fff',
        opacity: 0.95,
        rotationZ: 0.01,
        textureRepeat: [1, 1],
    },
)

const tmsMaterial = reactive({
    color: props.color,
    map: null as THREE.Texture | null,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: props.opacity,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
})
const { state: pTexture, isLoading } = useTexture(props.imgSrcPath)
watch(
    () => pTexture.value,
    (texture) => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(props.textureRepeat[0], props.textureRepeat[1])
            tmsMaterial.map = texture
        }
    },
)
watch(
    () => props.color,
    (newVal) => {
        tmsMaterial.color = new THREE.Color(newVal)
    },
)
watch(
    () => props.opacity,
    (newVal) => {
        tmsMaterial.opacity = newVal
    },
)
</script>
