<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-05 10:47:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-06 20:37:04
-->
<template>
    <div class="title">基础页面与uniapp交互</div>
    <div class="btn-list">
        <FButton class="btn" size="large" type="primary" long @click="navigateTo()"> navigateTo </FButton>
        <FButton class="btn" size="large" type="info" long @click="redirectTo()"> redirectTo </FButton>
        <FButton class="btn" size="large" type="success" long @click="navigateBack()"> navigateBack </FButton>
        <FButton class="btn" size="large" type="warning" long @click="reLaunch()"> reLaunch </FButton>
        <FButton class="btn btn-red" size="large" type="primary" long @click="switchTab()"> switchTab </FButton>
        <FButton class="btn" size="large" type="info" long @click="postMessage()"> postMessage </FButton>
    </div>
</template>

<script setup lang="ts">
import { FMessage, FButton } from '@fesjs/fes-design'
import { onMounted } from 'vue'
import { loadJweixin, loadWebView } from '../lib/initScript'

declare const uni: any

onMounted(async () => {
    console.log('onMounted')
    await loadJweixin()
    await loadWebView()
    if (!uni.getEnv) {
        FMessage.error('当前web浏览器访问无效，请使用小程序或者app访问该页面')
    } else {
        uni.getEnv((res: any) => {
            FMessage.success(`当前环境：${JSON.stringify(res)}`)
        })
    }
})

const postMessage = () => {
    uni.postMessage({
        data: {
            action: '普通页面发送了消息',
        },
    })
}
const navigateTo = () => {
    uni.navigateTo({
        url: '/pages/debugDemo/jumpPage/jumpPage',
    })
}
const redirectTo = () => {
    uni.redirectTo({
        url: '/pages/debugDemo/jumpPage/jumpPage',
    })
}

const navigateBack = () => {
    uni.navigateBack()
}
const reLaunch = () => {
    uni.reLaunch({
        url: '/pages/debugDemo/debugDemo',
    })
}
const switchTab = () => {
    uni.reLaunch({
        url: '/pages/about/about',
    })
}

</script>
<style lang="less" scoped>
.title {
    color: white;
    margin: 60px auto;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}
.btn-list {
    padding: 0 20%;
}
.btn {
    margin: 20px auto;
    display: block;
}
</style>
