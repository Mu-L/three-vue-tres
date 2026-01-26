<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2026-01-26 10:21:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-26 11:31:37
-->

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useGLTF,CircleShadow } from '@tresjs/cientos'
import * as TSL from 'three/tsl'
import * as Three from 'three/webgpu'

const props = defineProps({
    sliceColor: {
        default: '#0096ff',
    },
    sliceStart: {
        default: 1.75,
    },
    sliceArc: {
        default: 1.25,
    },
})

const { state: pState, nodes, materials } = useGLTF(
	`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/industry4/gears-transformed.glb`,
	{ draco: true, decoderPath: './draco/' }
)

const nodesData = computed(() => nodes.value)

const sliceStart = TSL.uniform(props.sliceStart)
const sliceArc = TSL.uniform(props.sliceArc)
const sliceColor = TSL.uniform(TSL.color(props.sliceColor))
const inAngle = TSL.Fn(([position, angleStart, angleArc]: any) => {
	const angle = TSL.atan(position.y, position.x).sub(angleStart).mod(TSL.PI2).toVar()
	return angle.greaterThan(0).and(angle.lessThan(angleArc))
})
const output = TSL.Fn(() => {
	// @ts-ignore
	inAngle(TSL.positionLocal.xy, sliceStart, sliceArc).discard()
	const finalOutput = TSL.output
	TSL.If(TSL.frontFacing.not(), () => void finalOutput.assign(TSL.vec4(sliceColor, 1)))
	return finalOutput
})()
const castShadow = TSL.Fn(() => {
	// @ts-ignore
	inAngle(TSL.positionLocal.xy, sliceStart, sliceArc).discard()
	return TSL.vec4(0, 0, 0, 1)
})()

let meshPhysicalNodeMaterial = null as any
watch(() => nodesData.value, (n) => {
	meshPhysicalNodeMaterial = new Three.MeshPhysicalNodeMaterial({
		outputNode: output,
		emissiveNode: output,
		castShadowNode: castShadow,
		aoMap: materials.value.metal.aoMap,
		aoMapIntensity: 2,
		color: new Three.Color('#777'),
		metalness: 0.6,
		roughness: 0.25,
		side: Three.DoubleSide,
	})
})

watch(() => props.sliceColor, (v) => {
	sliceColor.value.set(v)
})
watch(() => props.sliceStart, (v) => {
	sliceStart.value = v
})
watch(() => props.sliceArc, (v) => {
	sliceArc.value = v
})
</script>

<template>
	<TresGroup v-if="pState">
		<TresMesh castShadow receiveShadow :geometry="nodes.outerHull.geometry" :material="meshPhysicalNodeMaterial"
			:scale="[3.714, 3.714, 3.714]" />
		<TresMesh castShadow receiveShadow :geometry="nodesData.axle.geometry" :material="materials.metal" />
		<TresMesh castShadow receiveShadow :geometry="nodesData.gears.geometry" :material="materials.metal"
			:material-aoMapIntensity="3" :position="[0, 1.595, -0.691]" :rotation="[-Math.PI, 0, -Math.PI]"
			:scale="[1, 1, 1.016]" />

			 <CircleShadow :scale="[16,10,10]" :position="[0, -4.5, 0]" :opacity="1" fog :offset="0.06"/>
	</TresGroup>
</template>