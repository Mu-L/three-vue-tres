<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useTexture } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'

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
        areaX: 500,
        areaY: 300,
        areaZ: 500,
        color: '#fff',
        type: 'snow', // snow rain point
    },
)

const imgList: Record<string, string> = {
    snow: './plugins/digitalCity/image/snow.png',
    rain: './plugins/digitalCity/image/rain2.png',
    cilcle: './plugins/digitalCity/image/cilcle.png',
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

const texture = ref(getTexture(props.type))
</script>

<template>
    <Precipitation
        ref="precipitationRef"
        :position="[0, (props.areaY * 1) / 4, 0]"
        :speed="props.speed"
        :color="props.color"
        :alphaTest="0.5"
        :area="[props.areaX, props.areaY, props.areaZ]"
        :count="props.count"
        :depthWrite="true"
        :randomness="props.randomness"
        :size="props.size"
        :opacity="1.0"
        :map="texture"
        :alphaMap="texture"
        :renderOrder="999999"
    />
</template>
