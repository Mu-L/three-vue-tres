<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-14 10:06:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 11:39:43

-->
<template>
 	<TresMesh ref="TresMeshRef" :render-order="9">
		<TresBufferGeometry></TresBufferGeometry>
		<TresShaderMaterial v-bind="xRayMaterial"></TresShaderMaterial>
	</TresMesh>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { useLoop, useTres } from '@tresjs/core'
import { useTexture } from 'PLS/basic'
import xRayVertex from '../shaders/xRay.vert'
import xRayFrag from '../shaders/xRay.frag'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { ref, watchEffect,onMounted } from 'vue'

const props = withDefaults(defineProps<{
	model: THREE.Group
	color?: string
	opacity?: number
}>(), {
	color: '#84ccff',
	opacity: 1.0,
})

const TresMeshRef = ref()
const brainBufferGeometries = [] as Array<THREE.BufferGeometry>

props.model.traverse((child) => {
	if (child instanceof THREE.Mesh) {
		child.geometry.verticesNeedUpdate = true
		brainBufferGeometries.push(child.geometry)
	}
})
const xRayMaterial = {
	uniforms: {
		c: { type: 'f', value: 1.11 },
		p: { type: 'f', value: 1.0 },
		glowColor: { type: 'c', value: new THREE.Color(props.color) },
		lightningTexture: { type: 't', value: null },
		offsetY: { type: 'f', value: 0.1 },
		uTime: { type: 'f', value: 0.0 },
		uOpacity: { type: 'f', value: props.opacity },
	},
	vertexShader: xRayVertex,
	fragmentShader: xRayFrag,
	side: THREE.DoubleSide,
	blending: THREE.AdditiveBlending,
	depthWrite: false,
}
onMounted(async () => {
	const pTexture = await useTexture('./plugins/medical/image/brainXRayLight.png') as THREE.Texture
	xRayMaterial.uniforms.lightningTexture.value = pTexture
	console.log(pTexture)
})

xRayMaterial.uniforms.offsetY.value = Math.sin(5.0);
const { camera } = useTres()
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
	if (camera.value?.position && TresMeshRef.value) {
		xRayMaterial.uniforms.uTime.value += delta;
	}
})

watchEffect(() => {
	if (TresMeshRef.value) {
		TresMeshRef.value.geometry.dispose()
		TresMeshRef.value.geometry = BufferGeometryUtils.mergeGeometries(
			brainBufferGeometries
		)
		// TresMeshRef.value.geometry.computeVertexNormals()
		// TresMeshRef.value.geometry.normalizeNormals()
		// TresMeshRef.value.geometry.computeTangents()
	}
	if (props.color) {
		xRayMaterial.uniforms.glowColor.value = new THREE.Color(props.color)
	}
	if (props.opacity) {
		xRayMaterial.uniforms.uOpacity.value = props.opacity
	}
})
</script>