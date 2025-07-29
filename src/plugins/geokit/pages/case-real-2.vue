<template>
    <p class="video-link"><a href="https://www.bilibili.com/video/BV11C8GziEiH" target="_blank">视频教学</a></p>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <GeoCSS2DRenderer />
        <GeoControls v-model:position="cameraPosition" :min-distance="1" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <Suspense>
            <UseTexture v-slot="{ textures }" map="/plugins/geokit/image/110000.bg.jpg">
                <GeoTextureProps :texture="textures.map" />
                <GeoPolygon :geometry="beijingGeojson.features[0].geometry" v-if="beijingGeojson" :height="5000" :renderOrder="10">
                    <TresMeshStandardMaterial :map="textures.map" :side="DoubleSide" transparent :depth-write="false" />
                </GeoPolygon>
            </UseTexture>
        </Suspense>
        <Suspense>
            <UseTexture v-slot="{ textures }" map="/plugins/digitalCity/image/line2.png">
                <GeoTextureProps :texture="textures.map" :rotation="-Math.PI / 2" :center="[0.2, 0.5]" />
                <GeoWall :geometry="beijingGeojson.features[0].geometry" v-if="beijingGeojson" :height="5000" :renderOrder="10">
                    <TresMeshStandardMaterial :map="textures.map" :side="DoubleSide" transparent :depth-write="false" />
                </GeoWall>
            </UseTexture>
        </Suspense>
        <GeoMeshline
            texture="/plugins/digitalCity/image/flyLine4.png"
            :duration="2"
            :points="beijingBorder"
            :width="500"
            :renderOrder="50"
            color="#0057ff"
            v-if="beijingBorder.length"
        />

        <Suspense v-if="beijingChidlrenGeojson">
            <UseTexture v-slot="{ textures }" map="/plugins/floor/image/concrete_wet_floor_basecolor.jpg">
                <GeoTextureProps :texture="textures.map" />
                <template v-for="feature in beijingChidlrenGeojson.features">
                    <GeoPolygon
                        :geometry="feature.geometry"
                        v-if="feature"
                        :height="5000"
                        :renderOrder="20"
                        @pointer-enter="hoverAreaName = feature.properties?.name"
                        @pointer-leave="hoverAreaName = ''"
                        @click="goToArea(feature.properties?.name)"
                    >
                        <TresMeshStandardMaterial
                            :map="textures.map"
                            :side="DoubleSide"
                            transparent
                            :opacity="highlightAreaName === feature.properties?.name ? 0.7 : 0"
                            :depth-write="false"
                        />
                    </GeoPolygon>

                    <GeoCSS2D
                        :point="{
                            lon: feature.properties?.centroid[0],
                            lat: feature.properties?.centroid[1],
                            height: 9000,
                        }"
                        v-if="highlightAreaName ? highlightAreaName === feature.properties?.name : cameraPosition.distance < 600000"
                    >
                        <div class="css2d-label">
                            {{ feature.properties?.name }}
                        </div>
                    </GeoCSS2D>
                </template>
            </UseTexture>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping, DoubleSide } from 'three'
import { onMounted, reactive, ref, shallowRef, computed } from 'vue'
import {
    GeoControls,
    GeoCSS2DRenderer,
    GeoScene,
    GeoPositionConfig,
    GeoPolygon,
    GeoWall,
    GeoTextureProps,
    GeoMeshline,
    GeoCSS2D,
    Line as GeoLineType,
} from '@icegl/geokit'
import DevTDTTiles from '../components/DevTDTTiles.vue'
import { UseTexture } from '@tresjs/core'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

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
    background: '/plugins/earthSample/image/menuA/bg-img.png',
})

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 270000,
    longitude: 116.31635810091619,
    latitude: 40.125336671652086,
})

const hoverAreaName = ref<string>('')
const focusAreaName = ref<string>('')
const highlightAreaName = computed(() => {
    return focusAreaName.value || hoverAreaName.value
})

const beijingChidlrenGeojson = shallowRef<GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>>()
const beijingGeojson = shallowRef<GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>>()
const beijingBorder = shallowRef<GeoLineType>([])

onMounted(() => {
    fetch('/plugins/geokit/json/110000.json')
        .then((response) => response.json())
        .then((data: GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>) => {
            beijingGeojson.value = data
            beijingBorder.value = data.features[0].geometry.coordinates[0][0].map((point) => {
                return {
                    lon: point[0],
                    lat: point[1],
                    height: 5100,
                }
            })
        })
        .catch((error) => {
            console.error('Error loading Beijing GeoJSON:', error)
        })

    fetch('/plugins/geokit/json/110000.children.json')
        .then((response) => response.json())
        .then((data: GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>) => {
            beijingChidlrenGeojson.value = data
        })
        .catch((error) => {
            console.error('Error loading Beijing GeoJSON:', error)
        })
})

const goToArea = (areaName: string | undefined) => {
    if (!areaName) return

    if (focusAreaName.value === areaName) {
        focusAreaName.value = ''
        return
    }
    focusAreaName.value = areaName

    // 数据切换控制 ...
    // $emit('focus-area', areaName)
    // 这里可以添加逻辑来处理焦点区域的变化，例如更新其他图表数据
}
</script>
<style scoped>
.css2d-label {
    font-size: 14px;
    color: #fff;
    background: linear-gradient(90deg, #0057ff 0%, #00cfff 100%);
    padding: 2px;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(0, 87, 255, 0.15);
    font-weight: 600;
    letter-spacing: 0px;
    border: 1px solid #fff;
    pointer-events: none;
    transition: background 0.3s;
}
.video-link {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    text-align: center;
    z-index: 1000;
    font-size: 16px;
    font-weight: 600;
    background: rgba(0, 87, 255, 0.08);
    border-radius: 8px;
    padding: 6px 18px;
    box-shadow: 0 2px 8px rgba(0, 87, 255, 0.12);
}

.video-link a {
    color: #0057ff;
    text-decoration: none;
    transition: color 0.2s;
}

.video-link a:hover {
    color: #00cfff;
    text-decoration: underline;
}
</style>
