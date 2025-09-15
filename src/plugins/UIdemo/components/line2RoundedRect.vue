<template>
    <TresGroup>
        <primitive :object="line2Mesh" :rotation-x="Math.PI / 2" />
    </TresGroup>
</template>

<script setup lang="ts">
// import * as THREE from 'three'
import { watch } from 'vue'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

const props = defineProps({
    linewidth: {
        default: 1.0,
    },
    color: {
        default: '#ffff00',
    },
    width: {
        default: 1,
    },
    height: {
        default: 1,
    },
    radius: {
        default: 0.1,
    },
    cornerSegments: {
        default: 6,
    },
})

function buildRoundedRectPositions(width = 1, height = 1, radius = 0.1, cornerSegments = 6) {
    const rx = Math.min(radius, Math.abs(width / 2))
    const ry = Math.min(radius, Math.abs(height / 2))
    const pts = [] as any
    function pushCorner(cx_: number, cy_: number, a0: number, a1: number) {
        for (let i = 0; i <= cornerSegments; i++) {
            const t = i / cornerSegments
            const a = a0 + (a1 - a0) * t
            pts.push(cx_ + Math.cos(a) * rx)
            pts.push(cy_ + Math.sin(a) * ry)
            pts.push(0)
        }
    }
    const corners = [
        { cx: +(width / 2 - rx), cy: +(height / 2 - ry), a0: 0, a1: Math.PI / 2 }, // top-right (0 -> pi/2)
        { cx: -(width / 2 - rx), cy: +(height / 2 - ry), a0: Math.PI / 2, a1: Math.PI }, // top-left
        { cx: -(width / 2 - rx), cy: -(height / 2 - ry), a0: Math.PI, a1: Math.PI * 1.5 }, // bottom-left
        { cx: +(width / 2 - rx), cy: -(height / 2 - ry), a0: Math.PI * 1.5, a1: Math.PI * 2 }, // bottom-right
    ]
    corners.forEach((c, idx) => {
        pushCorner(c.cx, c.cy, c.a0, c.a1)
    })
    if (pts.length >= 3) {
        pts.push(pts[0], pts[1], pts[2])
    }
    return pts
}

const geometry = new LineGeometry()
const material = new LineMaterial({
    linewidth: props.linewidth,
    color: props.color,
})
const line2Mesh = new Line2(geometry, material)
material.resolution.set(window.innerWidth, window.innerHeight)
material.needsUpdate = true

watch(
    () => [props.linewidth, props.color],
    ([linewidth, color]: any) => {
        material.linewidth = linewidth
        material.color.set(color)
    },
)

watch(
    () => [props.width, props.height, props.radius, props.cornerSegments],
    () => {
        geometry.setPositions(buildRoundedRectPositions(props.width, props.height, props.radius, props.cornerSegments))
    },
    { immediate: true },
)
</script>
