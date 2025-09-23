<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-30 14:38:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-23 16:20:54
-->
<template></template>

<script setup lang="ts">
import * as THREE from 'three'
import { useLoop, useTres } from '@tresjs/core'

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({ color: 0xff00ff })
var cube = new THREE.Mesh(geometry, material)
cube.position.set(-3, 2, 3)

var oScene = new THREE.Scene()

var lightAmb = new THREE.AmbientLight(0xffffff)
oScene.add(lightAmb)
oScene.add(cube)

const { camera, renderer, scene } = useTres()
if (camera.value) {
	// 同步相机
	oScene.add(camera.value)
}

const { onRender } = useLoop()
onRender(() => {
	cube.rotation.x += 0.05
	cube.rotation.y += 0.02
	if (renderer && camera.value) {
		renderer.clear()
		renderer.render(oScene, camera.value)
		renderer.render(scene.value, camera.value)
	}
})

</script>
