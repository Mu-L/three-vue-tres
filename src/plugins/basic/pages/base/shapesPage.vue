<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-11-04 08:52:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-04 10:53:12
-->

<template>
    <shapeConfigurator v-model="shape" />
    <MaterialSelectorUI style="z-index: 1999;" />
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[5, 10, 5]" :fov="30" :near="1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="2" />
		<TresDirectionalLight :intensity="6" :position="[-2, 1, 0]" />
        <reflectorDUDV :reflectivity="2.6" showGridHelper :position="[0, -0.6, 0]" />
        
        <shapeRenderer :position="[0, 0.5, 0]" :modelValue="shape">
            <MaterialSelector :type="currentType" :material-props="currentProps" />
        </shapeRenderer>
    </TresCanvas>
</template>
<script setup lang="ts">
import { ref, provide } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import { shapeRenderer, shapeConfigurator, MaterialSelector } from 'PLS/basic'
import { materialPresets, type MaterialType } from 'PLS/basic/components/forCientos/MaterialSelector/materials'
import MaterialSelectorUI from 'PLS/basic/components/forCientos/MaterialSelector/ui.vue'

const state = {
    clearColor: '#333333',
    shadows: true,
    alpha: false,
    antialias: true,
}

const shape = ref({
  type: "Box",
  args: [2, 1, 1],
})

const currentType = ref<MaterialType>('MeshStandardMaterial')
const currentProps = ref({ ...materialPresets[currentType.value].props })
provide('MaterialSelectorType', currentType)
provide('MaterialSelectorProps', currentProps)
</script>
