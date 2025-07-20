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
            <p>若没有tk令牌，则需要先申请：<a href="https://console.tianditu.gov.cn/api/key" target="_blank">跳转天地图申请</a></p>
        </div>
        <div class="control-panel">
            <div style="margin-bottom: 10px">
                <label style="margin-right: 10px">天地图TK:</label>
                <input
                    v-model="tdtTkInput"
                    type="text"
                    style="width: 300px; padding: 4px; border: 1px solid #ccc; border-radius: 4px"
                    placeholder="请输入天地图TK"
                />
                <button class="control-btn" @click="updateTdtTk">保存</button>
            </div>
        </div>
        <div class="control-panel">
            <button class="control-btn" @click="position = { ...position, distance: position.distance + 100 }">距离 + 100米</button>
            <button class="control-btn" @click="position = { ...position, distance: position.distance - 100 }">距离 - 100米</button>
            <button class="control-btn" @click="position = { ...position, heading: position.heading + 10 }">航向 + 10°</button>
            <button class="control-btn" @click="position = { ...position, heading: position.heading - 10 }">航向 - 10°</button>
            <button class="control-btn" @click="position = { ...position, pitch: position.pitch + 10 }">俯仰 + 10°</button>
            <button class="control-btn" @click="position = { ...position, pitch: position.pitch - 10 }">俯仰 - 10°</button>
            <button class="control-btn" @click="boxPosition = { ...boxPosition, lon: boxPosition.lon + 0.001 }">经度 + 0.001°</button>
            <button class="control-btn" @click="boxPosition = { ...boxPosition, lon: boxPosition.lon - 0.001 }">经度 - 0.001°</button>
            <button class="control-btn" @click="boxPosition = { ...boxPosition, lat: boxPosition.lat + 0.001 }">纬度 + 0.001°</button>
            <button class="control-btn" @click="boxPosition = { ...boxPosition, lat: boxPosition.lat - 0.001 }">纬度 - 0.001°</button>
        </div>
    </div>
    <GeoCanvas>
        <GeoControls v-model:position="position" />
        <GeoScene :sceneConfig="sceneConfig" />
        <TDTTiles :tk="tdtTk" />
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
import { GeoCanvas, GeoControls, TDTTiles, Tileset, GeoPosition, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import { ref } from 'vue'

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

const tdtTkInput = ref(localStorage.getItem('tdtTk') || '请输入你的天地图TK')

// 从localStorage读取天地图TK，如果没有则使用默认值
const tdtTk = ref(localStorage.getItem('tdtTk') || '请输入你的天地图TK')

// 更新天地图TK的函数
const updateTdtTk = () => {
    if (tdtTkInput.value && tdtTkInput.value !== '请输入你的天地图TK') {
        // 保存到localStorage
        localStorage.setItem('tdtTk', tdtTkInput.value)
        // 刷新页面
        window.location.reload()
    }
}

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

.control-panel {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    pointer-events: auto;
    width: 100%;
    flex-wrap: wrap;
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
