<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-07 09:05:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 15:16:18
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <fencePlus v-bind="typeState" :position-y="23" :scale="2" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { Pane } from 'tweakpane'
import pagesShow from '../components/pagesShow.vue'
import fencePlus from '../components/fence/fencePlus.vue'

const pagesShowRef = ref() as any
watch(
    () => pagesShowRef.value?.contextReady,
    (newVal: any) => {
        if (newVal) {
            pagesShowRef.value.context.context.camera.activeCamera.value.position.set(880, 660, 800)
        }
    }
)
const typeState = reactive({
    width: 100,
    height: 100,
    depth: 100,
    color: '#00ffdd',
    opacity: 1.0,
    num: 6,
    thickness: 0.01,
    speed: 0.2,
    room: 0.7,
})
const paneControl = new Pane({
    title: '围墙高级效果',
    expanded: true,
})
paneControl.addBinding(typeState, 'width', {
    label: '宽',
    min: 10,
    max: 200,
    step: 1,
})
paneControl.addBinding(typeState, 'depth', {
    label: '长',
    min: 10,
    max: 200,
    step: 1,
})
paneControl.addBinding(typeState, 'height', {
    label: '高',
    min: 10,
    max: 200,
    step: 1,
})
paneControl.addBinding(typeState, 'color', { label: '颜色' })
paneControl.addBinding(typeState, 'opacity', {
    label: '透明度',
    min: 0,
    max: 1,
    step: 0.1,
})
paneControl.addBinding(typeState, 'speed', {
    label: '滚动速度',
    min: -1,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(typeState, 'thickness', {
    label: '粗细',
    min: 0.01,
    max: 1,
    step: 0.01,
})
paneControl.addBinding(typeState, 'num', {
    label: '条纹数',
    min: 0,
    max: 20,
    step: 1,
})
paneControl.addBinding(typeState, 'room', {
    label: '条纹空间占比',
    min: 0,
    max: 1,
    step: 0.01,
})
</script>
