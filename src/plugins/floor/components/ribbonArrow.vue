<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-11-27 15:14:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-28 09:13:23
-->
<template>
	<TresGroup>
		<TresMesh :geometry="geometry">
			<TresMeshBasicMaterial :color="backgroundColor" :transparent="backgroundAlpha < 1" :opacity="backgroundAlpha"
				:side="THREE.DoubleSide" depthWrite />
		</TresMesh>
		<TresMesh :geometry="geometry">
			<TresMeshBasicMaterial :map="arrowTex" transparent :side="THREE.DoubleSide" depthWrite :renderOrder="1" />
		</TresMesh>
	</TresGroup>
</template>

<script setup lang="js">
import { watch } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'

const props = defineProps({
	length: { default: 20 },	// 长度
	width: { default: 1 },	// 宽度
	bendPosition: { default: 0.5 },	// 弯折位置 0-1
	curvature: { default: 0.4 },	// 弯曲度 0-1
	backgroundColor: { default: '#00aaff' },	// 背景颜色
	backgroundAlpha: { default: 0.25 },	// 背景透明度
	segments: { default: 240 },	// 分段数
	arrowColor: { default: '#ffffff' },	// 箭头颜色
	arrowWidth: { default: 0.3 },	// 箭头宽度
	arrowHeight: { default: 0.5 },	// 箭头高度
	arrowSpacing: { default: 0.5 },	// 箭头间距
	arrowOffset: { default: 0 }, // 箭头垂直偏移
	arrowLineWidth: { default: 2 }, // 线条箭头粗细
	arrowStyle: { default: 'chevron' }, // chevron|double|triangle|diamond
	speed: { default: 0.5 }, // 滚动速度
	pixelWorldScale: { default: 0.03 } // 像素到世界单位的转换比例
})

const computeRibbonPathLength = () => {
	const total = Math.max(0.0001, props.length)
	const bend = THREE.MathUtils.clamp(props.bendPosition, 0, 1)
	const L1 = total * bend
	const L2 = total - L1
	const maxR = Math.min(L1, L2)
	const radius = (props.curvature > 0 && bend > 0 && bend < 1) ? Math.min(maxR * 0.9, total * 0.2 * props.curvature) : 0
	const len1 = Math.max(0, L1 - radius)
	const arcLen = radius > 0 ? (Math.PI * radius / 2) : 0
	const len2 = Math.max(0, L2 - radius)
	const fullLen = len1 + arcLen + len2
	const L1val = L1
	return { fullLen, L1val, radius, len1, arcLen }
}
// ----- 1. 构建 L 型路径 -----
let { fullLen, L1val, radius, len1, arcLen } = computeRibbonPathLength()

const pointAt = (s) => {
	s = THREE.MathUtils.clamp(s, 0, fullLen)
	if (s <= len1) return new THREE.Vector2(s, 0)
	else if (s <= len1 + arcLen && radius > 0) {
		const t = (s - len1) / arcLen
		const ang = -Math.PI / 2 + t * (Math.PI / 2)
		const cx = L1val - radius, cy = radius
		return new THREE.Vector2(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius)
	} else {
		const s2 = s - (len1 + arcLen)
		return new THREE.Vector2(L1val, radius + s2)
	}
}

let sampled = [], cumLen = [], pathWorldLength = 0
const getPathLength = () => {
	sampled = []
	cumLen = []
	const samples = Math.max(8, Math.floor(props.segments))
	let prev = pointAt(0), accum = 0
	sampled.push(prev)
	cumLen.push(0)
	pathWorldLength = 0
	for (let i = 1; i <= samples; i++) {
		const s = fullLen * (i / samples)
		const p = pointAt(s)
		const d = p.clone().sub(prev).length()
		accum += d
		sampled.push(p)
		cumLen.push(accum)
		prev = p
	}
	pathWorldLength = accum
}
getPathLength()


let geometry = null
const createBufferGeometry = () => {
	const vertCount = sampled.length * 2
	const pos = new Float32Array(vertCount * 3)
	const normal = new Float32Array(vertCount * 3)
	const uv = new Float32Array(vertCount * 2)
	const indices = []
	const halfW = props.width / 2

	function getTangent (i) {
		if (i === 0) return sampled[1].clone().sub(sampled[0]).normalize()
		else if (i === sampled.length - 1) return sampled[i].clone().sub(sampled[i - 1]).normalize()
		else return sampled[i + 1].clone().sub(sampled[i - 1]).normalize()
	}

	for (let i = 0; i < sampled.length; i++) {
		const p = sampled[i]
		const tang = getTangent(i)
		const n2 = new THREE.Vector2(-tang.y, tang.x).normalize()

		const lx = p.x - n2.x * halfW, ly = p.y - n2.y * halfW
		const rx = p.x + n2.x * halfW, ry = p.y + n2.y * halfW

		pos[(i * 2 + 0) * 3 + 0] = lx; pos[(i * 2 + 0) * 3 + 1] = ly; pos[(i * 2 + 0) * 3 + 2] = 0
		pos[(i * 2 + 1) * 3 + 0] = rx; pos[(i * 2 + 1) * 3 + 1] = ry; pos[(i * 2 + 1) * 3 + 2] = 0

		normal[(i * 2 + 0) * 3 + 0] = 0; normal[(i * 2 + 0) * 3 + 1] = 0; normal[(i * 2 + 0) * 3 + 2] = 1
		normal[(i * 2 + 1) * 3 + 0] = 0; normal[(i * 2 + 1) * 3 + 1] = 0; normal[(i * 2 + 1) * 3 + 2] = 1

		const distU = cumLen[i] / (props.arrowWidth + props.arrowSpacing); // 关键：箭头+空白
		uv[(i * 2 + 0) * 2 + 0] = distU; uv[(i * 2 + 0) * 2 + 1] = 0;
		uv[(i * 2 + 1) * 2 + 0] = distU; uv[(i * 2 + 1) * 2 + 1] = 1;
	}

	for (let i = 0; i < sampled.length - 1; i++) {
		const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1;
		indices.push(a, c, b)
		indices.push(b, c, d)
	}

	if (geometry) {
		geometry.dispose()
	}
	geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))
	geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3))
	geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
	geometry.setIndex(indices)
	geometry.computeBoundingBox()
	geometry.computeBoundingSphere()
}
createBufferGeometry()

const makeArrowTextureCanvas = ({ arrowWidthPx, arrowHeightPx, spacingPx, style, color, lineWidth, offset }) => {
	// padding（左右留白）
	const padding = spacingPx;

	// Canvas 的逻辑尺寸（CSS 像素）
	const width = arrowWidthPx + padding * 2;
	const height = arrowHeightPx + padding * 2;

	// 处理高 DPI
	const dpr = Math.max(1, window.devicePixelRatio || 1);
	const canvas = document.createElement('canvas');
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';

	const ctx = canvas.getContext('2d');
	ctx.scale(dpr, dpr);

	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';

	// 图标绘制区域（保证始终居中）
	const x0 = padding;
	const y0 = padding;
	const w = arrowWidthPx;
	const h = arrowHeightPx;

	const cx = x0 + w / 2;
	const cy = y0 + h / 2 + offset;

	//-------------------------------------------------------
	// 正式绘制图标
	//-------------------------------------------------------
	if (style === 'chevron') {
		ctx.beginPath();
		ctx.moveTo(x0, cy - h / 2);
		ctx.lineTo(x0 + w, cy);
		ctx.lineTo(x0, cy + h / 2);
		ctx.stroke();

	} else if (style === 'double') {
		ctx.beginPath();
		ctx.moveTo(x0, cy - h / 2);
		ctx.lineTo(x0 + w * 0.7, cy);
		ctx.lineTo(x0, cy + h / 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x0 + w * 0.8, cy - h / 2);
		ctx.lineTo(x0 + w * 1.5, cy);
		ctx.lineTo(x0 + w * 0.8, cy + h / 2);
		ctx.stroke();
	} else if (style === 'triangle') {

		ctx.beginPath();
		ctx.moveTo(x0, cy - h / 2);
		ctx.lineTo(x0 + w, cy);
		ctx.lineTo(x0, cy + h / 2);
		ctx.closePath();
		ctx.fill();

	} else if (style === 'diamond') {
		ctx.beginPath();
		ctx.moveTo(cx, cy - h / 2);
		ctx.lineTo(cx + w / 2, cy);
		ctx.lineTo(cx, cy + h / 2);
		ctx.lineTo(cx - w / 2, cy);
		ctx.closePath();
		ctx.fill();

	} else {
		// default chevron stroke
		ctx.beginPath();
		ctx.moveTo(x0, cy - h / 2);
		ctx.lineTo(x0 + w, cy);
		ctx.lineTo(x0, cy + h / 2);
		ctx.stroke();
	}

	const tex = new THREE.CanvasTexture(canvas)
	tex.generateMipmaps = false
	tex.minFilter = THREE.LinearFilter
	tex.magFilter = THREE.LinearFilter
	tex.wrapS = THREE.RepeatWrapping
	tex.wrapT = THREE.ClampToEdgeWrapping
	tex.repeat.set(pathWorldLength / (props.arrowWidth + props.arrowSpacing), 1)
	tex.needsUpdate = true
	return tex
}

let arrowTex = null
const getArrowTex = () => {
	if (arrowTex) {
		arrowTex.dispose()
	}
	arrowTex = makeArrowTextureCanvas({
		arrowWidthPx: props.arrowWidth / props.pixelWorldScale,
		arrowHeightPx: props.arrowHeight / props.pixelWorldScale,
		spacingPx: props.arrowSpacing / props.pixelWorldScale,
		style: props.arrowStyle,
		color: props.arrowColor,
		lineWidth: props.arrowLineWidth,
		offset: props.arrowOffset
	})
}
getArrowTex()

watch(
	() => [props.length, props.width, props.bendPosition, props.curvature, props.segments, props.arrowColor, props.arrowWidth, props.arrowHeight, props.arrowSpacing, props.arrowOffset, props.arrowLineWidth, props.arrowStyle, props.pixelWorldScale],
	() => {
		({ fullLen, L1val, radius, len1, arcLen } = computeRibbonPathLength())
		getPathLength()
		createBufferGeometry()
		getArrowTex()
	},
)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
	if (arrowTex) {
		const dt = props.speed * delta
		arrowTex.offset.x = (arrowTex.offset.x - dt) % 1
		if (arrowTex.offset.x > 1) arrowTex.offset.x -= 1
		arrowTex.needsUpdate = true
	}
})
</script>
