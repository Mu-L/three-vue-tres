<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-08-19 19:07:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-05-15 17:28:34
-->
<template>
    <TresGroup>
        <TresGroup :rotateX="-Math.PI / 2" ref="coneGroup">
            <primitive :object="modelScene" />
            <TresMesh>
                <TresCircleGeometry :args="[floorSize, 32]" />
                <TresMeshStandardMaterial
                    :color="floorColor"
                    :metalness="0.0"
                    :roughness="0.6"
                    transparent
                    :opacity="0.8"
                    :depthTest="props.depthTest"
                    :depthWrite="false"
                    :map="pTexture"
                />
            </TresMesh>
        </TresGroup>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop, useTexture } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'

const props = withDefaults(
    defineProps<{
        anchorColor?: string
        rotateSpeed?: number
        depthTest?: boolean
        floorSize?: number
        floorColor?: string
        floorSpeed?: number
    }>(),
    {
        anchorColor: '#b0ffff',
        rotateSpeed: 0.05,
        floorSize: 12,
        floorColor: '#b0ffff',
        floorSpeed: 0.6,
        depthTest: true,
    },
)

const { scene } = await useGLTF('./plugins/digitalCity/model/coneAnchorB.glb', { draco: true, decoderPath: './draco/' })

const modelScene = scene.clone()
const modelMaterial = modelScene.children[0].material.clone()
modelMaterial.color.set(props.anchorColor)
modelMaterial.metalness = 0.0
modelMaterial.roughness = 0.5
modelMaterial.transparent = true
modelMaterial.opacity = 1
modelMaterial.depthTest = props.depthTest
modelScene.children[0].renderOrder = 0
modelScene.children[0].material = modelMaterial

const { map: pTexture } = await useTexture({
    map: './plugins/digitalCity/image/waveCircle.png',
})
const { width, height } = pTexture.image
pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping
pTexture.repeat.set(1 / (width / height), 1)

watch(
    () => [props.anchorColor, props.depthTest],
    ([color, depthTest]) => {
        modelMaterial.color.set(color)
        modelMaterial.depthTest = depthTest
    },
)

const coneGroup = ref(null) as any
const { onLoop } = useRenderLoop()
let _offset = 0
onLoop(() => {
    coneGroup.value?.children[0].rotateZ(props.rotateSpeed)
    if (pTexture) {
        _offset += props.floorSpeed
        pTexture.offset.x = Math.floor(_offset) / (pTexture.image.width / pTexture.image.height)
    }
})
</script>
