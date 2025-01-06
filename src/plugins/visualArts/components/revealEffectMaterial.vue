<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-06 17:34:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-06 18:29:27
-->
<template>
    <TresShaderMaterial v-bind="smState" />
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import * as THREE from 'three'
import { useRenderLoop } from '@tresjs/core'
import noise from 'PLS/floor/lib/alienJS/shaders/modules/noise/classic3d.glsl'

const props = defineProps({
    uProgress: { default: 0 },
    texture: { default: null },
})

const smState = {
    uniforms: {
        uTexture: { value: props.texture },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uImageRes: { value: new THREE.Vector2(1, 1) },
        uRes: { value: new THREE.Vector2(1, 1) },
    },
    transparent: true,
    vertexShader: `
	uniform float uProgress;
	varying vec2 vUv;

	void main()
	{
		vec3 newPosition = position;

		// Calculate the distance to the center of our plane
		float distanceToCenter = distance(vec2(0.5), uv);

		// Wave effect
		float wave = (1.0 - uProgress) * sin(distanceToCenter * 20.0 - uProgress * 5.0);

		// Apply the wave effect to the position Z
		newPosition.z += wave;

		// FINAL POSITION
		gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

		// VARYINGS
		vUv = uv;
	}
	`,
    fragmentShader: `
		uniform sampler2D uTexture;
		uniform float uTime;
		uniform float uProgress;
		uniform vec2 uRes;
		uniform vec2 uImageRes;

		varying vec2 vUv;

		${noise}
		vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
			float rs = s.x / s.y; // Aspect plane size
			float ri = i.x / i.y; // Aspect image size
			vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
			vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
			return u * s / st + o;
		}

		void main()
		{
				// New UV to prevent image stretching on fullscreen mode
				vec2 newUv = CoverUV(vUv, uRes, uImageRes);

				// Displace the UV
				vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

				// Perlin noise
				float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2 ));

				// Radial gradient
				float radialGradient = distance(vUv, vec2(0.5)) * 12.5 - 7.0 * uProgress;
				strength += radialGradient;

				// Clamp the value from 0 to 1 & invert it
				strength = clamp(strength, 0.0, 1.0);
				strength = 1.0 - strength;

				// Apply texture
				vec3 textureColor = texture2D(uTexture, newUv).rgb;

				// Opacity animation
				float opacityProgress = smoothstep(0.0, 0.7, uProgress);

				// FINAL COLOR
				gl_FragColor = vec4(textureColor, strength * opacityProgress);
		}
	`,
}

watch(
    () => props.uProgress,
    (value) => {
        if (smState) {
            smState.uniforms.uProgress.value = value
        }
    },
)

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    if (smState) {
        smState.uniforms.uTime.value = elapsed
    }
})
</script>
