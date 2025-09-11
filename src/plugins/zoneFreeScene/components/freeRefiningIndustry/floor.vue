<template>
    <gridPlus :args="[3, 3]" v-bind="gridState" :position="[0, 0.01, 0]" />
    <TresGroup :position="[0, -0.002, 0]">
        <Suspense>
            <whiteFloorMesh v-bind="fState" />
        </Suspense>
    </TresGroup>
</template>

<script setup lang="ts">
import { gridPlus, whiteFloorMesh } from 'PLS/floor'

const props = withDefaults(
    defineProps<{
        fState?: any
        gridState?: any
    }>(),
    {
        fState: {},
        gridState: {},
    },
)
</script>
