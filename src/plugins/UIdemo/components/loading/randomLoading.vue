<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-12 21:53:22
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-06-11 16:00:56
-->

<script setup lang="ts">
import { loading1, loading2, bubbleLoading, vnyoonLoading, yangyangLoading, starLoading } from 'PLS/UIdemo'
import { reactive } from 'vue'

const paneState = reactive({
    styleNum: 0,
    showProgress: true,
})
paneState.styleNum = Math.floor(Math.random() * 24)
paneState.showProgress = Math.random() < 0.5
console.log(paneState.styleNum, paneState.showProgress)
</script>

<template>
    <Suspense>
        <loading1 v-if="paneState.styleNum < 10" :styleNum="paneState.styleNum" :showProgress="paneState.showProgress" v-bind="$attrs" />
        <loading2 v-else-if="paneState.styleNum < 20" :styleNum="paneState.styleNum - 10" :showProgress="paneState.showProgress" v-bind="$attrs" />
        <bubbleLoading v-else-if="paneState.styleNum === 20" :showProgress="paneState.showProgress" v-bind="$attrs" />
        <vnyoonLoading v-else-if="paneState.styleNum === 21" :showProgress="paneState.showProgress" v-bind="$attrs" />
        <yangyangLoading v-else-if="paneState.styleNum === 22" :showProgress="paneState.showProgress" v-bind="$attrs" />
        <starLoading v-else-if="paneState.styleNum === 23" :showProgress="paneState.showProgress" v-bind="$attrs" />
    </Suspense>
</template>

<style></style>
