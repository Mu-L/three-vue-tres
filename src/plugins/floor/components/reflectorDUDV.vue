<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-25 11:41:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-15 11:12:54
-->
<template>
    <TresGroup :scale="[scale, 1, scale]" v-if="!isLoading">
        <primitive :object="toRaw(mirror)" :position-y="-0.01" />
        <primitive :object="gridHelp" />
    </TresGroup>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { Mesh, PlaneGeometry, RepeatWrapping, GridHelper } from 'three'
import { useTexture } from '@tresjs/cientos'
import { Reflector, ReflectorDudvMaterial } from '../lib/alienJS/all.three.js'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { fixSpritesForMirror } from '../common/utils.js'

import { watchEffect, watch, ref, toRaw } from 'vue'
const props = withDefaults(
    defineProps<{
        reflectivity?: number
        showGridHelper?: boolean
        scale?: number
        ignoreObjects?: THREE.Object3D[]
        size?: number[]
        mapUrl?: string
    }>(),
    {
        reflectivity: 0.8,
        scale: 1.0,
        showGridHelper: true,
        ignoreObjects: () => [],
        size: () => [10, 10],
        mapUrl: './plugins/floor/image/waterdudv.jpg',
    },
)

const reflector = new Reflector()
const gridHelp = new GridHelper(props.size[0] - 0.5, props.size[1])
gridHelp.visible = props.showGridHelper

let mapurl = props.mapUrl
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    mapurl = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + mapurl
    // if (process.env.NODE_ENV === 'development') {
    //     mapurl = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + mapurl
    // } else {
    //     mapurl = process.env.BASE_URL + mapurl
    // }
    console.log('qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__', qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
    console.log('process.env.BASE_URL', process.env.BASE_URL)
}
let material = null as any
let mirror = ref(null) as any
const { state: map, isLoading } = useTexture(mapurl)
watch(
    () => map.value,
    (mapv) => {
        if (mapv) {
            mapv.wrapS = RepeatWrapping
            mapv.wrapT = RepeatWrapping
            mapv.colorSpace = THREE.SRGBColorSpace
            mapv.repeat.set(6, 3)
            material = new ReflectorDudvMaterial({
                map: mapv,
                reflectivity: props.reflectivity as any,
            })
            material.uniforms.tReflect = { value: reflector.renderTarget.texture }
            material.uniforms.tReflectBlur = reflector.renderTargetUniform
            material.uniforms.uMatrix = reflector.textureMatrixUniform

            mirror.value = new Mesh(new PlaneGeometry(props.size[0], props.size[1]), undefined)
            mirror.value.material = material
            mirror.value.rotation.x = -Math.PI / 2
            mirror.value.add(reflector)

            mirror.value.onBeforeRender = (rendererSelf: any, sceneSelf: any, cameraSelf: any) => {
                mirror.value.visible = false
                props.ignoreObjects.forEach((child: any) => {
                    if (child.isMesh) {
                        child.visible = false
                    }
                    if (child.value && child.value.isMesh) {
                        child.value.visible = false
                    }
                })
                fixSpritesForMirror(sceneSelf)
                reflector.update(rendererSelf, sceneSelf, cameraSelf)
                fixSpritesForMirror(sceneSelf, false)
                props.ignoreObjects.forEach((child: any) => {
                    if (child.isMesh) {
                        child.visible = true
                    }
                    if (child.value && child.value.isMesh) {
                        child.value.visible = true
                    }
                })
                mirror.value.visible = true
            }
        }
    }
)
watchEffect(() => {
    if (props.reflectivity && material) {
        material.uniforms.uReflectivity.value = props.reflectivity
    }
})

watch(
    () => props.showGridHelper,
    (newVal) => {
        gridHelp.visible = newVal
    },
)

defineExpose({
    reflector,
})
</script>
