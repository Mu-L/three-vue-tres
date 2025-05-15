<template>
    <TresSprite :scale="[totalWidth * props.scaleFactor, totalHeight * props.scaleFactor, 1]" :center="center[align] || [0.5, 0.5]">
        <TresSpriteMaterial :map="texture" transparent depthTest :blending="THREE.NormalBlending" />
    </TresSprite>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import * as THREE from 'three'

const center = {
    'left-top': [0, 1],
    'left-center': [0, 0.5],
    'left-bottom': [0, 0],
    'center-top': [0.5, 1],
    center: [0.5, 0.5],
    'center-bottom': [0.5, 0],
    'right-top': [1, 1],
    'right-center': [1, 0.5],
    'right-bottom': [1, 0],
}

const props = defineProps({
    text: { default: '标识' },
    fontSize: { default: 32 },
    fontColor: { default: '#000000' },
    backgroundColor: { default: 'rgba(255,255,255,0.2)' },
    padding: { default: { y: 10, x: 20 } }, // [vertical, horizontal]
    align: { default: 'left-center' }, // 'left' | 'center' | 'right' left-top, right-bottom, center-center,
    fontFamily: { default: 'sans-serif' },
    scaleFactor: { default: 0.01 }, // 缩放单位使其适应Three场景
    borderColor: { default: '#000000' },
    borderWidth: { default: 1 },
    borderRadius: { default: 2 },
    dpi: { default: 2 }, // 清晰度
})

// 背景 + 边框
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
}
let canvas = null as any
let gCtx = null as any
let totalWidth = 0
let totalHeight = 0
let texture = ref(null) as any

const makeCanvas = () => {
    canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const padY = props.padding.y
    const padX = props.padding.x

    ctx.font = `bold ${props.fontSize}px ${props.fontFamily}`
    const textMetrics = ctx.measureText(props.text)

    // 计算文字宽高
    const textWidth = textMetrics.width
    const textHeight = props.fontSize

    totalWidth = textWidth + 2 * padX + 2 * props.borderWidth
    totalHeight = textHeight + 2 * padY + 2 * props.borderWidth

    // 设置高清画布尺寸
    canvas.width = totalWidth * props.dpi
    canvas.height = totalHeight * props.dpi
    ctx.scale(props.dpi, props.dpi) // Retina 优化

    // 清空透明背景
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.font = `${props.fontSize}px ${props.fontFamily}`
    ctx.textBaseline = 'top'

    ctx.fillStyle = props.backgroundColor
    roundRect(ctx, props.borderWidth, props.borderWidth, totalWidth - 2 * props.borderWidth, totalHeight - 2 * props.borderWidth, props.borderRadius)
    ctx.fill()
    if (props.borderWidth > 0) {
        ctx.lineWidth = props.borderWidth
        ctx.strokeStyle = props.borderColor
        ctx.stroke()
    }

    // 绘制文字
    ctx.fillStyle = props.fontColor

    const innerX = props.borderWidth + padX
    const innerY = props.borderWidth + padY

    let x = innerX
    let y = innerY

    if (props.align.includes('center')) {
        x =  (totalWidth - textWidth) / 2
    } else if (props.align.includes('right')) {
        x = totalWidth - textWidth - props.borderWidth - padX
    }

    if (props.align.includes('middle') || props.align.includes('center')) {
        y =  (totalHeight - textHeight) / 2
    } else if (props.align.includes('bottom')) {
        y = totalHeight - textHeight - props.borderWidth - padY
    }

    ctx.fillText(props.text, x, y)

    return ctx
}
const makeTexture = (ctx: CanvasRenderingContext2D) => {
    if (texture.value) {
        texture.value.dispose()
    }
    texture.value = new THREE.CanvasTexture(canvas)
    texture.value.premultiplyAlpha = false
    texture.value.needsUpdate = true
}

gCtx = makeCanvas()
makeTexture(gCtx)

watch(
    () => props,
	() => {
        if (gCtx) {
            gCtx = makeCanvas()
            makeTexture(gCtx)
        }
    },
    { deep: true },
)
</script>
