<template>
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; pointer-events: none">
        <!-- 简化控制面板 -->
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
                max-width: 350px;
            "
        >
            <h3 style="margin: 0 0 15px 0; color: #4caf50; text-align: center">GeoKit 面相关组件控制器</h3>

            <!-- 基础控制 -->
            <div style="margin-bottom: 15px">
                <h4 style="margin: 0 0 8px 0; color: #2196f3; font-size: 14px">🎨 基础控制</h4>
                <button
                    @click="changeColor"
                    style="margin: 2px; padding: 8px 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    切换颜色
                </button>
                <button
                    @click="changeOpacity"
                    style="margin: 2px; padding: 8px 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    调节透明度
                </button>
                <button
                    @click="toggleWireframe"
                    style="margin: 2px; padding: 8px 12px; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    {{ isWireframe ? '关闭线框' : '开启线框' }}
                </button>
            </div>

            <!-- 多边形控制 -->
            <div style="margin-bottom: 15px; border-top: 1px solid #444; padding-top: 10px">
                <h4 style="margin: 0 0 8px 0; color: #9c27b0; font-size: 14px">🔺 多边形控制</h4>
                <button
                    @click="changePolygonShape"
                    style="margin: 2px; padding: 8px 12px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    切换形状
                </button>
                <button
                    @click="changeSubdivisions"
                    style="margin: 2px; padding: 8px 12px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    调节细分度
                </button>
                <button
                    @click="changeHeight"
                    style="margin: 2px; padding: 8px 12px; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    调节高度
                </button>
            </div>

            <!-- 其他控制 -->
            <div style="margin-bottom: 15px; border-top: 1px solid #444; padding-top: 10px">
                <h4 style="margin: 0 0 8px 0; color: #e91e63; font-size: 14px">🎛️ 其他控制</h4>
                <button
                    @click="resetToDefault"
                    style="margin: 2px; padding: 8px 12px; background: #607d8b; color: white; border: none; border-radius: 4px; cursor: pointer"
                >
                    重置所有
                </button>
            </div>

            <!-- 当前状态显示 -->
            <div style="background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 6px">
                <h4 style="margin: 0 0 8px 0; color: #fff; font-size: 14px">当前参数</h4>
                <div style="font-size: 12px; color: #ccc; line-height: 1.6">
                    <div>🎨 颜色: {{ currentColor }}</div>
                    <div>🌫️ 透明度: {{ currentOpacity.toFixed(1) }}</div>
                    <div>📐 线框模式: {{ isWireframe ? '开启' : '关闭' }}</div>
                    <div>🔺 当前形状: {{ polygonShapes[currentShapeIndex].name }}</div>
                    <div>📊 数据格式: GeoJSON {{ currentGeometry.type }}</div>
                    <div>🕳️ 洞数量: {{ currentHoleCount }}</div>
                    <div>🏗️ 细分程度: {{ currentSubdivisions }}</div>
                    <div>📏 面片高度: {{ currentFaceHeight }}m</div>
                </div>
            </div>

            <!-- 组件说明 -->
            <div style="margin-top: 10px; font-size: 11px; color: #aaa">
                <div>🔺 地理多边形 (GeoPolygon) - 基于地理坐标的多边形面片</div>
                <div>🧱 地理墙体 (GeoWall) - 基于多边形边界的立体墙面</div>
                <div style="margin-top: 5px; color: #4caf50">💡 支持动态纹理旋转效果</div>
                <div style="margin-top: 5px; color: #ff9800">🕳️ 支持多边形扣洞功能</div>
                <div style="margin-top: 5px; color: #2196f3">📊 支持GeoJSON Polygon/MultiPolygon格式</div>
            </div>
        </div>
    </div>

    <GeoCanvas v-model:position="cameraPosition">
        <GeoControls v-model:position="cameraPosition" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <!-- 地理多边形 -->
        <GeoPolygon :geometry="currentGeometry" :subdivisions="currentSubdivisions" :height="currentFaceHeight">
            <Suspense fallback="">
                <UseTexture v-slot="{ textures }" map="/plugins/digitalCity/image/rain.png">
                    <GeoTextureProps :texture="textures.map" :rotation="time * 0.1" :center="[0.5, 0.5]" />
                    <TresMeshStandardMaterial
                        :color="currentColor"
                        :transparent="currentOpacity < 1"
                        :opacity="currentOpacity"
                        :wireframe="isWireframe"
                        :side="DoubleSide"
                        :map="textures.map"
                    />
                </UseTexture>
            </Suspense>
        </GeoPolygon>

        <!-- 地理墙体 -->
        <GeoWall :geometry="currentGeometry" :height="50" :baseHeight="0">
            <Suspense>
                <UseTexture v-slot="{ textures }" map="/plugins/digitalCity/image/line2.png">
                    <GeoTextureProps :texture="textures.map" :rotation="time * 0.1" :center="[0.5, 0.5]" />
                    <TresMeshStandardMaterial
                        :color="currentColor"
                        :transparent="currentOpacity < 1"
                        :opacity="currentOpacity"
                        :wireframe="isWireframe"
                        :side="DoubleSide"
                        :map="textures.map"
                    />
                </UseTexture>
            </Suspense>
        </GeoWall>
    </GeoCanvas>
</template>

<script setup lang="ts">
import { GeoCanvas, GeoControls, GeoPolygon, GeoWall, GeoScene, GeoTextureProps, GeoPositionConfig } from '@icegl/geokit'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { DoubleSide } from 'three'
import { UseTexture } from '@tresjs/core'
import DevTDTTiles from '../components/DevTDTTiles.vue'

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 400,
    longitude: 118.78,
    latitude: 32.044,
})

// 保留time的使用 - 用于纹理旋转动画
const time = ref(0)
let animationFrameId: number

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

const animate = () => {
    time.value += 0.1
    animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
    animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
})

// 基础控制参数
const currentColor = ref('#ff6b6b')
const currentOpacity = ref(0.8)
const isWireframe = ref(false)

// 多边形专属参数
const currentSubdivisions = ref(2)
const currentFaceHeight = ref(0.5)

// 多边形形状配置
const polygonShapes = [
    {
        name: 'GeoJSON三角形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                [
                    [118.778, 32.044],
                    [118.782, 32.044],
                    [118.78, 32.048],
                    [118.778, 32.044],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON矩形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                [
                    [118.778, 32.044],
                    [118.782, 32.044],
                    [118.782, 32.048],
                    [118.778, 32.048],
                    [118.778, 32.044],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON带洞矩形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环
                [
                    [118.778, 32.044],
                    [118.782, 32.044],
                    [118.782, 32.048],
                    [118.778, 32.048],
                    [118.778, 32.044],
                ],
                // 内环（洞）
                [
                    [118.7792, 32.0452],
                    [118.7808, 32.0452],
                    [118.7808, 32.0468],
                    [118.7792, 32.0468],
                    [118.7792, 32.0452],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON复杂多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                [
                    [118.775, 32.045],
                    [118.783, 32.045],
                    [118.783, 32.05],
                    [118.775, 32.05],
                    [118.775, 32.045],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON大型带洞多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环
                [
                    [118.775, 32.042],
                    [118.785, 32.042],
                    [118.785, 32.052],
                    [118.775, 32.052],
                    [118.775, 32.042],
                ],
                // 内环（洞）
                [
                    [118.778, 32.045],
                    [118.782, 32.045],
                    [118.782, 32.049],
                    [118.778, 32.049],
                    [118.778, 32.045],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON多洞多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环
                [
                    [118.774, 32.041],
                    [118.786, 32.041],
                    [118.786, 32.053],
                    [118.774, 32.053],
                    [118.774, 32.041],
                ],
                // 第一个洞（左上）
                [
                    [118.776, 32.05],
                    [118.779, 32.05],
                    [118.779, 32.052],
                    [118.776, 32.052],
                    [118.776, 32.05],
                ],
                // 第二个洞（右上）
                [
                    [118.781, 32.05],
                    [118.784, 32.05],
                    [118.784, 32.052],
                    [118.781, 32.052],
                    [118.781, 32.05],
                ],
                // 第三个洞（中央）
                [
                    [118.778, 32.046],
                    [118.782, 32.046],
                    [118.782, 32.048],
                    [118.778, 32.048],
                    [118.778, 32.046],
                ],
                // 第四个洞（左下）
                [
                    [118.776, 32.042],
                    [118.779, 32.042],
                    [118.779, 32.044],
                    [118.776, 32.044],
                    [118.776, 32.042],
                ],
                // 第五个洞（右下）
                [
                    [118.781, 32.042],
                    [118.784, 32.042],
                    [118.784, 32.044],
                    [118.781, 32.044],
                    [118.781, 32.042],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON圆形洞多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环（大矩形）
                [
                    [118.773, 32.04],
                    [118.787, 32.04],
                    [118.787, 32.054],
                    [118.773, 32.054],
                    [118.773, 32.04],
                ],
                // 圆形洞（用多边形近似）
                [
                    [118.78, 32.047],
                    [118.7805, 32.0465],
                    [118.781, 32.0467],
                    [118.7815, 32.047],
                    [118.7818, 32.0475],
                    [118.782, 32.048],
                    [118.7818, 32.0485],
                    [118.7815, 32.049],
                    [118.781, 32.0493],
                    [118.7805, 32.0495],
                    [118.78, 32.0493],
                    [118.7795, 32.049],
                    [118.7792, 32.0485],
                    [118.779, 32.048],
                    [118.7792, 32.0475],
                    [118.7795, 32.047],
                    [118.78, 32.0467],
                    [118.78, 32.047],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON嵌套洞多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环
                [
                    [118.772, 32.039],
                    [118.788, 32.039],
                    [118.788, 32.055],
                    [118.772, 32.055],
                    [118.772, 32.039],
                ],
                // 大洞
                [
                    [118.775, 32.042],
                    [118.785, 32.042],
                    [118.785, 32.052],
                    [118.775, 32.052],
                    [118.775, 32.042],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON星形洞多边形',
        geometry: {
            type: 'Polygon' as const,
            coordinates: [
                // 外环（大矩形）
                [
                    [118.774, 32.041],
                    [118.786, 32.041],
                    [118.786, 32.053],
                    [118.774, 32.053],
                    [118.774, 32.041],
                ],
                // 星形洞
                [
                    [118.78, 32.044],
                    [118.7805, 32.0455],
                    [118.782, 32.046],
                    [118.7815, 32.0475],
                    [118.7825, 32.049],
                    [118.78, 32.0485],
                    [118.7775, 32.049],
                    [118.7785, 32.0475],
                    [118.778, 32.046],
                    [118.7795, 32.0455],
                    [118.78, 32.044],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON多重多边形',
        geometry: {
            type: 'MultiPolygon' as const,
            coordinates: [
                // 第一个多边形
                [
                    [
                        [118.775, 32.04],
                        [118.78, 32.04],
                        [118.78, 32.044],
                        [118.775, 32.044],
                        [118.775, 32.04],
                    ],
                ],
                // 第二个多边形
                [
                    [
                        [118.782, 32.046],
                        [118.787, 32.046],
                        [118.787, 32.05],
                        [118.782, 32.05],
                        [118.782, 32.046],
                    ],
                ],
            ],
        },
    },
    {
        name: 'GeoJSON多重带洞多边形',
        geometry: {
            type: 'MultiPolygon' as const,
            coordinates: [
                // 第一个多边形（带洞）
                [
                    // 外环
                    [
                        [118.773, 32.039],
                        [118.779, 32.039],
                        [118.779, 32.045],
                        [118.773, 32.045],
                        [118.773, 32.039],
                    ],
                    // 内环（洞）
                    [
                        [118.775, 32.041],
                        [118.777, 32.041],
                        [118.777, 32.043],
                        [118.775, 32.043],
                        [118.775, 32.041],
                    ],
                ],
                // 第二个多边形（带洞）
                [
                    // 外环
                    [
                        [118.781, 32.047],
                        [118.787, 32.047],
                        [118.787, 32.053],
                        [118.781, 32.053],
                        [118.781, 32.047],
                    ],
                    // 内环（洞）
                    [
                        [118.783, 32.049],
                        [118.785, 32.049],
                        [118.785, 32.051],
                        [118.783, 32.051],
                        [118.783, 32.049],
                    ],
                ],
                // 第三个多边形（多个洞）
                [
                    // 外环
                    [
                        [118.774, 32.055],
                        [118.786, 32.055],
                        [118.786, 32.061],
                        [118.774, 32.061],
                        [118.774, 32.055],
                    ],
                    // 第一个洞
                    [
                        [118.776, 32.057],
                        [118.778, 32.057],
                        [118.778, 32.059],
                        [118.776, 32.059],
                        [118.776, 32.057],
                    ],
                    // 第二个洞
                    [
                        [118.782, 32.057],
                        [118.784, 32.057],
                        [118.784, 32.059],
                        [118.782, 32.059],
                        [118.782, 32.057],
                    ],
                ],
            ],
        },
    },
]

const currentShapeIndex = ref(0)

const currentGeometry = computed(() => {
    return polygonShapes[currentShapeIndex.value].geometry
})

// 计算洞的数量
const currentHoleCount = computed(() => {
    const geometry = currentGeometry.value
    if (geometry.type === 'Polygon') {
        return geometry.coordinates.length - 1 // 减去外环
    } else {
        // MultiPolygon的洞数量是所有多边形的洞数量之和
        return geometry.coordinates.reduce((total, polygon) => total + (polygon.length - 1), 0)
    }
})

// 配置选项
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#fcc468', '#f38ba8', '#a8dadc']
const opacities = [0.3, 0.5, 0.7, 0.8, 0.9, 1.0]
const subdivisions = [1, 2, 3, 4, 5, 10, 20]
const heights = [0.1, 0.2, 0.3, 0.4, 0.5, 1, 5, 10, 20]

// 当前索引
let colorIndex = 0
let opacityIndex = 3
let subdivisionsIndex = 1
let heightIndex = 2

// 控制方法
const changeColor = () => {
    colorIndex = (colorIndex + 1) % colors.length
    currentColor.value = colors[colorIndex]
}

const changeOpacity = () => {
    opacityIndex = (opacityIndex + 1) % opacities.length
    currentOpacity.value = opacities[opacityIndex]
}

const toggleWireframe = () => {
    isWireframe.value = !isWireframe.value
}

const changePolygonShape = () => {
    currentShapeIndex.value = (currentShapeIndex.value + 1) % polygonShapes.length
}

const changeSubdivisions = () => {
    subdivisionsIndex = (subdivisionsIndex + 1) % subdivisions.length
    currentSubdivisions.value = subdivisions[subdivisionsIndex]
}

const changeHeight = () => {
    heightIndex = (heightIndex + 1) % heights.length
    currentFaceHeight.value = heights[heightIndex]
}

const resetToDefault = () => {
    colorIndex = 0
    opacityIndex = 3
    subdivisionsIndex = 1
    heightIndex = 2

    currentColor.value = colors[colorIndex]
    currentOpacity.value = opacities[opacityIndex]
    currentSubdivisions.value = subdivisions[subdivisionsIndex]
    currentFaceHeight.value = heights[heightIndex]
    currentShapeIndex.value = 0

    isWireframe.value = false
}
</script>

<style scoped>
/* 基础样式 */
button:hover {
    opacity: 0.8;
    transform: translateY(-1px);
}

button:active {
    opacity: 0.6;
    transform: translateY(0);
}

button {
    transition: all 0.2s ease;
}
</style>
