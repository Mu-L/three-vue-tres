<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 09:54:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-30 09:42:10
-->


<template>
	<primitive :object="tsWater" :rotation-x="-Math.PI / 2" />
</template>

<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import { useTexture } from 'PLS/basic'
import { RepeatWrapping, Vector3, PlaneGeometry } from 'three'
import { Water } from 'three/addons/objects/Water'
import { watchEffect } from 'vue'

const props = withDefaults(defineProps<{
	size?: Number
	distortionScale?: Number
}>(), {
	size: 1.0,
	distortionScale: 3.7
})

const waterGeometry = new PlaneGeometry(1000, 1000)
const waternormals = await useTexture('./plugins/water/images/waternormals.jpg')
waternormals.wrapS = waternormals.wrapT = RepeatWrapping

const tsWater = new Water(
	waterGeometry,
	{
		textureWidth: 512,
		textureHeight: 512,
		waterNormals: waternormals,
		sunDirection: new Vector3(),
		sunColor: 0xffffff,
		waterColor: 0x001e0f,
		distortionScale: 3.7
	}
)
watchEffect(() => {
	if (props.size) {
		tsWater.material.uniforms.size.value = props.size
	}
	if (props.distortionScale) {
		tsWater.material.uniforms.distortionScale.value = props.distortionScale
	}
})


const { onBeforeRender } = useLoop()
onBeforeRender(() => {
	tsWater.material.uniforms.time.value += 1.0 / 60.0
})
</script>
