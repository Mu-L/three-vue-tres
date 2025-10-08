<template>
    <TresCanvas v-bind="state" :renderer="createWebGPURenderer">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
        <TresDirectionalLight :intensity="2" :position="[10, 100, -50]" />
        <TresDirectionalLight :intensity="2" :position="[-10, -10, 100]" />
        <OrbitControls v-bind="controlsState" />

        <Suspense>
            <primitive :position-y="0" v-if="model" :object="model" />
        </Suspense>

        <TresGridHelper :args="[50, 50]" :position="[0, 0, 0]" />
    </TresCanvas>
    <!-- 交互面板已移除 -->
</template>

<script setup lang="ts">
import { reactive, watch, ref, toValue, shallowRef, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import type { TresRendererSetupContext } from '@tresjs/core'
import * as THREE from 'three/webgpu'
import { tsg } from '../utils/tsg'

const redMaterial = ref()

const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
    const renderer = new THREE.WebGPURenderer({
        canvas: toValue(ctx.canvas),
        alpha: true,
        antialias: true,
    })
    renderer.setClearColor(0x1b1b1b);
    return renderer
}

const model = shallowRef()

onMounted(async () => {
    const tsgStr = await fetch("/plugins/tsl/shader/hologram.tsg").then(res => res.text())

    const tsgObj = tsg(tsgStr)

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1, 32, 32, 32),
        tsgObj.material
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
