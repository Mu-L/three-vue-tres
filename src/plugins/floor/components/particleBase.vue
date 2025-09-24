<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-07 16:27:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-23 17:15:18
-->
<script setup lang="ts">
import { UseTexture } from '@tresjs/cientos'
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
            <UseTexture v-slot="{ state: texture }" path="./plugins/digitalCity/image/cilcle.png">
                <Precipitation :renderOrder="2001"
                    :position="[0, areaY / 2, 0]"
                    :speed="speed"
                    :color="color"
                    :area="[areaX, areaY, areaZ]"
                    :count="count"
                    :depthWrite="false"
                    :randomness="randomness"
                    :size="size"
                    transparent
                    :opacity="opacity"
                    :map="texture"
                />
            </UseTexture>
        </Suspense>
    </TresGroup>
</template>
