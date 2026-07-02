<template>
    <div class="biine-bee-page">
        <div v-if="isLoading" class="biine-loader">
            <div class="biine-loader-inner">
                <p>loading</p>
                <div class="biine-loader-track">
                    <span :style="{ width: `${loadingProgress}%` }"></span>
                </div>
                <p>[01] Biine</p>
            </div>
        </div>

        <TresCanvas v-bind="canvasState" @loop="onLoop">
            <TresPerspectiveCamera ref="cameraRef" :position="cameraPosition" :fov="45" :near="0.1" :far="1000" />
            <OrbitControls ref="controlsRef" v-bind="controlsState" />

            <BiineBeeScene ref="sceneRef" @progress="handleProgress" @ready="handleReady" />

            <EffectComposerPmndrs :multisampling="0" disable-normal-pass>
                <SMAAPmndrs />
                <TiltShiftPmndrs :offset="0" :rotation="0" :focus-area="0.87" :feather="0.25" :kernel-size="KernelSize.LARGE" />
                <VignettePmndrs :blend-function="BlendFunction.MULTIPLY" :offset="0.5" :darkness="0.5" />
            </EffectComposerPmndrs>
        </TresCanvas>

        <div class="biine-picker">
            <button
                v-for="(item, index) in animationButtons"
                :key="item"
                :class="{ active: activeAnimation === index }"
                :aria-pressed="activeAnimation === index"
                @click="playAnimation(index)"
            >
                {{ item }}
            </button>
        </div>

        <div class="biine-labels">
            <div
                v-for="(label, index) in labels"
                :key="label.name"
                class="biine-label"
                :class="[label.align, { active: activeLabelIndex === index, hovered: hoveredLabelIndex === index, visible: label.visible }]"
                :style="label.style"
            >
                <button
                    class="biine-label-marker"
                    :aria-label="`${label.name} details`"
                    :aria-expanded="activeLabelIndex === index"
                    @pointerenter="hoveredLabelIndex = index"
                    @pointerleave="hoveredLabelIndex = null"
                    @pointerup.stop="toggleLabel(index)"
                ></button>
                <button
                    class="biine-label-name"
                    type="button"
                    @pointerenter="hoveredLabelIndex = index"
                    @pointerleave="hoveredLabelIndex = null"
                    @pointerup.stop="toggleLabel(index)"
                >
                    {{ label.name }}
                </button>
                <div class="biine-label-panel" @pointerup.stop="closeLabel">
                    <p><span></span>{{ label.function }}</p>
                    <p><span></span>{{ label.fact }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EffectComposerPmndrs, SMAAPmndrs, TiltShiftPmndrs, VignettePmndrs } from '@tresjs/post-processing'
import { OrbitControls } from '@tresjs/cientos'
import { BlendFunction, KernelSize } from 'postprocessing'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, shallowRef, watch } from 'vue'
import BiineBeeScene from '../components/biineBee/BiineBeeScene.vue'

type SceneExpose = {
    playAnimation: (index: number) => void
    getLabelAnchor: (name: string) => THREE.Vector3 | null
}

type CameraPreset = {
    position: THREE.Vector3
    target: THREE.Vector3
    maxPolarAngle: number
    maxDistance: number
}

const cameraPresets: CameraPreset[] = [
    {
        position: new THREE.Vector3(-60, 20, 60),
        target: new THREE.Vector3(0, 2, 0),
        maxPolarAngle: Math.PI * 0.45,
        maxDistance: 95,
    },
    {
        position: new THREE.Vector3(-60, 26, 60),
        target: new THREE.Vector3(0, 8, 0),
        maxPolarAngle: Math.PI * 0.45,
        maxDistance: 100,
    },
    {
        position: new THREE.Vector3(-60, 60, 60),
        target: new THREE.Vector3(0, 42, 0),
        maxPolarAngle: Math.PI,
        maxDistance: 120,
    },
]

const initialPreset = cameraPresets[0]
const cameraPosition = initialPreset.position.toArray() as [number, number, number]
const cameraTarget = initialPreset.target.clone()
const cameraRef = shallowRef<THREE.PerspectiveCamera>()
const controlsRef = shallowRef<any>()
const sceneRef = shallowRef<SceneExpose | null>(null)
const isLoading = ref(true)
const loadingProgress = ref(0)
const activeAnimation = ref(0)
const activeLabelIndex = ref<number | null>(null)
const hoveredLabelIndex = ref<number | null>(null)
const animationButtons = ['Idle', 'Hover', 'Fly']
let hideLoaderTimer = 0

const canvasState = reactive({
    clearColor: '#ffffff',
    shadows: true,
    alpha: false,
    antialias: false,
    stencil: false,
    depth: true,
    powerPreference: 'high-performance',
    shadowMapType: THREE.PCFSoftShadowMap,
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    outputColorSpace: THREE.SRGBColorSpace,
    windowSize: true,
})

const controlsState = reactive({
    target: cameraTarget,
    enableDamping: true,
    dampingFactor: 0.1,
    enablePan: false,
    enableZoom: true,
    minDistance: 20,
    maxDistance: initialPreset.maxDistance,
    minPolarAngle: 0,
    maxPolarAngle: initialPreset.maxPolarAngle,
})

const labels = reactive([
    {
        name: 'Mandibula',
        function: 'Mastication & manipulation',
        fact: 'Wax processing',
        align: 'right',
        visible: false,
        anchor: new THREE.Vector3(-6.7, 2.7, 5.4),
        style: { left: '24%', top: '50%', opacity: 0 },
    },
    {
        name: 'Thorax',
        function: 'Indirect flight muscles',
        fact: 'Wing articulation',
        align: 'left',
        visible: false,
        anchor: new THREE.Vector3(0.8, 4.1, 0),
        style: { left: '68%', top: '39%', opacity: 0 },
    },
    {
        name: 'Abdomen',
        function: 'Ventriculus + crop',
        fact: 'Tracheal system',
        align: 'right',
        visible: false,
        anchor: new THREE.Vector3(8, 1.7, -4.5),
        style: { left: '38%', top: '63%', opacity: 0 },
    },
])

const labelsVisible = computed(() => activeAnimation.value === 0 && !isLoading.value)

watch(cameraRef, (camera) => {
    camera?.lookAt(cameraTarget)
})

watch(
    controlsRef,
    () => {
        nextTick(syncInitialControls)
    },
    { flush: 'post' },
)

watch(labelsVisible, (visible) => {
    if (!visible) {
        closeLabel()
    }
})

function handleProgress(value: number) {
    loadingProgress.value = Math.max(loadingProgress.value, value)
}

function handleReady() {
    loadingProgress.value = 100
    window.clearTimeout(hideLoaderTimer)
    hideLoaderTimer = window.setTimeout(() => {
        isLoading.value = false
    }, 260)
}

function playAnimation(index: number) {
    activeAnimation.value = index
    sceneRef.value?.playAnimation(index)

    closeLabel()
    tweenCamera(index)
}

function getOrbitControls() {
    const exposed = controlsRef.value
    return exposed?.instance?.value || exposed?.instance || null
}

function syncInitialControls() {
    const controls = getOrbitControls()
    if (!controls) return
    controls.target.copy(cameraTarget)
    controls.maxDistance = initialPreset.maxDistance
    controls.maxPolarAngle = initialPreset.maxPolarAngle
    controls.update()
}

function tweenCamera(index: number) {
    const preset = cameraPresets[index] || cameraPresets[0]
    const controls = getOrbitControls()
    const target = controls?.target || controlsState.target

    if (controls) {
        gsap.killTweensOf(controls)
        gsap.killTweensOf(controls.target)
        controls.maxDistance = Math.max(controls.maxDistance || 0, preset.maxDistance)
    }
    gsap.killTweensOf(controlsState)
    gsap.killTweensOf(target)

    gsap.to(target, {
        x: preset.target.x,
        y: preset.target.y,
        z: preset.target.z,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
            controlsState.target.copy(target)
            controls?.update()
        },
    })
    if (cameraRef.value) {
        gsap.killTweensOf(cameraRef.value.position)
        gsap.to(cameraRef.value.position, {
            x: preset.position.x,
            y: preset.position.y,
            z: preset.position.z,
            duration: 1,
            ease: 'power2.inOut',
            onUpdate: () => {
                cameraRef.value?.lookAt(target)
                controls?.update()
            },
        })
    }
    gsap.to(controls || controlsState, {
        maxPolarAngle: preset.maxPolarAngle,
        maxDistance: preset.maxDistance,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
            controlsState.maxPolarAngle = controls?.maxPolarAngle ?? preset.maxPolarAngle
            controlsState.maxDistance = controls?.maxDistance ?? preset.maxDistance
            controls?.update()
        },
    })
}

function toggleLabel(index: number) {
    if (!labelsVisible.value) return
    activeLabelIndex.value = activeLabelIndex.value === index ? null : index
}

function closeLabel() {
    activeLabelIndex.value = null
    hoveredLabelIndex.value = null
}

function updateLabels() {
    const camera = cameraRef.value
    if (!camera) return
    const width = window.innerWidth
    const height = window.innerHeight
    labels.forEach((label) => {
        if (!labelsVisible.value) {
            label.style.opacity = 0
            label.visible = false
            return
        }
        const anchor = sceneRef.value?.getLabelAnchor(label.name) || label.anchor
        const projected = anchor.clone().project(camera)
        const visible = projected.z > -1 && projected.z < 1
        label.style.left = `${(projected.x * 0.5 + 0.5) * width}px`
        label.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`
        label.style.opacity = visible ? 1 : 0
        label.visible = visible
    })
}

function onLoop() {
    updateLabels()
}

onMounted(() => {
    nextTick(syncInitialControls)
})

onUnmounted(() => {
    window.clearTimeout(hideLoaderTimer)
    gsap.killTweensOf(controlsState.target)
    gsap.killTweensOf(controlsState)
    const controls = getOrbitControls()
    if (controls) {
        gsap.killTweensOf(controls)
        gsap.killTweensOf(controls.target)
    }
    if (cameraRef.value) {
        gsap.killTweensOf(cameraRef.value.position)
    }
})
</script>

<style scoped>
.biine-bee-page {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    background: #ffffff;
    color: #050505;
    font-family: Inter, Arial, Helvetica, sans-serif;
}

.biine-loader {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: grid;
    place-items: center;
    background: #ffffff;
    transition: opacity 0.3s ease;
}

.biine-loader-inner {
    width: min(280px, 72vw);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 11px;
}

.biine-loader-inner p {
    margin: 0 0 14px;
}

.biine-loader-inner p:last-child {
    margin: 14px 0 0;
}

.biine-loader-track {
    position: relative;
    height: 1px;
    background: rgba(0, 0, 0, 0.18);
}

.biine-loader-track span {
    position: absolute;
    inset: 0 auto 0 0;
    display: block;
    background: #000000;
    transition: width 0.25s ease;
}

.biine-menu,
.biine-nav,
.biine-picker,
.biine-labels {
    position: absolute;
    z-index: 10;
    pointer-events: none;
}

.biine-menu {
    top: 28px;
    left: 34px;
    right: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.biine-menu a,
.biine-nav a {
    color: inherit;
    text-decoration: none;
    pointer-events: auto;
}

.biine-menu a {
    display: flex;
    gap: 5px;
    font-weight: 700;
    letter-spacing: 0.05em;
}

.biine-menu p {
    margin: 0;
}

.biine-nav {
    right: 34px;
    bottom: 29px;
    display: flex;
    gap: 18px;
    font-size: 11px;
    letter-spacing: 0.18em;
}

.biine-picker {
    left: 50%;
    bottom: 32px;
    display: flex;
    gap: 8px;
    padding: 4px;
    transform: translateX(-50%);
    border: 1px solid rgba(0, 0, 0, 0.16);
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(12px);
    pointer-events: auto;
}

.biine-picker button {
    min-width: 68px;
    height: 32px;
    border: 0;
    background: transparent;
    color: #111111;
    font-size: 12px;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
}

.biine-picker button.active,
.biine-picker button:hover {
    background: #050505;
    color: #ffffff;
}

.biine-labels {
    inset: 0;
}

.biine-label {
    position: absolute;
    width: 220px;
    padding-top: 8px;
    font-size: 11px;
    line-height: 1.45;
    letter-spacing: 0.02em;
    color: rgba(0, 0, 0, 0.82);
    pointer-events: none;
    transition: opacity 0.25s ease;
}

.biine-label.right {
    transform: translate(calc(-100% - 32px), -50%);
    text-align: right;
}

.biine-label.left {
    transform: translate(32px, -50%);
    text-align: left;
}

.biine-label::before {
    content: "";
    position: absolute;
    top: 0;
    width: 74px;
    height: 1px;
    background: rgba(0, 0, 0, 0.38);
    transform: scaleX(0.7);
    transition: transform 0.24s ease, background 0.24s ease;
}

.biine-label.right::before {
    right: -92px;
}

.biine-label.left::before {
    left: -92px;
}

.biine-label::after {
    content: "";
    position: absolute;
    top: -3px;
    width: 7px;
    height: 7px;
    border: 1px solid rgba(0, 0, 0, 0.55);
    border-radius: 50%;
    background: #ffffff;
    transform: scale(1);
    transition: transform 0.24s ease, border-color 0.24s ease;
}

.biine-label.right::after {
    right: -96px;
}

.biine-label.left::after {
    left: -96px;
}

.biine-label.active,
.biine-label.hovered {
    color: rgba(0, 0, 0, 0.92);
}

.biine-label.active::before,
.biine-label.hovered::before {
    background: rgba(0, 0, 0, 0.72);
    transform: scaleX(1);
}

.biine-label.active::after,
.biine-label.hovered::after {
    border-color: #000000;
    transform: scale(1.65);
}

.biine-label-marker {
    position: absolute;
    top: -14px;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
}

.biine-label:not(.visible) .biine-label-marker,
.biine-label:not(.visible) .biine-label-name,
.biine-label:not(.visible) .biine-label-panel {
    pointer-events: none;
}

.biine-label.right .biine-label-marker {
    right: -108px;
}

.biine-label.left .biine-label-marker {
    left: -108px;
}

.biine-label-name {
    display: inline-block;
    margin: 0 0 8px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    pointer-events: auto;
}

.biine-label-name::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    margin-top: 2px;
    background: currentColor;
    transition: width 0.24s ease;
}

.biine-label.active .biine-label-name::after,
.biine-label.hovered .biine-label-name::after {
    width: 100%;
}

.biine-label-panel {
    display: grid;
    gap: 2px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.24s ease, transform 0.24s ease;
}

.biine-label.active .biine-label-panel {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0);
}

.biine-label p {
    margin: 0;
}

.biine-label-panel p {
    display: flex;
    gap: 6px;
    align-items: center;
    opacity: 0.66;
}

.biine-label.right .biine-label-panel p {
    justify-content: flex-end;
}

.biine-label-panel p span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: currentColor;
}

@media (max-width: 720px) {
    .biine-menu {
        top: 18px;
        left: 18px;
        right: 18px;
    }

    .biine-nav {
        right: 18px;
        bottom: 82px;
    }

    .biine-picker {
        bottom: 24px;
    }

    .biine-picker button {
        min-width: 58px;
    }

    .biine-label {
        width: 168px;
        font-size: 10px;
    }
}
</style>
