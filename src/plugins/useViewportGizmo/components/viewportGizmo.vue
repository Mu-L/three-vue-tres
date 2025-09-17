<template></template>

<script setup lang="ts">
import { watch, toRaw, useAttrs } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import { ViewportGizmo } from '../lib/ViewportGizmo'

const { camera, controls, renderer, sizes } = useTresContext() as any
const attrs = useAttrs()
const viewportConfig = { ...toRaw(attrs) }

const gizmo = new ViewportGizmo(toRaw(camera.value), toRaw(renderer.value), viewportConfig)
watch(
    () => controls.value,
    (cc) => {
        if (cc) {
            gizmo.attachControls(toRaw(cc))
            console.log('gizmo attached to controls')
        }
    },
    { immediate: true },
)
watch(
    [sizes.width, sizes.height],
    () => {
        gizmo.update()
    },
    {
        immediate: true,
    },
)
const { onAfterRender } = useLoop()

onAfterRender(() => {
    gizmo.render()
})
</script>
