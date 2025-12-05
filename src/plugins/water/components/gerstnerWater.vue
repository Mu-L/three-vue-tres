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
		type: Object,
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
	},
	meshUUIDList: {
		default: () => [] as any,
	},
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

function getWaveInfo(x: number, z: number, time: number) {
	const pos = new THREE.Vector3()
	const tangent = new THREE.Vector3(1, 0, 0)
	const binormal = new THREE.Vector3(0, 0, 1)
	Object.keys(props.waves).forEach((wave) => {
		const w = props.waves[wave]
		const k = (Math.PI * 2) / w.wavelength;
		const c = Math.sqrt(9.8 / k);
		const d = new THREE.Vector2(
			Math.sin((w.direction * Math.PI) / 180),
			-Math.cos((w.direction * Math.PI) / 180)
		);
		const f = k * (d.dot(new THREE.Vector2(x, z)) - c * time);
		const a = w.steepness / k;

		pos.x += d.y * (a * Math.cos(f));
		pos.y += a * Math.sin(f);
		pos.z += d.x * (a * Math.cos(f));

		tangent.x += -d.x * d.x * (w.steepness * Math.sin(f));
		tangent.y += d.x * (w.steepness * Math.cos(f));
		tangent.z += -d.x * d.y * (w.steepness * Math.sin(f));

		binormal.x += -d.x * d.y * (w.steepness * Math.sin(f));
		binormal.y += d.y * (w.steepness * Math.cos(f));
		binormal.z += -d.y * d.y * (w.steepness * Math.sin(f));
	})
	const normal = binormal.cross(tangent).normalize();
	return {
		position: pos,
		normal: normal
	}
}


const meshList = [] as any
declare global {
	interface Window {
		globalTvtFun?: any // 包含所有一些全局函数
	}
}
window.globalTvtFun = window.globalTvtFun || {}
window.globalTvtFun.gerstnerWater_updateMeshList = () => {
	// 重置 每个物体的最初位置 和 最初旋转
	if (meshList.length > 0) {
		props.meshUUIDList.forEach((i: any) => {
			const item = scene.value.getObjectByProperty('uuid', i.uuid)
			if (item) {
				const meshItem = meshList.find((m: any) => m.mesh.uuid === i.uuid)
				if (meshItem) {
					item.position.copy(meshItem.defaultPosition)
					item.quaternion.copy(meshItem.defaultQuaternion)
				}
			}
		})
	}
	meshList.length = 0
	props.meshUUIDList.forEach((i: any) => {
		const item = scene.value.getObjectByProperty('uuid', i.uuid)
		if (item) {
			let floatScale = 1.0
			let yOffsetScale = 1.0
			if (i.floatScale != null && i.floatScale !== '') {
				floatScale = i.floatScale
			}
			if (i.yOffsetScale != null && i.yOffsetScale !== '') {
				yOffsetScale = i.yOffsetScale
			}
			meshList.push({ mesh: item, floatScale, yOffsetScale, defaultPosition: item.position.clone(), defaultQuaternion: item.quaternion.clone() })
		}
	})
}
watch(
	() => props.meshUUIDList,
	() => {
		window.globalTvtFun.gerstnerWater_updateMeshList()
	},
	{ immediate: true, deep: true }
)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
	water.material.uniforms['time'].value += delta

	meshList.forEach((item: any) => {
		const b = item.mesh
		const scale = item.floatScale
		const waveInfo = getWaveInfo(b.position.x, b.position.z, water.material.uniforms['time'].value)
		b.position.y = waveInfo.position.y * item.yOffsetScale
		const quat = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(waveInfo.normal.x * scale, waveInfo.normal.y * scale, waveInfo.normal.z * scale)
		)
		b.quaternion.rotateTowards(quat, delta * 0.5)
	})
})
</script>