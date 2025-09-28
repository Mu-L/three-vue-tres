<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-05 09:49:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 11:25:29
-->
<template>
    <TresCanvas clearColor="#000000" window-size>
        <TresPerspectiveCamera :position="[2, 2, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping />

        <hexagonalWall v-bind="rtState" />

        <reflectorDUDV v-bind="configState" />

    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Pane } from 'tweakpane'
import { OrbitControls } from '@tresjs/cientos'
import { hexagonalWall } from 'PLS/floor'
import reflectorDUDV from 'PLS/floor/components/reflectorDUDV.vue'
const rtState = reactive({
    color: '#7432B4',

})
const paneControl = new Pane({
    expanded: true,
})
const configState = {
    reflectivity: 1.0,
    showGridHelper: false,
    scale: 2,
    renderMode: 'manual'
}
paneControl.addBinding(rtState, 'color', { label: '颜色' })

</script>
