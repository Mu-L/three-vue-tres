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
    <!-- 交互面板已移除 -->
</template>

<script setup lang="ts">
import { reactive, watch, ref, toValue, shallowRef, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import type { TresRendererSetupContext } from '@tresjs/core'
import * as THREE from 'three/webgpu'
import { tsg } from '../utils/tsg'
import { Pane } from 'tweakpane'

const redMaterial = ref()

const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
    const renderer = new THREE.WebGPURenderer({
        canvas: toValue(ctx.canvas),
        alpha: true,
        antialias: true,
    })
    return renderer
}

const model = shallowRef()

const startRef = ref(0);
const lengthRef = ref(10);

onMounted(async () => {
    const tsgStr = await fetch("/plugins/tsl/shader/height-shadow.tsg").then(res => res.text())
    const tsgObj = tsg(tsgStr)

    // tweakpane 面板
    const pane = new Pane({
        title: '参数调节',
    });

    pane.addBinding(startRef, 'value', {
        label: 'Start',
        min: -2,
        max: 2,
        step: 0.1,
    }).on('change', (ev) => {
        tsgObj.uniforms.start.value = ev.value;
    });

    pane.addBinding(lengthRef, 'value', {
        label: 'Length',
        min: 0,
        max: 100,
        step: 0.1,
    }).on('change', (ev) => {
        tsgObj.uniforms.length.value = ev.value;
    });

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
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
