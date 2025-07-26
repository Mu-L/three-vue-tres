<template>
    <TresCanvas
        v-bind="state"
        window-size
        :class="{
            'hover-main-building': hoverMainBuilding || hoverSchool,
        }"
    >
        <TresPerspectiveCamera :fov="29" :near="50" :far="1000000" />
        <GeoCSS2DRenderer />
        <GeoControls v-model:position="cameraPosition" :min-distance="1" />
        <GeoScene :sceneConfig="sceneConfig" />
        <DevTDTTiles />

        <GeoBuilding
            v-for="(building, index) in buildings"
            :key="index"
            :geometry="building.geometry"
            show-top
            :height="building.properties.height"
            :base-height="building.properties.baseHeight"
        >
            <template #top>
                <TresMeshStandardMaterial :color="building.properties.color" :side="DoubleSide" />
            </template>
            <template #walls>
                <TresMeshStandardMaterial :color="building.properties.color" :side="DoubleSide" />
            </template>
        </GeoBuilding>

        <GeoBuilding
            :geometry="mainBuilding.geometry"
            show-top
            :height="mainBuilding.properties.height"
            :base-height="0"
            @pointer-over="hoverMainBuilding = true"
            @pointer-leave="hoverMainBuilding = false"
            @click="jumpToBuilding"
        >
            <template #top>
                <TresMeshStandardMaterial :color="mainBuilding.properties.topColor || mainBuilding.properties.color" :side="DoubleSide" />
            </template>
            <template #walls>
                <Suspense>
                    <UseTexture v-slot="{ textures }" map="/plugins/geokit/image/building-wall.png">
                        <GeoTextureProps :texture="textures.map" :wrapS="RepeatWrapping" :wrapT="RepeatWrapping" :repeat="[5, 1]" :center="[0.5, 0.5]" />
                        <TresMeshStandardMaterial :color="mainBuilding.properties.color" :side="DoubleSide" :map="textures.map" />
                    </UseTexture>
                </Suspense>
            </template>
        </GeoBuilding>

        <GeoCSS2D v-if="hoverMainBuilding" :point="{ lon: 116.40036727754858, lat: 39.88920339523989, height: 100 }">
            <div class="building-label">锦江大楼</div>
        </GeoCSS2D>

        <Suspense>
            <UseTexture v-slot="{ textures }" map="/plugins/digitalCity/image/line2.png">
                <GeoWall :geometry="lightWall.geometry" :height="26" v-if="hoverMainBuilding">
                    <GeoTextureProps :texture="textures.map" :rotation="Math.PI / 2" :center="[0.5, 0.5]" />
                    <TresMeshBasicMaterial color="#93adff" :transparent="true" :opacity="0.8" :side="DoubleSide" :map="textures.map" />
                </GeoWall>

                <GeoWall :geometry="school.geometry" :height="20">
                    <GeoTextureProps :texture="textures.map" :rotation="Math.PI / 2" :center="[0.5, 0.5]" />
                    <TresMeshBasicMaterial color="#00cb91" :transparent="true" :opacity="0.8" :side="DoubleSide" :map="textures.map" />
                </GeoWall>
            </UseTexture>
        </Suspense>

        <GeoPolygon :geometry="school.geometry" :height="1" :subdivisions="2" @pointer-over="hoverSchool = true" @pointer-leave="hoverSchool = false">
            <TresMeshStandardMaterial color="#00cb91" transparent :opacity="0.6" :side="DoubleSide" />
        </GeoPolygon>

        <GeoFlyline
            v-if="hoverSchool"
            texture="/plugins/digitalCity/image/flyLine1.png"
            :start="{ lon: 116.40463917407055, lat: 39.889897530319814, height: 0 }"
            :end="{ lon: 116.40036727754858, lat: 39.88920339523989, height: 0 }"
            type="mesh"
            color="#ff6b6b"
            :width="20"
            :arcHeight="60"
            :segments="15"
        />

        <GeoCSS2D :point="{ lon: 116.40463917407055, lat: 39.889897530319814, height: 80 }">
            <div class="building-label">金台书院小学</div>
        </GeoCSS2D>
        <GeoMeshline v-if="hoverMainBuilding" texture="/plugins/digitalCity/image/flyLine5.png" :points="moveLine" color="#00cb91" :width="6" :duration="4" />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping, DoubleSide, RepeatWrapping } from 'three'
import { reactive, ref, onMounted } from 'vue'
import { useRenderLoop, UseTexture } from '@tresjs/core'
import {
    GeoBuilding,
    GeoWall,
    GeoCSS2D,
    GeoMeshline,
    GeoTextureProps,
    GeoPolygon,
    GeoFlyline,
    GeoControls,
    GeoCSS2DRenderer,
    GeoScene,
    GeoPositionConfig,
} from '@icegl/geokit'
import DevTDTTiles from '../components/DevTDTTiles.vue'

const jumpToBuilding = () => {
    window.open(`https://www.baidu.com/s?wd=tvt.js`)
}

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

const hoverSchool = ref(false)
const hoverMainBuilding = ref(false)

// 相机位置
const cameraPosition = ref<GeoPositionConfig>({
    heading: 90,
    pitch: -45,
    distance: 1000,
    longitude: 116.4,
    latitude: 39.89,
})

const lightWall = {
    type: 'Feature',
    properties: {},
    geometry: {
        coordinates: [
            [
                [116.40062444484641, 39.889318170003946],
                [116.4001166459069, 39.88932218813355],
                [116.40011595163548, 39.8891218914753],
                [116.4006220748131, 39.889125620407725],
                [116.40062444484641, 39.889318170003946],
            ],
        ],
        type: 'Polygon' as const,
    },
} as any

const mainBuilding = {
    type: 'Feature',
    properties: {
        height: 60,
        color: '#ffffff',
        topColor: '#504945',
        mainTexture: true,
    },
    geometry: {
        coordinates: [
            [
                [116.40014420481106, 39.88927114134762],
                [116.40014420481106, 39.88913976120688],
                [116.400590940131, 39.88914371249297],
                [116.40058450302269, 39.88927114134762],
                [116.40042872500055, 39.88927311698686],
                [116.40043001242219, 39.889290897737766],
                [116.40037722813429, 39.88928892209904],
                [116.40037722813429, 39.88927114134762],
                [116.40014420481106, 39.88927114134762],
            ],
        ],
        type: 'Polygon' as const,
    },
    id: 0,
}

const buildings = [
    {
        type: 'Feature',
        properties: {
            height: 2,
            baseHeight: 60,
            color: '#504945',
        },
        geometry: {
            coordinates: [
                [
                    [116.40053533720663, 39.889249911650154],
                    [116.40017739101808, 39.88925212335408],
                    [116.40017278524135, 39.889157605650865],
                    [116.40054154057134, 39.88916386201336],
                    [116.40053533720663, 39.889249911650154],
                ],
            ],
            type: 'Polygon' as const,
        },
    },
    {
        type: 'Feature',
        properties: {
            height: 12,
            color: '#ffffff',
        },
        geometry: {
            coordinates: [
                [
                    [116.4000509875824, 39.889359296436],
                    [116.39989247312991, 39.88936206755017],
                    [116.39989310873028, 39.8892962028674],
                    [116.40004924175582, 39.88929441024413],
                    [116.4000509875824, 39.889359296436],
                ],
            ],
            type: 'Polygon' as const,
        },
    },
    {
        type: 'Feature',
        properties: {
            height: 8,
            color: '#ffffff',
        },
        geometry: {
            coordinates: [
                [
                    [116.40076351042848, 39.889339235722645],
                    [116.40077599720547, 39.88923220866707],
                    [116.40101131339742, 39.889232538713486],
                    [116.40101886988708, 39.88907676585791],
                    [116.40065498932728, 39.889059496620376],
                    [116.40066269271313, 39.888942049956626],
                    [116.40122206035153, 39.888958815209804],
                    [116.4011953578576, 39.889353247053606],
                    [116.40076351042848, 39.889339235722645],
                ],
            ],
            type: 'Polygon' as const,
        },
    },
]

const moveLine = [
    { lon: 116.40037040420532, lat: 39.88913457626359, height: 2 },
    { lon: 116.4003672801478, lat: 39.88898436108789, height: 2 },
    { lon: 116.40058804688078, lat: 39.88899474831794, height: 2 },
    { lon: 116.40071300918225, lat: 39.889219271909184, height: 2 },
    { lon: 116.4006930606676, lat: 39.88946483590655, height: 2 },
    { lon: 116.40140135311572, lat: 39.88949379078031, height: 2 },
    { lon: 116.40230994137869, lat: 39.889536109418884, height: 2 },
    { lon: 116.40290792635864, lat: 39.889560609283734, height: 2 },
    { lon: 116.40352042515502, lat: 39.889589564117045, height: 2 },
    { lon: 116.40397326786865, lat: 39.88960738246945, height: 2 },
    { lon: 116.40444352769259, lat: 39.889475971544925, height: 2 },
    { lon: 116.40473613342004, lat: 39.889398165665085, height: 2 },
    { lon: 116.40483768131469, lat: 39.889376041349294, height: 2 },
    { lon: 116.40499062999464, lat: 39.889368345933406, height: 2 },
    { lon: 116.40499564470542, lat: 39.88955880722449, height: 2 },
    { lon: 116.40445154858082, lat: 39.88966461882447, height: 2 },
    { lon: 116.40448414420251, lat: 39.889863736573744, height: 2 },
]

const school = {
    type: 'Feature',
    properties: {},
    geometry: {
        coordinates: [
            [
                [116.40400143273263, 39.89032645785227],
                [116.40399027285565, 39.8902995145053],
                [116.40402563420929, 39.88974295726425],
                [116.40407112221544, 39.88973807097332],
                [116.40407194958078, 39.88967255645244],
                [116.40432411653177, 39.8896726230017],
                [116.40430100031023, 39.88961383892075],
                [116.40486204831541, 39.88948601599472],
                [116.40493147780046, 39.88947746193895],
                [116.40535511205286, 39.88948610850272],
                [116.40532159619062, 39.89001145062542],
                [116.40493536530039, 39.890076964926834],
                [116.40482603974834, 39.89025269018805],
                [116.40440709146338, 39.89033351141137],
                [116.40400143273263, 39.89032645785227],
            ],
        ],
        type: 'Polygon' as const,
    },
}

// const { onLoop, pause, resume } = useRenderLoop()
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {})

onMounted(() => {})
</script>
<style scoped>
.hover-main-building {
    cursor: pointer;
}

.building-label {
    position: absolute;
    left: 50%;
    top: 20px;
    white-space: nowrap;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
