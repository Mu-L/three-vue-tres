<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-20 17:08:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 15:49:15

 Sketchfab_model 
 Cube001__0 Cube009__0  Cube013__0 Cube014__0 Cube015__0 Cube016__0
-->
<template>
    <primitive :rotation-x="-Math.PI / 2" :object="meshOB" />
</template>

<script lang="ts" setup>
import { useGLTF} from 'PLS/basic'
import { useTresContext } from '@tresjs/core'
import { Reflector, ReflectorMaterial } from '../lib/alienJS/all.three.js'
import { Vector2, Color, Mesh, Matrix4 } from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

const { scene } = useTresContext()
const { nodes } = await useGLTF(
    (process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/model/floor/modelDraco.glb')
const ob = nodes.Cube016__0

const geometry = ob.geometry
const bufferGeometries = BufferGeometryUtils.mergeGeometries([
    geometry.clone(),
    geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(-Math.PI / 2)),
    geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(Math.PI / 2)),
    geometry.clone().applyMatrix4(new Matrix4().makeRotationZ(-Math.PI)),
])

const reflector = new Reflector()
const material = new ReflectorMaterial({
    reflectivity: 6, //反射率
    mirror: 0.1,
    mixStrength: 3,
    color: new Color('#fff'),
    map: ob.material.map.clone(),
    normalMap: ob.material.normalMap.clone(),
    normalScale: new Vector2(1, 1),
    fog: scene.fog,
    dithering: true,
})
material.uniforms.tReflect = reflector.renderTargetUniform
material.uniforms.uMatrix = reflector.textureMatrixUniform
const meshOB = new Mesh(bufferGeometries, material)
meshOB.add(reflector)
meshOB.onBeforeRender = (rendererSelf, sceneSelf, cameraSelf) => {
    meshOB.visible = false
    reflector.update(rendererSelf, sceneSelf, cameraSelf)
    meshOB.visible = true
}
</script>
