<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-22 11:14:44
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-29 12:49:03
-->
<script setup lang="ts">
import { watch } from 'vue'
import { CatmullRomCurve3, Vector3, RepeatWrapping, DoubleSide } from 'three'
import { useTexture } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { loadGeojson } from '../../common/utils'
import { lonLatToUtm } from 'PLS/simpleGIS/lib/threeSatelliteMap/index'

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
    speed: 1.0
  },
)

// ---------- 纹理加载 ----------
const { state: pTexture } = useTexture('./plugins/digitalCity/image/line.png')
watch(pTexture, (mapv) => {
  if (mapv) {
    mapv.needsUpdate = true
    mapv.wrapS = mapv.wrapT = RepeatWrapping
    mapv.repeat.set(1, 1)
  }
})

// ---------- 加载 GeoJSON 并生成曲线 ----------
const linePrimary = await loadGeojson(props.geoJson)
let curve = [] as any
for (let i = 0; i < linePrimary.length; i++) {
  const item = linePrimary[i]
  const points: Vector3[] = []
  item.geometry.coordinates.forEach((lineOne: any) => {
    const onePoint = lonLatToUtm(lineOne[0], lineOne[1], 50)
    points.push(new Vector3(onePoint[0], 0, -onePoint[1]))
  })
  let oneColor = props.color
  if (item.properties.highway === 'primary') oneColor = '#7eff10'
  else if (item.properties.highway === 'tertiary') oneColor = '#0eeeee'
  else if (item.properties.highway === 'secondary') oneColor = '#ffffff'
  else oneColor = '#ff0ffe'
  curve.push({ cr3: new CatmullRomCurve3(points), color: oneColor })
}

// ---------- 渲染循环 ----------
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  if (pTexture.value) {
    pTexture.value.offset.x -= (Math.random() / 20) * props.speed
  }
})
</script>

<template>
  <TresGroup>
    <TresMesh v-for="(item, index) in curve" :key="index" :renderOrder="3000">
      <TresTubeGeometry :args="[item.cr3, 64, props.radius, 20, false]" />
      <TresMeshBasicMaterial
        :map="pTexture"
        :side="DoubleSide"
        :transparent="true"
        :color="item.color"
      />
    </TresMesh>
  </TresGroup>
</template>
