<template>
    <TresCanvas v-bind="state" window-size @loop="onLoop">
        <TresPerspectiveCamera :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" ref="cameraRef" />
        <GeoCSS2DRenderer />
        <GeoControls
            v-model:position="cameraPosition"
            v-model:targetPosition="targetPosition"
            :target="focusTarget ? weiXingPosition : null"
            :min-distance="1"
        />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles layer="img" />

        <GeoPosition :point="ship1Position">
            <GeoRotate :rotate="-12" :scale-x="0.9">
                <GeoGLTF url="/plugins/geokit/case-real-3/model/chuan.glb" draco />
            </GeoRotate>
        </GeoPosition>

        <GeoPosition :point="ship2Position">
            <GeoRotate :rotate="-12" :scale-x="0.9">
                <GeoGLTF url="/plugins/geokit/case-real-3/model/chuan.glb" draco />
            </GeoRotate>
        </GeoPosition>

        <Suspense>
            <UseTexture v-slot="{ state }" path="/plugins/geokit/case-real-3/image/road-texture.png">
                <GeoTextureProps :texture="state" :wrapT="RepeatWrapping" :wrapS="RepeatWrapping" />
                <GeoLineAnimation :speed="lineSpeed" v-if="road1.length">
                    <GeoMeshline
                        :repeat="[lineRepeat, 1]"
                        :map="state"
                        :duration="4"
                        :points="road1"
                        :width="lineWidth"
                        color="#fff"
                        :renderOrder="500"
                    />
                </GeoLineAnimation>
            </UseTexture>
        </Suspense>
        <GeoMeshline v-if="road1.length" :points="road1" :width="lineWidth" color="#fff" :opacity="lineOpacity" :renderOrder="200" />

        <GeoPosition :point="weiXingPosition">
            <GeoRotate :rotate="-12" :scale-x="0.9">
                <TresGroup :scale="[5, 5, 5]">
                    <GeoGLTF url="/plugins/geokit/case-real-3/model/weixing.glb" draco />
                </TresGroup>
            </GeoRotate>
        </GeoPosition>
        <GeoIcon icon="/plugins/geokit/case-real-3/icons/satellite.svg" :size="16" :point="weiXingPosition" @click="focusTarget = !focusTarget"></GeoIcon>
        <GeoIcon icon="/plugins/geokit/case-real-3/icons/ship.svg" :size="16" :point="ship1Position"></GeoIcon>
        <GeoIcon icon="/plugins/geokit/case-real-3/icons/ship.svg" :size="16" :point="ship2Position"></GeoIcon>
    </TresCanvas>
    
    <!-- 控制面板 -->
    <div class="control-panel">
        <button @click="focusOnSatellite" class="focus-btn satellite-btn">
            聚焦卫星
        </button>
        <button @click="focusOnShip1" class="focus-btn ship-btn">
            聚焦船只1
        </button>
        <button @click="focusOnShip2" class="focus-btn ship-btn">
            聚焦船只2
        </button>
        <button @click="resetCamera" class="reset-btn">
            还原镜头
        </button>
    </div>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping, CurvePath, LineCurve, Vector2, PerspectiveCamera, RepeatWrapping, Vector3 } from 'three'
import { reactive, ref } from 'vue'
import {
    GeoControls,
    GeoCSS2DRenderer,
    GeoLineAnimation,
    GeoTextureProps,
    GeoScene,
    GeoPositionConfig,
    GeoGLTF,
    GeoPosition,
    GeoRotate,
    GeoMeshline,
    GeoIcon,
    GeoMapControlsTarget,
} from '@icegl/geokit'
import {UseTexture} from '@tresjs/cientos'
import DevTDTTiles from '../components/DevTDTTiles.vue'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const ship1Position = ref({ lon: 117.84796240906425, lat: 38.95216229684954, height: 20 })

const ship2Position = ref({ lon: 117.8533521756129, lat: 38.95128, height: 20 })

/** 简单线性插值器，把 [5000, 10000000] 映射到 [1, 1000]，可复用 */
function createInterpolator(inMin: number, inMax: number, outMin: number, outMax: number, clamp: boolean = true) {
    const denom = inMax - inMin || 1
    return (value: number) => {
        let t = (value - inMin) / denom
        if (clamp) t = Math.max(0, Math.min(1, t))
        return outMin + t * (outMax - outMin)
    }
}

const cameraRef = ref<PerspectiveCamera>()

function vec32ecefHeight(vec3: Vector3) {
    // Convert ECEF (x, y, z) to geodetic height above WGS84 ellipsoid
    const x = vec3.x
    const y = vec3.y
    const z = vec3.z

    // WGS84 constants
    const a = 6378137.0 // semi-major axis (m)
    const b = 6356752.314245 // semi-minor axis (m)
    const a2 = a * a
    const b2 = b * b
    const e2 = (a2 - b2) / a2 // first eccentricity squared
    const ep2 = (a2 - b2) / b2 // second eccentricity squared

    const p = Math.hypot(x, y)
    if (p === 0 && z === 0) {
        // Degenerate: at earth center; fallback to radius-based approximation
        return Math.sqrt(x * x + y * y + z * z) - a
    }

    // Bowring’s formula
    const theta = Math.atan2(z * a, p * b)
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    const lat = Math.atan2(z + ep2 * b * sinTheta * sinTheta * sinTheta, p - e2 * a * cosTheta * cosTheta * cosTheta)

    const sinLat = Math.sin(lat)
    const cosLat = Math.cos(lat)
    const N = a / Math.sqrt(1 - e2 * sinLat * sinLat)

    // Height calculation, handle near-poles to avoid division by zero
    if (Math.abs(cosLat) > 1e-12) {
        return p / cosLat - N
    } else {
        return z / Math.sign(sinLat) - N * (1 - e2)
    }
}

const cameraHeight = ref(0)
const lineRepeat = ref(2000)
const lineWidth = ref(100)
const lineSpeed = ref(1)
const lineOpacity = ref(1)

const map5000to1e7_to1to1000 = createInterpolator(5000, 10000000, 1, 1000)
const map5000to1e7_to4000to1 = createInterpolator(5000, 10000000, 0.001, 1)

import { watch } from 'vue'
// 监听 cameraHeight，计算插值结果
watch(cameraHeight, (val) => {
    lineRepeat.value = 2000 / map5000to1e7_to1to1000(val)
    lineWidth.value = 100 * map5000to1e7_to1to1000(val)
    lineSpeed.value = map5000to1e7_to4000to1(val)
    lineOpacity.value = ((val - 100000) / (1000000 - 100000)) * 0.5
})

// 卫星动画参数
const speedFactor = ref(1) // 速度系数，可调节
const orbitLat = 40 // 北纬40°
const orbitHeight = 800000 // 高度不变
const orbitCenterLon = 90.85 // 轨道中心经度
const period = 500 // 一圈所需秒数

const weiXingPosition = ref({
    lon: orbitCenterLon,
    lat: orbitLat,
    height: orbitHeight,
})

function animateWeiXing() {
    const now = performance.now()
    const t = (now / 1000) * speedFactor.value
    const theta = ((t % period) / period) * 2 * Math.PI
    weiXingPosition.value.lon = (orbitCenterLon + (theta * 180) / Math.PI) % 360
    weiXingPosition.value.lat = orbitLat + 5 * Math.cos(theta)
    weiXingPosition.value.height = orbitHeight
}

const onLoop = () => {
    animateWeiXing()

    if (cameraRef.value) {
        cameraHeight.value = vec32ecefHeight(cameraRef.value?.getWorldPosition(new Vector3()))
    }
}

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
        position: [-1500, 500, 500], // [number, number, number]
    },
    background: '/plugins/earthSample/image/menuA/bg-img.png',
})

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -60,
    distance: 6000000,
    longitude: 117.85013382539205,
    latitude: 38.95151356092132,
})

const targetPosition = ref<GeoMapControlsTarget>({
    heading: 90,
    pitch: 45,
    distance: 200,
})

const roadPoints = [
    { lon: 117.85481967875631, lat: 38.95025551631983 },
    { lon: 117.85566616248491, lat: 38.95427209924625 },
    { lon: 117.85712202478027, lat: 38.95970065499051 },
    { lon: 118.10293300958989, lat: 38.92203696242356 },
    { lon: 118.21571040844162, lat: 38.8584869570214 },
    { lon: 118.56457646308445, lat: 38.792815766352845 },
    { lon: 119.52790645782477, lat: 38.717044062084426 },
    { lon: 120.65902562748857, lat: 38.60702467836941 },
    { lon: 120.79461456776448, lat: 38.58622713855249 },
    { lon: 120.92076119840306, lat: 38.52106665879057 },
    { lon: 121.9906916889725, lat: 38.18314251246517 },
    { lon: 124.14446035378819, lat: 37.44557549519065 },
    { lon: 125.9802772978905, lat: 37.39012819157668 },
    { lon: 126.42446686403741, lat: 37.35004753338622 },
    { lon: 126.48154639818023, lat: 37.36107410768207 },
    { lon: 126.56124848326965, lat: 37.40711309766567 },
    { lon: 126.57255884697423, lat: 37.421008747816884 },
    { lon: 126.581932075672, lat: 37.42778825439147 },
    { lon: 126.59275992012022, lat: 37.42831387228446 },
    { lon: 126.60078120441494, lat: 37.42464694776248 },
]
const curve = new CurvePath()

for (let i = 0; i < roadPoints.length - 1; i++) {
    const start = roadPoints[i]
    const end = roadPoints[i + 1]
    curve.add(new LineCurve(new Vector2(start.lon, start.lat), new Vector2(end.lon, end.lat)))
}

const road1 = curve.getSpacedPoints(1000).map((point) => ({
    lon: point.x,
    lat: point.y,
    height: 20,
}))

const focusTarget = ref(false)

// 保存初始相机位置，用于还原
const initialCameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -60,
    distance: 6000000,
    longitude: 117.85013382539205,
    latitude: 38.95151356092132,
})

// 聚焦到卫星
function focusOnSatellite() {
    cameraPosition.value = {
        heading: 0,
        pitch: -45,
        distance: 100000,
        longitude: weiXingPosition.value.lon,
        latitude: weiXingPosition.value.lat,
    }
    focusTarget.value = true
}

// 聚焦到船只1
function focusOnShip1() {
    cameraPosition.value = {
        heading: 0,
        pitch: -45,
        distance: 500,
        longitude: ship1Position.value.lon,
        latitude: ship1Position.value.lat,
    }
    focusTarget.value = false
}

// 聚焦到船只2
function focusOnShip2() {
    cameraPosition.value = {
        heading: 0,
        pitch: -45,
        distance: 500,
        longitude: ship2Position.value.lon,
        latitude: ship2Position.value.lat,
    }
    focusTarget.value = false
}

// 还原镜头到初始位置
function resetCamera() {
    cameraPosition.value = { ...initialCameraPosition.value }
    focusTarget.value = false
}
</script>
<style scoped>
.control-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

.focus-btn, .reset-btn {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 100px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.satellite-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.satellite-btn:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.ship-btn {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.ship-btn:hover {
    background: linear-gradient(135deg, #e888f0 0%, #e04c5f 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
}

.reset-btn {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

.reset-btn:hover {
    background: linear-gradient(135deg, #3d8bfe 0%, #00d9fe 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
}

.focus-btn:active, .reset-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
</style>
