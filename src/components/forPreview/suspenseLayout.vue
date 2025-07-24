<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-21 17:24:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-24 09:53:00
-->
<template>
    <Suspense>
        <router-view />
    </Suspense>
    <showSrcBtn v-if="!config?.preview?.disableSrcBtn" :parts="parts" />
    <referenceSource :referenceSourceConfig="referenceSourceConfig" />
    <FPSGraph v-if="!config?.preview?.disableFPSGraph" />
    <miniBts v-if="detectDeviceType() === 'Mobile'" />
</template>
<script setup lang="ts">
import { getOnePluginConfig, detectDeviceType } from '../../common/utils'
import showSrcBtn from './showSrcBtn.vue'
import referenceSource from './referenceSource.vue'
import FPSGraph from './FPSGraph.vue'
import miniBts from './miniBts.vue'

const originalUrl = window.location.href.split('?')[0]
const hashPart = originalUrl.split('#')[1] || ''
const parts = hashPart.split('/')
let config = null
if (parts[2] === 'basic') {
    config = getOnePluginConfig(parts[2], parts[3], parts[4])
} else {
    config = getOnePluginConfig(parts[2], parts[3])
}

console.log('插件配置:', config)
const referenceSourceConfig = config?.preview?.referenceSource
</script>
