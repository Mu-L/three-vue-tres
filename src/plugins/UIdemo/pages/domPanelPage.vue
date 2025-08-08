<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-08 09:47:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-08 13:45:54
-->
<template>
    <TresCanvas clearColor="#222" window-size>
        <TresPerspectiveCamera :position="[3, 3, 8]" />
        <OrbitControls />
        <TresGridHelper />
        <TresMesh :position="[1, 2, 3]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />

            <domPanel v-bind="paneElements" />
        </TresMesh>
    </TresCanvas>
    <n-modal v-model:show="showModal" title="HTML编辑器" preset="dialog" :mask-closable="false" :z-index="99999999" style="width: 900px">
        <n-input v-model:value="htmlContent"
            type="textarea"
            placeholder="在这里输入HTML代码,支持：原子化CSS引擎unocss"
            :autosize="{ minRows: 10, maxRows: 38 }"
        />

        <template #action>
            <n-button @click="onCancel">取消</n-button>
            <n-button type="primary" @click="onConfirm">确认</n-button>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { reactive, ref } from 'vue'
import { NButton, NModal, NInput } from 'naive-ui'
import domPanel from '../components/domPanel.vue'

const paneElements = reactive({
    center: false,
    transform: false,
    sprite: false,
    distanceFactor: 10,
    domContent: `<div class="boxStyle1 pos-relative left-20 top--30 text-white" style="padding: 10px;border-left: 10px solid #336699;background-image: linear-gradient(132deg, #00336680, #00336610);">
	这是正方形 📦
</div>`,
})
const pane = new Pane({
    title: '参数',
    expanded: true,
})
pane.addBinding(paneElements, 'center')
pane.addBinding(paneElements, 'transform')
pane.addBinding(paneElements, 'sprite')
pane.addBinding(paneElements, 'distanceFactor', {
    label: '距离缩放',
    step: 1,
    min: 1,
    max: 50,
})
const showModal = ref(false)
const btn = pane.addButton({
    title: '编辑',
    label: 'dom代码',
})
btn.on('click', () => {
    if (!showModal.value) {
        showModal.value = true
    }
})
const htmlContent = ref(paneElements.domContent)
function onConfirm() {
    paneElements.domContent = htmlContent.value
    showModal.value = false
}
function onCancel() {
    showModal.value = false
}
</script>
