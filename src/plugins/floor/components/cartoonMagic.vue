<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-18 14:32:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-15 10:46:32
-->
<template>
    <TresGroup>
        <primitive :object="batchSystem" />
    </TresGroup>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import * as TQK from 'three.quarks'
import { useLoop, useTresContext } from '@tresjs/core'
import { watch,onUnmounted } from 'vue'

const props = withDefaults(
    defineProps<{
        color?: string
        speed?: number
    }>(),
    {
        color: '#00ffff',
        speed: 1,
    },
)

const getPropsColor = (a: any) => {
    const colorThree = new THREE.Color(props.color)
    const tv4color = new THREE.Vector4(colorThree.r, colorThree.g, colorThree.b, a) as any
    const colorRange = new TQK.ConstantColor(tv4color)
    return colorRange
}

const batchSystem = new TQK.BatchedRenderer()
const loader = new TQK.QuarksLoader()
loader.setCrossOrigin('')

const { scene } = useTresContext()
const emitters = new THREE.Group()
scene.value.add(emitters)
onUnmounted(() => {
    scene.value.remove(emitters)
})
loader.load('./plugins/floor/json/CartoonMagicZone2.json', (obj: any) => {
    obj.traverse((child: THREE.Object3D) => {
        if (child.type === 'ParticleEmitter') {
            // child.scale.setScalar(0.5)
            if (child.name === 'BasicZoneRedEmitter') {
                // 针对最新更新的three.quarks 特殊处理
                child.rotation.set(Math.PI / 2, 0, 0)
            }
            //@ts-ignore
            const childSystem = child.system
            if (childSystem.startSpeed.value === -0.25) {
                childSystem.startSpeed = new TQK.ConstantValue(-0.5)
            }
            childSystem.startColor = getPropsColor(childSystem.startColor.color.w)
            batchSystem.addSystem(childSystem)
        }
    })
    if (obj.type === 'ParticleEmitter') {
        batchSystem.addSystem(obj.system)
    }
    emitters.add(obj)
})

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    batchSystem.update(0.01 * props.speed)
})
watch(
    () => [props.color],
    () => {
        batchSystem.systemToBatchIndex.forEach((value, ps) => {
            ; (ps as any).startColor = getPropsColor((ps as any).startColor.color.w)
        })
    },
)
</script>
