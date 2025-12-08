
<template>
<TresGroup :position="[0, -0.002, 0]">
		<Suspense>
		<gerstnerWater v-bind="fState" />
			</Suspense>
		</TresGroup>
		
</template>

<script setup lang="ts">
import { gridPlus, whiteFloorMesh, reflectorShaderMesh, reflectorDUDV, digitalGround, rubberTiles, rippleFloor } from 'PLS/floor'
import { gerstnerWater } from 'PLS/water'
import { iceFloor } from 'PLS/water'

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
		