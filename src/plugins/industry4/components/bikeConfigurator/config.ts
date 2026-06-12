/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2026-06-12 12:43:36
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-06-12 13:50:46
 */
import type { AnimationMode, EnvironmentId, FrameId, OptionItem, SketchLayerConfig, WheelId } from './types'

export const BIKE_MODEL_URL = `${
        process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'
    }/model/industry4/bikeConfigurator.glb`

export const ENVIRONMENT_FILES: Record<EnvironmentId, string> = {
    studio: './plugins/skyBox/hdr/poly_haven_studio_1k.hdr',
    coast: './plugins/skyBox/hdr/belfast_sunset_puresky_1k.hdr',
    plaza: './plugins/skyBox/hdr/shanghai_bund_1k.hdr',
    hotel: './plugins/skyBox/hdr/canary_wharf_1k.hdr',
    mountain: './plugins/skyBox/hdr/desert_1k.hdr',
    snow: './plugins/skyBox/hdr/snowy_forest_path_01_1k.hdr',
}

export const FRAME_OPTIONS: Array<OptionItem<FrameId>> = [
    { id: '1', icon: '⚫️', label: 'Carbon frame' },
    { id: '2', icon: '🔵', label: 'Blue frame' },
    { id: '3', icon: '🔴', label: 'Red frame' },
    { id: '4', icon: '⚪️', label: 'Brushed metal frame' },
    { id: '5', icon: '🟡', label: 'Yellow frame' },
    { id: 'simgood', icon: '✔️', label: 'Approved simulation' },
    { id: 'simbad', icon: '❌', label: 'Failed simulation' },
]

export const WHEEL_OPTIONS: Array<OptionItem<WheelId>> = [
    { id: '1', icon: '⚫️', label: 'Black wheels' },
    { id: '2', icon: '🔵', label: 'Blue wheels' },
    { id: '3', icon: '🔴', label: 'Red wheels' },
    { id: '4', icon: '⚪️', label: 'White wheels' },
    { id: '5', icon: '🟡', label: 'Yellow wheels' },
]

export const ANIMATION_OPTIONS: Array<OptionItem<AnimationMode>> = [
    { id: 'normal', icon: '🚲', label: 'Normal view' },
    { id: 'rotated', icon: '🚴', label: 'Rotated presentation' },
    { id: 'exploded', icon: '💥', label: 'Explosion view' },
]

export const ENVIRONMENT_OPTIONS: Array<OptionItem<EnvironmentId>> = [
    { id: 'studio', icon: '💡', label: 'Poly Haven Studio' },
    { id: 'coast', icon: '🌅', label: 'Belfast Sunset' },
    { id: 'plaza', icon: '🏙️', label: 'Shanghai Bund' },
    { id: 'hotel', icon: '🏢', label: 'Canary Wharf' },
    { id: 'mountain', icon: '🏜️', label: 'Desert' },
    { id: 'snow', icon: '⛄', label: 'Snowy Forest' },
]

export const HIDDEN_ORIGINAL_UI_NAMES = new Set(['ColorOptions', 'AnimationOptions', 'Canvas Control'])

export const SKETCH_LAYER_CONFIGS: SketchLayerConfig[] = [
    { nodeName: 'Image0', textureIndex: 20, color: '#000000', opacity: 1, renderOrder: 30 },
    { nodeName: 'Image1', textureIndex: 21, color: '#ffffff', opacity: 1, renderOrder: 31 },
    { nodeName: 'Image2', textureIndex: 22, color: '#ffffff', opacity: 1, renderOrder: 32 },
    { nodeName: 'Image3', textureIndex: 23, color: '#ffd802', opacity: 1, renderOrder: 33 },
]
