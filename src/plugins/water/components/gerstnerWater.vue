<template>
	<TresGroup>
		<primitive :object="water" :rotation-x="-Math.PI / 2" />
	</TresGroup>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water'
import { useTres, useLoop } from '@tresjs/core'
import vertexShader from '../shaders/gerstnerWater/vertex.glsl'
import fragmentShader from '../shaders/gerstnerWater/fragment.glsl'

const props = defineProps({
	distortionScale: {
		default: 3.7,
	},
	size: {
		default: 1,
	},
	wireframe: {
		default: false,
	},
	sunDirection: {
		default: { x: 0, y: 0, z: 0 },
	},
	sunColor: {
		default: '#ffffff',
	},
	waterColor: {
		default: '#001e0f',
	},
	waves: {
		default: {
			A: {
				direction: 0,
				steepness: 0.4,
				wavelength: 60
			},
			B: {
				direction: 30,
				steepness: 0.4,
				wavelength: 30
			},
			C: {
				direction: 60,
				steepness: 0.4,
				wavelength: 15
			},
		}
	}
})

const { scene } = useTres()

const waterGeometry = new THREE.PlaneGeometry(2048, 2048, 512, 512)

const water = new Water(waterGeometry, {
	textureWidth: 512,
	textureHeight: 512,
	waterNormals: new THREE.TextureLoader().load('./plugins/water/images/waternormals.jpg',
		function (texture) {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping
		}
	),
	sunDirection: new THREE.Vector3().fromArray([props.sunDirection.x, props.sunDirection.y, props.sunDirection.z]),
	sunColor: props.sunColor,
	waterColor: props.waterColor,
	distortionScale: props.distortionScale,
	fog: scene.value.fog !== undefined,
})

const environment = ref(null)
Object.defineProperty(scene.value, 'environment', {
	get() {
		return environment.value
	},
	set(v) {
		environment.value = v
	}
})
watch(environment, (newVal) => {
	console.log("环境贴图变化 :", newVal)
	scene.value.background = scene.value.environment
})

water.material.onBeforeCompile = function (shader) {
	shader.uniforms.waveA = {
		value: [
			Math.sin((props.waves.A.direction * Math.PI) / 180),
			Math.cos((props.waves.A.direction * Math.PI) / 180),
			props.waves.A.steepness,
			props.waves.A.wavelength,
		],
	}
	shader.uniforms.waveB = {
		value: [
			Math.sin((props.waves.B.direction * Math.PI) / 180),
			Math.cos((props.waves.B.direction * Math.PI) / 180),
			props.waves.B.steepness,
			props.waves.B.wavelength,
		],
	}
	shader.uniforms.waveC = {
		value: [
			Math.sin((props.waves.C.direction * Math.PI) / 180),
			Math.cos((props.waves.C.direction * Math.PI) / 180),
			props.waves.C.steepness,
			props.waves.C.wavelength,
		],
	}
	shader.vertexShader = vertexShader
	shader.fragmentShader = fragmentShader
}


watch(
	() => [props.size, props.waterColor],
	([size, waterColor]) => {
		water.material.uniforms['size'].value = size
		water.material.uniforms['waterColor'].value.set(waterColor)
	},
	{ immediate: true }
)
watch(
	() => props.wireframe,
	(wireframe) => {
		water.material.wireframe = wireframe
	},
	{ immediate: true }
)
watch(
	() => props.waves,
	(waves) => {
		water.material.uniforms.waveA.value = [
			Math.sin((waves.A.direction * Math.PI) / 180),
			Math.cos((waves.A.direction * Math.PI) / 180),
			waves.A.steepness,
			waves.A.wavelength,
		]
		water.material.uniforms.waveB.value = [
			Math.sin((waves.B.direction * Math.PI) / 180),
			Math.cos((waves.B.direction * Math.PI) / 180),
			waves.B.steepness,
			waves.B.wavelength,
		]
		water.material.uniforms.waveC.value = [
			Math.sin((waves.C.direction * Math.PI) / 180),
			Math.cos((waves.C.direction * Math.PI) / 180),
			waves.C.steepness,
			waves.C.wavelength,
		]
	},	
	{ deep: true }
)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
	water.material.uniforms['time'].value += delta
})
</script>