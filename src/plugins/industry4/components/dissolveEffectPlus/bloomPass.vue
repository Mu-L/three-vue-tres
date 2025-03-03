<template></template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import * as THREE from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const { camera, renderer, scene, sizes } = useTresContext()
const params = {
    threshold: 0,
    strength: 0.216, // 强度
    radius: 0.2, // 半径
}
let effectComposer = null as any
const bloomPassEffect = (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, width: number, height: number) => {
    // 渲染器通道，将场景全部加入渲染器
    const renderScene = new RenderPass(scene, camera)
    // 添加虚幻发光通道
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), params.strength, params.radius, params.threshold)
    // 创建合成器
    effectComposer = new EffectComposer(renderer)
    // effectComposer.renderToScreen = false
    // 将渲染器和场景结合到合成器中
    effectComposer.addPass(renderScene)
    effectComposer.addPass(bloomPass)
}

watchEffect(() => {
    if (sizes.width.value) {
        bloomPassEffect(scene.value, camera.value as any, renderer.value, sizes.width.value, sizes.height.value)
    }
})

const { onLoop } = useRenderLoop()
onLoop(() => {
    if (effectComposer) {
        effectComposer.render()
    }
})
</script>
