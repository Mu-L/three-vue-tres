<template>
    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <XYZTiles url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
import { GeoCanvas, GeoControls, XYZTiles, GeoCSS2D, GeoText, GeoIcon, GeoPoint, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import { ref, onMounted, onUnmounted, computed } from 'vue'

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

// 标记位置
const markerPosition = ref({
    lon: 118.778677,
    lat: 32.043848,
    height: 10,
})

// 当前时间
const currentTime = ref('')
const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString()
}

// 样式控制
const currentStyleIndex = ref(0)
const styleClasses = ['label-style-1', 'label-style-2', 'label-style-3']
const currentStyleClass = computed(() => styleClasses[currentStyleIndex.value])

// 动画控制
const isAnimating = ref(false)
const animationStyle = ref({})

// 在线状态
const isOnline = ref(true)

// 进度值
const progressValue = ref(0)

// 图表数据
const chartData = ref([30, 60, 45, 80, 25])
const chartLabels = ['A', 'B', 'C', 'D', 'E']

// 引用
const basicLabelRef = ref<InstanceType<typeof GeoCSS2D>>()
const infoPanelRef = ref<InstanceType<typeof GeoCSS2D>>()

// 定时器
let timeInterval: number
let progressInterval: number
let statusInterval: number
let chartInterval: number
let animationInterval: number

// 移动标记
const moveMarker = (direction: string) => {
    const step = 0.001
    switch (direction) {
        case 'north':
            markerPosition.value.lat += step
            break
        case 'south':
            markerPosition.value.lat -= step
            break
        case 'east':
            markerPosition.value.lon += step
            break
        case 'west':
            markerPosition.value.lon -= step
            break
    }
}

// 改变高度
const changeHeight = (delta: number) => {
    markerPosition.value.height = Math.max(0, markerPosition.value.height + delta)
}

// 切换样式
const toggleStyle = () => {
    currentStyleIndex.value = (currentStyleIndex.value + 1) % styleClasses.length
    basicLabelRef.value?.update()
}

// 切换动画
const toggleAnimation = () => {
    isAnimating.value = !isAnimating.value
    if (isAnimating.value) {
        startAnimation()
    } else {
        stopAnimation()
    }
}

// 开始动画
const startAnimation = () => {
    let scale = 1
    let direction = 1
    animationInterval = window.setInterval(() => {
        scale += direction * 0.05
        if (scale >= 1.2) direction = -1
        if (scale <= 0.8) direction = 1

        animationStyle.value = {
            transform: `scale(${scale})`,
            transition: 'transform 0.1s ease',
        }
        basicLabelRef.value?.update()
    }, 100)
}

// 停止动画
const stopAnimation = () => {
    if (animationInterval) {
        clearInterval(animationInterval)
        animationStyle.value = {}
        basicLabelRef.value?.update()
    }
}

onMounted(() => {
    // 更新时间
    updateTime()
    timeInterval = window.setInterval(() => {
        updateTime()
        basicLabelRef.value?.update()
    }, 1000)

    // 更新进度
    progressInterval = window.setInterval(() => {
        progressValue.value = (progressValue.value + 1) % 101
        infoPanelRef.value?.update()
    }, 200)

    // 切换在线状态
    statusInterval = window.setInterval(() => {
        isOnline.value = !isOnline.value
    }, 3000)

    // 更新图表数据
    chartInterval = window.setInterval(() => {
        chartData.value = chartData.value.map(() => Math.floor(Math.random() * 100))
    }, 2000)
})

onUnmounted(() => {
    if (timeInterval) clearInterval(timeInterval)
    if (progressInterval) clearInterval(progressInterval)
    if (statusInterval) clearInterval(statusInterval)
    if (chartInterval) clearInterval(chartInterval)
    if (animationInterval) clearInterval(animationInterval)
})
</script>

<style scoped>
/* 标签样式1 - 简洁风格 */
.label-style-1 {
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border: 2px solid #2196f3;
    font-family: 'Arial', sans-serif;
    min-width: 200px;
}

/* 标签样式2 - 深色风格 */
.label-style-2 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 18px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    border: none;
    font-family: 'Arial', sans-serif;
    min-width: 200px;
}

/* 标签样式3 - 玻璃风格 */
.label-style-3 {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: #333;
    padding: 12px 18px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    min-width: 200px;
}

/* 信息面板样式 */
.info-panel {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    min-width: 250px;
    border: 1px solid #e0e0e0;
}

.panel-header {
    background: linear-gradient(135deg, #4caf50, #45a049);
    color: white;
    padding: 12px 15px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.panel-icon {
    font-size: 18px;
}

.panel-title {
    font-weight: bold;
    font-size: 14px;
}

.panel-content {
    padding: 15px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 13px;
}

.label {
    color: #666;
    font-weight: 500;
}

.value {
    color: #333;
    font-weight: bold;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: #e0e0e0;
    border-radius: 3px;
    overflow: hidden;
    margin: 10px 0 5px 0;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 11px;
    color: #666;
    text-align: center;
}

/* 警告标签样式 */
.warning-label {
    background: linear-gradient(135deg, #ff9800, #f57c00);
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 15px rgba(255, 152, 0, 0.4);
    animation: pulse 2s infinite;
}

.warning-icon {
    font-size: 20px;
    margin-bottom: 5px;
}

.warning-text {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 3px;
}

.warning-subtext {
    font-size: 11px;
    opacity: 0.9;
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

/* 状态指示器样式 */
.status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f44336;
    transition: background-color 0.3s ease;
}

.status-dot.active {
    background: #4caf50;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.status-text {
    font-size: 12px;
    font-weight: 500;
    color: #333;
}

/* 图表容器样式 */
.chart-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    min-width: 150px;
    border: 1px solid #e0e0e0;
}

.chart-title {
    font-size: 13px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.chart-bars {
    display: flex;
    align-items: end;
    gap: 4px;
    height: 60px;
    margin-bottom: 5px;
}

.bar {
    flex: 1;
    background: linear-gradient(to top, #2196f3, #64b5f6);
    border-radius: 2px 2px 0 0;
    min-height: 5px;
    transition: height 0.5s ease;
}

.chart-labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #666;
}
</style>
