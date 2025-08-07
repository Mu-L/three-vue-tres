<script setup lang="ts">
import { UseTexture } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'

const props = withDefaults(
    defineProps<{
        speed?: number
        randomness?: number
        count?: number
        size?: number
        areaX?: number
        areaY?: number
        areaZ?: number
        color?: string
        opacity?: number
    }>(),
    {
        speed: 0.1,
        randomness: 1,
        count: 100,
        size: 0.1,
        areaX: 5,
        areaY: 2,
        areaZ: 5,
        color: '#fff',
        opacity: 1.0,
    },
)
</script>
<template>
    <TresGroup>
        <Suspense>
            <UseTexture v-slot="{ textures }" map="./plugins/digitalCity/image/cilcle.png">
                <Precipitation
                    :position="[0, areaY / 2, 0]"
                    :speed="speed"
                    :color="color"
                    :area="[areaX, areaY, areaZ]"
                    :count="count"
                    :depthWrite="true"
                    :randomness="randomness"
                    :size="size"
                    transparent
                    :opacity="opacity"
                    :map="textures.map"
                />
            </UseTexture>
        </Suspense>
    </TresGroup>
</template>
