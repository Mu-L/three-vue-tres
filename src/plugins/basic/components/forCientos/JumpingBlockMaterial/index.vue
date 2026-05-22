<!--
 * @Description:
 * @Version: 1.668
 * @Autor: Codex
 * @Date: 2026-05-22 09:40:00
 * @LastEditors: Codex
 * @LastEditTime: 2026-05-22 09:40:00
-->
<script setup lang="ts">
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { watch, watchEffect, onUnmounted } from 'vue'
import { useLoop } from '@tresjs/core'
import { jumpingBlockFragmentShader, jumpingBlockVertexShader } from './shaders'
import {
    jumpingBlockMaterialControlGroups,
    jumpingBlockMaterialDefaults,
    jumpingBlockMaterialSchema,
    jumpingBlockPaletteSchemeValues,
    type JumpingBlockMaterialProps,
    type JumpingBlockPaletteScheme,
} from './controls'

const props = withDefaults(defineProps<JumpingBlockMaterialProps>(), jumpingBlockMaterialDefaults)

const textureLoader = new THREE.TextureLoader()

function getPaletteSchemeValue(scheme: JumpingBlockPaletteScheme | undefined) {
    if (!scheme) {
        return jumpingBlockPaletteSchemeValues.colorful
    }

    return jumpingBlockPaletteSchemeValues[scheme] ?? jumpingBlockPaletteSchemeValues.colorful
}

function createKMaterialTexture(url: string) {
    const texture = textureLoader.load(url)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.flipY = false
    texture.colorSpace = THREE.NoColorSpace
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    return texture
}

const uniforms = {
    uMaskMap: { value: createKMaterialTexture(props.maskMapUrl || jumpingBlockMaterialDefaults.maskMapUrl) },
    uGridMap: { value: createKMaterialTexture(props.gridMapUrl || jumpingBlockMaterialDefaults.gridMapUrl) },
    uTime: { value: 0 },
    uChannelAmount: { value: props.channelAmount },
    uMaskAmount: { value: props.maskAmount },
    uScanDuration: { value: props.scanDuration },
    uScanStart: { value: props.scanStart },
    uScanEnd: { value: props.scanEnd },
    uScanYOffset: { value: props.scanYOffset },
    uScanIntensity: { value: props.scanIntensity },
    uGridAmount: { value: props.gridAmount },
    uTempMaskAmount: { value: props.tempMaskAmount },
    uTempGridAmount: { value: props.tempGridAmount },
    uTriplanarScale: { value: props.triplanarScale },
    uPaletteScheme: { value: getPaletteSchemeValue(props.paletteScheme) },
    uPaletteFlow: { value: props.paletteFlow },
    uPaletteContrast: { value: props.paletteContrast },
    uEmissiveBoost: { value: props.emissiveBoost },
    uDiffuseMix: { value: props.diffuseMix },
    uAlphaCutoff: { value: props.alphaCutoff },
}

const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader: jumpingBlockVertexShader,
    fragmentShader: jumpingBlockFragmentShader,
    uniforms,
    color: props.color,
    emissive: props.emissive,
    emissiveIntensity: props.emissiveIntensity,
    metalness: props.metalness,
    roughness: props.roughness,
    clearcoat: Math.max(props.clearcoat, 0.0001),
    clearcoatRoughness: props.clearcoatRoughness,
    envMapIntensity: props.envMapIntensity,
    ior: props.ior,
    specularIntensity: props.specularIntensity,
}) as THREE.MeshPhysicalMaterial & {
    uniforms: typeof uniforms
}

material.userData.kMaterialSource = 'BABYLON.KMaterial/2bIzbNB5YtAk_yswvFuUA'
material.userData.kMaterialStages = [
    'KMatStageLight',
    'KMatStageTexture:mTriplanar1:alpha',
    'KMatStageTexture:wPos:linear-gradient',
    'KMatStageTexture:mTriplanar1:grid',
    'KMatStageTexture:temp0:palette',
]

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
    material.uniforms.uTime.value = elapsed
})

watch(() => props.maskMapUrl, (url) => {
    const previousTexture = material.uniforms.uMaskMap.value
    material.uniforms.uMaskMap.value = createKMaterialTexture(url || jumpingBlockMaterialDefaults.maskMapUrl)
    previousTexture.dispose()
    material.needsUpdate = true
})

watch(() => props.gridMapUrl, (url) => {
    const previousTexture = material.uniforms.uGridMap.value
    material.uniforms.uGridMap.value = createKMaterialTexture(url || jumpingBlockMaterialDefaults.gridMapUrl)
    previousTexture.dispose()
    material.needsUpdate = true
})

watchEffect(() => {
    material.color.setStyle(props.color)
    material.emissive.setStyle(props.emissive)
    material.emissiveIntensity = props.emissiveIntensity
    material.metalness = props.metalness
    material.roughness = props.roughness
    material.clearcoat = Math.max(props.clearcoat, 0.0001)
    material.clearcoatRoughness = props.clearcoatRoughness
    material.envMapIntensity = props.envMapIntensity
    material.ior = props.ior
    material.specularIntensity = props.specularIntensity

    material.uniforms.uChannelAmount.value = props.channelAmount
    material.uniforms.uMaskAmount.value = props.maskAmount
    material.uniforms.uScanDuration.value = props.scanDuration
    material.uniforms.uScanStart.value = props.scanStart
    material.uniforms.uScanEnd.value = props.scanEnd
    material.uniforms.uScanYOffset.value = props.scanYOffset
    material.uniforms.uScanIntensity.value = props.scanIntensity
    material.uniforms.uGridAmount.value = props.gridAmount
    material.uniforms.uTempMaskAmount.value = props.tempMaskAmount
    material.uniforms.uTempGridAmount.value = props.tempGridAmount
    material.uniforms.uTriplanarScale.value = props.triplanarScale
    material.uniforms.uPaletteScheme.value = getPaletteSchemeValue(props.paletteScheme)
    material.uniforms.uPaletteFlow.value = props.paletteFlow
    material.uniforms.uPaletteContrast.value = props.paletteContrast
    material.uniforms.uEmissiveBoost.value = props.emissiveBoost
    material.uniforms.uDiffuseMix.value = props.diffuseMix
    material.uniforms.uAlphaCutoff.value = props.alphaCutoff
})

function disposeMaterial() {
    material.uniforms.uMaskMap.value.dispose()
    material.uniforms.uGridMap.value.dispose()
    material.dispose()
}

onUnmounted(disposeMaterial)

defineExpose({
    root: material,
    constructor: THREE.MeshPhysicalMaterial,
    defaults: jumpingBlockMaterialDefaults,
    controlGroups: jumpingBlockMaterialControlGroups,
    schema: jumpingBlockMaterialSchema,
    dispose: disposeMaterial,
})
</script>

<template>
    <primitive :object="material" />
</template>
