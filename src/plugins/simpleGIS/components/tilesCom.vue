<template>
    <TresGroup :rotation-x="-Math.PI/2" >
        <primitive :object="tiles.group" />
    </TresGroup>
</template>

<script lang="ts" setup>
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { watch } from 'vue'
import { TilesRenderer } from '3d-tiles-renderer'
import { alignmentCenter } from '../common/utils'
// import * as THREE from 'three'

const tiles = new TilesRenderer(
    // `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/3Dtiles/simpleGIS/data/tileset.json`,
    // 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/no.json',
    'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/tileset.json',
    // 'https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/shanghai/tileset.json',
    // './plugins/geokit/tiles/tileset.json',
)
tiles.fetchOptions.mode = 'cors'
// tiles.lruCache.minSize = 900
// tiles.lruCache.maxSize = 1300
tiles.errorTarget = 12

const onLoadModel = ({ scene }: any) => {
    scene.traverse((c: any) => {
        if (c.isMesh) {
            c.material.side = 2
            c.receiveShadow = false
            c.castShadow = false
        }
    })
}

tiles.addEventListener('load-model', onLoadModel)
tiles.addEventListener('load-tile-set', () => {
    alignmentCenter(tiles)
})

const { camera, renderer, sizes } = useTresContext()
watch(
    camera,
    () => {
        if (camera.value) {
            tiles.setCamera(camera.value)
            tiles.setResolutionFromRenderer(camera.value, renderer.value)
        }
    },
    { immediate: true },
)

const { onBeforeLoop } = useRenderLoop()
onBeforeLoop(() => {
    if (camera.value && sizes.width.value) {
        camera.value.updateMatrixWorld(true)
        tiles.update()
    }
})
</script>
