<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-29 09:18:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 10:38:53
-->
<template></template>

<script setup lang="ts">
import { Pane } from 'tweakpane'
import { useMaterialDiyStore } from 'PLS/hunyuan3D/stores/index'
import mConfig from 'PLS/hunyuan3D/common/materialConfig'

const materialDiyStore = useMaterialDiyStore() as any

const paneControl = new Pane({
    title: '参数',
    expanded: true,
})

// 先拿到所有的种类名称
const materialTypes = Object.keys(mConfig)
const options = [] as any
materialTypes.forEach((type) => {
    options.push({ text: type, value: type })
})
paneControl
    .addBlade({
        view: 'list',
        label: '材质类型',
        options: options,
        value: materialTypes[2],
    })
    .on('change', (ev: any) => {
        makeMaterial(ev.value)
    })

let curFolder = null as any
const makeMaterial = (type: string) => {
    const curConfig = (mConfig as any)[type]
    materialDiyStore.curType = type
    materialDiyStore.curState = JSON.parse(JSON.stringify(curConfig.default))

    if (curFolder) {
        curFolder.dispose()
    }
    curFolder = paneControl.addFolder({
        title: '材质属性',
    })
    Object.keys(curConfig.config).forEach((key) => {
        if (curConfig.config[key].com === 'ColorPicker' || curConfig.config[key].com === 'Switch') {
            curFolder.addBinding(materialDiyStore.curState, key, {
                label: curConfig.config[key].name,
            })
        } else if (curConfig.config[key].com === 'Slider') {
            curFolder.addBinding(materialDiyStore.curState, key, {
                label: curConfig.config[key].name,
                min: curConfig.config[key].min,
                max: curConfig.config[key].max,
                step: curConfig.config[key].step,
            })
        }
    })
}
makeMaterial(materialTypes[2])
</script>
