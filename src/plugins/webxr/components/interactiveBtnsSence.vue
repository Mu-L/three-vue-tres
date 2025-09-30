<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-17 11:12:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-30 14:52:08
-->
<template>
    <XRcom ref="XRcomRef"
        :sessionInit="{ optionalFeatures: ['depth-sensing'], depthSensing: { usagePreference: ['gpu-optimized'], dataFormatPreference: [] } }" />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import XRcom from './XRcom.vue'
import type { XRcomType } from './XRcom.vue'
import { useTres } from '@tresjs/core'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh'
import { InteractiveGroup } from 'three/examples/jsm/interactive/InteractiveGroup'

const props = defineProps({
    customWaterState: {
        default: {} as any,
    },
})

const { renderer, camera, scene } = useTres() as any
const XRcomRef = ref<XRcomType | null>(null)
const group = new InteractiveGroup()


const gui = new GUI({ width: 300 })
gui.add(props.customWaterState, 'height', 0.0, 5, 0.1)
gui.add(props.customWaterState, 'Flatshading')
gui.addColor(props.customWaterState, 'waterColor')

function bindUpdate(controller: any, htmlMesh: any) {
    controller.onChange(() => {
        htmlMesh.material.map.update()
    })
}
watch(XRcomRef, (v) => {
    if (!v) {
        return
    }
    group.listenToPointerEvents(renderer, camera.value)
    group.listenToXRControllerEvents(v.controller0)
    group.listenToXRControllerEvents(v.controller1)
    scene.value.add(group)

    const mesh = new HTMLMesh(gui.domElement)
    mesh.position.x = -0.75
    mesh.position.y = 2.1
    mesh.position.z = -1.6
    mesh.rotation.y = Math.PI / 9
    mesh.scale.setScalar(4)
    group.add(mesh)

    bindUpdate(gui, mesh)
})

</script>
