<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-06 14:46:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 10:58:44
-->
<template>
    <TresMesh :renderOrder="9999">
        <TresTubeGeometry :args="[path, 64, radius, radialSegments, false]" />
        <TresMeshBasicMaterial
            ref="tmsmRef"
            :color="color"
            :metalness="0.3"
            :roughness="0.5"
            :side="THREE.DoubleSide"
            transparent
            :map="pTexture ? pTexture : null"
        />
    </TresMesh>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'
import { Resource } from 'PLS/resourceManager'
import { buildRoundedPath } from '../common/buildFlexiblePipe'

const props = withDefaults(
    defineProps<{
        color?: string
        radius?: number
        bodyLength?: number
        headLength?: number
        headAngle?: number
        radialSegments?: number
        tailAngle?: number
        tailLength?: number
        filletRadius?: number
        speed?: number
    }>(),
    {
        color: '0xff0000',
        radius: 0.1,
        bodyLength: 2,
        headLength: 1,
        headAngle: 0,
        radialSegments: 16,
        tailAngle: 0,
        tailLength: 0.5,
        filletRadius: 0.3,
        speed: 0.01,
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

Resource.getResource('TextureLoader', './plugins/digitalCity/image/line.png', 'line.png')
const getResourceTexture = Resource.getReactiveItem('line.png') as any
const pTexture = ref(null) as any
watch(
    getResourceTexture,
    (getResourceTexture) => {
        if (getResourceTexture?.isTexture) {
            pTexture.value = getResourceTexture.clone()
            pTexture.value.wrapS = pTexture.value.wrapT = THREE.RepeatWrapping
            pTexture.value.needsUpdate = true
        }
    },
    { immediate: true },
)

const tmsmRef = ref(null) as any
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    if (pTexture.value) {
        pTexture.value.offset.x -= props.speed
    }
})
</script>
