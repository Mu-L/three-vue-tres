<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLoop } from '@tresjs/core'
import { DoubleSide, Color, LineCurve3, Vector3 } from 'three'

const props = withDefaults(defineProps<{
	radius?: number
	maxRadius?: number
	color?: string
	opacity?: number
	speed?: number
	height?: number
}>(), {
	radius: 1,
	maxRadius: 20,
	color: '#ffff00',
	opacity: 1.0,
	speed: 0.3,
	height: 100,
})

const MeshRef = ref()

/** 动态半径缩放 */
const uScale = ref(1)

/** Shader */
const shader = {
	transparent: true,
	depthWrite: false,
	side: DoubleSide,
	uniforms: {
		uColor: { value: new Color(props.color) },
		uOpacity: { value: props.opacity },
		uHeight: { value: props.height },
		uScale: uScale,
	},
	vertexShader: `
    uniform float uScale;
    varying float vY;

    void main() {
      vec3 p = position;
      p.xz *= uScale;
      vY = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
	fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uHeight;
    varying float vY;

    void main() {
      float alpha = (1.0 - vY / uHeight) * uOpacity;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
}

watchEffect(() => {
	shader.uniforms.uColor.value.set(props.color)
	shader.uniforms.uOpacity.value = props.opacity
	shader.uniforms.uHeight.value = props.height
})

/** 动画 */
const { onBeforeRender } = useLoop()
let t = 0

onBeforeRender(() => {
	t += 0.02 * props.speed
	const k = (t % 1)
	const r = props.radius + k * (props.maxRadius - props.radius)
	uScale.value = r / props.radius
})
const tubePath = ref(new LineCurve3(
	new Vector3(0, 0, 0),
	new Vector3(0, 10, 0)
));
defineExpose({ MeshRef })
</script>

<template>
	<TresMesh ref="MeshRef" :renderOrder="2000">
		<TresTubeGeometry :args="[tubePath,
			20,
			props.radius,
			64,
			false
		]" />
		<TresShaderMaterial v-bind="shader" />
	</TresMesh>
</template>
