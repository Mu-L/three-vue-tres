<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-11-26 10:11:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-11-27 11:53:24
-->
<template>
    <loading useResourceManager />
    <TresCanvas clearColor="#201919" window-size>
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />
        <cartoonMagic v-if="Resource.hasAllFinished.value" v-bind="configState" :position="[0, 0, 0]" />
        <cartoonMagic v-if="Resource.hasAllFinished.value" color="red" :position="[3, 0, 0]" :rotation="[-Math.PI, 1, 45]" />
        <cartoonMagic v-if="Resource.hasAllFinished.value" color="green" :position="[-2, 0, 0]" />

        <TresMesh :position="[3, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="red" />
        </TresMesh>
        <TresMesh :position="[-2, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="green" />
        </TresMesh>
        <TresMesh :position="[0, 0, 0]">
            <TresSphereGeometry :args="[1, 32, 32]" />
            <TresMeshBasicMaterial color="white" />
        </TresMesh>

        
        <Suspense>
            <reflectorDUDV :position="[0, -0.5, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as TQK from 'three.quarks'
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { reflectorDUDV } from 'PLS/floor'
import cartoonMagic from '../components/forCustomLoading/cartoonMagic.vue'

const reflectorState = reactive({
    reflectivity: 0.1,
    showGridHelper: true,
    scale: 1,
})
const configState = reactive({
    color: '#ffffff',
    scale: 1,
})

Resource.loaderMapping.QuarksLoader = TQK.QuarksLoader
Resource.loadResources([{ functionName: 'QuarksLoader', url: './plugins/floor/json/CartoonMagicZone.json' }])

const paneControl = new Pane()
paneControl.addBinding(configState, 'color', { label: '颜色' })
paneControl.addBinding(configState, 'scale', {
    label: '大小',
    min: 0.1,
    max: 3.0,
    step: 0.1,
})
</script>
