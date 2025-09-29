<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-06 14:46:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 11:00:15
-->
<template>
    <TresMesh :renderOrder="9999">
        <TresTubeGeometry :args="[path, 64, radius, radialSegments, false]" />
        <CustomShaderMaterial
            :baseMaterial="THREE.MeshPhysicalMaterial"
            :color="color"
            :metalness="metalness"
            :roughness="roughness"
            :reflectivity="reflectivity"
            :ior="ior"
            :side="THREE.DoubleSide"
            transparent
            :vertexShader="vertexShader"
            :fragmentShader="fragmentShader"
            :uniforms="uniformData"
        />
    </TresMesh>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import { buildRoundedPath } from '../common/buildFlexiblePipe'

const props = withDefaults(
    defineProps<{
        color?: string
        uGapColor?: string
        radius?: number
        bodyLength?: number
        headLength?: number
        headAngle?: number
        radialSegments?: number
        tailAngle?: number
        tailLength?: number
        filletRadius?: number
        speed?: number
        uStripeScale?: number
        metalness?: number
        roughness?: number
        reflectivity?: number
        ior?: number
    }>(),
    {
        color: '0xff0000',
        uGapColor: '#ffffff',
        radius: 0.1,
        bodyLength: 2,
        headLength: 1,
        headAngle: 0,
        radialSegments: 16,
        tailAngle: 0,
        tailLength: 0.5,
        filletRadius: 0.3,
        speed: 0.01,
        uStripeScale: 10,
        metalness: 0.3,
        roughness: 0.5,
        reflectivity: 0.5,
        ior: 1.5,
    },
)

const path = ref(new THREE.CurvePath()) as any
watch(
    () => [props.bodyLength, props.headLength, props.headAngle, props.tailAngle, props.tailLength, props.filletRadius, props.radialSegments],
    ([bodyLength, headLength, headAngle, tailAngle, tailLength, filletRadius, radialSegments]) => {
        const halfMid = bodyLength / 2
        const midStart = new THREE.Vector3(0, 0, -halfMid)
        const midEnd = new THREE.Vector3(0, 0, halfMid)
        const headRad = THREE.MathUtils.degToRad(headAngle)
        const headDir = new THREE.Vector3(Math.cos(headRad), Math.sin(headRad), 0)
        const headPoint = midEnd.clone().add(headDir.multiplyScalar(headLength))
        const tailRad = THREE.MathUtils.degToRad(tailAngle)
        const tailDir = new THREE.Vector3(Math.cos(tailRad), Math.sin(tailRad), 0)
        const tailPoint = midStart.clone().add(tailDir.multiplyScalar(tailLength))
        const pts = [tailPoint, midStart, midEnd, headPoint]
        path.value = buildRoundedPath(pts, filletRadius, radialSegments)
    },
    { immediate: true },
)

const vertexShader = `
	varying vec2 vUv;
	void main() {
		vUv = vec3( uv, 1 ).xy; 
	}
`
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  uniform vec3 uGapColor;
	uniform float uStripeScale;

	void main() {
		vec2 vUV;  
		vUV=vUv;
		vUV.x+=uTime/uStripeScale;

		float ssColor = smoothstep(.31,.49,fract(vUV.x*uStripeScale));
		vec3 finalColor = mix(uGapColor, csm_DiffuseColor.xyz, ssColor);
    csm_DiffuseColor=vec4(finalColor,1.0);
	}
`
const uniformData = {
    uTime: {
        value: 0,
    },
    uStripeScale: {
        value: 10,
    },
    uGapColor: {
        value: new THREE.Color(props.uGapColor),
    },
} as any

watch(
    () => [props.uGapColor, props.uStripeScale],
    ([uGapColor, uStripeScale]) => {
        uniformData.uStripeScale.value = uStripeScale
        uniformData.uGapColor.value.setStyle(uGapColor)
    },
    { immediate: true },
)

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    uniformData.uTime.value += props.speed
})
</script>
