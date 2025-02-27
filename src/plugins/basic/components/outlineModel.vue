<template>
    <primitive :object="scene" :scale="1" :position="[3, -1, -3]">
        <TresMesh :geometry="MeshGeometries">
            <TresMeshBasicMaterial color="#000000" transparent :opacity="0" />
            <outlineCom :thickness="thickness" :screenspace="screenspace" :color="color" />
        </TresMesh>
    </primitive>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import outlineCom from './outlineCom.vue'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js'

const props = withDefaults(
    defineProps<{
        color?: string
        thickness?: number
        screenspace?: boolean
    }>(),
    {
        color: '#ffffff',
        thickness: 0.1,
        screenspace: false,
    },
)

const { scene } = await useGLTF('./plugins/basic/htmls/model/model.gltf', {
    draco: true,
    decoderPath: './draco/',
})
function simplifyGeometry(geometry: any, factor = 0.1) {
    const modifier = new SimplifyModifier()
    const simplifiedGeometry = modifier.modify(geometry, Math.floor(geometry.attributes.position.count * factor))
    return simplifiedGeometry
}
function createGeometries(model: any) {
    const geometries = [] as any
    model.traverse((child: any) => {
        if (child.isMesh && child.geometry.isBufferGeometry && child.geometry.attributes.position.count < 100000) {
            const geometry = child.geometry.clone()
            const matrix = new THREE.Matrix4()
            matrix.copy(child.matrixWorld)
            geometry.applyMatrix4(matrix)
            if (geometry.isBufferGeometry) {
                Object.keys(geometry.attributes).forEach((key) => {
                    if (key !== 'position') {
                        geometry.deleteAttribute(key)
                    }
                })
                geometries.push(simplifyGeometry(geometry, 0.1))
                // geometries.push(geometry)
            }
        }
    })
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries)
    return mergedGeometry
}
const MeshGeometries = createGeometries(scene)
</script>
