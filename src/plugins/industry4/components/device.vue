<template>
	<primitive :object="toRaw(nodes.Sketchfab_model)" />
</template>

<script setup lang="ts">
import { MeshBasicMaterial, Mesh, Color } from 'three'
import { watchEffect,toRaw } from 'vue'
import { useTres, useLoop } from '@tresjs/core'
import { reduceModelLine, unreal } from '../common/device'
import { useGLTF } from 'PLS/basic'

const props = withDefaults(
	defineProps<{
		threshold?: number
		strength?: number
		radius?: number
	}>(),
	{
		threshold: 0,
		strength: 0.972,
		radius: 0.21,
	},
);

const { nodes } = await useGLTF(
	(process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/model/industry4/modelDraco.glb')
const lineGroup = reduceModelLine(nodes.Sketchfab_model)

const { camera, renderer, scene, sizes } = useTres()
let finalComposer = null as any
let effectComposer = null as any
let bloomPass = null as any
const darkMaterial = new MeshBasicMaterial({ color: 'black' })
watchEffect(() => {
	if (camera.value) {
		renderer.setPixelRatio(window.devicePixelRatio)
		scene.value.add(lineGroup)
		const { finalComposer: F,
			effectComposer: B,
			bloomPass: BP
		} = unreal(scene.value, camera.value, renderer, sizes.width.value, sizes.height.value)
		finalComposer = F
		effectComposer = B
		bloomPass = BP
		bloomPass.threshold = props.threshold
		bloomPass.strength = props.strength
		bloomPass.radius = props.radius
	}
	if (props.threshold) {
		bloomPass.threshold = props.threshold
	}
	if (props.strength) {
		bloomPass.strength = props.strength
	}
	if (props.radius) {
		bloomPass.radius = props.radius
	}
})

const materials = {}
const darkenNonBloomed = (obj: Mesh) => {
	if (obj.isMesh || obj.type === "GridHelper" || obj.name === "reflectorShaderMesh") { // obj.type === "GridHelper" 这里去掉 网格辅助的材质
		materials[obj.uuid] = obj.material;
		obj.material = darkMaterial;
	}
}
const restoreMaterial = (obj: Mesh) => {
	if (materials[obj.uuid]) {
		obj.material = materials[obj.uuid];
		delete materials[obj.uuid];
	}
}
const { onBeforeRender } = useLoop()
//旋转速度
let rotationX = 0.03
let right_pbr = nodes.Sketchfab_model.getObjectByName('canister_turbine_011_Nickel-Light-PBR_0')
let oldMeshMaterila = right_pbr.material.clone()
let errorMeshMaterila = new MeshBasicMaterial({ color: new Color('red'), transparent: true, opacity: 1.0 });
onBeforeRender(({ elapsed }) => {
	// 旋转涡轮
	if (nodes.hull_turbine) {
		nodes.hull_turbine.rotation.x += rotationX
		nodes.blades_turbine_003.rotation.x += rotationX
	}
	if (Math.floor(elapsed) % 2) {
		right_pbr.material = oldMeshMaterila
	} else {
		right_pbr.material = errorMeshMaterila
	}
}, -1)
onBeforeRender(({ elapsed }) => {
	if (effectComposer) {
		scene.value.traverse((child) => {
			darkenNonBloomed(child)
		})
		effectComposer.render(elapsed)
	}

	if (finalComposer) {
		scene.value.traverse((child) => {
			restoreMaterial(child)
		})
		finalComposer.render(elapsed)
	}
}, 1)
</script>