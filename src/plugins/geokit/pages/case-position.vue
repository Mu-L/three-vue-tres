<template>
    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <!-- 3D对象标记 -->
        <GeoPosition :point="{ lon: 118.778677, lat: 32.043848, height: 25 }" :height="0">
            <TresMesh>
                <TresCylinderGeometry :args="[2, 2, 50]" />
                <TresMeshStandardMaterial color="#FF5722" />
            </TresMesh>
        </GeoPosition>
        <!-- 其他位置的3D标记 -->
        <GeoPosition :point="{ lon: 118.78, lat: 32.045, height: 0 }">
            <TresMesh>
                <TresBoxGeometry :args="[15, 15, 80]" />
                <TresMeshStandardMaterial color="#2196F3" />
            </TresMesh>
        </GeoPosition>
        <GeoPosition :point="{ lon: 118.7786, lat: 32.0438, height: 0 }">
            <TresGroup :rotation="[-Math.PI, 0, 0]">
                <GeoGLTF url="plugins/basic/htmls/model/model.gltf" draco />
            </TresGroup>
        </GeoPosition>
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoPosition, GeoScene, GeoPositionConfig, GeoGLTF } from '@icegl/geokit'
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
