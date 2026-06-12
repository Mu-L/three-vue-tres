import type * as THREE from 'three'

export type FrameId = '1' | '2' | '3' | '4' | '5' | 'simgood' | 'simbad'
export type WheelId = '1' | '2' | '3' | '4' | '5'
export type AnimationMode = 'normal' | 'rotated' | 'exploded'
export type EnvironmentId = 'studio' | 'coast' | 'plaza' | 'hotel' | 'mountain' | 'snow'

export type OptionItem<T extends string> = {
    id: T
    icon: string
    label: string
}

export type MaterialLike = THREE.Material | THREE.Material[]
export type FrameRole = 'main' | 'left' | 'right'

export type FrameTarget = {
    mesh: THREE.Mesh
    role: FrameRole
}

export type PointerProperty = 'translation' | 'rotation' | 'scale'

export type PointerChannel = {
    object: THREE.Object3D
    property: PointerProperty
    times: Float32Array
    values: Float32Array
    itemSize: number
}

export type PointerClip = {
    name: string
    duration: number
    channels: PointerChannel[]
}

export type ActivePointerClip = {
    clip: PointerClip
    time: number
    onComplete?: () => void
}

export type SketchLayerConfig = {
    nodeName: string
    textureIndex: number
    color: THREE.ColorRepresentation
    opacity: number
    renderOrder: number
}
