<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-16 16:18:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-17 10:09:15
-->
<template>
    <primitive :object="controller0">
        <slot name="controller0">
            <TresLine :scale="[1, 1, 5]" :geometry="geometry" />
        </slot>
    </primitive>
    <primitive :object="controller1">
        <slot name="controller1">
            <TresLine :scale="[1, 1, 5]" :geometry="geometry" />
        </slot>
    </primitive>

    <primitive :object="controllerGrip0" />
    <primitive :object="hand0" />

    <primitive :object="controllerGrip1" />
    <primitive :object="hand1" />
</template>

<script setup lang="ts">
// import { shallowRef } from 'vue'
import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import { useTresContext } from '@tresjs/core'
import { createEventHook } from '@vueuse/core'
import type { EventHookOn } from '@vueuse/core'

const props = defineProps({
    sessionInit: {
        default: {
            requiredFeatures: ['hand-tracking'],
        } as any,
    },
})

const { renderer, camera, scene } = useTresContext() as any
renderer.value.xr.enabled = true

const vrButtonDom = VRButton.createButton(renderer.value, props.sessionInit)
vrButtonDom.style.zIndex = '999999'
document.body.appendChild(vrButtonDom)

// controllers
const controller0 = renderer.value.xr.getController(0)
const controller1 = renderer.value.xr.getController(1)

// hand models
const controllerModelFactory = new XRControllerModelFactory()
const handModelFactory = new XRHandModelFactory()

// Hand 0
const controllerGrip0 = renderer.value.xr.getControllerGrip(0)
controllerGrip0.add(controllerModelFactory.createControllerModel(controllerGrip0))
const hand0 = renderer.value.xr.getHand(0)
hand0.add(handModelFactory.createHandModel(hand0))

// Hand 1
const controllerGrip1 = renderer.value.xr.getControllerGrip(1)
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
const hand1 = renderer.value.xr.getHand(1)
hand1.add(handModelFactory.createHandModel(hand1))

const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)])

const onBeforeLoop = createEventHook()
const onAfterLoop = createEventHook()
renderer.value.setAnimationLoop(() => {
    onBeforeLoop.trigger()
    renderer.value.render(scene.value, camera.value)
    onAfterLoop.trigger()
})

defineExpose({
    controller0,
    controller1,
    onBeforeLoop: onBeforeLoop.on,
    onAfterLoop: onAfterLoop.on,
})
export type XRcomType = {
    controller0: any
    controller1: any
    onBeforeLoop: EventHookOn
    onAfterLoop: EventHookOn
}
</script>
