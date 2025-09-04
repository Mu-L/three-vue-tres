<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-04 15:06:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-04 16:15:25
-->
<template>
    <TresCanvas window-size clear-color="#ffffff">
        <TresPerspectiveCamera :position="[10, 10, 10]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[15, 15, 15]" :intensity="1" />
    </TresCanvas>
    <goViewCom :dataJson="gvConfig.dataJson" v-bind="gvConfig" v-if="showChild" />
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { goViewCom } from 'PLS/goView'
import { onMounted, reactive, ref, nextTick } from 'vue'

// v-bind="gvConfig"
// import dataJson from '../common/1716877101106.json'
// import dataJson from '../common/test.json'
import dataJson from '../common/vChart.json'

const gvConfig = reactive({
    dataJson: dataJson,
    maskWidth: 600,
    maskRightWidth: 600,
    maskHeight: 100,
    maskColor: '#143675',
})

const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = '.json'
fileInput.style.display = 'none' // 隐藏，不影响 UI
document.body.appendChild(fileInput)
const showChild = ref(true)
const paneAll = new Pane()
const paneControl = paneAll.addFolder({
  title: '收起go-view设置',
});
const inputB = paneControl.addButton({
    title: '导入goview配置',
    label: 'srcJson',
})
inputB.on('click', () => {
    if (fileInput) {
        fileInput.accept = '.json'
        fileInput.value = ''
        fileInput.click()
    }
})
paneControl.addBinding(gvConfig, 'maskColor', { label: '蒙版底色' })
paneControl.addBinding(gvConfig, 'maskWidth', {
    label: '蒙版宽度',
    min: 0,
    max: 800,
    step: 10,
})
paneControl.addBinding(gvConfig, 'maskRightWidth', {
    label: '蒙版宽度右',
    min: 0,
    max: 800,
    step: 10,
})
paneControl.addBinding(gvConfig, 'maskHeight', {
    label: '蒙版顶部高',
    min: 0,
    max: 800,
    step: 10,
})

onMounted(() => {
    fileInput.onchange = (event: any) => {
        const file = event.target.files[0]
        if (fileInput.accept === '.json') {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                const contents = e.target.result
                gvConfig.dataJson = JSON.parse(contents)
                showChild.value = false
                nextTick(() => (showChild.value = true))
            }
            reader.readAsText(file)
        }
    }
})
</script>
