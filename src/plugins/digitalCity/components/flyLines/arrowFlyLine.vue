<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-10-12 08:13:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 15:08:56
-->
<template>
    <TresMesh :geometry="meshLine._geometry" :material="material" :render-order="99999" />
</template>
<script lang="ts" setup>
import { watch } from 'vue'
import * as THREE from 'three'
import { useTextures } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { MeshLine, MeshLineMaterial } from './THREE.MeshLine.js'

const props = withDefaults(
    defineProps<{
        linePoints?: any
        speed?: number
        style?: number
        color?: string
        opacity?: number
        height?: number
        lineWidth?: number
    }>(),
    {
        linePoints: [
            [500, 0, 500],
            [0, 0, 0],
        ],
        speed: 0.01,
        style: 1,
        color: '#fff',
        opacity: 1,
        height: 330,
        lineWidth: 40,
    },
)

const imgList = [
    './plugins/digitalCity/image/flyLine1.png',
    './plugins/digitalCity/image/flyLine2.png',
    './plugins/digitalCity/image/flyLine3.png',
    './plugins/digitalCity/image/flyLine4.png',
    './plugins/digitalCity/image/flyLine5.png',
]
const { textures: pTexture, isLoading } = useTextures(imgList)
watch([pTexture, isLoading], ([pTexture, isLoading]) => {
    if (pTexture && !isLoading) {
        pTexture.forEach((item) => {
            item.anisotropy = 16
            item.wrapS = THREE.RepeatWrapping
            item.wrapT = THREE.RepeatWrapping
        })
        material.map = pTexture[props.style]
    }
})

const vX = (props.linePoints[1][0] + props.linePoints[0][0]) / 2
const vZ = (props.linePoints[1][2] + props.linePoints[0][2]) / 2
const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3().fromArray(props.linePoints[0]),
    new THREE.Vector3(vX, props.height, vZ),
    new THREE.Vector3(vX, props.height, vZ),
    new THREE.Vector3().fromArray(props.linePoints[1]),
)

const geo = new THREE.BufferGeometry()
geo.setFromPoints(curve.getPoints(100))

const meshLine = new MeshLine()
meshLine.setGeometry(geo)

const material = new MeshLineMaterial({
    color: props.color,
    map: null,
    useMap: true,
    lineWidth: props.lineWidth,
    resolution: new THREE.Vector2(100, 100),
    dashArray: 0, // 破折号之间的长度和间距。(0 -无破折号)
    dashRatio: 0.7, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
    dashOffset: 1,
    transparent: true,
    sizeAttenuation: 1, // 使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
    side: THREE.FrontSide,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    opacity: props.opacity,
}) as any

material.depthWrite = false
material.depthTest = true

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    material.uniforms.offset.value.x -= props.speed
})

watch(
    () => [props.color, props.opacity, props.lineWidth],
    ([color, opacity, lineWidth]) => {
        material.uniforms.color.value.setStyle(color)
        material.uniforms.opacity.value = opacity
        material.uniforms.lineWidth.value = lineWidth
    },
)
</script>
