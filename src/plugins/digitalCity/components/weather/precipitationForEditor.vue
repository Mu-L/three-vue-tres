<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useTexture } from '@tresjs/core'
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
        type?: string
        color?: string
    }>(),
    {
        speed: 12,
        randomness: 0,
        count: 6000,
        size: 7,
        areaX: 500,
        areaY: 300,
        areaZ: 500,
        color: '#fff',
        type: 'snow', // snow rain point
    },
)

const imgList = {
    snow: './plugins/digitalCity/image/snow.png',
    rain: './plugins/digitalCity/image/rain2.png',
    cilcle: './plugins/digitalCity/image/cilcle.png',
} as any
const texture = reactive({}) as any
if (imgList[props.type]) {
    texture.value = await useTexture({ map: imgList[props.type] })
}
const precipitationRef = ref()
watch(
    () => props.type,
    async (nv, ov) => {
        if (nv != ov) {
            if (texture.value?.map) {
                texture.value.map.dispose()
            }
            texture.value = await useTexture({ map: imgList[nv] ? imgList[nv] : imgList.cilcle })
        }
    },
)
</script>

<template>
    <Precipitation
        ref="precipitationRef"
        :position="[0, (props.areaY * 1) / 4, 0]"
        :speed="props.speed"
        :color="props.color"
        :alphaTest="0.5"
        :area="[props.areaX, props.areaY, props.areaZ]"
        :count="props.count"
        :depthWrite="true"
        :randomness="props.randomness"
        :size="props.size"
        :opacity="1.0"
        :map="texture.value.map"
        :alphaMap="texture.value.map"
        :renderOrder="999999"
    />
</template>
