<template>
    <div class="overlay">
        <div class="info-panel">
            <div>当前距离：{{ position.distance.toFixed(2) }}米</div>
            <div>当前航向：{{ position.heading.toFixed(2) }}°</div>
            <div>当前俯仰：{{ position.pitch.toFixed(2) }}°</div>
            <div>视点经度：{{ position.longitude.toFixed(2) }}°</div>
            <div>视点纬度：{{ position.latitude.toFixed(2) }}°</div>
        </div>
        <div class="control-panel">
            <button class="control-btn" @click="position = { ...position, distance: position.distance + 100 }">距离 + 100米</button>
            <button class="control-btn" @click="position = { ...position, distance: position.distance - 100 }">距离 - 100米</button>
            <button class="control-btn" @click="position = { ...position, heading: position.heading + 10 }">航向 + 10°</button>
            <button class="control-btn" @click="position = { ...position, heading: position.heading - 10 }">航向 - 10°</button>
            <button class="control-btn" @click="position = { ...position, pitch: position.pitch + 10 }">俯仰 + 10°</button>
            <button class="control-btn" @click="position = { ...position, pitch: position.pitch - 10 }">俯仰 - 10°</button>
            <button class="control-btn" @click="position = { ...position, longitude: position.longitude + 0.001 }">经度 + 0.001°</button>
            <button class="control-btn" @click="position = { ...position, longitude: position.longitude - 0.001 }">经度 - 0.001°</button>
            <button class="control-btn" @click="position = { ...position, latitude: position.latitude + 0.001 }">纬度 + 0.001°</button>
            <button class="control-btn" @click="position = { ...position, latitude: position.latitude - 0.001 }">纬度 - 0.001°</button>
        </div>
    </div>
    <GeoCanvas>
        <GeoControls v-model:position="position" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />
        <Tileset url="/plugins/geokit/tiles/tileset.json" />
        <GeoPosition name="GeoPosition" :point="boxPosition">
            <TresMesh>
                <TresBoxGeometry :args="[20, 20, 20]" />
                <TresMeshBasicMaterial color="blue" />
            </TresMesh>
        </GeoPosition>
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, Tileset, GeoPosition, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import { ref } from 'vue'
import DevTDTTiles from '../components/DevTDTTiles.vue'

const sceneConfig = ref({
    effectProps: {
        enabled: false,
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

const boxPosition = ref({
    height: 50,
    lon: 118.778677,
    lat: 32.043848,
})

const position = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -51,
    distance: 4000,
    longitude: 118.778677,
    latitude: 32.043848,
})
</script>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
}

.info-panel {
    display: flex;
    justify-content: center;
    gap: 10px;
    pointer-events: auto;
    width: 100%;
}
.info-panel div {
    background-color: rgba(255, 255, 255, 1);
    padding: 4px;
    border: 1px solid #ccc;
}

.tip-panel {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
    pointer-events: auto;
    width: 100%;
}

.tip-text {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.tip-link {
    background-color: rgba(70, 130, 180, 0.9);
    color: white;
    padding: 4px 8px;
    border: 1px solid #4682b4;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
}

.tip-link:hover {
    background-color: rgba(70, 130, 180, 1);
}

.control-panel {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    pointer-events: auto;
    width: 100%;
}

.control-btn {
    pointer-events: auto;
    padding: 4px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.8);
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
}

.control-btn:hover {
    background-color: #e0e0e0;
}

.control-btn:active {
    background-color: #d0d0d0;
}
</style>
