<template>
    <TresCanvas v-bind="state">
        <TresPerspectiveCamera :position="[0, 1.6, 3]" :fov="50" :near="0.1" :far="100" />
        <OrbitControls />
        <TresHemisphereLight :args="[0xbbbbbb, 0x888888, 3]" />
        <TresDirectionalLight :position="[1, 1, 1]" :intensity="3" />

        <ballShooterSence />
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import ballShooterSence from '../components/ballShooterSence.vue'

const state = reactive({
    clearColor: '#444444',
    antialias: true,
    renderMode: 'demand',
    windowSize: true,
})
</script>
