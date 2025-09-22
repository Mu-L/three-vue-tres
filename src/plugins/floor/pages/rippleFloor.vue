<template>
    <TresCanvas clearColor="#282828" window-size>
        <TresPerspectiveCamera :position="[0, 50, 150]" :fov="50" :near="0.1" :far="2000" />
        <OrbitControls 
            enableDamping 
            :damping-factor="0.05"
            :min-distance="20"
            :max-distance="500"
            :max-polar-angle="Math.PI / 2.1"
        />
        
        <!-- 光照 -->
        <TresAmbientLight :intensity="0.8" />
        <TresDirectionalLight :position="[10, 20, 5]" :intensity="0.5" />
        
        <!-- 飞线网格地板 -->
        <Suspense>
            <rippleFloor v-bind="floorState" :scale="20" />
        </Suspense>
        
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onUnmounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import rippleFloor from 'PLS/floor/components/rippleFloor.vue'
import { Pane } from 'tweakpane'

const floorState = reactive({
    flySpeed: 3.0,
    flyIntensity: 0.3,
    dotSize: 0.03,
    lineColor: '#66f5ff',
    floorColor1: '#4c6480',
    floorColor2: '#acb4c0',
    gridSize: 50.0,
    lineWidth: 0.02,
    paused: false
})
const paneControl = new Pane({
    title: '飞线效果控制',
    expanded: true,
})

// 飞线参数文件夹
const flyFolder = paneControl.addFolder({
    title: '飞线参数',
    expanded: true
})

flyFolder.addBinding(floorState, 'flySpeed', { 
    label: '飞线速度',
    min: 0,
    max: 10,
    step: 0.1
})

flyFolder.addBinding(floorState, 'flyIntensity', { 
    label: '飞线强度',
    min: 0,
    max: 1,
    step: 0.05
})

flyFolder.addBinding(floorState, 'dotSize', { 
    label: '节点大小',
    min: 0.01,
    max: 0.08,
    step: 0.005
})

flyFolder.addBinding(floorState, 'paused', { 
    label: '暂停'
})

// 颜色参数文件夹
const colorFolder = paneControl.addFolder({
    title: '颜色设置',
    expanded: true
})

colorFolder.addBinding(floorState, 'lineColor', { 
    label: '飞线颜色',
    view: 'color'
})

colorFolder.addBinding(floorState, 'floorColor1', { 
    label: '地板颜色1',
    view: 'color'
})

colorFolder.addBinding(floorState, 'floorColor2', { 
    label: '地板颜色2',
    view: 'color'
})

// 网格参数文件夹
const gridFolder = paneControl.addFolder({
    title: '网格设置',
    expanded: true
})

gridFolder.addBinding(floorState, 'gridSize', { 
    label: '网格大小',
    min: 10,
    max: 100,
    step: 1
})

gridFolder.addBinding(floorState, 'lineWidth', { 
    label: '线条宽度',
    min: 0.01,
    max: 0.1,
    step: 0.001
})

// 清理Pane资源
onUnmounted(() => {
    paneControl.dispose()
})
</script>
