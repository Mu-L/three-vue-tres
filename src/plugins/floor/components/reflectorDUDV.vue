<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-25 11:41:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-24 15:27:04
-->
<template>
    <TresGroup :scale="[scale, 1, scale]">
        <primitive :object="mirror" :position-y="-0.01" />
        <primitive :object="gridHelp" />
    </TresGroup>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { Mesh, PlaneGeometry, RepeatWrapping, GridHelper } from 'three'
import { useTexture } from '@tresjs/cientos'
import { Reflector, ReflectorDudvMaterial } from '../lib/alienJS/all.three.js'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import { watchEffect, watch } from 'vue'
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
const material = new ReflectorDudvMaterial({
    map: null,
    reflectivity: props.reflectivity as any,
})
const { state: map } = useTexture(mapurl)
watch(
    () => map.value,
    (mapv) => {
        if (mapv) {
            mapv.wrapS = RepeatWrapping
            mapv.wrapT = RepeatWrapping
            mapv.colorSpace = THREE.SRGBColorSpace
            mapv.repeat.set(6, 3)
            material.uniforms.tMap.value = mapv
        }
    },
    { deep: true },
)
material.uniforms.tReflect = { value: reflector.renderTarget.texture }
material.uniforms.tReflectBlur = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform

const mirror = new Mesh(new PlaneGeometry(props.size[0], props.size[1]), material)
mirror.rotation.x = -Math.PI / 2
mirror.add(reflector)

mirror.onBeforeRender = (rendererSelf: any, sceneSelf: any, cameraSelf: any) => {
    mirror.visible = false
    props.ignoreObjects.forEach((child: any) => {
        if (child.isMesh) {
            child.visible = false
        }
        if (child.value && child.value.isMesh) {
            child.value.visible = false
        }
    })
    reflector.update(rendererSelf, sceneSelf, cameraSelf)
    props.ignoreObjects.forEach((child: any) => {
        if (child.isMesh) {
            child.visible = true
        }
        if (child.value && child.value.isMesh) {
            child.value.visible = true
        }
    })
    mirror.visible = true
}
watchEffect(() => {
    if (props.reflectivity) {
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
