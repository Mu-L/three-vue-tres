<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-01 09:14:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 12:33:04
-->
<template>
    <TresGroup ref="groupRef">
        <primitive :object="tiles.group" />
    </TresGroup>
</template>

<script lang="ts" setup>
import { useTres, useLoop } from '@tresjs/core'
import { TilesRenderer } from '3d-tiles-renderer'
import { watch, ref } from 'vue'
import { alignmentCenter, applyTransform } from '../common/utils'

const props = withDefaults(
    defineProps<{
        tilesUrl?: string
        isRotation?: boolean
        isRranslation?: boolean
    }>(),
    {
        tilesUrl: './plugins/geokit/tiles/tileset.json',
        isRotation: false,
        isRranslation: true,
    },
)

const groupRef = ref(null as any)
const { camera, renderer, sizes } = useTres()
const setCameraAndRenderer = (newTiles: any, camera: any, renderer: any) => {
    newTiles.setCamera(camera)
    newTiles.setResolutionFromRenderer(camera, renderer)
}
const makeNewTiles = () => {
    let newTiles = new TilesRenderer(props.tilesUrl as string) as any
    newTiles.fetchOptions.mode = 'cors'

    newTiles.addEventListener('load-tile-set', () => {
        alignmentCenter(newTiles, props.isRotation, props.isRranslation)
    })
    newTiles.addEventListener('dispose-model', ({ scene }) => {
        scene.traverse((c: any) => {
            if (c.material) {
                c.material.dispose()
            }
        })
    })

    setCameraAndRenderer(newTiles, camera.value, renderer)
    return newTiles
}
let tiles = makeNewTiles()

watch(
    () => [props.isRotation, props.isRranslation],
    () => {
        if (tiles.group) {
            applyTransform(tiles.group, props.isRotation, props.isRranslation)
        }
    },
)

watch(
    camera,
    () => {
        if (camera.value) {
            setCameraAndRenderer(tiles, camera.value, renderer)
        }
    },
    { immediate: true },
)
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    if (camera.value && sizes.width.value && tiles.update) {
        camera.value.updateMatrixWorld()
        tiles.update()
    }
})
watch(
    () => props.tilesUrl,
    (tilesUrl) => {
        if (tilesUrl !== tiles.rootURL) {
            tiles.dispose()
            tiles = makeNewTiles()
        }
    },
)
defineExpose({
    group: groupRef,
    tilesGroup: tiles.group,
})
</script>
