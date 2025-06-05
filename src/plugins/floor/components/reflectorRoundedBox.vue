<template>
    <TresGroup>
        <TresMesh :rotation-x="-Math.PI / 2" :geometry="trbGeometry">
            <MeshReflectionMaterial
                :color="color"
                v-bind="reflectionMaterialConfig"
                :roughness="roughness"
                :metalness="metalness"
                :reflectorOffset="reflectorOffset"
            />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { extend } from '@tresjs/core'
// import MeshReflectionMaterial from 'PLS/basic/components/forCientos/meshReflectionMaterial/index.vue'
import { MeshReflectionMaterial } from '@tresjs/cientos'

const props = withDefaults(
    defineProps<{
        color?: string
        width?: number
        height?: number
        depth?: number
        radius?: number
        roughness?: number
        metalness?: number
        reflectorOffset?: number
    }>(),
    {
        color: '#FFFFFF',
        width: 2,
        height: 1,
        depth: 1,
        radius: 0.1, // 圆角半径
        roughness: 0.5,
        metalness: 0.6,
        reflectorOffset: 0.1,
    },
)
extend({ RoundedBoxGeometry })

const trbGeometry = ref(null) as any
trbGeometry.value = new RoundedBoxGeometry(props.width, props.height, props.depth, props.radius)

watch(
    () => [props.width, props.height, props.depth, props.radius],
    ([width, height, depth, radius, smoothness]) => {
        if (trbGeometry.value) {
            trbGeometry.value.dispose()
            trbGeometry.value = new RoundedBoxGeometry(width, height, depth, 4, radius)
            trbGeometry.value.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
            // trbGeometry.value.computeVertexNormals()
            // trbGeometry.value.attributes.normal.needsUpdate = true
            // trbGeometry.value.normalizeNormals() // 强制归一化
            // // trbGeometry.value.computeTangents?.() // 如支持切线，尽量计算
        }
    },
    { immediate: true },
)

// const pTexture = await useTexture(['./plugins/floor/image/polished_concrete_basecolor.jpg', './plugins/floor/image/waterdudv.jpg'])
// for (let i = 0; i < pTexture.length; i++) {
//     pTexture[i].colorSpace = THREE.LinearSRGBColorSpace
//     pTexture[i].wrapS = THREE.RepeatWrapping
//     pTexture[i].wrapT = THREE.RepeatWrapping
//     pTexture[i].magFilter = THREE.LinearFilter
//     pTexture[i].minFilter = THREE.LinearMipmapLinearFilter
//     pTexture[i].repeat.set(1, 1)
// }

const reflectionMaterialConfig = {
    resolution: 1024,
    mix: 0.1,
    sharpMix: 1,
    blurDepthScale: 0.1,
    // map: pTexture[0],
    // normalMap: pTexture[1],
    // normalScale: new THREE.Vector2(0.6, 0.6),
    // normalMapType: THREE.ObjectSpaceNormalMap,
}
</script>
