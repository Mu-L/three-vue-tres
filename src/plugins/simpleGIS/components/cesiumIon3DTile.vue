<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-25 08:59:26
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-25 16:29:20
-->
<template>
    <TresGroup>
        <primitive :object="tiles.group" />
    </TresGroup>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { TilesRenderer } from '3d-tiles-renderer'
import { CesiumIonAuthPlugin, GLTFExtensionsPlugin } from '3d-tiles-renderer/plugins'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const { camera, renderer, sizes } = useTresContext()

const assetId = '354759'
const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhM2RlZDE0YS03NWNlLTQ2ZmItODFmZi0zMDQyZGMxZjdjNzQiLCJpZCI6NDYzMzQsImlhdCI6MTYxNjA1MjY2Nn0.3BRsxy7UmJgW0LemXo6cMsD7xwe7YvUDITeQ3RLxOHI'

function rotationBetweenDirections(dir1, dir2) {
    const rotation = new THREE.Quaternion()
    const a = new THREE.Vector3().crossVectors(dir1, dir2)
    rotation.x = a.x
    rotation.y = a.y
    rotation.z = a.z
    rotation.w = 1 + dir1.clone().dot(dir2)
    rotation.normalize()
    return rotation
}
const tiles = new TilesRenderer()
function setupTiles() {
    tiles.fetchOptions.mode = 'cors'
    tiles.registerPlugin(
        new GLTFExtensionsPlugin({
            dracoLoader: new DRACOLoader().setDecoderPath('./draco/'),
        }),
    )
}
tiles.registerPlugin(new CesiumIonAuthPlugin({ apiToken: accessToken, assetId }))
tiles.addEventListener('load-tile-set', () => {
    const sphere = new THREE.Sphere()
    tiles.getBoundingSphere(sphere)

    const position = sphere.center.clone()
    const distanceToEllipsoidCenter = position.length()

    const surfaceDirection = position.normalize()
    const up = new THREE.Vector3(0, 1, 0)
    const rotationToNorthPole = rotationBetweenDirections(surfaceDirection, up)

    tiles.group.quaternion.x = rotationToNorthPole.x
    tiles.group.quaternion.y = rotationToNorthPole.y
    tiles.group.quaternion.z = rotationToNorthPole.z
    tiles.group.quaternion.w = rotationToNorthPole.w

    tiles.group.position.y = -distanceToEllipsoidCenter
})
setupTiles()

watchEffect(() => {
    if (sizes.width.value) {
        tiles.setCamera(camera.value)
        tiles.setResolutionFromRenderer(camera.value, renderer.value)
    }
})

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    if (camera.value && sizes.width.value && tiles) {
        camera.value.updateMatrixWorld()
        tiles.update()
    }
})
</script>
