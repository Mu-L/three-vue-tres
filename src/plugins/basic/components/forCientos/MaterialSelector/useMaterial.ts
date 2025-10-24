/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 16:16:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-23 16:16:44
 */
// useMaterial.ts
import { computed } from 'vue'
import { materialPresets, type MaterialType } from './materials'

export function useMaterial(selected: MaterialType, model: Record<string, any>) {
  const config = computed(() => materialPresets[selected])
  const component = computed(() => config.value.component)
  const props = computed(() => ({
    ...config.value.props,
    ...model
  }))
  return { component, props }
}
