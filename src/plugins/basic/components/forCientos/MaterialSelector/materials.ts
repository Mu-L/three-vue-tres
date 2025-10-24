/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-10-23 16:15:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-24 09:58:52
 */
// materials.ts
import type { ColorRepresentation } from 'three'
import {
  FrontSide,
  BackSide,
  DoubleSide,
  NormalBlending,
  AdditiveBlending,
  SubtractiveBlending,
  MultiplyBlending,
  NoBlending,
  type Side,
  type Blending,
} from 'three'

export const sideOptions = [
  { label: 'FrontSide', value: FrontSide },
  { label: 'BackSide', value: BackSide },
  { label: 'DoubleSide', value: DoubleSide }
]

export const blendingOptions = [
  { label: 'NoBlending', value: NoBlending },
  { label: 'NormalBlending', value: NormalBlending },
  { label: 'AdditiveBlending', value: AdditiveBlending },
  { label: 'SubtractiveBlending', value: SubtractiveBlending },
  { label: 'MultiplyBlending', value: MultiplyBlending }
]

// ✅ 所有材质的基础属性（MeshBasicMaterial 也适用）
export const commonMaterialProps = {
  color: '#ffffff' as ColorRepresentation,
  map: null,
  wireframe: false,
  opacity: 1,
  transparent: false,
  side: FrontSide as Side,
  alphaTest: 0,
  blending: NormalBlending as Blending,
  depthTest: true,
  depthWrite: true,
} as const

// ✅ Lambert 材质：基础光照模型（漫反射）
export const lambertExtraProps = {
  emissive: '#000000' as ColorRepresentation,
  emissiveIntensity: 1,
  emissiveMap: null,
  reflectivity: 1,
  refractionRatio: 0.98,
} as const


// ✅ Phong 材质：传统高光模型
export const phongExtraProps = {
  emissive: '#000000' as ColorRepresentation,
  emissiveIntensity: 1,
  specular: '#111111' as ColorRepresentation,
  shininess: 30,
  specularMap: null,
  emissiveMap: null,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: { x: 1, y: 1 },
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
} as const


// ✅ Standard 材质：主流 PBR 标准模型
export const standardExtraProps = {
  emissive: '#000000' as ColorRepresentation,
  emissiveIntensity: 1,
  metalness: 0.5,
  roughness: 0.5,
  metalnessMap: null,
  roughnessMap: null,
  normalMap: null,
  normalScale: { x: 1, y: 1 },
  bumpMap: null,
  bumpScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  aoMap: null,
  aoMapIntensity: 1,
  envMap: null,
  envMapIntensity: 1,
} as const


// ✅ Physical 材质：PBR 高级物理模型
export const physicalExtraProps = {
  ...standardExtraProps,  // 继承 standard 的属性
  clearcoat: 0.2,
  clearcoatRoughness: 0.1,
  reflectivity: 0.5,
  transmission: 0,            // 玻璃透明度
  ior: 1.5,                   // 折射率
  thickness: 0.01,            // 厚度
  attenuationColor: '#ffffff' as ColorRepresentation,
  attenuationDistance: 0,
  specularIntensity: 1,
  specularColor: '#ffffff' as ColorRepresentation,
  sheen: 0,
  sheenColor: '#ffffff' as ColorRepresentation,
  clearcoatNormalMap: null,
  clearcoatNormalScale: { x: 1, y: 1 },
} as const


// ✅ Toon 材质：卡通渲染
export const toonExtraProps = {
  gradientMap: null,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: { x: 1, y: 1 },
} as const


// ✅ 每种 Tres 组件对应 three.js 材质
export const materialPresets = {
  MeshBasicMaterial: {
    component: 'TresMeshBasicMaterial',
    props: {
      ...commonMaterialProps,
      // Basic 无额外字段
    }
  },

  MeshLambertMaterial: {
    component: 'TresMeshLambertMaterial',
    props: {
      ...commonMaterialProps,
      ...lambertExtraProps
    }
  },

  MeshPhongMaterial: {
    component: 'TresMeshPhongMaterial',
    props: {
      ...commonMaterialProps,
      ...phongExtraProps
    }
  },

  MeshStandardMaterial: {
    component: 'TresMeshStandardMaterial',
    props: {
      ...commonMaterialProps,
      ...standardExtraProps
    }
  },

  MeshPhysicalMaterial: {
    component: 'TresMeshPhysicalMaterial',
    props: {
      ...commonMaterialProps,
      ...physicalExtraProps
    }
  },

  MeshToonMaterial: {
    component: 'TresMeshToonMaterial',
    props: {
      ...commonMaterialProps,
      ...toonExtraProps
    }
  },
} as const

export type MaterialType = keyof typeof materialPresets
