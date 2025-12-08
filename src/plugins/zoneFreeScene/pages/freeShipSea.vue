<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-08 12:05:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-08 12:09:29
-->

<template>
    <loading useResourceManager />
    <TresCanvas v-bind="tcConfig"><TresPerspectiveCamera :position="[37.98,38.83,49.21]" 
			:fov="75" :aspect="1" :near="1" :far="100000" />
        <OrbitControls makeDefault :target="new THREE.Vector3(-1.76,3.13,-19.4)" />
        <TresAmbientLight :color="0xffffff" :intensity="0.5" />
        <viewportGizmo v-bind="viewportConfig" />

				<floor :fState="fState" :gridState="gridState" />
				<skylight v-bind="sState" />
				<glbsList v-if="Resource.hasAllFinished.value" />
				<extendMeshes v-if="Resource.hasAllFinished.value" />
				<tresProcessing :postProcessing="pState" />
				<basiceEnv v-bind="basiceEnvState" />
    </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { viewportGizmo } from 'PLS/useViewportGizmo'
import { Resource } from 'PLS/resourceManager'
import { basiceEnv } from 'PLS/skyBox'
import { yangyangLoading as loading } from 'PLS/UIdemo'
import floor from '../components/freeShipSea/floor.vue'
import skylight from '../components/freeShipSea/skylight.vue'
import glbsList from '../components/freeShipSea/glbsList.vue'
import tresProcessing from '../components/freeShipSea/tresProcessing.vue'
import extendMeshes from '../components/freeShipSea/extendMeshes.vue'

const fState = {"size":0.8,"wireframe":false,"waterColor":"#002E5C","waves":{"A":{"direction":0,"steepness":0.16,"wavelength":60},"B":{"direction":30,"steepness":0.24,"wavelength":30},"C":{"direction":60,"steepness":0.33,"wavelength":15}},"meshUUIDList":[{"uuid":"670f59b7-487c-4cec-aaed-328e392965ff","floatScale":0.4,"yOffsetScale":0.3},{"uuid":"75ef2b5c-62d6-4c23-b9c9-e8c2d6cd440a","floatScale":0.4,"yOffsetScale":0.4},{"uuid":"52df6326-8128-4687-a752-51b56df75185","floatScale":1.1,"yOffsetScale":0.68},{"uuid":"f0c2641d-e5d5-47cd-b638-91cbaf06af5e","floatScale":1.1,"yOffsetScale":0.68},{"uuid":"6200a408-1b9f-4073-824a-063ae623a5ba","floatScale":1.2,"yOffsetScale":0.68},{"uuid":"c37ca173-1ffd-43d5-8645-254547b96e36","floatScale":1.2,"yOffsetScale":0.68},{"uuid":"59a38498-8204-4279-8d6b-c84704941f3c","floatScale":1.2,"yOffsetScale":0.68}],"scale":0.81}
const gridState = {"cellSize":0.6,"cellThickness":1,"cellColor":"#6f6f6f","sectionColor":"#63e2b7","sectionSize":3.3,"sectionThickness":1.5,"fadeDistance":25,"fadeStrength":1,"infiniteGrid":true}
const basiceEnvState = {"type":"desert","on":true,"environmentIntensity":1.2,"environmentRotations":{"x":0.06,"y":0,"z":0}}
const sState = {"curTime":7.6,"direct":-0.1,"intensity":1,"shadowIntensity":1,"toneMapping":1,"toneMappingExposure":0.99}
const pState = {"isOpenList":{},"configList":{}}

const tcConfig = {
    clearColor: '#201919',
    windowSize: true,
    shadows: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 0.6,
    shadowMapType: THREE.PCFSoftShadowMap,
}

const viewportConfig = {
    size: 100,
    lineWidth: 2,
    type: 'sphere',
    placement: 'bottom-right',
    offset: {
        right: 10,
    },
}

    Resource.loadResources([
    
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/4海上标识/models/灯塔B.glb' },
            
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/3船/models/货轮B.glb' },
            
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/3船/models/游轮A.glb' },
            
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb' },
            
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机A.glb' },
            
            { functionName: 'GLTFLoader', url: 'https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb' },
            
    ])
    </script>