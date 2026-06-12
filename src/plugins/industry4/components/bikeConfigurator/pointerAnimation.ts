import * as THREE from 'three'
import type { ActivePointerClip, PointerChannel, PointerClip, PointerProperty } from './types'

export async function loadPointerClips(url: string, loadedGltf: any) {
    const buffer = await fetch(url).then((response) => response.arrayBuffer())
    const dataView = new DataView(buffer)
    const textDecoder = new TextDecoder()
    const nodeMap = getAssociationNodeMap(loadedGltf)
    const clipsByIndex: PointerClip[] = []
    let chunkOffset = 12
    let json: any = null
    let binStart = 0

    while (chunkOffset < buffer.byteLength) {
        const chunkLength = dataView.getUint32(chunkOffset, true)
        const chunkType = textDecoder.decode(new Uint8Array(buffer, chunkOffset + 4, 4))
        chunkOffset += 8
        if (chunkType === 'JSON') {
            json = JSON.parse(textDecoder.decode(new Uint8Array(buffer, chunkOffset, chunkLength)))
        } else if (chunkType === 'BIN\0') {
            binStart = chunkOffset
        }
        chunkOffset += chunkLength
    }

    json.animations?.forEach((animation: any, animationIndex: number) => {
        const channels: PointerChannel[] = []
        let duration = 0

        animation.channels?.forEach((channel: any) => {
            const pointer = channel.target?.extensions?.KHR_animation_pointer?.pointer
            const match = pointer?.match(/^\/nodes\/(\d+)\/(translation|rotation|scale)$/)
            if (!match) return

            const object = nodeMap.get(Number(match[1]))
            if (!object) return

            const sampler = animation.samplers[channel.sampler]
            const input = readAccessor(json, dataView, binStart, sampler.input)
            const output = readAccessor(json, dataView, binStart, sampler.output)
            duration = Math.max(duration, input.values[input.values.length - 1] || 0)
            channels.push({
                object,
                property: match[2] as PointerProperty,
                times: input.values,
                values: output.values,
                itemSize: output.itemSize,
            })
        })

        clipsByIndex[animationIndex] = {
            name: animation.name,
            duration,
            channels,
        }
    })

    return {
        rotated: clipsByIndex[0],
        notRotated: clipsByIndex[1],
        explode: clipsByIndex[2],
        explodeBack: clipsByIndex[3],
    }
}

export class PointerAnimationPlayer {
    private activeClip: ActivePointerClip | null = null
    private sequence: PointerClip[] = []
    private sequenceComplete?: () => void
    private sequenceVersion = 0

    playSequence(clips: Array<PointerClip | undefined>, onComplete?: () => void) {
        this.sequenceVersion++
        this.sequence = clips.filter((clip): clip is PointerClip => Boolean(clip))
        this.sequenceComplete = onComplete
        this.activeClip = null
        this.playNextInSequence(this.sequenceVersion)
    }

    update(delta: number) {
        if (!this.activeClip) return

        this.activeClip.time += delta
        const isFinished = this.activeClip.time >= this.activeClip.clip.duration
        applyPointerClip(this.activeClip.clip, isFinished ? this.activeClip.clip.duration : this.activeClip.time)
        if (!isFinished) return

        const version = this.sequenceVersion
        this.activeClip = null
        this.playNextInSequence(version)
    }

    stop() {
        this.sequenceVersion++
        this.activeClip = null
        this.sequence = []
        this.sequenceComplete = undefined
    }

    private playNextInSequence(version: number) {
        if (version !== this.sequenceVersion) return
        const clip = this.sequence.shift()
        if (!clip) {
            const onComplete = this.sequenceComplete
            this.sequenceComplete = undefined
            onComplete?.()
            return
        }
        this.activeClip = {
            clip,
            time: 0,
        }
        applyPointerClip(clip, 0)
        if (clip.duration === 0) {
            this.activeClip = null
            this.playNextInSequence(version)
        }
    }
}

function getAssociationNodeMap(loadedGltf: any) {
    const nodeMap = new Map<number, THREE.Object3D>()
    const associations = loadedGltf.parser?.associations
    associations?.forEach((mapping: { nodes?: number }, object: THREE.Object3D) => {
        if (typeof mapping.nodes === 'number') {
            nodeMap.set(mapping.nodes, object)
        }
    })
    return nodeMap
}

function getAccessorItemSize(type: string) {
    const sizeMap: Record<string, number> = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT4: 16,
    }
    return sizeMap[type] || 1
}

function getComponentSize(componentType: number) {
    const sizeMap: Record<number, number> = {
        5120: 1,
        5121: 1,
        5122: 2,
        5123: 2,
        5125: 4,
        5126: 4,
    }
    return sizeMap[componentType] || 4
}

function readComponent(dataView: DataView, byteOffset: number, componentType: number) {
    if (componentType === 5120) return dataView.getInt8(byteOffset)
    if (componentType === 5121) return dataView.getUint8(byteOffset)
    if (componentType === 5122) return dataView.getInt16(byteOffset, true)
    if (componentType === 5123) return dataView.getUint16(byteOffset, true)
    if (componentType === 5125) return dataView.getUint32(byteOffset, true)
    return dataView.getFloat32(byteOffset, true)
}

function readAccessor(json: any, dataView: DataView, binStart: number, accessorIndex: number) {
    const accessor = json.accessors[accessorIndex]
    const bufferView = json.bufferViews[accessor.bufferView]
    const itemSize = getAccessorItemSize(accessor.type)
    const componentSize = getComponentSize(accessor.componentType)
    const byteOffset = binStart + (bufferView.byteOffset || 0) + (accessor.byteOffset || 0)
    const byteStride = bufferView.byteStride || componentSize * itemSize
    const values = new Float32Array(accessor.count * itemSize)

    for (let index = 0; index < accessor.count; index++) {
        for (let component = 0; component < itemSize; component++) {
            values[index * itemSize + component] = readComponent(dataView, byteOffset + index * byteStride + component * componentSize, accessor.componentType)
        }
    }

    return {
        values,
        itemSize,
    }
}

function applyPointerChannel(channel: PointerChannel, time: number) {
    const { times, values, itemSize, object, property } = channel
    if (!times.length) return

    let frame = 0
    while (frame < times.length - 2 && time > times[frame + 1]) {
        frame++
    }

    const nextFrame = Math.min(frame + 1, times.length - 1)
    const startTime = times[frame]
    const endTime = times[nextFrame]
    const alpha = endTime === startTime ? 0 : THREE.MathUtils.clamp((time - startTime) / (endTime - startTime), 0, 1)

    if (property === 'rotation') {
        const from = new THREE.Quaternion().fromArray(values, frame * itemSize)
        const to = new THREE.Quaternion().fromArray(values, nextFrame * itemSize)
        object.quaternion.slerpQuaternions(from, to, alpha)
    } else {
        const target = property === 'translation' ? object.position : object.scale
        target.set(
            THREE.MathUtils.lerp(values[frame * itemSize], values[nextFrame * itemSize], alpha),
            THREE.MathUtils.lerp(values[frame * itemSize + 1], values[nextFrame * itemSize + 1], alpha),
            THREE.MathUtils.lerp(values[frame * itemSize + 2], values[nextFrame * itemSize + 2], alpha),
        )
    }

    object.matrixWorldNeedsUpdate = true
}

function applyPointerClip(clip: PointerClip, time: number) {
    const clampedTime = THREE.MathUtils.clamp(time, 0, clip.duration)
    clip.channels.forEach((channel) => applyPointerChannel(channel, clampedTime))
}
