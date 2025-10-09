<template>
    <TresCanvas v-bind="state" window-size @loop="onLoop">
        <TresPerspectiveCamera :position="[15, 15, 15]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls makeDefault />
        <TresAmbientLight :intensity="0.5" />

        <TresMesh ref="sphereRef" :position="[0, 4, 0]" cast-shadow>
            <TresSphereGeometry :args="[2, 32, 32]" />
            <TresMeshToonMaterial color="#006060" />
        </TresMesh>

        <TresMesh ref="sphereRef2" :position="[4, 4, 0]" cast-shadow>
            <TresSphereGeometry :args="[2, 32, 32]" />
            <TresMeshToonMaterial color="#006060" />
        </TresMesh>

        <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
            <TresPlaneGeometry :args="[20, 20, 20, 20]" />
            <TresMeshToonMaterial />
        </TresMesh>

        <TresDirectionalLight ref="TDirectionalLight" :position="[10, 8, 4]" :intensity="1" cast-shadow />
        <TresDirectionalLight :position="[10, 2, 4]" :intensity="1" cast-shadow />

        <TresGridHelper />

        <viewportGizmo v-bind="viewportConfig" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, shallowRef, watchEffect } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { viewportGizmo } from 'PLS/useViewportGizmo'

const darkColors = {
    color: 0x333333,
    labelColor: 0xdddddd,
    hover: {
        color: 0x4bac84,
        labelColor: 0xffffff,
    },
}
const viewportConfig = {
    size: 300,
    lineWidth: 2,
    type: 'cube',
    background: {
        color: 0x444444,
        hover: { color: 0x444444 },
    },
    x: {
        label: '  右  ',
        ...darkColors,
    },
    y: {
        label: '上',
        ...darkColors,
    },
    z: {
        label: '前',
        ...darkColors,
    },
    nx: {
        label: '左',
        ...darkColors,
    },
    ny: {
        label: '下',
        ...darkColors,
    },
    nz: {
        label: '后',
        ...darkColors,
    },
}
const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const sphereRef = ref()
const sphereRef2 = ref()
const TDirectionalLight = shallowRef()

const onLoop = ({ elapsed }: { elapsed: number }) => {
    if (!sphereRef.value) return
    sphereRef.value.position.y += Math.sin(elapsed) * 0.01
    sphereRef2.value.position.y += Math.sin(elapsed) * 0.01
}

watchEffect(() => {
    if (TDirectionalLight.value) {
        TDirectionalLight.value.shadow.mapSize.set(1000, 1000)
        TDirectionalLight.value.shadow.camera.near = 0.5
        TDirectionalLight.value.shadow.camera.far = 50000
        TDirectionalLight.value.shadow.camera.top = 20
        TDirectionalLight.value.shadow.camera.right = 20
        TDirectionalLight.value.shadow.camera.left = -20
        TDirectionalLight.value.shadow.camera.bottom = -20
    }
})
</script>
