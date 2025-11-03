/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 16:16:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-03 17:28:17
 */
// useMaterial.ts
import { markRaw } from 'vue'
import { materialPresets, type MaterialType } from './materials'

// export async function useMaterial(selected: MaterialType, model: Record<string, any>) {
//   const config = materialPresets[selected]
//   let component = config.component as any
//   if (typeof component === 'function') {
//     component = markRaw(await component())
//   }
//   const props = {
//     ...config.props,
//     ...model
//   }
//   return { component, props }
// }

export async function useMaterial(selected: MaterialType) {
  const config = materialPresets[selected]
  let component = config.component as any
  if (typeof component === 'function') {
    component = markRaw(await component())
  }
  return component
}

export function useProps(selected: MaterialType) {
  const config = materialPresets[selected]
  return config.props
}
