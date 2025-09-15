<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-15 10:58:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-15 14:30:52
-->
<template>
    <TresGroup v-if="points">
        <TresMesh :material="material">
            <TresTubeGeometry :args="[path, 16, radius, 8, false]" />
        </TresMesh>
        <TresGroup v-if="hasArrow">
            <TresGroup :rotation-z="Math.PI / 5" :position="[points[1].x, points[1].y, points[1].z]">
                <TresMesh :position="[-points[1].x, -points[1].y, -points[1].z]" :material="material">
                    <TresTubeGeometry :args="[subPath, 16, radius, 8, false]" />
                </TresMesh>
            </TresGroup>
            <TresGroup :rotation-z="-Math.PI / 5" :position="[points[1].x, points[1].y, points[1].z]">
                <TresMesh :position="[-points[1].x, -points[1].y, -points[1].z]" :material="material">
                    <TresTubeGeometry :args="[subPath, 16, radius, 8, false]" />
                </TresMesh>
            </TresGroup>
            <TresMesh :position="points[1]" :material="material">
                <TresSphereGeometry :args="[radius, 16, 16]" />
            </TresMesh>
        </TresGroup>
    </TresGroup>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { watch } from 'vue'

const props = defineProps({
    color: {
        default: '#ffff00',
    },
    hasArrow: {
        default: true,
    },
    radius: {
        default: 0.1,
    },
    length: {
        default: 10,
    },
    cutoffRatio: {
        default: 0.9,
    },
    roughness: {
        default: 0.2,
    },
    metalness: {
        default: 0,
    },
})

let points = null as any
let path = null as any
let subPath = null as any
let material = new THREE.MeshStandardMaterial({ color: props.color, roughness: props.roughness, metalness: props.metalness, side: THREE.DoubleSide })
watch(
    () => props.length,
    (length) => {
        points = [new THREE.Vector3(length / 2, 0, 0), new THREE.Vector3(-length / 2, 0, 0)]
        path = new THREE.CatmullRomCurve3(points)
        subPath = new THREE.CatmullRomCurve3([path.getPointAt(props.cutoffRatio), path.getPointAt(1)])
    },
    { immediate: true },
)
watch(
    () => props.cutoffRatio,
    (cutoffRatio) => {
        subPath = new THREE.CatmullRomCurve3([path.getPointAt(cutoffRatio), path.getPointAt(1)])
    },
)
watch(
    () => [props.color, props.roughness, props.metalness],
    ([color, roughness, metalness]: any) => {
        material.color.set(color)
        material.roughness = roughness
        material.roughness = roughness
    },
)
</script>
