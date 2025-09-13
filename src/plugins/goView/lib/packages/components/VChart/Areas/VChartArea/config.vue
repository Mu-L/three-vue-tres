<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-04 09:19:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 11:14:31
-->
<template>
  <!-- vCharts 全局设置 -->
  <VChartGlobalSetting :optionData="optionData"></VChartGlobalSetting>
  <Axis :axis="optionData.xAxis"></Axis>
  <Axis :axis="optionData.yAxis"></Axis>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { VChartGlobalSetting, Axis } from 'PLS/goView/lib/gPages/VChartItemSetting'
import { vChartGlobalThemeJsonType } from 'PLS/goView/lib/gSettings/vchartThemes/index'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
