<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-04 09:19:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 14:52:27
-->
<template>
  <GoVChart ref="vChartRef" :option="chartConfig.option"> </GoVChart>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { GoVChart } from 'PLS/goView/lib/gComponents/GoVChart'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks'
import config from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})
</script>
