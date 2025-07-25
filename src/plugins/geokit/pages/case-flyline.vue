<template>
    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <!-- 基础飞线 -->
        <GeoFlyline
            texture="plugins/digitalCity/image/flyLine1.png"
            :start="flylineStart1"
            :end="flylineEnd"
            type="mesh"
            color="#ff6b6b"
            :width="20"
            :arcHeight="30"
            :segments="15"
        />
        <!-- 基础飞线文字说明 -->
        <GeoText text="基础飞线 - 红色 #ff6b6b - 宽度: 20 - 弧度: 30 - 分段: 15" color="#ff6b6b" align="center" :point="flylineTextPosition1" :fontSize="12" />

        <!-- 虚线飞线 -->
        <GeoFlyline
            :start="flylineStart2"
            :end="flylineEnd"
            type="mesh"
            color="#4ecdc4"
            :width="20"
            texture="plugins/digitalCity/image/flyLine2.png"
            :arcHeight="50"
            :segments="20"
            :dashArray="0.3"
            :dashRatio="0.6"
        />
        <!-- 虚线飞线文字说明 -->
        <GeoText
            text="虚线飞线 - 青色 #4ecdc4 - 宽度: 20 - 弧度: 50 - 分段: 20 - 虚线: 0.3/0.6"
            color="#4ecdc4"
            align="center"
            :point="flylineTextPosition2"
            :fontSize="12"
        />

        <!-- 高弧度飞线 -->
        <GeoFlyline
            texture="plugins/digitalCity/image/flyLine3.png"
            :start="flylineStart3"
            :end="flylineEnd"
            type="mesh"
            color="#45b7d1"
            :width="20"
            :arcHeight="80"
            :segments="25"
        />
        <!-- 高弧度飞线文字说明 -->
        <GeoText
            text="高弧度飞线 - 蓝色 #45b7d1 - 宽度: 20 - 弧度: 80 - 分段: 25"
            color="#45b7d1"
            align="center"
            :point="flylineTextPosition3"
            :fontSize="12"
        />

        <!-- 细线飞线 -->
        <GeoFlyline
            texture="plugins/digitalCity/image/flyLine4.png"
            :start="flylineStart4"
            :end="flylineEnd"
            type="mesh"
            color="#96ceb4"
            :width="20"
            :arcHeight="20"
            :segments="10"
        />
        <!-- 细线飞线文字说明 -->
        <GeoText text="细线飞线 - 绿色 #96ceb4 - 宽度: 20 - 弧度: 20 - 分段: 10" color="#96ceb4" align="center" :point="flylineTextPosition4" :fontSize="12" />

        <!-- 长距离飞线 -->
        <GeoFlyline
            :start="flylineStart5"
            :end="flylineEnd"
            type="tube"
            color="#fff"
            texture="plugins/digitalCity/image/flyLine5.png"
            :width="20"
            :arcHeight="300"
            :segments="30"
            :duration="2"
        />
        <!-- 长距离飞线文字说明 -->
        <GeoText
            text="长距离飞线 - 白色 #fff - 类型: tube - 宽度: 20 - 弧度: 300 - 分段: 30 - 时长: 2s"
            color="#fff"
            align="center"
            :point="flylineTextPosition5"
            :fontSize="12"
        />
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoFlyline, GeoScene, GeoPositionConfig, GeoText } from '@icegl/geokit'
import { ref, computed } from 'vue'
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
    distance: 500,
    longitude: 118.778677,
    latitude: 32.043848,
})

const flylineEnd = ref({ lon: 118.78, lat: 32.045, height: 0 })

const flylineStart1 = ref({ lon: 118.77, lat: 32.042, height: 0 })
const flylineStart2 = ref({ lon: 118.771, lat: 32.044, height: 0 })
const flylineStart3 = ref({ lon: 118.773, lat: 32.041, height: 0 })
const flylineStart4 = ref({ lon: 118.776, lat: 32.043, height: 0 })
const flylineStart5 = ref({ lon: 118.772, lat: 32.04, height: 0 })

// 计算每个飞线的中间位置用于显示文字
const flylineTextPosition1 = computed(() => ({
    lon: (flylineStart1.value.lon + flylineEnd.value.lon) / 2,
    lat: (flylineStart1.value.lat + flylineEnd.value.lat) / 2,
    height: 40,
}))

const flylineTextPosition2 = computed(() => ({
    lon: (flylineStart2.value.lon + flylineEnd.value.lon) / 2,
    lat: (flylineStart2.value.lat + flylineEnd.value.lat) / 2,
    height: 60,
}))

const flylineTextPosition3 = computed(() => ({
    lon: (flylineStart3.value.lon + flylineEnd.value.lon) / 2,
    lat: (flylineStart3.value.lat + flylineEnd.value.lat) / 2,
    height: 90,
}))

const flylineTextPosition4 = computed(() => ({
    lon: (flylineStart4.value.lon + flylineEnd.value.lon) / 2,
    lat: (flylineStart4.value.lat + flylineEnd.value.lat) / 2,
    height: 30,
}))

const flylineTextPosition5 = computed(() => ({
    lon: (flylineStart5.value.lon + flylineEnd.value.lon) / 2,
    lat: (flylineStart5.value.lat + flylineEnd.value.lat) / 2,
    height: 320,
}))
</script>

<style scoped>
/* 基础样式 */
button:hover {
    opacity: 0.8;
}

button:active {
    opacity: 0.6;
}
</style>
