<template>
    <TresGroup>
        <primitive :object="tiles.group" />
    </TresGroup>
</template>

<script setup lang="ts">
import { watchEffect, toRaw } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { WGS84_ELLIPSOID, CAMERA_FRAME, GeoUtils, CameraTransitionManager, TilesRenderer, GlobeControls } from '3d-tiles-renderer'
import {
    TilesFadePlugin,
    UpdateOnChangePlugin,
    TileCompressionPlugin,
    UnloadTilesPlugin,
    GLTFExtensionsPlugin,
    BatchedTilesPlugin,
    CesiumIonAuthPlugin,
} from '3d-tiles-renderer/plugins'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const assetId = '2275207'
const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhM2RlZDE0YS03NWNlLTQ2ZmItODFmZi0zMDQyZGMxZjdjNzQiLCJpZCI6NDYzMzQsImlhdCI6MTYxNjA1MjY2Nn0.3BRsxy7UmJgW0LemXo6cMsD7xwe7YvUDITeQ3RLxOHI'

const { camera, renderer, sizes, scene } = useTresContext()

let transition = null as any
let tiles = null as TilesRenderer
let globeControls = null as any

function reinstantiateTiles() {
    tiles = new TilesRenderer()
    tiles.registerPlugin(
        new CesiumIonAuthPlugin({
            apiToken: accessToken,
            assetId: assetId,
            autoRefreshToken: true,
        }),
    )
    tiles.registerPlugin(new TileCompressionPlugin())
    tiles.registerPlugin(new UpdateOnChangePlugin())
    tiles.registerPlugin(new UnloadTilesPlugin())
    tiles.registerPlugin(new TilesFadePlugin())
    tiles.registerPlugin(
        new GLTFExtensionsPlugin({
            dracoLoader: new DRACOLoader().setDecoderPath('./draco/'),
        }),
    )
    tiles.group.rotation.x = -Math.PI / 2
}

reinstantiateTiles()

tiles.setCamera(camera.value)
tiles.setResolutionFromRenderer(camera.value, renderer.value)
transition = new CameraTransitionManager(camera.value, null)
transition.perspectiveCamera.position.set(4800000, 2570000, 14720000)
transition.perspectiveCamera.lookAt(0, 0, 0)
transition.autoSync = false
transition.orthographicPositionalZoom = false
globeControls = new GlobeControls(scene.value, transition.camera, renderer.value.domElement, null)
globeControls.enableDamping = true
globeControls.setTilesRenderer(tiles)

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    if (camera.value && sizes.width.value && tiles) {
        globeControls.enabled = !transition.animating
        globeControls.update()
        transition.update()

        const camerac = transition.camera
        tiles.setResolutionFromRenderer(camerac, renderer.value)
        tiles.setCamera(camerac)

        camerac.updateMatrixWorld()
        tiles.update()
    }
})
</script>
