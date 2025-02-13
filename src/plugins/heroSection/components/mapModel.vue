<template>
  <TresMesh ref="meshRef">
    <TresPlaneGeometry :args="[aspect * 2, 2]" />
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
      :transparent="true"
      :side="doubleSide"
    />
  </TresMesh>
</template>

<script setup>
import * as THREE from 'three'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useTresContext, useRenderLoop , useTexture } from '@tresjs/core'

import { gsap } from 'gsap'
import {Pane} from 'tweakpane'

// 导入着色器
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'

const DURATION_TIME = 2.5

const { sizes } = useTresContext()
const meshRef = ref(null)

const aspect = sizes.width.value / sizes.height.value
const doubleSide = THREE.DoubleSide

// 纹理加载
const { map: texture } = await useTexture({
  map: './plugins/heroSection/img/chart.png'
})

texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(1, 1)

// 响应式 Uniforms
const uniforms = reactive({
  uTexture: { value: texture },
  uFadeStart: { value: 0 },
  uMaxDistance: { value: 0.32 },
  uStrength: { value: 1 },
  uTime: { value: 0 },
  uOffset: { value: new THREE.Vector2(0, 0) },
  uNoiseStrength: { value: 0.02 },
  uNoiseSpeed: { value: 0.5 },
  uMoveSpeed: { value: 1 }
})

// 位置和旋转
const position = ref(new THREE.Vector3(-0.11, -0.2, 0.75))
const rotation = ref(new THREE.Euler(-0.75, 0, 0))

// Tweakpane 实例
const pane = ref(null)

// 动画函数
function playAnimation() {
  const timeline = gsap.timeline()

  timeline
    .to(uniforms.uFadeStart, {
      value: 0.32,
      duration: DURATION_TIME / 2,
      ease: 'power2.inOut'
    })
    .to(uniforms.uFadeStart, {
      value: 0,
      duration: DURATION_TIME / 2,
      ease: 'power2.inOut'
    })

  gsap.to(uniforms.uMaxDistance, {
    value: 1,
    duration: DURATION_TIME,
    ease: 'power2.inOut'
  })

  gsap.to(uniforms.uStrength, {
    value: 1.5,
    duration: DURATION_TIME,
    ease: 'power2.inOut'
  })
}

// 调试功能
function setupDebug() {
  // 创建 Tweakpane 实例
  pane.value = new Pane({
    title: 'Earth Map Settings',
    expanded: true
  })

  // 位置调试
  const positionFolder = pane.value.addFolder({
    title: 'Position',
    expanded: false
  })

  positionFolder.addBinding(position.value, 'x', {
    label: 'Position X',
    min: -10,
    max: 10,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.position.copy(position.value)
    }
  })

  positionFolder.addBinding(position.value, 'y', {
    label: 'Position Y',
    min: -10,
    max: 10,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.position.copy(position.value)
    }
  })

  positionFolder.addBinding(position.value, 'z', {
    label: 'Position Z',
    min: -10,
    max: 10,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.position.copy(position.value)
    }
  })

  // 旋转调试
  const rotationFolder = pane.value.addFolder({
    title: 'Rotation',
    expanded: false
  })

  rotationFolder.addBinding(rotation.value, 'x', {
    label: 'Rotation X',
    min: -Math.PI,
    max: Math.PI,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.rotation.copy(rotation.value)
    }
  })

  rotationFolder.addBinding(rotation.value, 'y', {
    label: 'Rotation Y',
    min: -Math.PI,
    max: Math.PI,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.rotation.copy(rotation.value)
    }
  })

  rotationFolder.addBinding(rotation.value, 'z', {
    label: 'Rotation Z',
    min: -Math.PI,
    max: Math.PI,
    step: 0.01
  }).on('change', () => {
    if (meshRef.value) {
      meshRef.value.rotation.copy(rotation.value)
    }
  })

  // 材质 Uniforms 调试
  const materialFolder = pane.value.addFolder({
    title: 'Material',
    expanded: true
  })

  materialFolder.addBinding(uniforms.uFadeStart, 'value', {
    label: 'Fade Start',
    min: 0,
    max: 1,
    step: 0.01
  })

  materialFolder.addBinding(uniforms.uMaxDistance, 'value', {
    label: 'Max Distance',
    min: 0,
    max: 1,
    step: 0.01
  })

  materialFolder.addBinding(uniforms.uStrength, 'value', {
    label: 'Strength',
    min: 0,
    max: 2,
    step: 0.01
  })

  materialFolder.addBinding(uniforms.uNoiseStrength, 'value', {
    label: 'Noise Strength',
    min: 0,
    max: 0.1,
    step: 0.001
  })

  materialFolder.addBinding(uniforms.uNoiseSpeed, 'value', {
    label: 'Noise Speed',
    min: 0,
    max: 4,
    step: 0.1
  })

  materialFolder.addBinding(uniforms.uMoveSpeed, 'value', {
    label: 'Move Speed',
    min: 0,
    max: 5,
    step: 0.1
  })
}

// 渲染循环
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  uniforms.uTime.value = elapsed

  if (meshRef.value) {
    meshRef.value.position.copy(position.value)
    meshRef.value.rotation.copy(rotation.value)
  }
})

// 生命周期
onMounted(() => {
  playAnimation()
  setupDebug()
})

// 组件卸载时清理 Tweakpane
onUnmounted(() => {
  if (pane.value) {
    pane.value.dispose()
  }
})
</script>
