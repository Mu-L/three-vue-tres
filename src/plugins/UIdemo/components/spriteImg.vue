<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-12 15:54:55
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-15 16:15:51
-->
<template>
    <TresGroup>
        <TresSprite v-if="isSprite" :scale-y="fixedHeight">
            <TresSpriteMaterial :map="texture" :alphaTest="0.2" />
        </TresSprite>
        <TresMesh v-else :scale-y="fixedHeight">
            <TresPlaneGeometry />
            <TresMeshBasicMaterial :map="texture" :side="THREE.DoubleSide" transparent :alphaTest="0.2" />
        </TresMesh>
    </TresGroup>
</template>
<script setup lang="ts">
import { watch,ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({
    base64: {
        default:
            '',
    },
    isSprite: {
        default: false,
    },
})

let fixedHeight = ref(1)

let texture = null as any
watch(
    () => props.base64,
    (base64) => {
        texture = new THREE.TextureLoader().load(base64)
        texture.colorSpace = THREE.SRGBColorSpace

        const img = new Image()
        img.src = base64
        img.onload = () => {
            fixedHeight.value = img.height / img.width
        }
    },
    { immediate: true },
)
</script>
