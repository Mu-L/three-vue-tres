<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 15:53:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-27 11:27:24
-->
<template>
    <primitive :object="FlameSpriteAnimator.group" :renderOrder="9999" />
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { SpriteAnimator } from '@pmndrs/vanilla'
import { useLoop } from '@tresjs/core'
import { watch } from 'vue'

const props = withDefaults(defineProps<{
    color?: string
}>(), {

    color: "#f5d26b",
})

const FlameSpriteAnimator = SpriteAnimator({
    startFrame: 0,
    fps: 40,
    autoPlay: true,
    loop: true,
    textureImageURL: './plugins/digitalCity/image/spriteAnimator/flame.png',
    textureDataURL: './plugins/digitalCity/image/spriteAnimator/flame.json',
    alphaTest: 0.101,
    asSprite: true,
})
await FlameSpriteAnimator.init()

FlameSpriteAnimator.group.children[0].material.map.colorSpace = THREE.SRGBColorSpace
// FlameSpriteAnimator.group.children[0].material.depthTest = true
// FlameSpriteAnimator.group.children[0].material.depthWrite = false
FlameSpriteAnimator.group.children[0].material.blending = THREE.NormalBlending
FlameSpriteAnimator.group.children[0].material.color.set(props.color)
FlameSpriteAnimator.group.children[0].geometry.translate(0, 0.344, 0) // 偏移
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
    FlameSpriteAnimator.update()
})

watch(
    () => [props.color],
    () => {
        if (FlameSpriteAnimator.group) {
            FlameSpriteAnimator.group.children[0].material.color.set(props.color)
        }
    }
)
</script>
