<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-07 08:12:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-12 10:08:07
-->
<template>
    <loading />
    <TresCanvas v-bind="state" window-size>
        <Suspense>
            <dissolveEffectCar v-bind="frjState" ref="dissolveEffectModelRef" @click="clickMesh" />
        </Suspense>
        <otherObject />
    </TresCanvas>
		<h2 class="text-center text-white w-full absolute" >双击车辆消失后回传信息且跳转</h2>
</template>

<script setup lang="ts">
import { bubbleLoading as loading } from 'PLS/UIdemo'
import { reactive, onMounted, ref } from 'vue'
import { FMessage } from '@fesjs/fes-design'
import { loadJweixin, loadWebView } from '../lib/initScript'
import dissolveEffectCar from '../components/dissolveEffectCar.vue'
import otherObject from '../components/otherObject.vue'

declare const uni: any

const scriptLoaded = ref(false)
onMounted(async () => {
    console.log('onMounted')
    await loadJweixin()
    await loadWebView()
    scriptLoaded.value = true
    if (!uni.getEnv) {
        FMessage.error('当前web浏览器访问无效，请使用小程序或者app访问该页面')
    } else {
        uni.getEnv((res: any) => {
            FMessage.success(`当前环境：${JSON.stringify(res)}`)
        })
    }
})

const state = reactive({
    clearColor: '#15151a',
    antialias: false,
    logarithmicDepthBuffer: true,
    renderMode: 'manual',
})
const frjState = reactive({
    edgeColor: '#111111',
    edgeWidth: 0.03,
    dissolveSpeed: 0.003,
    funRef: {
        appear: null,
        disappear: null,
        aEnd: () => {},
    },
})

const dissolveEffectModelRef = ref(null)
const clickMesh = () => {
    if (!scriptLoaded.value) {
        return
    }
    console.log('clickMesh')

    if (!uni.postMessage) {
        FMessage.error('当前web浏览器访问无效，请使用小程序或者app访问该页面')
        return
    }
    dissolveEffectModelRef.value.funRef.disappear()
    uni.postMessage({
        data: {
            action: '三维页面发送了消息',
        },
    })
}
frjState.funRef.aEnd = () => {
    console.log('aEnd')
    uni.navigateBack()
}
</script>
