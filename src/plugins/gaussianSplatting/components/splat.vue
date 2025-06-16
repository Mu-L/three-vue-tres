<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-16 08:31:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-16 08:41:20
-->
<template>
    <primitive :object="modelSplat" :rotate-x="-Math.PI"/>
</template>

<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { Splat, SplatLoader } from '@pmndrs/vanilla'

const { camera, renderer } = useTresContext() as any

const loader = new SplatLoader(renderer.value)
const oneSplat = await loader.loadAsync('./plugins/gaussianSplatting/model/luigi.splat')
const modelSplat = new Splat(oneSplat, camera.value, { alphaTest: 0.1 })
</script>
