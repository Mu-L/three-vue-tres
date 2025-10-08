<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-22 11:14:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-08 11:27:55
-->
<script setup lang="ts">
import { watch } from 'vue'
import { Precipitation } from '@tresjs/cientos'
import * as THREE from 'three'

const props = withDefaults(
	defineProps<{
		speed?: number
		randomness?: number
		count?: number
		size?: number
		areaX?: number
		areaY?: number
		areaZ?: number
		type?: string
		color?: string
	}>(),
	{
		speed: 12,
		randomness: 0,
		count: 6000,
		size: 7,
		areaX: 1500,
		areaY: 1000,
		areaZ: 1500,
		color: '#fff',
		type: 'snow', // snow rain point
	},
)

const imgList: Record<string, string> = {
	snow: './plugins/digitalCity/image/snow.png',
	rain: './plugins/digitalCity/image/rain.png',
	point: './plugins/digitalCity/image/cilcle.png',
}

const textureCache: Record<string, THREE.Texture> = {}
const preloadTextures = async () => {
	const loader = new THREE.TextureLoader()
	const promises = Object.entries(imgList).map(([key, url]) => {
		return new Promise<void>((resolve, reject) => {
			loader.load(
				url,
				(tex) => {
					tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
					tex.needsUpdate = true
					textureCache[key] = tex
					resolve()
				},
				undefined,
				reject
			)
		})
	})
	await Promise.all(promises)
	console.log('✅ 所有图片预加载完成:', Object.keys(textureCache))
}
const getTexture = (key: keyof typeof imgList) => {
	return textureCache[key]
}
await preloadTextures()
let curRexture = null
watch(
	() => props.type,
	(nv, ov) => {
		if (nv !== ov) {
			curRexture = getTexture(nv)
		}
	},
	{
		immediate: true,
	}
)
</script>

<template>
	<Precipitation ref="precipitationRef" :position="[0, props.areaY / 2, 0]" :speed="props.speed" :color="props.color"
		:alphaTest="0.5" :area="[props.areaX, props.areaY, props.areaZ]" :count="props.count" :depthWrite="true"
		:randomness="props.randomness" :size="props.size" :opacity="1.0" :map="curRexture" :alphaMap="curRexture" />
</template>
