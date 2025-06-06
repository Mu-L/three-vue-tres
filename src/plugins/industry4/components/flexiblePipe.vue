<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-06 14:46:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-06 16:36:01
-->
<template>
    <TresMesh>
        <TresTubeGeometry :args="[path, 64, radius, radialSegments, false]" />
        <TresMeshStandardMaterial :color="0x00ff00" :metalness="0.3" :roughness="0.5" :side="THREE.DoubleSide" />
    </TresMesh>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const props = withDefaults(
    defineProps<{
        radius?: number
        bodyLength?: number
        headLength?: number
        headAngle?: number
        radialSegments?: number
        tailAngle?: number
        tailLength?: number
    }>(),
    {
        radius: 0.1,
        bodyLength: 2,
        headLength: 1,
        headAngle: 0,
        radialSegments: 16,
        tailAngle: 0,
        tailLength: 0.5,
    },
)

const halfMid = props.bodyLength / 2
const midStart = new THREE.Vector3(0, 0, -halfMid)
const midEnd = new THREE.Vector3(0, 0, halfMid)
const headRad = THREE.MathUtils.degToRad(props.headAngle)
const headDir = new THREE.Vector3(Math.cos(headRad), Math.sin(headRad), 0)
const headPoint = midEnd.clone().add(headDir.multiplyScalar(props.headLength))
const tailRad = THREE.MathUtils.degToRad(props.tailAngle)
const tailDir = new THREE.Vector3(Math.cos(tailRad), Math.sin(tailRad), 0)
const tailPoint = midStart.clone().add(tailDir.multiplyScalar(props.tailLength))
const path = new THREE.CurvePath() as any
path.add(new THREE.LineCurve3(tailPoint, midStart))
path.add(new THREE.LineCurve3(midStart, midEnd))
path.add(new THREE.LineCurve3(midEnd, headPoint))
</script>
