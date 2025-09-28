<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-25 10:23:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 16:16:46
-->

<template>
    <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="props.size" />
        <TresShaderMaterial v-bind="tsMaterial" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watch, ref } from 'vue'
import { useTexture } from '@tresjs/cientos'
import { getVertexShader, getFragmentShader } from '../shaders/whiteFloor'

const props = withDefaults(
    defineProps<{
        size?: number[]
        color?: string
        shadowColor?: string
        edge?: number
    }>(),
    {
        size: [20, 20],
        color: '#990',
        shadowColor: '#999',
        edge: 0.35,
    },
)

const tmRef = ref() as any
const { state: pTexture } = useTexture('./plugins/floor/image/whiteFloor.jpg')
const tsMaterial = {
    uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib['lights'],
        {
            uColor: { value: new THREE.Color(props.color) },
            uShadowColor: { value: new THREE.Color(props.shadowColor) },
            fEdge: { value: props.edge },
            uTexture: { value: null },
        },
    ]),
    side: THREE.DoubleSide,
    vertexShader: getVertexShader(),

    fragmentShader: getFragmentShader(),
    lights: true,
    transparent: true,
}
watch(
    pTexture,
    (texture) => {
        if (texture) {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(6, 3)
            tmRef.value.material.uniforms.uTexture.value = texture
        }
    },
)

watch(
    () => props.edge,
    (newVal) => {
        tsMaterial.uniforms.fEdge.value = newVal
    },
)

watch(
    () => props.color,
    (newVal) => {
        tsMaterial.uniforms.uColor.value = new THREE.Color(props.color)
    },
)
watch(
    () => props.shadowColor,
    (newVal) => {
        tsMaterial.uniforms.uShadowColor.value = new THREE.Color(props.shadowColor)
    },
)
</script>
