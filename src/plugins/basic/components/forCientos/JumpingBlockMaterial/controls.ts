/*
 * @Description:
 * @Version: 1.668
 * @Autor: Codex
 * @Date: 2026-05-22 09:40:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-05-22 11:13:37
 */

export interface JumpingBlockMaterialProps {
    color?: string
    emissive?: string
    emissiveIntensity?: number
    metalness?: number
    roughness?: number
    clearcoat?: number
    clearcoatRoughness?: number
    envMapIntensity?: number
    ior?: number
    specularIntensity?: number
    channelAmount?: number
    maskAmount?: number
    scanDuration?: number
    scanStart?: number
    scanEnd?: number
    scanYOffset?: number
    scanIntensity?: number
    gridAmount?: number
    tempMaskAmount?: number
    tempGridAmount?: number
    triplanarScale?: number
    paletteScheme?: JumpingBlockPaletteScheme
    paletteFlow?: number
    paletteContrast?: number
    emissiveBoost?: number
    diffuseMix?: number
    alphaCutoff?: number
    maskMapUrl?: string
    gridMapUrl?: string
}

type JumpingBlockTextureFieldKey = 'maskMapUrl' | 'gridMapUrl'
type JumpingBlockFieldKey = Exclude<keyof Required<JumpingBlockMaterialProps>, JumpingBlockTextureFieldKey>

export interface JumpingBlockMaterialControlItem {
    name: string
    com: 'ColorPicker' | 'Slider' | 'Select'
    min?: number
    max?: number
    step?: number
    options?: Record<string, string | number>
}

export interface JumpingBlockMaterialControlGroup {
    title: string
    fields: JumpingBlockFieldKey[]
}

export const jumpingBlockPaletteSchemes = [
    { label: 'colorful', value: 'colorful' },
    { label: 'Aurora', value: 'aurora' },
    { label: 'Nebula', value: 'nebula' },
    { label: 'Prism', value: 'prism' },
] as const

export type JumpingBlockPaletteScheme = typeof jumpingBlockPaletteSchemes[number]['value']

export const jumpingBlockPaletteSchemeValues: Record<JumpingBlockPaletteScheme, number> = {
    colorful: 0,
    aurora: 1,
    nebula: 2,
    prism: 3,
}

export const jumpingBlockPaletteSchemeOptions = jumpingBlockPaletteSchemes.reduce<Record<string, JumpingBlockPaletteScheme>>((options, item) => {
    options[item.label] = item.value
    return options
}, {})

export const jumpingBlockMaterialDefaults = {
    color: '#363636',
    emissive: '#000000',
    emissiveIntensity: 0,
    metalness: 0.23,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: 1.6,
    ior: 1.5,
    specularIntensity: 1,
    channelAmount: 0.43,
    maskAmount: 0.8,
    scanDuration: 4.78,
    scanStart: -2,
    scanEnd: 2,
    scanYOffset: 0,
    scanIntensity: 1,
    gridAmount: 0.5,
    tempMaskAmount: 0.1,
    tempGridAmount: 0.05,
    triplanarScale: 0.52,
    paletteScheme: 'colorful',
    paletteFlow: 0.57,
    paletteContrast: 1.12,
    emissiveBoost: 2.52,
    diffuseMix: 0.16,
    alphaCutoff: 0.002,
    maskMapUrl: './plugins/basic/materials/jumpingBlockMaterial/scan-mask.png',
    gridMapUrl: './plugins/basic/materials/jumpingBlockMaterial/grid-mask.png',
} as const satisfies Required<JumpingBlockMaterialProps>

export const jumpingBlockMaterialPresetProps = {
    color: jumpingBlockMaterialDefaults.color,
    roughness: jumpingBlockMaterialDefaults.roughness,
    metalness: jumpingBlockMaterialDefaults.metalness,
    envMapIntensity: jumpingBlockMaterialDefaults.envMapIntensity,
    channelAmount: jumpingBlockMaterialDefaults.channelAmount,
    scanDuration: jumpingBlockMaterialDefaults.scanDuration,
    scanYOffset: jumpingBlockMaterialDefaults.scanYOffset,
    gridAmount: jumpingBlockMaterialDefaults.gridAmount,
    triplanarScale: jumpingBlockMaterialDefaults.triplanarScale,
    paletteScheme: jumpingBlockMaterialDefaults.paletteScheme,
    paletteFlow: jumpingBlockMaterialDefaults.paletteFlow,
    emissiveBoost: jumpingBlockMaterialDefaults.emissiveBoost,
} as const satisfies Partial<Required<JumpingBlockMaterialProps>>

export const jumpingBlockMaterialSchema = {
    color: { name: 'Base Color', com: 'ColorPicker' },
    emissive: { name: 'Base Emissive', com: 'ColorPicker' },
    emissiveIntensity: { name: 'Base Emissive Intensity', com: 'Slider', min: 0, max: 2, step: 0.01 },
    metalness: { name: 'Metalness', com: 'Slider', min: 0, max: 1, step: 0.01 },
    roughness: { name: 'Roughness', com: 'Slider', min: 0, max: 1, step: 0.01 },
    clearcoat: { name: 'Clearcoat', com: 'Slider', min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { name: 'Clearcoat Roughness', com: 'Slider', min: 0, max: 1, step: 0.01 },
    envMapIntensity: { name: 'Reflection', com: 'Slider', min: 0, max: 5, step: 0.01 },
    ior: { name: 'IOR', com: 'Slider', min: 1, max: 2.333, step: 0.01 },
    specularIntensity: { name: 'Specular Intensity', com: 'Slider', min: 0, max: 2, step: 0.01 },
    channelAmount: { name: 'Channel Amount', com: 'Slider', min: 0, max: 4, step: 0.01 },
    maskAmount: { name: 'Mask Stage Amount', com: 'Slider', min: 0, max: 1, step: 0.01 },
    scanDuration: { name: 'Scan Duration', com: 'Slider', min: 0.2, max: 10, step: 0.01 },
    scanStart: { name: 'Scan Start', com: 'Slider', min: -5, max: 5, step: 0.01 },
    scanEnd: { name: 'Scan End', com: 'Slider', min: -5, max: 5, step: 0.01 },
    scanYOffset: { name: 'Scan Y Offset', com: 'Slider', min: -3, max: 3, step: 0.01 },
    scanIntensity: { name: 'Scan Intensity', com: 'Slider', min: 0, max: 3, step: 0.01 },
    gridAmount: { name: 'Grid Stage Amount', com: 'Slider', min: 0, max: 2, step: 0.01 },
    tempMaskAmount: { name: 'Temp0 Mask Amount', com: 'Slider', min: 0, max: 1, step: 0.01 },
    tempGridAmount: { name: 'Temp0 Grid Amount', com: 'Slider', min: 0, max: 1, step: 0.01 },
    triplanarScale: { name: 'Triplanar Scale', com: 'Slider', min: 0.2, max: 6, step: 0.01 },
    paletteScheme: { name: 'Palette Scheme', com: 'Select', options: jumpingBlockPaletteSchemeOptions },
    paletteFlow: { name: 'Palette Flow', com: 'Slider', min: -2, max: 2, step: 0.01 },
    paletteContrast: { name: 'Palette Contrast', com: 'Slider', min: 0.2, max: 2, step: 0.01 },
    emissiveBoost: { name: 'Emissive Boost', com: 'Slider', min: 0, max: 8, step: 0.01 },
    diffuseMix: { name: 'Diffuse Mix', com: 'Slider', min: 0, max: 1, step: 0.01 },
    alphaCutoff: { name: 'Alpha Cutoff', com: 'Slider', min: 0, max: 0.5, step: 0.001 },
} as const satisfies Record<JumpingBlockFieldKey, JumpingBlockMaterialControlItem>

export const jumpingBlockMaterialControlGroups: JumpingBlockMaterialControlGroup[] = [
    {
        title: 'jBMaterial',
        fields: ['channelAmount', 'emissiveBoost', 'triplanarScale', 'gridAmount'],
    },
    {
        title: 'Scan',
        fields: ['scanDuration', 'scanYOffset'],
    },
    {
        title: 'Palette',
        fields: ['paletteScheme', 'paletteFlow'],
    },
    {
        title: 'Base Material',
        fields: ['color', 'roughness', 'metalness', 'envMapIntensity'],
    },
]

export function createJumpingBlockMaterialState(overrides: Partial<JumpingBlockMaterialProps> = {}) {
    return {
        ...jumpingBlockMaterialDefaults,
        ...overrides,
    }
}
