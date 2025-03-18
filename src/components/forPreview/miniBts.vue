<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-13 12:04:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-13 15:42:33
-->
<template>
    <div style="position: absolute; bottom: 8px; left: 12px; z-index: 9999999">
        <n-float-button position="relative" type="default" shape="square" menu-trigger="click">
            <n-icon size="26" color="#2D76D5">
                <Aperture />
            </n-icon>
            <template #menu>
                <div style="display: flex" v-show="showb">
                    <n-float-button shape="square" @click="toBack">
                        <n-icon color="#2D76D5">
                            <ArrowBackCircleOutline />
                        </n-icon>
                        <template #description> <sapn style="color: #2d76d5">返回</sapn> </template>
                    </n-float-button>
                    <n-float-button :left="12" shape="square" @click="toHome">
                        <n-icon color="#2D76D5">
                            <Home />
                        </n-icon>
                        <template #description> <sapn style="color: #2d76d5">主页</sapn> </template>
                    </n-float-button>
                    <n-float-button :left="24" shape="square" @click="toGuide">
                        <n-icon color="#2D76D5">
                            <SparklesOutline />
                        </n-icon>
                        <template #description> <sapn style="color: #2d76d5">随机</sapn> </template>
                    </n-float-button>
                    <n-float-button :left="36" shape="square" @click="switchTab">
                        <n-icon color="#2D76D5">
                            <DiceOutline />
                        </n-icon>
                        <template #description> <sapn style="color: #2d76d5">关于</sapn> </template>
                    </n-float-button>
                </div>
                <div style="display: flex" v-show="!showb">
                    <n-float-button shape="square" @click="toHomeRouter">
                        <n-icon color="#2D76D5">
                            <Home />
                        </n-icon>
                        <template #description> <sapn style="color: #2d76d5">主页</sapn> </template>
                    </n-float-button>
                </div>
            </template>
        </n-float-button>
    </div>
</template>

<script setup lang="ts">
import { Home, Aperture, DiceOutline, SparklesOutline, ArrowBackCircleOutline } from '@vicons/ionicons5'
import { NIcon, NFloatButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { loadJweixin, loadWebView } from 'PLS/uniAppView/lib/initScript'

declare const uni: any

const showb = ref(false)
onMounted(async () => {
    await loadJweixin()
    await loadWebView()
    if (uni.getEnv) {
        uni.getEnv((res: any) => {
            if (res.miniprogram) {
                showb.value = true
            }
        })
    }
})

const toHomeRouter = () => {
    window.open('https://oss.icegl.cn/', '_blank')
}
const toBack = () => {
    uni.navigateBack()
}
const toHome = () => {
    uni.reLaunch({
        url: '/pages/index/index',
    })
}

const toGuide = () => {
    uni.redirectTo({
        url: '/pages/guide/guide',
    })
}

const switchTab = () => {
    uni.reLaunch({
        url: '/pages/about/about',
    })
}
</script>
<style lang="less">
.n-float-button {
    background-color: #e1e1e1c4;
}
</style>
