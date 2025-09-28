<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-09-07 23:03:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 11:45:04
-->
<template>
    <TresGroup v-if="!isLoading">
        <TresMesh ref="tmRef" :rotation-x="-Math.PI / 2" :position-y="-0.1">
            <TresPlaneGeometry ref="tpgRef" :args="[10, 10]" />
            <TresMeshStandardMaterial ref="tmsmRef" v-bind="tmsMaterialConfig" />
        </TresMesh>
        <primitive :object="gridHelp" :visible="showGridHelper" />
    </TresGroup>
</template>

<script lang="ts" setup>
import { Vector2, RepeatWrapping, Color, GridHelper } from 'three'
import { useTextures } from '@tresjs/cientos'
import { Reflector } from '../lib/alienJS/all.three.js'
import { makeVertexShader, makeFragmentShader } from '../shaders/reflectorDiffuse.js'
import { watchEffect, ref, watch, nextTick } from 'vue'

const props = withDefaults(
    defineProps<{
        mirror?: Number // 去除纹理 镜面化
        mixStrength?: Number //混合
        showGridHelper?: boolean
        color?: string
    }>(),
    {
        mirror: 1,
        mixStrength: 10,
        showGridHelper: true,
        color: '#ffffff',
    },
)

const gridHelp = new GridHelper(9.5, 10)

const tpgRef = ref()
const tmRef = ref()
const tmsmRef = ref()
const reflector = new Reflector()
const uniforms = {
    mirror: { value: props.mirror },
    mixStrength: { value: props.mixStrength },
}

const { textures: pTexture, isLoading } = await useTextures([
    './plugins/floor/image/polished_concrete_basecolor.jpg',
    './plugins/floor/image/polished_concrete_normal.jpg',
    './plugins/floor/image/polished_concrete_orm.jpg',
])

let tmsMaterialConfig = {}
watch([isLoading, pTexture], ([isLoading, pTexture]) => {
    if (pTexture && !isLoading) {
        for (var i = 0; i < 3; i++) {
            pTexture[i].wrapS = RepeatWrapping
            pTexture[i].wrapT = RepeatWrapping
            pTexture[i].repeat.set(16, 16)
        }

        tmsMaterialConfig = {
            color: new Color('#444'),
            metalness: 1,
            roughness: 1,
            map: pTexture[0],
            metalnessMap: pTexture[2],
            roughnessMap: pTexture[2],
            aoMap: pTexture[2],
            aoMapIntensity: 1,
            normalMap: pTexture[1],
            normalScale: new Vector2(3, 3),
        }

        nextTick(() => {
            tpgRef.value.attributes.uv1 = tpgRef.value.attributes.uv
            tmsmRef.value.aoMap.channel = 1
            tmsmRef.value.onBeforeCompile = makeOnBeforeCompile
            tmRef.value.add(reflector)
            tmRef.value.onBeforeRender = (rendererSelf: any, sceneSelf: any, cameraSelf: any) => {
            reflector.update(rendererSelf, sceneSelf, cameraSelf)
            }
        })


    }
})

const makeOnBeforeCompile = (shader: any) => {
    shader.uniforms.reflectMap = reflector.renderTargetUniform
    shader.uniforms.textureMatrix = reflector.textureMatrixUniform
    shader.uniforms = Object.assign(shader.uniforms, uniforms)
    makeVertexShader(shader)
    makeFragmentShader(shader)
}
watchEffect(() => {
    if (props.color) {
        if (tmsmRef.value) {
            tmsmRef.value.color = new Color(props.color)
        }
    }
})
</script>
