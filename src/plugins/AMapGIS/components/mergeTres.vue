<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-21 14:17:12
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-24 18:33:32
-->
<template></template>
<script setup>
import { watchEffect } from 'vue'
import { useTres } from '@tresjs/core'
import { useMapStore } from '../stores/mapStore'

const props = defineProps({
	center: {
		default: [0, 0]
	}
})

const { camera, scene, renderer } = useTres()
const mapStore = useMapStore()
let customCoords = null
let customLayer = null
watchEffect(() => {
	if (mapStore.aMap) {
		// renderer.autoClear = false
		customCoords = mapStore.mapHandle.customCoords
		customLayer = new mapStore.aMap.CustomLayer(renderer.domElement, {
			zIndex: 10,
			render: () => {
				renderer.resetState()
				customCoords.setCenter(props.center)
				const { near, far, fov, up, lookAt, position } =
					customCoords.getCameraParams()
				// 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
				camera.value.near = near
				camera.value.far = far
				camera.value.fov = fov
				mapStore.$patch({
					cameraState: {
						near, far, fov, position
					}
				})
				camera.value.position.set(...position)
				camera.value.up.set(...up)
				camera.value.lookAt(...lookAt)
				camera.value.updateProjectionMatrix()
				renderer.render(scene.value, camera.value)
				renderer.resetState()
			},
			alwaysRender: true
		})
		mapStore.mapHandle.add(customLayer)
	}
})
</script>