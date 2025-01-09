<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-09 10:29:37
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-09 15:00:05
-->
<template>
    <TresPoints :scale="10">
        <TresBufferGeometry ref="tbRef" :position="[positionArray, 3]" :randoms="[randomsArray, 1]" />
        <TresShaderMaterial v-bind="uniforms" />
    </TresPoints>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import { randomRange } from './makeData'

const props = defineProps({
    brainCurves: { default: null, type: Array },
    color: { default: '#194ED8', type: String },
    speed: { default: 1, type: Number },
})

const density = 10
const numberOfPoints = density * props.brainCurves.length

const positionArray = new Float32Array(numberOfPoints * 3)
for (let i = 0; i < numberOfPoints; i++) {
    positionArray[i * 3 + 0] = randomRange(-1, 1)
    positionArray[i * 3 + 1] = randomRange(-1, 1)
    positionArray[i * 3 + 2] = randomRange(-1, 1)
}

const randomsArray = new Float32Array(numberOfPoints * 3)
for (let i = 0; i < numberOfPoints; i++) {
    randomsArray[i] = randomRange(0.3, 1)
}

const myPoints = [] as any
for (let i = 0; i < props.brainCurves.length; i++) {
    for (let j = 0; j < density; j++) {
        myPoints.push({
            currentOffset: Math.random(),
            speed: Math.random() * 0.01,
            curve: props.brainCurves[i],
            curPosition: Math.random(),
        })
    }
}

const tbRef = ref<THREE.BufferGeometry | null>(null)

const uniforms = {
    uniforms: {
        color: { value: new THREE.Color(props.color) },
    },
    vertexShader: `
			varying vec2 vUv;
			attribute float randoms;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				gl_PointSize = randoms*66. * (1. / -mvPosition.z);
			}
		`,
    fragmentShader: `
			uniform vec3 color;
			void main() {
				float disc = length(gl_PointCoord.xy - vec2(0.5));
				float opacity = 0.3*smoothstep(0.5,0.4,disc);
				vec3 finalColor = color*opacity;
				gl_FragColor = vec4(finalColor,1.);
			}
		`,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
}

const { onLoop } = useRenderLoop()
onLoop(() => {
    if (tbRef.value) {
        let curpositions = tbRef.value.attributes.position.array
        for (let i = 0; i < myPoints.length; i++) {
            myPoints[i].curPosition += myPoints[i].speed * props.speed
            myPoints[i].curPosition = myPoints[i].curPosition % 1

            let curPoint = myPoints[i].curve.getPointAt(myPoints[i].curPosition)

            curpositions[i * 3] = curPoint.x
            curpositions[i * 3 + 1] = curPoint.y
            curpositions[i * 3 + 2] = curPoint.z
        }
        tbRef.value.attributes.position.needsUpdate = true
    }
})
watch(
    () => props.color,
    () => {
        uniforms.uniforms.color.value.set(props.color)
    },
)
</script>
