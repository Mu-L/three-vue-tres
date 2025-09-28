<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-02 16:25:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 10:39:11
-->
<script setup>
import { watchEffect, ref } from 'vue'
import { useSeek } from 'PLS/basic'
import { OrbitControls } from '@tresjs/cientos'
import { Fog, Color } from 'three'
import { initCountryPosition, addImgEarth, XRayearth } from '../../common/makeList'

const gl = {
	clearColor: '#000000',
	alpha: true,
	useLegacyLights: true,
	antialias: true,	//开启锯齿
	logarithmicDepthBuffer: true,
}
const TresCanvasRef = ref()
let scene = null
const moveMesh = []
const { seek } = useSeek()
watchEffect(() => {
	if (TresCanvasRef.value && TresCanvasRef.value.context) {
		TresCanvasRef.value.context.renderer.instance.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		TresCanvasRef.value.context.renderer.instance.autoClear = false;
		TresCanvasRef.value.context.renderer.instance.autoClearColor = new Color(1, 0, 0, 0);

		scene = TresCanvasRef.value.context.scene.value
		scene.fog = new Fog(0xfff, 100, 1000);
		initCountryPosition(scene)
		addImgEarth(scene)
		moveMesh[1] = XRayearth(scene)
	}
})
const onLoop = () => {
	if (moveMesh[0] === undefined) {
		const pointsEearth = seek(scene, 'name', 'pointsEearth')
		if (pointsEearth) {
			moveMesh[0] = pointsEearth
		}
	}
	if (moveMesh.length && moveMesh[1] && moveMesh[0]) {
		moveMesh[1].rotation.z += .002
		moveMesh[0].rotation.y += .002
	}
}
</script>

<template>
	<div class="w-full h-full">
		<TresCanvas ref="TresCanvasRef" v-bind="gl" @loop="onLoop">
			<TresPerspectiveCamera :position="[0, 0, 365]" :fov="45" :near="1" :far="10000" />
			<OrbitControls :autoRotate="true" :autoRotateSpeed="2" :enableZoom="false" :enablePan="false" />
		</TresCanvas>
	</div>
</template>
