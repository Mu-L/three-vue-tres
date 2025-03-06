<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-05 10:47:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-05 12:02:41
-->
<template>
    <div class="title">dsad</div>
    <div class="btn-list">
        <button class="btn" type="button" data-action="navigateTo">navigateTo</button>
        <button class="btn" type="button" data-action="redirectTo">redirectTo</button>
        <button class="btn" type="button" data-action="navigateBack">navigateBack</button>
        <button class="btn" type="button" data-action="reLaunch">reLaunch</button>
        <button class="btn btn-red" type="button" data-action="switchTab">switchTab</button>
        <button class="btn btn-yellow" type="button" @click="postMessage">postMessage</button>
        <button class="btn btn-yellow" type="button" data-action="getEnv">getEnv</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { loadJweixin, loadWebView } from '../lib/initScript'

declare const uni: any

onMounted(async () => {
    console.log('onMounted')
    await loadJweixin()
    await loadWebView()
    uni.getEnv((res: any) => {
        alert(`当前环境：${JSON.stringify(res)}`)
    })
})

const postMessage = () => {
    uni.postMessage({
        data: {
            action: '发送消息了',
        },
    })
}
</script>
<style lang="less" scoped>
.title {
    color: white;
}
</style>
