<!--
 * @Description: 
 * @Version: 1.668 (upgraded for TresV5 + CientosV4)
 * @Autor: 地虎降天龙
 * @Date: 2024-03-11 15:02:07
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-18 16:13:48
-->
<script setup lang="ts">
import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import { useGLTF } from '@tresjs/cientos' // 新 API（返回 { state, nodes, materials, animations }）
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { loadOBJ } from 'PLS/medical/common/util'
import { makeSimMesh, makeTexture } from '../lib/utils'
import { useTres, useLoop } from '@tresjs/core' // 新 API 名称你已使用正确
import particalMesh from '../components/particalMesh.vue'
import { ref, watch } from 'vue' // 新增 watch

const props = withDefaults(
    defineProps<{
        progress?: number
        width?: number
        height?: number
        color?: string
    }>(),
    {
        progress: 0,
        width: 256,
        height: 256,
        color: '#ffaa00',
    },
)

const pMesh = ref<any>(null)

// 注意：WebGLRenderTarget 的尺寸如果会动态变化，建议响应式管理。
// 此处保持你原来的静态初始化
const fboTarget = new THREE.WebGLRenderTarget(props.width, props.height, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,
    colorSpace: THREE.SRGBColorSpace,
    depthBuffer: false,
    stencilBuffer: false,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
})

const mergeGeometriesForMesh = (model: THREE.Object3D) => {
    const gList: any[] = []
    model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
            // 删除多余属性以减小合并后顶点体积
            child.geometry.deleteAttribute('uv')
            child.geometry.deleteAttribute('normal')
            child.geometry.deleteAttribute('tangent')
            gList.push(child.geometry)
        }
    })
    //合并 geometry
    return BufferGeometryUtils.mergeGeometries(gList)
}

// 路径（保持你原来的路径逻辑）
const baseUrl = process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'
const brainpartsPath = baseUrl + '/model/medical/brainparts.OBJ'

// 加载 OBJ（你原来用的是 await loadOBJ，这里保留异步加载 OBJ 的方式）
const objLoader = new OBJLoader()
const brainpartsModel = await loadOBJ(brainpartsPath, objLoader)
const brainpartsGeometries = mergeGeometriesForMesh(brainpartsModel)
brainpartsGeometries.scale(0.01, 0.01, 0.01)
const brainTexture = makeTexture(brainpartsGeometries)

// ---- 以下 useGLTF 改为新版用法（不再 await useGLTF(...)） ----
// 我把纹理先声明为 ref，loading 完成时赋值
const guanyuTexture = ref<any>(null)
const planeTexture = ref<any>(null)

// guanyu 模型：旧写法（你原来）:
// const guanyuModel = (await useGLTF(path, opts)).scene
// 新写法：useGLTF 返回 { state, nodes, materials, animations }
// 需要监听 state.value 是否就绪，然后处理 scene/nodes/materials
const guanyuPath = baseUrl + '/model/eCommerce/guanYu.glb'
const { state: guanyuState, nodes: guanyuNodes, materials: guanyuMaterials, animations: guanyuAnimations } = useGLTF(guanyuPath, { draco: true, decoderPath: './draco/' })

watch(
    () => guanyuState.value,
    (state) => {
        if (!state?.scene) return
        // 兼容你原来 merge 的逻辑：取 children[0] 并合并其 mesh 几何
        try {
            const target = state.scene || state?.scene || (state as any).scene
            // 如果 scene 有 children
            const targetChild = (target as any).children?.[0] ?? target
            const guanyuGeometries = mergeGeometriesForMesh(targetChild)
            guanyuGeometries.rotateX(Math.PI / 2)
            guanyuGeometries.translate(0, -0.9, 0)
            // 生成纹理
            guanyuTexture.value = makeTexture(guanyuGeometries)
        } catch (e) {
            console.warn('guanyu merge error', e)
        }
    },
    { immediate: true },
)

// plane 模型（同理）
const planePath = baseUrl + '/model/industry4/modelDraco.glb'
const { state: planeState, nodes: planeNodes, materials: planeMaterials, animations: planeAnimations } = useGLTF(planePath, { draco: true, decoderPath: './draco/' })

watch(
    () => planeState.value,
    (state) => {
        if (!state?.scene) return
        try {
            const target = state.scene || state
            const targetChild = (target as any).children?.[0] ?? target
            const planeGeometries = mergeGeometriesForMesh(targetChild)
            planeGeometries.rotateX(-Math.PI / 2)
            planeGeometries.rotateY(Math.PI / 3)
            planeGeometries.translate(0.0, 0, 0)
            planeTexture.value = makeTexture(planeGeometries)
        } catch (e) {
            console.warn('plane merge error', e)
        }
    },
    { immediate: true },
)

// simMesh（你的粒子仿真网格）
const simMesh = makeSimMesh()

// 你原来注释了直接赋值纹理，这里不做自动赋值，保持 onBeforeRender 时按 progress 切换
// simMesh.material.uniforms.uTextureA.value = brainTexture
// simMesh.material.uniforms.uTextureB.value = guanyuTexture

// FBO 场景和正交相机（不变）
const FBOscene = new THREE.Scene()
const FBOcamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
FBOscene.add(simMesh)

// useLoop -> 新 API 已正确使用（onRender, onBeforeRender）
// 你原来写的是 const { onBeforeRender } = useLoop()，并使用 onBeforeRender(({ elapsed }) => {})
// 这里保留该写法（符合你的新 API 总结）
const { onBeforeRender } = useLoop()
const { camera, renderer } = useTres()

// 在渲染前更新 FBO 并把 FBO 的 texture 赋给粒子材质
onBeforeRender(({ elapsed }) => {
    // 注意：guanyuTexture 和 planeTexture 是 ref，需要取 .value
    if (renderer && camera.value && pMesh.value) {
        // render to FBO
        renderer.setRenderTarget(fboTarget)
        renderer.clear()
        renderer.render(FBOscene, FBOcamera as THREE.Camera)
        renderer.setRenderTarget(null)

        // 选择性使用纹理（注意 null 检查）
        const gTex = guanyuTexture.value || null
        const bTex = brainTexture || null
        const plTex = planeTexture.value || null

        const progress =THREE.MathUtils.clamp(-props.progress / 2, 0, 1)

        if (progress < 1 / 2) {
            // 当 guanyuTexture 还未就绪时，gTex 将为 null；你可以按需 fallback
            simMesh.material.uniforms.uTextureA.value = gTex ?? bTex
            simMesh.material.uniforms.uTextureB.value = bTex
            simMesh.material.uniforms.uScroll.value = progress * 2
        } else {
            simMesh.material.uniforms.uTextureA.value = bTex
            simMesh.material.uniforms.uTextureB.value = plTex ?? bTex
            simMesh.material.uniforms.uScroll.value = (progress - 1 / 2) * 2
        }
        simMesh.material.uniforms.uTime.value = elapsed

        // 把 FBO 输出的纹理传给粒子材质
        // 注意 pMesh.value.particles.material.uniforms.uPositions 可能需要 null-check
        if (pMesh.value?.particles?.material?.uniforms) {
            pMesh.value.particles.material.uniforms.uPositions.value = fboTarget.texture
            // 将 color 字符串转换并设置到 uniform
            const cUniform = pMesh.value.particles.material.uniforms.uColor
            if (cUniform) {
                // THREE.Color 的 setStyle 在新版 three 中仍支持
                cUniform.value.setStyle(props.color)
            }
        }
    }
})
</script>

<template>
    <particalMesh ref="pMesh" :progress="progress" />
</template>
