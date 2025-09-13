<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-05-30 19:13:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 10:01:30
-->
<template>
      <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option.value" />
</template>

<script setup lang="ts">
import { reactive, watch, PropType } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from 'PLS/goView/lib/gHooks//useCanvasInitOptions.hook'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme } from 'PLS/goView/lib/packages/public/chart'
import { useChartEditStore } from 'PLS/goView/stores/chartEditStore'
import { chartColorsSearch, defaultTheme } from 'PLS/goView/lib/gSettings/chartThemes/index'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useChartDataFetch } from 'PLS/goView/lib/gHooks/'
import { isPreview, colorGradientCustomMerge } from 'PLS/goView/lib/utils/global'

const props = defineProps({
    themeSetting: {
        type: Object,
        required: true,
    },
    themeColor: {
        type: Object,
        required: true,
    },
    chartConfig: {
        type: Object as PropType<config>,
        required: true,
    },
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])
const chartEditStore = useChartEditStore()

const option = reactive({
    value: {},
})

// 渐变色处理
watch(
    () => chartEditStore.getEditCanvasConfig.chartThemeColor,
    (newColor: keyof typeof chartColorsSearch) => {
        try {
            if (!isPreview()) {
                const themeColor =
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
                    colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
                props.chartConfig.option.series.forEach((value: any, index: number) => {
                    value.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: themeColor[3],
                        },
                        {
                            offset: 1,
                            color: 'rgba(0,0,0, 0)',
                        },
                    ])
                })
            }
            option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
            props.chartConfig.option = option.value
        } catch (error) {
            console.log(error)
        }
    },
    {
        immediate: true,
    },
)

watch(
    () => props.chartConfig.option.dataset,
    () => {
        option.value = props.chartConfig.option
    },
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})

</script>
