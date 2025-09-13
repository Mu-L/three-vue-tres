<template>
    <TresGroup>
        <Suspense>
            <SVG :scale="0.05" :position="[-1.5, 2, 0]" :src="src" :skipStrokes="skipStrokes" :skipFills="skipFills"  />
        </Suspense>
    </TresGroup>
</template>

<script setup lang="ts">
import { SVG } from '@tresjs/cientos'

const props = defineProps({
    src: {
        default: './plugins/geokit/case-real-3/icons/satellite.svg',
    },
    skipStrokes: {
        default: false,
    },
    skipFills: {
        default: false,
    },
})
</script>
