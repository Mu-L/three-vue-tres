<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-22 16:05:20
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-14 15:58:04
-->

<template>
    <TresGroup v-if="!isLoading">
        <primitive :object="meshOB" />
        <primitive :object="gridHelp" :position="[0, 0.01, 0]"/>
    </TresGroup>
</template>

<script lang="ts" setup>
import { Vector2, PlaneGeometry, Mesh, RepeatWrapping, Color, GridHelper } from 'three'
import { useTres } from '@tresjs/core'
import { useTextures } from '@tresjs/cientos'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'
import { watchEffect, watch } from 'vue'
import { fixSpritesForMirror } from '../common/utils.js'
const props = withDefaults(
    defineProps<{
        reflectivity?: Number // 反射率
        mirror?: Number // 去除纹理 镜面化
        mixStrength?: Number //混合
        showGridHelper?: boolean
        color?: string
    }>(),
    {
        reflectivity: 0.2,
        mirror: 0.1,
        mixStrength: 9,
        showGridHelper: true,
        color: '#ffffff',
    },
)

const { scene } = useTres()

const { textures: pTexture, isLoading } = useTextures([
    './plugins/floor/image/concrete_wet_floor_basecolor.jpg',
    './plugins/floor/image/concrete_wet_floor_normal.jpg',
])

let material = null as any
let meshOB = null as any
let gridHelp = null as any

watch([pTexture, isLoading], ([pTexture, isLoading]) => {
    if (pTexture && pTexture.length === 2 && !isLoading) {
        pTexture[0].wrapS = RepeatWrapping
        pTexture[0].wrapT = RepeatWrapping
        pTexture[1].wrapS = RepeatWrapping
        pTexture[1].wrapT = RepeatWrapping

        const reflector = new Reflector()

        material = new ReflectorMaterial({
            reflectivity: props.reflectivity, //反射率
            mirror: props.mirror,
            mixStrength: props.mixStrength,
            color: new Color(props.color),
            map: pTexture[0],
            normalMap: pTexture[1],
            normalScale: new Vector2(5, 5),
            fog: scene.value.fog,
            dithering: true,
        })

        material.uniforms.tReflect = reflector.renderTargetUniform
        material.uniforms.uMatrix = reflector.textureMatrixUniform

        const geometry = new PlaneGeometry(10, 10)
        meshOB = new Mesh(geometry, material)
        meshOB.name = 'reflectorShaderMesh'
        meshOB.position.y = -0.01
        meshOB.rotation.x = -Math.PI / 2

        meshOB.add(reflector)
        meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
            meshOB.visible = false
            fixSpritesForMirror(sceneSelf)
            reflector.update(rendererSelf, sceneSelf, cameraSelf)
            fixSpritesForMirror(sceneSelf,false)
            meshOB.visible = true
        }
        gridHelp = new GridHelper(9.5, 10)
        gridHelp.visible = props.showGridHelper
    }
})

watchEffect(() => {
    if (props.reflectivity && material) {
        material.uniforms.uReflectivity.value = props.reflectivity
    }
    if (props.mirror && material) {
        material.uniforms.uMirror.value = props.mirror
    }
    if (props.mixStrength && material) {
        material.uniforms.uMixStrength.value = props.mixStrength
    }
    if (props.color && material) {
        material.uniforms.uColor.value = new Color(props.color)
    }
})
watch(
    () => props.showGridHelper,
    (newVal) => {
        gridHelp.visible = newVal
    },
)
</script>
