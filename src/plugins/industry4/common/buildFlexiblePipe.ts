import * as THREE from 'three'

/** 精确的 3D 圆弧曲线（以角度参数化，保证端点精确） */
class Arc3Curve extends THREE.Curve<THREE.Vector3> {
    center: THREE.Vector3
    xAxis: THREE.Vector3
    yAxis: THREE.Vector3
    radius: number
    startAngle: number
    deltaAngle: number

    constructor(center: THREE.Vector3, xAxis: THREE.Vector3, yAxis: THREE.Vector3, radius: number, startAngle: number, deltaAngle: number) {
        super()
        this.center = center.clone()
        this.xAxis = xAxis.clone().normalize()
        this.yAxis = yAxis.clone().normalize()
        this.radius = radius
        this.startAngle = startAngle
        this.deltaAngle = deltaAngle
    }

    getPoint(t: number, optionalTarget?: THREE.Vector3): THREE.Vector3 {
        const a = this.startAngle + this.deltaAngle * t
        const cos = Math.cos(a),
            sin = Math.sin(a)
        // center + (cos*a*xAxis + sin*a*yAxis) * radius
        const p = (optionalTarget || new THREE.Vector3())
            .copy(this.xAxis)
            .multiplyScalar(cos * this.radius)
            .addScaledVector(this.yAxis, sin * this.radius)
            .add(this.center)
        return p
    }
}

/**
 * 构建带圆角的 CurvePath
 * points: 顶点数组（至少 2 个），共面或近似共面也可
 * radius: 目标圆角半径
 * arcSegments: 可选，仅用于 TubeGeometry 细分参考（这里没直接用）
 */
function buildRoundedPath(points: THREE.Vector3[], radius: number, arcSegments = 16): THREE.CurvePath<THREE.Vector3> {
    const EPS = 1e-6
    const path = new THREE.CurvePath<THREE.Vector3>()
    if (points.length < 2) return path

    let lastAddedPoint = points[0].clone()

    const almostEqual = (a: THREE.Vector3, b: THREE.Vector3) => a.distanceToSquared(b) < 1e-8

    for (let i = 1; i < points.length - 1; i++) {
        const pPrev = points[i - 1].clone()
        const pCurr = points[i].clone()
        const pNext = points[i + 1].clone()

        const v1 = pPrev.clone().sub(pCurr) // 从拐点指向前点
        const v2 = pNext.clone().sub(pCurr) // 从拐点指向后点
        const l1 = v1.length()
        const l2 = v2.length()

        if (l1 < EPS || l2 < EPS) {
            // 退化：直接连线
            if (!almostEqual(lastAddedPoint, pCurr)) path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pCurr.clone()))
            lastAddedPoint = pCurr.clone()
            continue
        }

        const u1 = v1.clone().normalize()
        const u2 = v2.clone().normalize()

        const cosPhi = THREE.MathUtils.clamp(u1.dot(u2), -1, 1)
        const phi = Math.acos(cosPhi)

        if (phi < 1e-4) {
            // 几乎共线
            if (!almostEqual(lastAddedPoint, pCurr)) path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pCurr.clone()))
            lastAddedPoint = pCurr.clone()
            continue
        }

        // 期望沿两条边退回的长度 t
        const tDesired = radius / Math.tan(phi / 2)
        const tMax = Math.min(l1, l2) - 1e-6
        const t = Math.min(tDesired, Math.max(0, tMax))

        if (t <= 1e-6) {
            if (!almostEqual(lastAddedPoint, pCurr)) path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pCurr.clone()))
            lastAddedPoint = pCurr.clone()
            continue
        }

        const actualR = t * Math.tan(phi / 2)
        const bis = u1.clone().add(u2)
        if (bis.length() < 1e-6) {
            if (!almostEqual(lastAddedPoint, pCurr)) path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pCurr.clone()))
            lastAddedPoint = pCurr.clone()
            continue
        }
        const bisNorm = bis.clone().normalize()
        const centerDist = actualR / Math.sin(phi / 2)
        const center = pCurr.clone().add(bisNorm.multiplyScalar(centerDist))

        // 切点
        const pA = pCurr.clone().add(u1.clone().multiplyScalar(t)) // 前段切点
        const pB = pCurr.clone().add(u2.clone().multiplyScalar(t)) // 后段切点

        // 构造局部坐标系（xAxis 指向 pA - center）
        const vStart = pA.clone().sub(center)
        let xAxis = vStart.clone().normalize()
        // 平面法向量
        const planeNormal = v1.clone().cross(v2)
        if (planeNormal.length() < 1e-7) {
            // 共线或退化，退化为直线
            if (!almostEqual(lastAddedPoint, pCurr)) path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pCurr.clone()))
            lastAddedPoint = pCurr.clone()
            continue
        }
        const yAxis = planeNormal.clone().normalize().cross(xAxis).normalize()

        // 计算起止角度（在 xAxis,yAxis 基底）
        const startAngle = Math.atan2(vStart.dot(yAxis), vStart.dot(xAxis))
        const vEnd = pB.clone().sub(center)
        const endAngle = Math.atan2(vEnd.dot(yAxis), vEnd.dot(xAxis))

        // 取短弧（把 delta 调整到 (-PI, PI])
        let delta = endAngle - startAngle
        while (delta <= -Math.PI) delta += Math.PI * 2
        while (delta > Math.PI) delta -= Math.PI * 2

        // 先把上一段剩余的直线连到 pA
        if (!almostEqual(lastAddedPoint, pA)) {
            path.add(new THREE.LineCurve3(lastAddedPoint.clone(), pA.clone()))
        }

        // 用精确圆弧曲线加入 path
        const arcCurve = new Arc3Curve(center, xAxis, yAxis, actualR, startAngle, delta)
        path.add(arcCurve as any) // CurvePath 接受任何 Curve< Vector3 >

        // 更新 lastAddedPoint 为 pB
        lastAddedPoint = pB.clone()
    }

    // 连接最后一段到末点
    const lastPoint = points[points.length - 1].clone()
    if (!lastAddedPoint.equals(lastPoint) && lastAddedPoint.distanceToSquared(lastPoint) > 1e-8) {
        path.add(new THREE.LineCurve3(lastAddedPoint.clone(), lastPoint.clone()))
    }

    return path
}

export { buildRoundedPath }
