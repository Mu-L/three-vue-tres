<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-08 09:47:05
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-08-15 09:42:22
-->
<template>
    <TresCanvas clearColor="#222" window-size>
        <TresPerspectiveCamera :position="[2, 10, 16]" />
        <OrbitControls />
        <TresGridHelper />
        <TresMesh :position="[1, 2, 3]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />

            <domPanel v-bind="paneElements" />
        </TresMesh>
    </TresCanvas>
    <n-modal v-model:show="showModal" title="HTML编辑器" preset="dialog" :mask-closable="false" :z-index="99999999"
        style="width: 900px">
        <n-input v-model:value="htmlContent" type="textarea" placeholder="在这里输入HTML代码"
            :autosize="{ minRows: 10, maxRows: 38 }" />

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
    transform: true,
    sprite: false,
    distanceFactor: 3,
    domContent: `
    <div class="illustrate2">
  <div class="cStyle1"></div>
  <div class="parallelogram">
    <span>🪃 飞机机翼</span>
    <div class="contentDiv">改善飞行的稳定性和操纵性</div>
  </div>
</div>

<style>
.illustrate2 {
position: relative;
left: 80px;
top: -50px
}
.illustrate2 .cStyle1 {
  width: 15px;
  height: 15px;
  background-color: transparent;
  border-radius: 50%;
  border: 5px solid white;
  position: relative;
  color: white;
}

/* 添加斜线效果 */
.illustrate2 .cStyle1::before {
  content: '';
  position: relative;
  top: -155px;
  left: -446px;
  width: 500px;
  height: 6px;
  display: block;
  transform: rotate(218deg);
  background-color: white;
}

.illustrate2 .parallelogram {
  width: 360px;
  height: 30px;
  color: white;
  position: relative;
  top: -329px;
  left: -760px;
  text-align: right;
  font-size: 38px;
}

.illustrate2 .parallelogram span {
  position: relative;
  right: 18px;
  top: -30px;
  font-weight: bolder;
  /* 可选描边效果
  -webkit-text-stroke: 1px #424242;
  text-stroke: 1px #424242;
  */
}

.illustrate2 .parallelogram .contentDiv {
  text-align: left;
  font-size: 26px;
  display: block;
  margin-top: -19px;
}

/* 利用伪元素before创建平行四边形 */
.illustrate2 .parallelogram::before {
  content: '';
  transform: skew(-45deg);
  background: linear-gradient(45deg, #5a65fc, #ff00f6);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

    `,
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
    step: 0.1,
    min: 0.1,
    max: 10,
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
