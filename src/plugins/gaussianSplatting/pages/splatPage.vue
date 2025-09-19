<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-16 08:31:33
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-19 12:50:52
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[3, 3, 3]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 0, 0]" />
        <OrbitControls />
        <TresAmbientLight :intensity="3" />

        <Suspense>
            <splat v-bind="splatConfig" :position="[0, 0.7, 0]" :rotate-x="-Math.PI" />
        </Suspense>

        <TresDirectionalLight :position="[6, 2, 4]" :intensity="2" />

        <TresGridHelper />
    </TresCanvas>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, onMounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import splat from '../components/splat.vue'
import { Pane } from 'tweakpane'

const state = reactive({
    clearColor: '#ffffff',
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const splatConfig = reactive({
    url: './plugins/gaussianSplatting/model/luigi.splat',
})
const pane = new Pane({
    title: '参数',
    expanded: true,
})
const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = '.splat'
fileInput.style.display = 'none'
document.body.appendChild(fileInput)
const inputB = pane.addButton({
    title: '替换splat文件',
    label: '500MB以内',
})
inputB.on('click', () => {
    if (fileInput) {
        fileInput.value = ''
        fileInput.click()
    }
})

onMounted(() => {
    fileInput.onchange = (event: any) => {
        const file = event.target.files[0]
        if (!file) return
        if (file.size > 500 * 1024 * 1024) {
            alert('文件大小不能超过500MB')
            return
        }
        const url = URL.createObjectURL(file)
        splatConfig.url = url
    }
})
</script>
