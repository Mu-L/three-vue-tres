<template>
    <TresGroup v-if="!isLoading">
        <TresMesh v-for="(layer, index) in visibleLayers" :key="`layer-${index}`" :geometry="layer.geometry"
            :render-order="index">
            <TresMeshBasicMaterial v-bind="layer.material" />
        </TresMesh>
    </TresGroup>

</template>
<script setup lang="ts">
import { onUnmounted, computed, watch, ref } from 'vue'
import { useSVG } from '@tresjs/cientos'

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

const layers = ref([]) as any
const isLoading = ref(true)
let dispose = ref(() => { }) as any

const visibleLayers = computed(() => {
    return layers.value.filter((layer: any) => {
        if (layer.isStroke && !props.skipStrokes) return true
        if (!layer.isStroke && !props.skipFills) return true
        return false
    })
})

watch(() => props.src, (src) => {
    dispose.value()
    const newSvg = useSVG(src)
    isLoading.value = true
    watch(() => newSvg.isLoading.value, (il) => {
        if (!il) {
            layers.value = newSvg.layers.value
            isLoading.value = newSvg.isLoading.value
            dispose.value = newSvg.dispose
        }
    })
}, { immediate: true })

onUnmounted(() => {
    dispose.value()
})
</script>