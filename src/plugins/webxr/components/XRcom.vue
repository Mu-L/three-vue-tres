<template>
    <primitive :object="controller1" />
    <primitive :object="controller2" />

    <primitive :object="controllerGrip1" />
    <primitive :object="hand1" />

    <primitive :object="controllerGrip2" />
    <primitive :object="hand2" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
import { useTresContext, useRenderLoop, useLoop } from '@tresjs/core'

const { renderer, camera, scene } = useTresContext() as any
renderer.value.xr.enabled = true

const sessionInit = {
    requiredFeatures: ['hand-tracking'],
}
const vrButtonDom = VRButton.createButton(renderer.value, sessionInit)
document.body.appendChild(vrButtonDom)

// controllers
const controller1 = renderer.value.xr.getController(0)
const controller2 = renderer.value.xr.getController(1)

// hand models
const controllerModelFactory = new XRControllerModelFactory()
const handModelFactory = new XRHandModelFactory()

// Hand 1
const controllerGrip1 = renderer.value.xr.getControllerGrip(0)
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
const hand1 = renderer.value.xr.getHand(0)
hand1.add(handModelFactory.createHandModel(hand1))

// Hand 2
const controllerGrip2 = renderer.value.xr.getControllerGrip(1)
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2))
const hand2 = renderer.value.xr.getHand(1)
hand2.add(handModelFactory.createHandModel(hand2))

const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)])
const line = new THREE.Line(geometry)
line.name = 'line'
line.scale.z = 5
controller1.add(line.clone())
controller2.add(line.clone())

// const { onLoop } = useRenderLoop()

// onLoop(({ delta }) => {
// 	console.log('onLoop delta', delta)
// 	renderer.value.render(scene.value, camera.value)
// })

// const { render } = useLoop()
// render(({ renderer: rrrr, scene:sss, camera: ccc }) => {
//     console.log('render ...')
//     rrrr.render(sss, ccc)
// })
function onWindowResize() {
    if (camera.value) {
        camera.value.aspect = window.innerWidth / window.innerHeight
        camera.value.updateProjectionMatrix()
    }
    renderer.value.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onWindowResize)
onWindowResize()

renderer.value.setAnimationLoop(() => {
    renderer.value.render(scene.value, camera.value)
})
</script>
