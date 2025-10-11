<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-25 18:19:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-24 08:43:51
-->
<script setup lang="ts">
import { shallowRef, nextTick, onMounted, Ref } from 'vue'
import { MeshTransmissionMaterial, MeshDiscardMaterial } from '@pmndrs/vanilla'
import { useFBO } from 'PLS/basic'
import { useLoop, useTres } from '@tresjs/core'
import { BackSide, DoubleSide } from 'three'
import type { TresObject } from '@tresjs/core'
import type { Camera, Texture, WebGLRenderTarget } from 'three'

const MeshTransmissionMaterialClass = shallowRef()
const { extend, scene, renderer, camera } = useTres()
const parent = shallowRef<TresObject>()

const props = withDefaults(
    defineProps<{
        backside?: boolean
        thickness?: number
        backsideThickness?: number
        fboResolution?: number
    }>(),
    {
        backside: true,
        thickness: 1,
        backsideThickness: 0.5,
        fboResolution: 256,
    },
)

const backsideEnvMapIntensity = 0

extend({ MeshTransmissionMaterial })

function findMeshByMaterialUuid(scene: TresObject, materialUuid: string): TresObject {
    let foundMesh
    scene.traverse((object: TresObject) => {
        if (object.isMesh && object.material && object.material.uuid === materialUuid) {
            foundMesh = object
        }
    })
    return foundMesh as unknown as TresObject
}
const discardMaterial = new MeshDiscardMaterial()
const { onBeforeRender } = useLoop()

const fboBack = useFBO({ width: props.fboResolution, height: props.fboResolution, isLoop: false }) as unknown as Ref<WebGLRenderTarget<Texture>>
const fboMain = useFBO({ width: props.fboResolution, height: props.fboResolution, isLoop: false }) as unknown as Ref<WebGLRenderTarget<Texture>>
onMounted(async () => {
    await nextTick()
    parent.value = findMeshByMaterialUuid(scene.value as unknown as TresObject, MeshTransmissionMaterialClass.value.uuid)
})
let oldBg
let oldEnvMapIntensity
let oldTone
let oldSide
onBeforeRender(({ elapsed }) => {
    if (!MeshTransmissionMaterialClass.value) {
        return
    }
    MeshTransmissionMaterialClass.value.time = elapsed
    if (MeshTransmissionMaterialClass.value.buffer === fboMain.value.texture) {
        if (parent.value) {
            oldTone = renderer.toneMapping
            oldBg = scene.value.background
            oldEnvMapIntensity = MeshTransmissionMaterialClass.value.envMapIntensity
            oldSide = parent.value.material.side

            parent.value.material = discardMaterial

            if (props.backside) {
                renderer.setRenderTarget(fboBack.value)
                renderer.render(scene.value, camera.value as Camera)
                parent.value.material = MeshTransmissionMaterialClass.value
                parent.value.material.thickness = props.backsideThickness
                parent.value.material.buffer = fboBack.value.texture
                parent.value.material.side = BackSide
                parent.value.material.envMapIntensity = backsideEnvMapIntensity
            }
            renderer.setRenderTarget(fboMain.value)
            renderer.render(scene.value, camera.value as Camera)
            parent.value.material.buffer = fboMain.value.texture
            parent.value.material = MeshTransmissionMaterialClass.value
            parent.value.material.thickness = props.thickness
            parent.value.material.side = oldSide
            parent.value.material.envMapIntensity = oldEnvMapIntensity

            scene.value.background = oldBg
            renderer.setRenderTarget(null)
            renderer.toneMapping = oldTone
        }
    }
})

defineExpose({ root: MeshTransmissionMaterialClass, constructor: MeshTransmissionMaterial })
</script>

<template>
    <TresMeshTransmissionMaterial ref="MeshTransmissionMaterialClass" :buffer="fboMain.texture" :side="DoubleSide" />
</template>
