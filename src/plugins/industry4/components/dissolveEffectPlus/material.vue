<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-03 16:04:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-03 20:21:16
-->
<template>
    <CustomShaderMaterial
        :baseMaterial="baseMaterial"
        :vertexShader="vertexShader"
        :side="THREE.DoubleSide"
        :fragmentShader="fragmentShader"
        :uniforms="dissolveUniformData"
    />
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { CustomShaderMaterial } from '@tresjs/cientos'
import snoise from '../../shaders/snoise.glsl'

const props = defineProps({
    baseMaterial: {
        default: new THREE.MeshPhysicalMaterial(),
    },
    uEdgeColor: {
        default: '#4d9bff',
    },
    uEdge: { default: 6 },
    uFreq: {
        default: 0.41,
    },
    uAmp: { default: 20.0 },
    uProgress: { default: -2.0 },
})

const dissolveUniformData = {
    uEdgeColor: {
        value: new THREE.Color(props.uEdgeColor),
    },
    uFreq: {
        value: props.uFreq,
    },
    uAmp: {
        value: props.uAmp,
    },
    uProgress: {
        value: props.uProgress,
    },
    uEdge: {
        value: props.uEdge,
    },
} as any

const vertexShader = `
	varying vec3 vPos;
	void main() {
		vPos = position;
	}
`
const fragmentShader = `
  varying vec3 vPos;

  uniform float uFreq;
  uniform float uAmp;
  uniform float uProgress;
  uniform float uEdge;
  uniform vec3 uEdgeColor;

  ${snoise}

	void main() {
		float noise = snoise(vPos * uFreq) * uAmp; // calculate snoise in fragment shader for smooth dissolve edges

    if(noise < uProgress) discard; // discard any fragment where noise is lower than progress

    float edgeWidth = uProgress + uEdge;

    if(noise > uProgress && noise < edgeWidth){
        csm_DiffuseColor = vec4(vec3(uEdgeColor),noise); // colors the edge
    }else{
				csm_DiffuseColor = vec4(csm_DiffuseColor.xyz,1.0);
		}
	}
`

watch(
    () => [props.uEdgeColor, props.uEdge, props.uFreq, props.uAmp, props.uProgress],
    ([uEdgeColor, uEdge, uFreq, uAmp, uProgress]) => {
        dissolveUniformData.uEdgeColor.value.setStyle(uEdgeColor)
        dissolveUniformData.uEdge.value = uEdge
        dissolveUniformData.uFreq.value = uFreq
        dissolveUniformData.uAmp.value = uAmp
        dissolveUniformData.uProgress.value = uProgress
    },
)
</script>
