<template>
    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <!-- GeoText 文字 -->
        <GeoText text="GeoIcon 远近相同" color="#000" align="center" :point="{ lon: 118.778677, lat: 32.043848, height: 42 }" :fontSize="14" />

        <!-- GeoIcon 图标 -->
        <GeoIcon icon="https://img.icons8.com/?size=80&id=TQ3X81dkG8Q1&format=png" :point="{ lon: 118.778677, lat: 32.043848, height: 40 }" :size="14" />

        <GeoText text="GeoPoint 近大远小" color="#000" align="right" :point="{ lon: 118.7786, lat: 32.0438, height: 42 }" :fontSize="14" />
        <!-- GeoPoint 点 -->
        <GeoPoint icon="https://img.icons8.com/?size=80&id=TQ3X81dkG8Q1&format=png" :point="{ lon: 118.7786, lat: 32.0438, height: 40 }" :size="20" />
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoText, GeoIcon, GeoPoint, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import { ref } from 'vue'
import DevTDTTiles from '../components/DevTDTTiles.vue'

const sceneConfig = ref({
    effectProps: {
        enabled: true,
        focusArea: 0.7,
        feather: 0.1,
    },
    ambientLight: {
        color: '#fff',
        intensity: 1,
    },
    directionalLight: {
        color: '#fff',
        intensity: 2,
        position: [-1500, 500, 500] as [number, number, number],
    },
    background: '/plugins/topoProject/image/farm_field_puresky_2k.jpg',
})

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 300,
    longitude: 118.778677,
    latitude: 32.043848,
})
</script>
