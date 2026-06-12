<template>
    <primitive v-if="modelScene" :object="modelScene" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { BIKE_MODEL_URL, HIDDEN_ORIGINAL_UI_NAMES } from './config'
import { BikeEnvironment } from './environment'
import { collectMaterials, createMaterialController } from './materials'
import { PointerAnimationPlayer, loadPointerClips } from './pointerAnimation'
import { createSketchLayers } from './sketchLayers'
import type { AnimationMode, EnvironmentId, FrameId, PointerClip, WheelId } from './types'

const props = defineProps<{
    frameId: FrameId
    wheelId: WheelId
    animationMode: AnimationMode
    environmentId: EnvironmentId
}>()

const { renderer, scene: tresScene } = useTres()
const rendererInstance = ((renderer as any).value || renderer) as THREE.WebGLRenderer
const tresSceneInstance = ((tresScene as any).value || tresScene) as THREE.Scene

const dracoLoader = new DRACOLoader().setDecoderPath('./draco/')
const ktx2Loader = new KTX2Loader().setTranscoderPath('./basis/').detectSupport(rendererInstance)
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.setKTX2Loader(ktx2Loader)

const gltf = await gltfLoader.loadAsync(BIKE_MODEL_URL)
const modelScene = gltf.scene
const pointerClips = await loadPointerClips(BIKE_MODEL_URL, gltf)
const materialController = createMaterialController(modelScene, collectMaterials(modelScene))
const sketchLayers = await createSketchLayers(gltf, modelScene, rendererInstance)
const environment = new BikeEnvironment(rendererInstance, tresSceneInstance)
const animationPlayer = new PointerAnimationPlayer()
const explosionSnapshots = createTransformSnapshots([pointerClips.explode, pointerClips.explodeBack])

let currentAnimationMode: AnimationMode = 'normal'
let explosionPoseDirty = false

modelScene.traverse((object) => {
    if (HIDDEN_ORIGINAL_UI_NAMES.has(object.name)) {
        object.visible = false
    }

    const mesh = object as THREE.Mesh
    if (!mesh.isMesh) return
    mesh.castShadow = true
    mesh.receiveShadow = true
})

type TransformSnapshot = {
    object: THREE.Object3D
    position: THREE.Vector3
    quaternion: THREE.Quaternion
    scale: THREE.Vector3
}

function createTransformSnapshots(clips: Array<PointerClip | undefined>) {
    const snapshots = new Map<THREE.Object3D, TransformSnapshot>()
    clips.forEach((clip) => {
        clip?.channels.forEach((channel) => {
            if (snapshots.has(channel.object)) return
            snapshots.set(channel.object, {
                object: channel.object,
                position: channel.object.position.clone(),
                quaternion: channel.object.quaternion.clone(),
                scale: channel.object.scale.clone(),
            })
        })
    })
    return Array.from(snapshots.values())
}

function restoreTransforms(snapshots: TransformSnapshot[]) {
    snapshots.forEach((snapshot) => {
        snapshot.object.position.copy(snapshot.position)
        snapshot.object.quaternion.copy(snapshot.quaternion)
        snapshot.object.scale.copy(snapshot.scale)
        snapshot.object.matrixWorldNeedsUpdate = true
    })
    modelScene.updateMatrixWorld(true)
}

function restoreExplosionPose(next: () => void) {
    animationPlayer.playSequence([pointerClips.explodeBack], () => {
        restoreTransforms(explosionSnapshots)
        explosionPoseDirty = false
        next()
    })
}

function showSketchWhenNormalAnimationEnds() {
    if (currentAnimationMode === 'normal') {
        sketchLayers.setVisible(true)
    }
}

function playNormalAnimation() {
    animationPlayer.playSequence([pointerClips.notRotated], showSketchWhenNormalAnimationEnds)
}

function playRotatedAnimation() {
    animationPlayer.playSequence([pointerClips.rotated])
}

function requestAnimationMode(mode: AnimationMode) {
    const previousMode = currentAnimationMode
    currentAnimationMode = mode
    sketchLayers.setVisible(false)

    if (mode === 'normal') {
        if (explosionPoseDirty) {
            restoreExplosionPose(playNormalAnimation)
            return
        }
        playNormalAnimation()
        return
    }

    if (mode === 'rotated') {
        if (explosionPoseDirty) {
            restoreExplosionPose(playRotatedAnimation)
            return
        }
        playRotatedAnimation()
        return
    }

    explosionPoseDirty = true
    const explodeClips = previousMode === 'rotated' ? [pointerClips.notRotated, pointerClips.explode] : [pointerClips.explode]
    animationPlayer.playSequence(explodeClips)
}

watch(
    () => props.frameId,
    (value) => materialController.applyFrame(value),
    { immediate: true },
)

watch(
    () => props.wheelId,
    (value) => materialController.applyWheel(value),
    { immediate: true },
)

watch(
    () => props.animationMode,
    (value) => requestAnimationMode(value),
    { immediate: true },
)

watch(
    () => props.environmentId,
    (value) => {
        environment.set(value)
    },
    { immediate: true },
)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
    animationPlayer.update(delta)
})

onBeforeUnmount(() => {
    animationPlayer.stop()
    sketchLayers.dispose()
    environment.dispose()
    dracoLoader.dispose()
    ktx2Loader.dispose()
    modelScene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (!mesh.isMesh) return
        mesh.geometry?.dispose()
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((material) => material?.dispose())
    })
})
</script>
