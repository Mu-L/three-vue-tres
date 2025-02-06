<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-26 10:11:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-02-06 12:43:53
-->
<template>
    <primitive :object="emitters" />
    <primitive :object="batchSystem" :position="position" :scale="scale" :rotation="rotation" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as TQK from 'three.quarks'
import { Resource } from 'PLS/resourceManager'
import { useRenderLoop } from '@tresjs/core'
import { watch } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
        position?: Array<number>
        scale?: Array<number> | number
        rotation?: Array<number>
    }>(),
    {
        color: '#00ffff',
        position: [0, 0, 0] as any,
        scale: 1,
        rotation: [0, 0, 0] as any,
    },
)

const getPropsColor = (a: number) => {
    const colorThree = new THREE.Color(props.color)
    const tv4color = new THREE.Vector4(colorThree.r, colorThree.g, colorThree.b, a) as any
    const colorRange = new TQK.ConstantColor(tv4color)
    return colorRange
}

const batchSystem = new TQK.BatchedRenderer()
const emitters = new THREE.Group()

const obj = Resource.getItem('CartoonMagicZone.json').clone(true)
obj.traverse((child: any) => {
    if (child.type === 'ParticleEmitter') {
        if (child.name === 'BasicZoneRedEmitter') {
            // 针对最新更新的three.quarks 特殊处理
            child.rotation.set(Math.PI / 2, 0, 0)
        }
        const childSystem = child.system
        childSystem.startColor = getPropsColor(childSystem.startColor.color.w)
        batchSystem.addSystem(childSystem)
    }
})
if (obj.type === 'ParticleEmitter') {
    batchSystem.addSystem(obj.system)
}
// TQK.QuarksUtil.addToBatchRenderer(obj, batchSystem)
// TQK.QuarksUtil.play(obj)
emitters.add(obj)

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    batchSystem.update(delta)
})

watch(
    () => [props.color],
    ([color]) => {
        batchSystem.systemToBatchIndex.forEach((value, ps) => {
            ;(ps as any).startColor = getPropsColor((ps as any).startColor.color.w)
        })
    },
)
</script>
