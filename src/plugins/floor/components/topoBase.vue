<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-12 08:36:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-12 15:41:09
-->
<template>
    <TresGroup>
        <primitive v-if="curModel" :object="toRaw(curModel)" />
    </TresGroup>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import { Resource } from 'PLS/resourceManager'
// import * as THREE from 'three'

const props = defineProps({
    selected: { default: 'baseModelA' },
    type: { default: ['baseModelA', 'baseModelB'] },
    colorlist: {
        default: ['#6381EE', '#FFFFFF'],
    },
    roughness: { default: 0.5 },
    metalness: { default: 0.6 },
})

const allModelFinish = ref(false)
const readAllModels = async () => {
    for (const name of props.type) {
        await Resource.getResource('GLTFLoader', `./plugins/floor/models/topoBase/${name}.glb`, `topo-${name}.glb`)
    }
    allModelFinish.value = true
}
readAllModels()

const curModel = ref(null)
const curMaterials = {} as any
watch(
    () => allModelFinish.value,
    (v) => {
        if (v) {
            curModel.value = (Resource.getReactiveItem(`topo-${props.selected}.glb`)() as any).scene.clone()
            cloneMaterials(curModel.value)
        }
    },
    { immediate: true },
)
watch(
    () => props.selected,
    async (newValue) => {
        curModel.value = (Resource.getReactiveItem(`topo-${newValue}.glb`)() as any).scene.clone()
        cloneMaterials(curModel.value)
    },
)

const cloneMaterials = (scene: any) => {
    for (const key in curMaterials) {
        curMaterials[key].dispose()
        delete curMaterials[key]
    }
    // 克隆材质并映射
    scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
            const originalMaterial = child.material
            if (!curMaterials[originalMaterial.uuid]) {
                curMaterials[originalMaterial.uuid] = originalMaterial.clone()
            }
            child.material = curMaterials[originalMaterial.uuid]
        }
    })
    setMaterialsColors(props.colorlist)
    // console.log(curMaterials)
}

const setMaterialsColors = (colorlist: any) => {
    let index = 0
    for (const key in curMaterials) {
        if (curMaterials.hasOwnProperty(key)) {
            curMaterials[key].color.set(colorlist[index])
        }
        index++
    }
}
const setMaterialsProp = (type: string, value: any) => {
    let index = 0
    for (const key in curMaterials) {
        if (curMaterials.hasOwnProperty(key)) {
            curMaterials[key][type] = value
        }
        index++
    }
}

watch(
    () => props.colorlist,
    (colorlist) => {
        setMaterialsColors(colorlist)
    },
    { deep: true },
)
watch(
    () => [props.roughness, props.metalness],
    ([roughness, metalness]) => {
        setMaterialsProp('roughness', roughness)
        setMaterialsProp('metalness', metalness)
    },
    { deep: true },
)
</script>
