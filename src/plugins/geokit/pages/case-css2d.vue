<template>
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; pointer-events: none">
        <div
            style="
                position: absolute;
                top: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px;
                border-radius: 8px;
                pointer-events: auto;
                max-width: 300px;
            "
        >
            <h3 style="margin: 0 0 10px 0; color: #4caf50">GeoKit 点相关组件示例控制面板</h3>
            <div style="margin-bottom: 10px">
                <label style="display: block; margin-bottom: 5px">标签位置控制:</label>
                <button
                    @click="moveMarker('north')"
                    style="margin: 2px; padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    北移
                </button>
                <button
                    @click="moveMarker('south')"
                    style="margin: 2px; padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    南移
                </button>
                <button
                    @click="moveMarker('east')"
                    style="margin: 2px; padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    东移
                </button>
                <button
                    @click="moveMarker('west')"
                    style="margin: 2px; padding: 5px 10px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    西移
                </button>
            </div>
            <div style="margin-bottom: 10px">
                <label style="display: block; margin-bottom: 5px">高度控制:</label>
                <button
                    @click="changeHeight(10)"
                    style="margin: 2px; padding: 5px 10px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    升高 +10m
                </button>
                <button
                    @click="changeHeight(-10)"
                    style="margin: 2px; padding: 5px 10px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    降低 -10m
                </button>
            </div>
            <div style="margin-bottom: 10px">
                <label style="display: block; margin-bottom: 5px">标签样式:</label>
                <button
                    @click="toggleStyle"
                    style="margin: 2px; padding: 5px 10px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    切换样式
                </button>
                <button
                    @click="toggleAnimation"
                    style="margin: 2px; padding: 5px 10px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    {{ isAnimating ? '停止动画' : '开始动画' }}
                </button>
            </div>
        </div>
    </div>

    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <!-- 基础信息标签 -->
        <GeoCSS2D :point="markerPosition" :height="markerPosition.height" ref="basicLabelRef">
            <div :class="currentStyleClass" :style="animationStyle">
                <div style="font-weight: bold; margin-bottom: 5px; color: #2196f3">📍 动态标签</div>
                <div style="font-size: 12px; margin-bottom: 3px">经度: {{ markerPosition.lon.toFixed(6) }}</div>
                <div style="font-size: 12px; margin-bottom: 3px">纬度: {{ markerPosition.lat.toFixed(6) }}</div>
                <div style="font-size: 12px; margin-bottom: 3px">高度: {{ markerPosition.height }}m</div>
                <div style="font-size: 11px; color: #666">{{ currentTime }}</div>
            </div>
        </GeoCSS2D>

        <!-- 信息面板标签 -->
        <GeoCSS2D :point="{ lon: 118.78, lat: 32.045, height: 20 }" ref="infoPanelRef">
            <div class="info-panel">
                <div class="panel-header">
                    <span class="panel-icon">🏢</span>
                    <span class="panel-title">建筑信息</span>
                </div>
                <div class="panel-content">
                    <div class="info-item">
                        <span class="label">名称:</span>
                        <span class="value">示例建筑</span>
                    </div>
                    <div class="info-item">
                        <span class="label">高度:</span>
                        <span class="value">80米</span>
                    </div>
                    <div class="info-item">
                        <span class="label">类型:</span>
                        <span class="value">商业建筑</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: progressValue + '%' }"></div>
                    </div>
                    <div class="progress-text">完成度: {{ progressValue }}%</div>
                </div>
            </div>
        </GeoCSS2D>

        <!-- 警告标签 -->
        <GeoCSS2D :point="{ lon: 118.776, lat: 32.041, height: 30 }">
            <div class="warning-label">
                <div class="warning-icon">⚠️</div>
                <div class="warning-text">施工区域</div>
                <div class="warning-subtext">请注意安全</div>
            </div>
        </GeoCSS2D>

        <!-- 状态指示器 -->
        <GeoCSS2D :point="{ lon: 118.782, lat: 32.046, height: 15 }">
            <div class="status-indicator">
                <div class="status-dot" :class="{ active: isOnline }"></div>
                <span class="status-text">{{ isOnline ? '在线' : '离线' }}</span>
            </div>
        </GeoCSS2D>

        <!-- 图表标签 -->
        <GeoCSS2D :point="{ lon: 118.775, lat: 32.047, height: 60 }">
            <div class="chart-container">
                <div class="chart-title">实时数据</div>
                <div class="chart-bars">
                    <div class="bar" v-for="(value, index) in chartData" :key="index" :style="{ height: value + '%' }"></div>
                </div>
                <div class="chart-labels">
                    <span v-for="(label, index) in chartLabels" :key="index">{{ label }}</span>
                </div>
            </div>
        </GeoCSS2D>
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoCSS2D, GeoScene, GeoPositionConfig } from '@icegl/geokit'
import { ref, onMounted, onUnmounted, computed } from 'vue'
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
    background: 'https://oss.icegl.cn/p/topoProject/plugins/topoProject/image/farm_field_puresky_2k.jpg',
})

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 1800,
    longitude: 118.77769951084647,
    latitude: 32.04365724404713,
})

// 标记位置
const markerPosition = ref({
    lon: 118.778677,
    lat: 32.043848,
    height: 50,
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
