/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-04 09:19:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 11:40:02
 */
import themeJson from './global.theme.json'

type ThemeJsonType = typeof themeJson
export type FontType = {
  fontSize: number
  fontFamily: string
  fontWeight: string
  fill: string
  dy?: number
  dx?: number
  angle?: number
  [T: string]: any
}
export interface vChartGlobalThemeJsonType extends Partial<ThemeJsonType> {
  dataset?: any
  [T: string]: any
}

export const vChartGlobalThemeJson = { ...themeJson, dataset: null }
