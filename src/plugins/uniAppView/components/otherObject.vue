<template>
    <TresPerspectiveCamera :position="[0, 10, 15]" :fov="25" :near="0.1" :far="10000" />
    <OrbitControls autoRotate />
    <TresHemisphereLight :intensity="0.5" />

    <Suspense>
        <reflectorDUDV :position="[0, -1.562, 0]" :reflectivity="2.6" :showGridHelper="false" :scale="1.5" />
    </Suspense>

    <TresMesh :scale="4" :position="[3, -1.161, -1.5]" :rotation="[-Math.PI / 2, 0, Math.PI / 2.5]">
        <TresRingGeometry :args="[0.9, 1, 4, 1]" />
        <TresMeshStandardMaterial color="white" :roughness="0.75" :side="THREE.DoubleSide" />
    </TresMesh>
    <TresMesh :scale="4" :position="[-3, -1.161, -1]" :rotation="[-Math.PI / 2, 0, Math.PI / 2.5]">
        <TresRingGeometry :args="[0.9, 1, 3, 1]" />
        <TresMeshStandardMaterial color="white" :roughness="0.75" :side="THREE.DoubleSide" />
    </TresMesh>

    <Suspense>
        <Environment :resolution="512">
            <Lightformer :intensity="2" :position="[0, 1, 3]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -6]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, -3]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 0]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 3]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 6]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-x="Math.PI / 2" :position="[0, 4, 9]" :scale="[10, 1, 1]" />
            <Lightformer :intensity="2" :rotation-y="Math.PI / 2" :position="[-50, 2, 0]" :scale="[100, 2, 1]" />
            <Lightformer :intensity="2" :rotation-y="-Math.PI / 2" :position="[50, 2, 0]" :scale="[100, 2, 1]" />
            <Lightformer form="ring" color="red" :intensity="10" :scale="2" :position="[10, 5, 10]" />
        </Environment>
    </Suspense>

    <lamboEffect />
</template>
<script setup>
import * as THREE from 'three'
import { reflectorDUDV } from 'PLS/floor'
import lamboEffect from 'PLS/industry4/components/lamboEffect.vue'
import { OrbitControls } from '@tresjs/cientos'
import { Environment, Lightformer } from 'PLS/basic'
</script>
