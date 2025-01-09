<template>
    <TresGroup>
        <brainParticles :brainCurves="brainCurves" :color="particlesColor" :speed="speed" />
        <tubes :brainCurves="brainCurves" :color="tubesColor" />
    </TresGroup>
</template>

<script setup lang="ts">
import { getBrainCurves } from './makeData'
import brainParticles from './brainParticles.vue'
import tubes from './tubes.vue'

const props = defineProps({
    tubesColor: { default: '#194ED8', type: String },
    particlesColor: { default: '#194ED8', type: String },
    speed: { default: 1 },
})

const brainCurves = getBrainCurves() as any
</script>
