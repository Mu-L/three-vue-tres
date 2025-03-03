<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-03 20:21:59
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-03 21:06:10
-->
<template>
    <TresPoints :geometry="meshGeo">
        <TresShaderMaterial
            transparent
            :blending="THREE.AdditiveBlending"
            :uniforms="particlesUniformData"
            :vertexShader="vertexShader"
            :fragmentShader="fragmentShader"
        />
    </TresPoints>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useTexture, useTresContext, useRenderLoop } from '@tresjs/core'
import snoise from '../../shaders/snoise.glsl'

const props = defineProps({
    geo: {
        default: new THREE.BufferGeometry(),
    },
    uEdge: { default: 6 },
    uFreq: {
        default: 0.41,
    },
    uAmp: { default: 20.0 },
    uProgress: { default: -2.0 },
    uColor: {
        default: '#4d9bff',
    },
    uPointSize: {
        default: 200,
    },
    particleData: {
        default: {
            particleSpeedFactor: 0.02, // for tweaking velocity
            velocityFactor: { x: 2.5, y: 2 },
            waveAmplitude: 0,
        },
    },
})

const meshGeo = props.geo.clone()

const pTexture = await useTexture(['./plugins/industry4/image/particle.png'])

let particleCount = meshGeo.attributes.position.count
let particleMaxOffsetArr: Float32Array // -- how far a particle can go from its initial position
let particleInitPosArr: Float32Array // store the initial position of the particles -- particle position will reset here if it exceed maxoffset
let particleCurrPosArr: Float32Array // use to update he position of the particle
let particleVelocityArr: Float32Array // velocity of each particle
let particleDistArr: Float32Array
let particleRotationArr: Float32Array
function initParticleAttributes(meshGeo: THREE.BufferGeometry) {
    particleCount = meshGeo.attributes.position.count
    particleMaxOffsetArr = new Float32Array(particleCount)
    particleInitPosArr = new Float32Array(meshGeo.getAttribute('position').array)
    particleCurrPosArr = new Float32Array(meshGeo.getAttribute('position').array)
    particleVelocityArr = new Float32Array(particleCount * 3)
    particleDistArr = new Float32Array(particleCount)
    particleRotationArr = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
        let x = i * 3 + 0
        let y = i * 3 + 1
        let z = i * 3 + 2

        particleMaxOffsetArr[i] = Math.random() * 5.5 + 1.5

        particleVelocityArr[x] = Math.random() * 0.5 + 0.5
        particleVelocityArr[y] = Math.random() * 0.5 + 0.5
        particleVelocityArr[z] = Math.random() * 0.1

        particleDistArr[i] = 0.001
        particleRotationArr[i] = Math.random() * Math.PI * 2
    }

    meshGeo.setAttribute('aOffset', new THREE.BufferAttribute(particleMaxOffsetArr, 1))
    meshGeo.setAttribute('aCurrentPos', new THREE.BufferAttribute(particleCurrPosArr, 3))
    meshGeo.setAttribute('aVelocity', new THREE.BufferAttribute(particleVelocityArr, 3))
    meshGeo.setAttribute('aDist', new THREE.BufferAttribute(particleDistArr, 1))
    meshGeo.setAttribute('aAngle', new THREE.BufferAttribute(particleRotationArr, 1))
}

initParticleAttributes(meshGeo)

const { renderer } = useTresContext()

const particlesUniformData = {
    uTexture: {
        value: pTexture,
    },
    uPixelDensity: {
        value: renderer.value.getPixelRatio(),
    },
    uProgress: {
        value: props.uProgress,
    },
    uEdge: {
        value: props.uEdge,
    },
    uAmp: {
        value: props.uAmp,
    },
    uFreq: {
        value: props.uFreq,
    },
    uBaseSize: {
        value: props.uPointSize,
    },
    uColor: {
        value: new THREE.Color(props.uColor),
    },
} as any

const vertexShader = `
    ${snoise}
    uniform float uPixelDensity;
    uniform float uBaseSize;
    uniform float uFreq;
    uniform float uAmp;
    uniform float uEdge;
    uniform float uProgress;

    varying float vNoise;
    varying float vAngle;

    attribute vec3 aCurrentPos;
    attribute float aDist;
    attribute float aAngle;

    void main() {
        vec3 pos = position;

        float noise = snoise(pos * uFreq) * uAmp;
        vNoise =noise;

        vAngle = aAngle;

        if( vNoise > uProgress-2.0 && vNoise < uProgress + uEdge+2.0){
            pos = aCurrentPos;
        }

        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        float size = uBaseSize * uPixelDensity;
        size = size  / (aDist + 1.0);
        gl_PointSize = size / -viewPosition.z;
}
`

const fragmentShader = `
    uniform vec3 uColor;
    uniform float uEdge;
    uniform float uProgress;
    uniform sampler2D uTexture;

    varying float vNoise;
    varying float vAngle;

    void main(){
        if( vNoise < uProgress ) discard;
        if( vNoise > uProgress + uEdge) discard;

        vec2 coord = gl_PointCoord;
        coord = coord - 0.5; // get the coordinate from 0-1 ot -0.5 to 0.5
        coord = coord * mat2(cos(vAngle),sin(vAngle) , -sin(vAngle), cos(vAngle)); // apply the rotation transformaion
        coord = coord +  0.5; // reset the coordinate to 0-1  

        vec4 texture = texture2D(uTexture,coord);

        gl_FragColor = vec4(vec3(uColor.xyz * texture.xyz),1.0);
    }
`
function calculateWaveOffset(idx: number) {
    const posx = particleCurrPosArr[idx * 3 + 0]
    const posy = particleCurrPosArr[idx * 3 + 1]

    let xwave1 = Math.sin(posy * 2) * (0.8 + props.particleData.waveAmplitude)
    let ywave1 = Math.sin(posx * 2) * (0.6 + props.particleData.waveAmplitude)

    let xwave2 = Math.sin(posy * 5) * (0.2 + props.particleData.waveAmplitude)
    let ywave2 = Math.sin(posx * 1) * (0.9 + props.particleData.waveAmplitude)

    let xwave3 = Math.sin(posy * 8) * (0.8 + props.particleData.waveAmplitude)
    let ywave3 = Math.sin(posx * 5) * (0.6 + props.particleData.waveAmplitude)

    let xwave4 = Math.sin(posy * 3) * (0.8 + props.particleData.waveAmplitude)
    let ywave4 = Math.sin(posx * 7) * (0.6 + props.particleData.waveAmplitude)

    let xwave = xwave1 + xwave2 + xwave3 + xwave4
    let ywave = ywave1 + ywave2 + ywave3 + ywave4

    return { xwave, ywave }
}

function updateVelocity(idx: number) {
    let vx = particleVelocityArr[idx * 3 + 0]
    let vy = particleVelocityArr[idx * 3 + 1]
    let vz = particleVelocityArr[idx * 3 + 2]

    vx *= props.particleData.velocityFactor.x
    vy *= props.particleData.velocityFactor.y

    let { xwave, ywave } = calculateWaveOffset(idx)

    vx += xwave
    vy += ywave

    vx *= Math.abs(props.particleData.particleSpeedFactor)
    vy *= Math.abs(props.particleData.particleSpeedFactor)
    vz *= Math.abs(props.particleData.particleSpeedFactor)

    return { vx, vy, vz }
}

function updateParticleAttriutes() {
    for (let i = 0; i < particleCount; i++) {
        let x = i * 3 + 0
        let y = i * 3 + 1
        let z = i * 3 + 2

        let { vx, vy, vz } = updateVelocity(i)

        particleCurrPosArr[x] += vx
        particleCurrPosArr[y] += vy
        particleCurrPosArr[z] += vz

        const vec1 = new THREE.Vector3(particleInitPosArr[x], particleInitPosArr[y], particleInitPosArr[z])
        const vec2 = new THREE.Vector3(particleCurrPosArr[x], particleCurrPosArr[y], particleCurrPosArr[z])
        const dist = vec1.distanceTo(vec2)

        particleDistArr[i] = dist
        particleRotationArr[i] += 0.01

        if (dist > particleMaxOffsetArr[i]) {
            particleCurrPosArr[x] = particleInitPosArr[x]
            particleCurrPosArr[y] = particleInitPosArr[y]
            particleCurrPosArr[z] = particleInitPosArr[z]
        }
    }

    meshGeo.setAttribute('aOffset', new THREE.BufferAttribute(particleMaxOffsetArr, 1))
    meshGeo.setAttribute('aCurrentPos', new THREE.BufferAttribute(particleCurrPosArr, 3))
    meshGeo.setAttribute('aVelocity', new THREE.BufferAttribute(particleVelocityArr, 3))
    meshGeo.setAttribute('aDist', new THREE.BufferAttribute(particleDistArr, 1))
    meshGeo.setAttribute('aAngle', new THREE.BufferAttribute(particleRotationArr, 1))
}
const { onLoop } = useRenderLoop()
onLoop(() => {
    updateParticleAttriutes()
})

watch(
    () => [props.uColor, props.uEdge, props.uFreq, props.uAmp, props.uProgress, props.uPointSize],
    ([uColor, uEdge, uFreq, uAmp, uProgress, uPointSize]) => {
        particlesUniformData.uColor.value.setStyle(uColor)
        particlesUniformData.uEdge.value = uEdge
        particlesUniformData.uFreq.value = uFreq
        particlesUniformData.uAmp.value = uAmp
        particlesUniformData.uProgress.value = uProgress
        particlesUniformData.uBaseSize.value = uPointSize
    },
)
</script>
