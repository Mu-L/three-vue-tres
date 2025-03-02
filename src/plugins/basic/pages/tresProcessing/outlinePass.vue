<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-02 09:49:31
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-02 10:36:33
-->
<script setup lang="ts">
import { BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
import * as THREE from 'three'

const outlinedObjects = ref<THREE.Object3D[]>([])

const gl = {
    clearColor: '#121212',
}

function onClick(ev) {
    if (ev) {
        let hasIndex = -1
        const outlinedObjectsArr = [...outlinedObjects.value]
        outlinedObjectsArr.forEach((obj, index) => {
            if (obj.uuid === ev.object.uuid) {
                hasIndex = index
            }
        })
        if (hasIndex !== -1) {
            outlinedObjectsArr.splice(hasIndex, 1)
        } else {
            outlinedObjectsArr.push(ev.object)
        }
        outlinedObjects.value = outlinedObjectsArr
        console.log('outlinedObjects', outlinedObjects.value)
    }
}
</script>

<template>
    <TresCanvas window-size v-bind="gl">
        <TresPerspectiveCamera :position="[10, 10, 10]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <TresMesh :position="[-5, 0, 0]" @click="onClick" :scale="2">
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshNormalMaterial />
        </TresMesh>

        <TresMesh :position="[1, 0.5, 1]" @click="onClick">
            <TresBoxGeometry />
            <TresMeshStandardMaterial color="hotpink" />
        </TresMesh>

        <TresGroup @click="onClick">
            <TresMesh :position="[2.5, 1.75, 2]">
                <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
                <TresMeshStandardMaterial color="green" />
            </TresMesh>
            <TresMesh :position="[-1.5, 0.75, 0]">
                <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
                <TresMeshStandardMaterial color="aqua" />
            </TresMesh>
        </TresGroup>

        <EffectComposerPmndrs>
            <OutlinePmndrs :outlinedObjects="outlinedObjects" :edge-strength="20000000" :pulse-speed="1" visible-edge-color="#ffff00" />
        </EffectComposerPmndrs>
    </TresCanvas>
</template>
