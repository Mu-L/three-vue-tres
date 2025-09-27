<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 10:52:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-27 11:04:50
-->

<script setup lang="ts">
import * as THREE from "three"
import { useTres, useLoop } from '@tresjs/core'
import SSRTGlassVertex from '../shaders/SSRTGlass.vert'
import SSRTGlassFrag from '../shaders/SSRTGlass.frag'
import { DoubleDepthBuffer } from '../common/doubleDepthBuffer.js'
import { watchEffect, watch } from 'vue'
import { useTexture, useGLTF } from 'PLS/basic'

const props = withDefaults(defineProps<{
	skyBoxTexture: string
	modelPath: string
	modelName: string
	extintionFactor?: number
	reflectionFactor?: number
	exposure?: number
	extintionColor1?: string
	extintionColor2: string
	extintionCol1Random?: boolean
	extintionCol2Random?: boolean
}>(), {
	extintionFactor: 5,
	reflectionFactor: 1,
	exposure: 0,
	extintionColor1: 'rgb(192,123,25)',
	extintionColor2: 'rgb(26, 166, 192)',
	extintionCol1Random: false,
	extintionCol2Random: false
})

const pTexture = await useTexture(props.skyBoxTexture)
pTexture.wrapS = THREE.ClampToEdgeWrapping
pTexture.wrapT = THREE.ClampToEdgeWrapping
pTexture.magFilter = THREE.LinearMipmapLinearFilter
pTexture.minFilter = THREE.LinearMipmapLinearFilter

const { camera, renderer } = useTres()

const GlassMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uSkybox: { value: pTexture },
		uBackFaceBuffer: { value: null },
		uFrontFaceBuffer: { value: null },
		uCameraFarInverse: { value: 1 / camera.value.far },

		uScreenSizeInv: { value: new THREE.Vector2(1 / window.innerWidth, 1 / window.innerHeight) },
		uCameraPos: { value: new THREE.Vector3(0, 0, 0) },

		uTime: { value: 0 },

		uExtintionColor1: { value: new THREE.Color('#fff').sub(new THREE.Color(props.extintionColor1).convertLinearToSRGB()) },
		uExtintionColor2: { value: new THREE.Color('#fff').sub(new THREE.Color(props.extintionColor2).convertLinearToSRGB()) },
		uExtintionFactor: { value: props.extintionFactor },	//消光系数
		uExposure: { value: props.exposure },
		uReflectionFactor: { value: props.reflectionFactor },
		uExtinctionFX1: {
			value: new THREE.Vector4(props.extintionCol1Random ? 1 : 0,
				props.extintionCol2Random ? 1 : 0,
				0, 1)
		},
	},
	vertexShader: SSRTGlassVertex,
	fragmentShader: SSRTGlassFrag,
})

const { nodes } = await useGLTF(props.modelPath)

const getMesh = nodes.Scene.getObjectByName(props.modelName)

const ddbProgram = new DoubleDepthBuffer(getMesh, camera.value, renderer)

const showMesh = getMesh?.clone()
showMesh?.traverse((child) => {
	if (child instanceof THREE.Mesh) {
		child.material = GlassMaterial
		child.material.side = THREE.FrontSide
	}
})

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
	if (getMesh && GlassMaterial) {
		GlassMaterial.uniforms.uCameraPos.value = camera.value.position.clone()
		GlassMaterial.uniforms.uTime.value = elapsed

		ddbProgram.compute(6)
		GlassMaterial.uniforms.uBackFaceBuffer.value = ddbProgram.getBackFaceTexture()
		GlassMaterial.uniforms.uFrontFaceBuffer.value = ddbProgram.getFrontFaceTexture()

		renderer.setRenderTarget(null)
		renderer.autoClear = false
		// renderer.render(scene.value, camera.value)
		// renderer.autoClear = true
		// renderer.setRenderTarget(null)
	}
})

watchEffect(() => {
	if (props.extintionFactor) {
		GlassMaterial.uniforms.uExtintionFactor.value = props.extintionFactor
	}
	if (props.reflectionFactor) {
		GlassMaterial.uniforms.uReflectionFactor.value = props.reflectionFactor
	}
	if (props.exposure) {
		GlassMaterial.uniforms.uExposure.value = props.exposure
	}
	if (props.extintionColor1) {
		GlassMaterial.uniforms.uExtintionColor1.value = new THREE.Color('#fff').sub(new THREE.Color(props.extintionColor1).convertLinearToSRGB())
	}
	if (props.extintionColor2) {
		GlassMaterial.uniforms.uExtintionColor2.value = new THREE.Color('#fff').sub(new THREE.Color(props.extintionColor2).convertLinearToSRGB())
	}
	if (props.extintionCol1Random) {
		GlassMaterial.uniforms.uExposure.value = props.exposure
	}
})
watch(
	() => props.extintionCol1Random,
	(val) => {
		GlassMaterial.uniforms.uExtinctionFX1.value.x = val ? 1 : 0
	},
	{ immediate: true },
)
watch(
	() => props.extintionCol2Random,
	(val) => {
		GlassMaterial.uniforms.uExtinctionFX1.value.y = val ? 1 : 0
	},
	{ immediate: true },
)
</script>

<template>
	<primitive :object="showMesh" />
</template>
