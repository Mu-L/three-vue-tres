/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-04 09:19:38
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 15:00:19
 */
import { ChatCategoryEnum, IOption } from 'PLS/goView/lib/packages/components/VChart/index.d'
import bars from './bars'
import pies from './pies'
import lines from './lines'
import areas from './areas'
import funnels from "./funnels";
import wordClouds from "./wordClouds";
import scatters from "./scatters";
export const transformHandler: {
  [key: string]: (args: IOption) => any
} = {
  [ChatCategoryEnum.BAR]: bars,
  [ChatCategoryEnum.PIE]: pies,
  [ChatCategoryEnum.LINE]: lines,
  [ChatCategoryEnum.AREA]: areas,
  [ChatCategoryEnum.FUNNEL]: funnels,
  [ChatCategoryEnum.WORDCLOUD]: wordClouds,
  [ChatCategoryEnum.SCATTER]: scatters,
  // todo: more charts handler
}