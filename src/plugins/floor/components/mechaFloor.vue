<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Jsonco
 * @Date: 2025-06-05 09:50:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 11:04:11
-->
<template>
    <TresGroup v-if="scene && model">
        <primitive :object="scene" :position-y="0.01" />
        <primitive v-if="scenedizuo" :object="scenedizuo?.scene" :position-y="0.1" />
        <primitive :object="model" :position-y="0.1" />
    </TresGroup>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@tresjs/cientos'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useLoop, useTres } from '@tresjs/core'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
const { renderer, scene: sceneValue, camera, sizes } = useTres()
const props = withDefaults(
    defineProps<{
        color?: string
    }>(),
    {
        color: '#ffed00',
    },
)
let effectComposer: EffectComposer | null = null

const ContrastShader = {
    uniforms: {
        tDiffuse: { value: null },
        contrast: { value: 1.8 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float contrast;
        varying vec2 vUv;
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb = (color.rgb - 0.5) * contrast + 0.8;
            gl_FragColor = color;
        }
    `,
}

const { state } = useGLTF(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/floor/baseModelJ.glb`, {
    draco: true,
    decoderPath: './draco/',
})
const scene = computed(() => state?.value?.scene)

const { state: scenedizuo } = useGLTF('plugins/floor/models/topoBase/baseModelL.glb', {
    draco: true,
    decoderPath: './draco/',
})
const { state: scenejixie } = useGLTF(
    `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/floor/baseModelK.glb`,
    {
        draco: true,
        decoderPath: './draco/',
    },
)

const animations = computed(() => scenejixie.value?.animations || [])
const model = computed(() => scenejixie?.value?.scene)
const { actions } = useAnimations(animations, model)

watch(actions, (newActions) => {
    if (newActions.Scene) {
        newActions.Scene.play()
    }
})

watch(scene, (scene) => {
    if (!scene) return
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // 简化发光设置，避免过度发光
            child.material.emissive = new THREE.Color('#ffed00')
            child.material.emissiveIntensity = 20.5
            // 保持色调映射
            child.material.toneMapped = true
            child.material.needsUpdate = true
        }
    })
})

const setupBloomEffect = () => {
    if (!renderer || !camera.value || !sizes.width.value) return
    effectComposer = new EffectComposer(renderer)
    const renderPass = new RenderPass(sceneValue.value, camera.value as THREE.Camera)
    effectComposer.addPass(renderPass)
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width.value, sizes.height.value), 0.1, 0.1, 0.1)
    effectComposer.addPass(bloomPass)
    const contrastPass = new ShaderPass(ContrastShader)
    contrastPass.uniforms.contrast.value = 1.1
    effectComposer.addPass(contrastPass)
}

const setupEnvironment = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const environment = new RoomEnvironment()
    const envMap = pmremGenerator.fromScene(environment).texture
    sceneValue.value.environment = envMap

    if (scene.value) {
        scene.value.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                child.material.envMap = envMap
                child.material.needsUpdate = true
            }
        })
    }

    environment.dispose()
}
const { onRender } = useLoop()
onRender(() => {
    if (effectComposer) {
        effectComposer.render()
    }
})

onMounted(() => {
    setupEnvironment()
    setTimeout(() => {
        setupBloomEffect()
    }, 200)
})

// 添加bloom参数调试功能
watch(
    () => [props.color],
    ([color]) => {
        if (scene.value) {
            scene.value.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                    child.material.emissive = new THREE.Color(color)
                }
            })
        }
    },
)
</script>
