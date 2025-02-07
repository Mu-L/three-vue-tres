<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-02-07 16:18:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-02-07 16:48:54
-->
<template>
    <TresMesh :rotate-x="-Math.PI / 2">
        <TresPlaneGeometry :args="[10, 10, 32, 32]" />
        <TresShaderMaterial v-bind="tsm" />
    </TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watchEffect } from 'vue'
import gridFloorVertexShader from '../shaders/gridFloor.vert'
import gridFloorFragmentShader from '../shaders/gridFloor.frag'

const props = defineProps({
    gridColor: {
        default: '#c4d6ff' as any,
    },
    gridThickness: {
        default: 0.02,
    },
    crossColor: {
        default: '#7a91df' as any,
    },
    crossThickness: {
        default: 0.02,
    },
    uCross: {
        default: 0.2,
    },
    floorColor: {
        default: '#ffffff' as any,
    },
})

const tsm = {
    vertexShader: gridFloorVertexShader,
    fragmentShader: gridFloorFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
        uFloorColor: { value: new THREE.Color(props.floorColor) },
        uGridThickness: { value: props.gridThickness },
        uGridColor: { value: new THREE.Color(props.gridColor) },
        uCrossThickness: { value: props.crossThickness },
        uCross: { value: props.uCross },
        uCrossColor: { value: new THREE.Color(props.crossColor) },
    },
}

watchEffect(() => {
    tsm.uniforms.uFloorColor.value.set(props.floorColor)
    tsm.uniforms.uGridColor.value.set(props.gridColor)
    tsm.uniforms.uCrossColor.value.set(props.crossColor)
    tsm.uniforms.uGridThickness.value = props.gridThickness
    tsm.uniforms.uCrossThickness.value = props.crossThickness
    tsm.uniforms.uCross.value = props.uCross
})
</script>
