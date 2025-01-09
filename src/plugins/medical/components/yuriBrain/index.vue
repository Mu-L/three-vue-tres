<template>
    <TresGroup>
        <brainParticles :brainCurves="brainCurves" />
        <tubes :brainCurves="brainCurves" />
    </TresGroup>
</template>

<script setup lang="ts">
import { getBrainCurves } from './makeData'
import brainParticles from './brainParticles.vue'
import tubes from './tubes.vue'

const brainCurves = getBrainCurves() as any
</script>
