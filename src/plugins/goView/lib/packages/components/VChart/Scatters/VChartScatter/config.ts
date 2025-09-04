import { PublicConfigClass } from 'PLS/goView/lib/packages/public'
import { VChartScatterConfig } from './index'
import { CreateComponentType } from 'PLS/goView/lib/packages/index.d'
import { vChartOptionPrefixHandle } from 'PLS/goView/lib/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import axisThemeJson from 'PLS/goView/lib/gSettings/vchartThemes/axis.theme.json'
import { IAreaOption } from '../../index.d'

export const includes = ['legends', 'tooltip']
export const option: IAreaOption & { dataset?: any } = {
  // 图表配置
  type: 'scatter',
  dataset: data,
  stack: true,
  xField: 'x',
  yField: 'horsepower',
  seriesField: 'cylinders',
  // 业务配置（后续会被转换为图表spec)
  category: VChartScatterConfig.category,
  xAxis: {
    name: 'x轴',
    ...axisThemeJson,
    grid: {
      ...axisThemeJson.grid,
      visible: false
    }
  },
  yAxis: {
    name: 'y轴',
    ...axisThemeJson,
    grid: {
      ...axisThemeJson.grid,
      style: {
        ...axisThemeJson.grid.style,
        lineDash: [3, 3]
      }
    }
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartScatterConfig.key
  public chartConfig = cloneDeep(VChartScatterConfig)
  // 图表配置项
  public option = vChartOptionPrefixHandle(option, includes)
}
