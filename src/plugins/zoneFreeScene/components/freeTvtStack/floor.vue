
<template>
<gridPlus :args="[3, 3]" v-bind="gridState" :position="[0, 0.1, 0]" />
		<TresGroup :position="[0, -0.002, 0]">
		<Suspense>
		<whiteFloorMesh v-bind="fState" />
			</Suspense>
		</TresGroup>
		
</template>

<script setup lang="ts">
import { gridPlus, whiteFloorMesh, reflectorShaderMesh, reflectorDUDV, digitalGround, rubberTiles } from 'PLS/floor'
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
		