<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-09 11:13:03
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-09 14:51:09
-->
<template>
    <TresGroup :scale="10">
        <TresMesh v-for="curve in props.brainCurves" :key="curve.uuid">
            <TresTubeGeometry :args="[curve, 64, 0.001, 2, false]" />
            <TresShaderMaterial v-bind="tsmConfig" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'

const props = defineProps({
	brainCurves: { default: null, type: Array },
	color: { default: '#194ED8', type: String },
}) as any

const tsmConfig = {
    uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(props.color) },
        mouse: { value: new THREE.Vector3(0, 0, 0) },
    },

    vertexShader: `
			varying vec2 vUv;
			uniform float time;
			uniform vec3 mouse;
			varying float vProgress;
			void main() {
				vUv = uv;
				vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time*3.));
				
				vec3 p = position;
				float maxDist = 0.05;
				float dist = length(mouse - p);
				if(dist < maxDist){
					vec3 dir = normalize(mouse - p);
					dir*= (1.-dist/maxDist);
					p -= dir*0.03;
				}
				gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
			}
		`,
    fragmentShader: `
			uniform float time;
			uniform vec3 color;
			varying vec2 vUv;
			varying float vProgress;
			void main() {
				vec3 finalColor = mix(color, color*0.25, vProgress);
				float hideCorners = smoothstep(1.,0.9,vUv.x);
				float hideCorners1 = smoothstep(0.,0.1,vUv.x);
				// gl_FragColor = vec4(vec3(vProgress),1.);
				gl_FragColor = vec4(finalColor,hideCorners*hideCorners1);
			}
		`,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
}

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    tsmConfig.uniforms.time.value = elapsed
})

window.addEventListener('mousemove', (event) => {
    tsmConfig.uniforms.mouse.value.x = event.clientX / window.innerWidth - 0.5
    tsmConfig.uniforms.mouse.value.y = -(event.clientY / window.innerHeight - 0.5)
    // console.log(tsmConfig.uniforms.mouse.value)
})

watch(() => props.color, () => {
		tsmConfig.uniforms.color.value.set(props.color)
})
</script>
