<template>
    <GeoCanvas>
        <GeoControls v-model:position="position" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />
        <GeoCSS2D :point="textPosition" ref="geoCSS2D">
            <div>{{ text }}</div>
        </GeoCSS2D>
        <GeoPosition name="GeoPosition" :point="textPosition">
            <TresMesh>
                <TresBoxGeometry :args="[20, 20, 20]" />
                <TresMeshBasicMaterial color="red" />
            </TresMesh>
        </GeoPosition>
        <GeoBuilding :geometry="buildingGeometry" :height="50" :base-height="0" :show-top="true" :show-walls="true" :subdivisions="1">
            <template #top>
                <TresMeshStandardMaterial color="#fff" :side="DoubleSide" />
            </template>
            <template #walls>
                <TresMeshStandardMaterial color="#fff" :side="DoubleSide" />
            </template>
        </GeoBuilding>
        <GeoBuilding :geometry="buildingGeometry2" :height="20" :base-height="0" :show-top="true" :show-walls="true" :subdivisions="1">
            <template #top>
                <TresMeshStandardMaterial color="#fff" :side="DoubleSide" />
            </template>
            <template #walls>
                <TresMeshStandardMaterial color="#fff" :side="DoubleSide" />
            </template>
        </GeoBuilding>
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoCSS2D, GeoPosition, GeoScene, GeoBuilding, GeoPositionConfig } from '@icegl/geokit'
import { ref } from 'vue'
import DevTDTTiles from '../components/DevTDTTiles.vue'
import { DoubleSide } from 'three'

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

const textPosition = ref({
    height: 20,
    lon: 118.778677,
    lat: 32.043848,
})

const baseText = 'GeoCSS2D 提供的文字，内容更新通过ref.update()'
const text = ref(baseText)

const geoCSS2D = ref<InstanceType<typeof GeoCSS2D>>()

setInterval(() => {
    text.value = baseText + ' ' + new Date().toLocaleTimeString()
    geoCSS2D.value?.update()
}, 1000)

const position = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -51,
    distance: 200,
    longitude: 118.778677,
    latitude: 32.043848,
})

// 定义建筑物几何体数据
const buildingGeometry = ref({
    type: 'Polygon' as const,
    coordinates: [
        [
            [118.77772328237239, 32.04432612811928],
            [118.77772046053065, 32.044208924944726],
            [118.77811551838028, 32.044187397815065],
            [118.77812116206377, 32.04430699291761],
            [118.77772328237239, 32.04432612811928],
        ],
    ],
})

const buildingGeometry2 = ref({
    type: 'Polygon' as const,
    coordinates: [
        [
            [118.77743931159796, 32.04358562105831],
            [118.7774233558493, 32.04332924302351],
            [118.77744172943761, 32.04316821866888],
            [118.77753416003719, 32.04297808248843],
            [118.7776246448928, 32.04287470456218],
            [118.77775948676714, 32.042703377054806],
            [118.77799047847617, 32.04256702439322],
            [118.77815265949408, 32.042499435056826],
            [118.77836502708362, 32.04245558899751],
            [118.77860739955867, 32.04243402495692],
            [118.77861524044874, 32.0428919691354],
            [118.77844017268097, 32.04289180087832],
            [118.77833232435626, 32.04291785276172],
            [118.778142046602, 32.04303145682158],
            [118.77800584872159, 32.043090486640594],
            [118.77790973962254, 32.04324048178658],
            [118.77790366180255, 32.043361543431274],
            [118.77791974408183, 32.04354086887459],
            [118.77743931159796, 32.04358562105831],
        ],
    ],
})
</script>

<style scoped></style>
