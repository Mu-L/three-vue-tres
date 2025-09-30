<template>
    <TresCanvas clearColor="#201919" v-bind="state" :renderer="createWebGPURenderer">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[60, 60, 60]" :look-at="[0, 0, 0]" />
        <TresDirectionalLight :intensity="2" :position="[10, 100, -50]" />
        <TresDirectionalLight :intensity="2" :position="[-10, -10, 100]" />
        <OrbitControls v-bind="controlsState" />

        <Suspense>
            <primitive :position-y="5" v-if="model" :object="model" />
        </Suspense>

        <TresGridHelper :args="[50, 50]" :position="[0, 0, 0]" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, watch, ref, toValue, shallowRef, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import type { TresRendererSetupContext } from '@tresjs/core'
import * as THREE from 'three/webgpu'
import { float, vec4 } from 'three/tsl'

const redMaterial = ref()

const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
    const renderer = new THREE.WebGPURenderer({
        canvas: toValue(ctx.canvas),
        // WebGPU specific configuration
        alpha: true,
        antialias: true,
    })
    return renderer
}

const model = shallowRef()

onMounted(async () => {
    const material = new THREE.MeshStandardNodeMaterial()
    material.colorNode = vec4(float(1), float(0), float(0), float(0.5))
    material.transparent = true;
    
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10), 
        material,
    )
    model.value = mesh;
})

watch(redMaterial, (newVal) => {
    if (newVal) {
        console.log('redMaterial', newVal)
    }
})

const state = reactive({
    windowSize: true,
    alpha: true,
    antialias: true,
    clearAlpha: 0,
    disableRender: true,
})

const controlsState = reactive({
    enableDamping: true,
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    makeDefault: true,
})
</script>

<style></style>
