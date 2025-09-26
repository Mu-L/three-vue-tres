<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-24 10:36:23
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 14:57:09
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useLoop } from '@tresjs/core'
import { UseTexture } from '@tresjs/cientos'
import { CatmullRomCurve3, Vector3, RepeatWrapping, BackSide, Color, Texture } from 'three'
import { loadGeojson } from '../../common/utils'
// import transformControlsDebug from '../../components/transformControlsDebug.vue'

const props = withDefaults(
    defineProps<{
        geoJson: string
        color?: string
        radius?: number
        speed?: number
    }>(),
    {
        color: '#ffff00',
        radius: 2,
        speed: 1.0,
    },
)

const tgRef = ref()
const tmbmRef = ref()

// pTexture.rotation = Math.PI
// pTexture.generateMipmaps = false
// pTexture.magFilter = NearestFilter

const linePrimary = await loadGeojson(props.geoJson)

// 一下两个参数 是城市建筑物模型的大小中心点 以及 实际地理位置的偏移和位置， 需要和 建模的人 进行沟通不对，不能直接用
// 121.511782,31.229849
const geoOffSet = [-31.258949, 0, -121.465782]
const scalegeoScale = 60000

let curve: CatmullRomCurve3[] = []
for (var i = 0; i < linePrimary.length; i++) {
    const item = linePrimary[i]
    const points: Vector3[] = []
    item.geometry.coordinates.forEach((lineOne: number[]) => {
        points.push(new Vector3((lineOne[1] + geoOffSet[0]) * scalegeoScale, geoOffSet[1], (lineOne[0] + geoOffSet[2]) * scalegeoScale))
    })
    curve.push(new CatmullRomCurve3(points))
}

watchEffect(() => {
    if (props.color) {
        if (tmbmRef.value) {
            tmbmRef.value.color = new Color(props.color)
        }
    }
})
const { onBeforeRender } = useLoop()
const ppTexture = ref<Texture>()
onBeforeRender(() => {
    if (ppTexture.value) {
        ppTexture.value.offset.x -= (Math.random() / 20) * props.speed
    }
})

const handleLoaded = (texture: Texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(1, 1)
    ppTexture.value = texture
}

</script>

<template>
    <TresGroup ref="tgRef">
        <UseTexture v-slot="{ state: pTexture }" path="./plugins/digitalCity/image/line.png" @loaded="handleLoaded">
            <TresMesh v-for="item in curve" :renderOrder="3000">
                <TresTubeGeometry :args="[item, 64, props.radius, 20 /*管道圆润*/, false]" />
                <TresMeshBasicMaterial ref="tmbmRef" :map="pTexture" :side="BackSide" :transparent="true"
                    :color="props.color" />
            </TresMesh>
        </UseTexture>
    </TresGroup>
</template>
