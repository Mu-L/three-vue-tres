<template>
    <TresGroup>
        <TresMesh :rotation-x="-Math.PI / 2" :geometry="trbGeometry">
            <TresRoundedBoxGeometry :args="[width, height, depth, smoothness, radius]" ref="trbRef" />
            <MeshReflectionMaterial :color="color" v-bind="reflectionMaterialConfig" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { extend, useTexture } from '@tresjs/core'
import MeshReflectionMaterial from 'PLS/basic/components/forCientos/meshReflectionMaterial/index.vue'

const props = withDefaults(
    defineProps<{
        color?: string
        width?: number
        height?: number
        depth?: number
        radius?: number
        smoothness?: number
    }>(),
    {
        color: '#FFFFFF',
        width: 2,
        height: 1,
        depth: 1,
        radius: 0.1, // 圆角半径
        smoothness: 4, // 圆角的平滑程度
    },
)
extend({ RoundedBoxGeometry })

const trbGeometry = ref(null) as any
trbGeometry.value = new RoundedBoxGeometry(props.width, props.height, props.depth, props.smoothness, props.radius)

watch(
    () => [props.width, props.height, props.depth, props.radius, props.smoothness],
    ([width, height, depth, radius, smoothness]) => {
        if (trbGeometry.value) {
            trbGeometry.value.dispose()
            trbGeometry.value = new RoundedBoxGeometry(width, height, depth, smoothness, radius)
            trbGeometry.value.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2)).clone()
        }
    },
    { immediate: true },
)

const pTexture = await useTexture(['./plugins/floor/image/polished_concrete_basecolor.jpg', './plugins/floor/image/waterdudv.jpg'])

for (let i = 0; i < pTexture.length; i++) {
    pTexture[i].colorSpace = THREE.LinearSRGBColorSpace
    pTexture[i].wrapS = THREE.RepeatWrapping
    pTexture[i].wrapT = THREE.RepeatWrapping
    pTexture[i].magFilter = THREE.LinearFilter
    pTexture[i].minFilter = THREE.LinearMipmapLinearFilter
    pTexture[i].repeat.set(1, 1)
}

const reflectionMaterialConfig = {
    resolution: 256,
    mix: 0.19,
    sharpMix: 1,
    blurDepthScale: 0.1,
    roughness: 0.5,
    metalness: 1,
    map: pTexture[0],
    normalMap: pTexture[1],
    normalScale: new THREE.Vector2(0.1, 0.1),
    reflectorOffset: 0.1,
}
</script>
