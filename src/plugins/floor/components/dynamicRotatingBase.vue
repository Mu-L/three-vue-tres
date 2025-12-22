<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-06-12 17:42:50
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-22 17:24:08
-->
<template>
	<TresMesh ref="tmRef">
		<TresPlaneGeometry :args="[10, 10]" />
		<TresMeshBasicMaterial v-bind="tmsMaterial" />
	</TresMesh>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { watch, reactive, ref } from 'vue'
import { useLoop } from '@tresjs/core'
import { useTexture } from 'PLS/basic'
const tmRef = ref()
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
	if (tmRef.value) {
		tmRef.value.rotation.z += props.rotationZ
	}
})

const isDev = process.env.NODE_ENV === 'development'
const congfigRes = {
	imgA: { type: 'img', path: './plugins/floor/image/imgFloor1.png' },
	imgB: { type: 'img', path: './plugins/floor/image/imgFloor2.png' },
	imgC: { type: 'img', path: './plugins/floor/image/imgFloor3.png' },
	videoA: { type: 'video', path: (isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + './video/floor/floorV1.mp4' },
	videoB: { type: 'video', path: (isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + './video/floor/floorV2.mp4' },
	videoC: { type: 'video', path: (isDev ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + './video/floor/floorV3.mp4' },
} as any

const props = withDefaults(
	defineProps<{
		type?: string
		color?: string
		opacity?: number
		rotationZ?: number
		videoLoop?: boolean
	}>(),
	{
		type: 'imgA',
		color: '#fff',
		opacity: 0.95,
		rotationZ: 0.01,
		videoLoop: false
	},
)

const tmsMaterial = reactive({
	color: props.color as any,
	map: null as THREE.Texture | null,
	side: THREE.DoubleSide,
	transparent: true,
	opacity: props.opacity,
	blending: THREE.AdditiveBlending,
	depthTest: true,
	depthWrite: false,
})

const videoDom = document.createElement('video')
watch(() => props.type, async (type) => {
	tmsMaterial.map?.dispose()
	if (congfigRes[type].type === 'img') {
		const texture = await useTexture(congfigRes[type].path)
		texture.colorSpace = THREE.SRGBColorSpace
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(1, 1)
		tmsMaterial.map = texture
	} else if (congfigRes[type].type === 'video') {
		videoDom.src = congfigRes[type].path
		videoDom.crossOrigin = 'anonymous'
		videoDom.loop = props.videoLoop
		videoDom.muted = true
		videoDom.play()
		const texture = new THREE.VideoTexture(videoDom)
		texture.colorSpace = THREE.SRGBColorSpace
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(1, 1)
		tmsMaterial.map = texture
	}
}, { immediate: true })

watch(
	() => [props.color, props.opacity, props.videoLoop],
	([color, opacity, videoLoop]: any) => {
		tmsMaterial.color = new THREE.Color(color)
		tmsMaterial.opacity = opacity
		videoDom.loop = videoLoop
	},
)

</script>
