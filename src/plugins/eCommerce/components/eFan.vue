<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-16 09:39:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-27 10:57:14
-->
<script setup lang="ts">
import { watch, ref, provide,toRaw } from "vue"
import { Levioso, ContactShadows, useAnimations } from "@tresjs/cientos"
import { useGLTF } from 'PLS/basic'
import svgCom from "./svg.vue"

const props = defineProps({
	color: {
		type: String,
		required: true,
	},
})

const { nodes, animations } = await useGLTF(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/eCommerce/eFan/nFan.gltf`)
const Sketchfab_model = toRaw(nodes.Sketchfab_model)

const modelAttUVarr = (name) => Sketchfab_model.getObjectByName(name).geometry.attributes.uv.array
//备份原始UV值
const srcUVslist = {
	'Object_4': new Float32Array(modelAttUVarr('Object_4')),
	'Object_8': new Float32Array(modelAttUVarr('Object_8')),
	'Object_6': new Float32Array(modelAttUVarr('Object_6')),
	'Object_6001': new Float32Array(modelAttUVarr('Object_6001'))
}
const setColorUV = (color) => {
	const colorList = {
		'#ff8b04': 0,
		'#999999': 0.04,
		'#d3ac10': 0.19,
		'#ffbec4': -0.06,
		'#d0d5c6': 0.55
	}
	for (const [key, value] of Object.entries(srcUVslist)) {
		for (let i = 0; i < modelAttUVarr(key).length; i++) {
			modelAttUVarr(key)[i] = value[i] + colorList[color]
		}
		Sketchfab_model.getObjectByName(key).geometry.getAttribute('uv').needsUpdate = true
	}

}

const switcherModel = Sketchfab_model.getObjectByName('Object_6001')
const { actions } = useAnimations(animations, Sketchfab_model)
const currentAction = actions.Animation
// currentAction.play()
const animationPlay = ref(true)
provide('animationPlay', animationPlay)

watch(
	() => props.color,
	(color) => {
		setColorUV(color)
	},
	{ immediate: true },
)
watch(
	() => animationPlay.value,
	(play) => {
		if (play) {
			currentAction.reset().play()
			switcherModel.rotateY(-Math.PI)
		} else {
			currentAction.fadeOut(0.6).paused = true
			switcherModel.rotateY(Math.PI)
		}
	},
	{ immediate: true },
)
</script>

<template>
	<Levioso :range="[-0.5, -0.5]" :speed="2">
		<primitive :position="[-2, 0, 0]" :object="Sketchfab_model" :scale="3.0">
			<svgCom :model="Sketchfab_model" />
		</primitive>
	</Levioso>
	<ContactShadows :opacity="0.3" :blur="2.6" :position="[0, -2, 0]" />
</template>
