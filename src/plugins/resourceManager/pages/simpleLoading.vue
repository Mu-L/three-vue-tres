<template>
    <loading useResourceManager />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 0.5, 3]" :fov="75" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight color="#484068" :intensity="1" />
        <TresPointLight color="#1BFFEF" :position="[0, 0, -8]" :intensity="80" cast-shadow />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="3" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048" />
        <Stars :radius="50" :depth="50" :count="5000" :size="0.3" :size-attenuation="true" />

        <Planet v-if="Resource.hasAllFinished.value" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls, Stars } from '@tresjs/cientos'
import { Resource } from 'PLS/resourceManager'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import Planet from '../components/forSimpleLoading/planet.vue'

const state = {
    alpha: false,
    clearColor: '#11101B',
    shadows: true,
    useLegacyLights: true,
}
Resource.loadResources([
    { functionName: 'GLTFLoader', url: './plugins/earthSample/model/lowpolyPlanet/planet.gltf' },
    { functionName: 'GLTFLoader', url: './plugins/earthSample/model/lowpolyPlanet/airplane.gltf' },
    { functionName: 'GLTFLoader', url: './plugins/earthSample/model/lowpolyPlanet/cloud.gltf' },
])
</script>
