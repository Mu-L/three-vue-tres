<!--
 * @Description:
 * @Version: 1.668
 * @Autor: Codex
 * @Date: 2026-05-22 09:40:00
 * @LastEditors: Codex
 * @LastEditTime: 2026-05-22 09:40:00
-->
<template>
    <TresCanvas v-bind="canvasState" window-size>
        <TresPerspectiveCamera :position="[6.5, 3.6, 8.5]" :fov="40" :near="0.1" :far="1000" />
        <OrbitControls v-bind="controlsState" />
        <TresAmbientLight :intensity="0.35" />
        <TresDirectionalLight :position="[5, 8, 4]" :intensity="4" />

        <TresGroup>
            <TresMesh :position="[-2.1, 0.05, 0]" cast-shadow>
                <TresSphereGeometry :args="[1.15, 96, 64]" />
                <JumpingBlockMaterial v-bind="materialState" />
            </TresMesh>

            <TresMesh :position="[0.35, -0.05, 0]" :rotation="[0.2, 0.55, 0.1]" cast-shadow>
                <TresBoxGeometry :args="[1.65, 1.65, 1.65, 48, 48, 48]" />
                <JumpingBlockMaterial v-bind="materialState" />
            </TresMesh>

            <TresMesh :position="[2.8, -0.35, 0.2]" :rotation="[0.55, 0.25, 0.1]" cast-shadow>
                <TresTorusKnotGeometry :args="[0.78, 0.23, 220, 32]" />
                <JumpingBlockMaterial v-bind="materialState" />
            </TresMesh>
        </TresGroup>

        <TresMesh :rotation-x="-Math.PI / 2" :position-y="-2.15" receive-shadow>
            <TresCircleGeometry :args="[9, 96]" />
            <TresMeshStandardMaterial color="#050608" :roughness="0.9" :metalness="0.15" />
        </TresMesh>

        <Suspense>
            <Environment :resolution="256" :blur="0.8" background>
                <Lightformer :intensity="5" form="ring" :position="[0, 4, -3]" :scale="[6, 6, 1]" />
                <Lightformer :intensity="3" form="circle" :position="[6, 3, 2]" :scale="[2, 6, 1]" />
                <Lightformer :intensity="3" form="circle" :position="[-6, 2, 1]" :scale="[2, 6, 1]" />
                <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[0, 0.5, -4]" :scale="[12, 0.4, 1]" />
            </Environment>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { ACESFilmicToneMapping } from 'three'
import { onUnmounted, reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import {
    Environment,
    JumpingBlockMaterial,
    Lightformer
} from 'PLS/basic'
import {
    createJumpingBlockMaterialState,
    jumpingBlockMaterialControlGroups,
    jumpingBlockMaterialSchema,
} from '../../components/forCientos/JumpingBlockMaterial/controls'

const canvasState = reactive({
    alpha: true,
    antialias: true,
    toneMapping: ACESFilmicToneMapping,
    clearColor: '#03050a',
})

const controlsState = reactive({
    enableDamping: true,
})

const materialState = reactive(createJumpingBlockMaterialState())
const pane = new Pane({ title: '跳动块动画材质' })

jumpingBlockMaterialControlGroups.forEach((group) => {
    const folder = pane.addFolder({ title: group.title })

    group.fields.forEach((fieldKey) => {
        const config = jumpingBlockMaterialSchema[fieldKey]

        if (config.com === 'ColorPicker') {
            folder.addBinding(materialState, fieldKey, {
                label: config.name,
            })
            return
        }

        if (config.com === 'Select') {
            folder.addBinding(materialState, fieldKey, {
                label: config.name,
                options: config.options,
            })
            return
        }

        folder.addBinding(materialState, fieldKey, {
            label: config.name,
            min: config.min,
            max: config.max,
            step: config.step,
        })
    })
})

onUnmounted(() => {
    pane.dispose()
})
</script>
