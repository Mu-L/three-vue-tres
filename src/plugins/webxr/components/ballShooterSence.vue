<template>
    <TresLineSegments :position="[0, 3, 0]" :geometry="boxLineGeometry">
        <TresLineBasicMaterial :color="0x808080" />
    </TresLineSegments>
    <XRcom
        ref="XRcomRef"
        :sessionInit="{ optionalFeatures: ['depth-sensing'], depthSensing: { usagePreference: ['gpu-optimized'], dataFormatPreference: [] } }"
    />
    <Suspense>
        <physicsBalls v-if="XRcomRef" :XRcom="XRcomRef" />
    </Suspense>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry'
import physicsBalls from './physicsBalls.vue'
import XRcom from './XRcom.vue'
import type { XRcomType } from './XRcom.vue'

const boxLineGeometry = new BoxLineGeometry(6, 6, 6, 10, 10, 10)

const onSelectStart = function (this: any) {
    if (this?.userData) {
        this.userData.isSelecting = true
    }
}
const onSelectEnd = function (this: any) {
    if (this?.userData) {
        this.userData.isSelecting = false
    }
}
const buildController = function (data: any) {
    let geometry, material

    switch (data.targetRayMode) {
        case 'tracked-pointer':
            geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3))
            geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3))

            material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending })

            return new THREE.Line(geometry, material)

        case 'gaze':
            geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1)
            material = new THREE.MeshBasicMaterial({ opacity: 0.5, transparent: true })
            return new THREE.Mesh(geometry, material)
    }
    return new THREE.Group()
}
const XRcomRef = ref<XRcomType | null>(null)
watch(XRcomRef, (v) => {
    if (!v) {
        return
    }
    v.controller0.addEventListener('selectstart', onSelectStart)
    v.controller0.addEventListener('selectend', onSelectEnd)
    v.controller0.addEventListener('connected', function (this: THREE.Object3D, event: any) {
        this.add(buildController(event.data))
    })
    v.controller0.addEventListener('disconnected', function (this: THREE.Object3D) {
        this.remove(this.children[0])
    })

    v.controller1.addEventListener('selectstart', onSelectStart)
    v.controller1.addEventListener('selectend', onSelectEnd)
    v.controller1.addEventListener('connected', function (this: THREE.Object3D, event: any) {
        this.add(buildController(event.data))
    })
    v.controller1.addEventListener('disconnected', function (this: THREE.Object3D) {
        this.remove(this.children[0])
    })
})
</script>
