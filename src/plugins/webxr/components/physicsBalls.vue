<template>
    <TresMesh name="floor" :position="[0, -1, 0]" :geometry="geometry" :material="material" :userData="userDataConfig"></TresMesh>
    <TresMesh name="wallPX" :position="[4, 3, 0]" :rotation-z="Math.PI / 2" :geometry="geometry" :material="material" :userData="userDataConfig"></TresMesh>
    <TresMesh name="wallNX" :position="[-4, 3, 0]" :rotation-z="Math.PI / 2" :geometry="geometry" :material="material" :userData="userDataConfig"></TresMesh>
    <TresMesh name="wallPZ" :position="[0, 3, 4]" :rotation-x="Math.PI / 2" :geometry="geometry" :material="material" :userData="userDataConfig"></TresMesh>
    <TresMesh name="wallNZ" :position="[0, 3, -4]" :rotation-x="Math.PI / 2" :geometry="geometry" :material="material" :userData="userDataConfig"></TresMesh>

    <primitive :object="spheres" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'
// import { RapierPhysics } from 'three/examples/jsm/physics/RapierPhysics'
import { RapierPhysics } from '../lib/RapierPhysics'

const props = defineProps({
    XRcom: {
        default: null as any,
    },
})

const geometry = new THREE.BoxGeometry(6, 2, 6)
const material = new THREE.MeshNormalMaterial({ visible: false })
const userDataConfig = { physics: { mass: 0 } }

const spheresGeometry = new THREE.IcosahedronGeometry(0.08, 3)
const spheresMaterial = new THREE.MeshLambertMaterial()
const spheres = new THREE.InstancedMesh(spheresGeometry, spheresMaterial, 800)
spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage) // will be updated every frame
spheres.userData.physics = { mass: 1, restitution: 1.1 }

const matrix = new THREE.Matrix4()
const color = new THREE.Color()
for (let i = 0; i < spheres.count; i++) {
    const x = Math.random() * 4 - 2
    const y = Math.random() * 4
    const z = Math.random() * 4 - 2

    matrix.setPosition(x, y, z)
    spheres.setMatrixAt(i, matrix)
    spheres.setColorAt(i, color.setHex(0xffffff * Math.random()))
}

const { scene } = useTresContext() as any

const physics = await RapierPhysics()
onMounted(() => {
	physics.addScene(scene.value)
})

let count = 0
const velocity = new THREE.Vector3()
function handleController(controller: any) {
    if (controller.userData.isSelecting) {
        physics.setMeshPosition(spheres, controller.position, count)

        velocity.x = (Math.random() - 0.5) * 2
        velocity.y = (Math.random() - 0.5) * 2
        velocity.z = Math.random() - 9
        velocity.applyQuaternion(controller.quaternion)

        physics.setMeshVelocity(spheres, velocity, count)

        if (++count === spheres.count) count = 0
    }
}
props.XRcom.onBeforeLoop(() => {
    handleController(props.XRcom.controller0)
    handleController(props.XRcom.controller1)
})
</script>
