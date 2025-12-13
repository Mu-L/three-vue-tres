<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-13 10:17:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-25 18:33:05
-->

<template>
    <div class="legend-container">
        <!-- 图例面板 -->
        <div class="legend-panel" :style="panelStyle">
            <div class="legend-header">
                <span class="legend-title">{{ title }}</span>
                <!-- 添加随机 Mesh 按钮 -->
                <button class="add-mesh-btn" @click="handleAddRandomMesh">
                    <span class="btn-icon">+</span>
                    <span class="btn-text">添加随机形状</span>
                </button>
              
            </div>

            <!-- 动态生成的图例列表 -->
            <div class="legend-list">
                <div v-for="device in deviceConfig" :key="device.id" :id="`item-${device.id}`" class="legend-item"
                    @click="handleDeviceClick(device.id)">
                    <div :id="`anchor-${device.id}`" class="legend-icon-anchor"></div>
                    <div class="legend-info">
                        <span class="item-name">{{ device.name }}</span>
                        <span class="item-status">
                            Author: <span class="item-value">{{ device.author }}</span>
                        </span>
                    </div>
                    <div v-if="device.color" class="corner-deco"
                        :style="{ borderColor: `#${device.color.toString(16).padStart(6, '0')}` }"></div>
                </div>
            </div>


        </div>

        <TresCanvas clearColor="#1A1A1A" v-bind="state">
            <TresPerspectiveCamera :fov="60" :near="0.1" :far="1000" :position="[0, 5, 10]" />
            <TresAmbientLight :intensity="0.8" />
            <OrbitControls v-bind="controlsState" />
            <Suspense>
                <Legend ref="legendRef" :device-config="deviceConfig" />
            </Suspense>
        </TresCanvas>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import Legend from '../components/legend.vue'
import type { DeviceConfig } from '../components/legend.vue'



// 设备配置 - 可在此处修改设备列表（使用响应式）
const deviceConfig = ref<DeviceConfig[]>([
    {
        id: 'core-reactor',
        name: 'T',
        type: 'cube',
        color: 0x00ffff,
        position: [0, 0, 0],
        speed: 1.0,
        author: 'Jsonco',
    },
    {
        id: 'sensor-array',
        name: 'V',
        type: 'sphere',
        color: 0xff0055,
        position: [-4, 0, 2],
        speed: 1.5,
        author: 'Jsonco',
    },
    {
        id: 'storage-unit',
        name: 'T',
        type: 'cone',
        color: 0x44ff00,
        position: [4, 0, -2],
        speed: 0.8,
        author: 'Jsonco',
    },
])

const state = reactive({
    windowSize: true,
    alpha: true,
    antialias: true,
})

const controlsState = reactive({
    enableDamping: true,
    enableZoom: true,
    enablePan: true,
    enableRotate: true,
    makeDefault: true,
    autoRotate: true,
    autoRotateSpeed: 0.5,
})

// 图例组件引用
const legendRef = ref<InstanceType<typeof Legend> | null>(null)

// 图例面板配置
const title = '图例'
const panelPosition: { top?: string | number; right?: string | number; bottom?: string | number; left?: string | number } = { top: '20px', right: '20px' }
const panelWidth = '220px'

// 计算面板样式
const panelStyle = computed(() => {
    const pos = panelPosition || {}
    return {
        top: pos && typeof pos.top === 'number' ? `${pos.top}px` : (pos?.top || '20px'),
        right: pos && typeof pos.right === 'number' ? `${pos.right}px` : (pos?.right || '20px'),
        bottom: pos && typeof pos.bottom === 'number' ? `${pos.bottom}px` : (pos?.bottom || undefined),
        left: pos && typeof pos.left === 'number' ? `${pos.left}px` : (pos?.left || undefined),
        width: typeof panelWidth === 'number' ? `${panelWidth}px` : (panelWidth || '220px'),
    }
})

// 处理设备点击
const handleDeviceClick = (deviceId: string) => {
    if (legendRef.value) {
        legendRef.value.handleDeviceClick(deviceId)
    }
}

// 处理添加随机 Mesh
const handleAddRandomMesh = () => {
    if (legendRef.value) {
        const newDeviceConfig = legendRef.value.addRandomMesh()
        if (newDeviceConfig) {
            // 将新添加的 mesh 配置添加到设备列表中
            deviceConfig.value.push(newDeviceConfig)
        }
    }
}
</script>

<style scoped>
.legend-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.legend-panel {
    position: absolute;
    background: rgba(20, 20, 20, 0.1);
    border: 1px solid #333;
    padding: 20px;
    border-radius: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
    pointer-events: auto;
  
    max-height: 500px;
    overflow: hidden;
}

.legend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
    margin-bottom: 5px;
}

.legend-title {
    font-size: 14px;
    font-weight: bold;
    color: #ccc;
    letter-spacing: 1px;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.legend-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    min-height: 0;
}

/* 自定义滚动条样式 */
.legend-list::-webkit-scrollbar {
    width: 6px;
}

.legend-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
}

.legend-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
}

.legend-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 48px;
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    padding: 5px 10px;
    transition: background 0.3s;
    cursor: pointer;
}

.legend-item:hover {
    background: rgba(255, 255, 255, 0.08);
}

.legend-icon-anchor {
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 6px;
    flex-shrink: 0;
}

.legend-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
}

.item-name {
    font-size: 13px;
    font-weight: bold;
    color: #eee;
}

.item-status {
    font-size: 11px;
    font-family: monospace;
    color: #888;
}

.item-value {
    color: #00ffff;
}

.corner-deco {
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid;
    border-right: 2px solid;
    top: 0;
    right: 0;
    border-radius: 0 8px 0 0;
}

.add-mesh-btn {
    position: absolute;
    top: 0px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: rgba(20, 20, 20, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid #333;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1000;
    pointer-events: auto;
}

.add-mesh-btn:hover {
    background: rgba(40, 40, 40, 0.95);
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
    transform: translateY(-2px);
}

.add-mesh-btn:active {
    transform: translateY(0);
}

.btn-icon {
    font-size: 18px;
    font-weight: bold;
    color: #00ffff;
}

.btn-text {
    font-weight: 500;
}
</style>