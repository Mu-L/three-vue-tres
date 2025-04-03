<template>
    <TresCanvas clearColor="#000" :windowSize="!qiankunWindow.__POWERED_BY_QIANKUN__" :style="{ height }">
        <TresPerspectiveCamera :position="[6, 3, 0]" :fov="45" :near="0.1" :far="10000" />
        <OrbitControls enableDamping autoRotate />

        <yuriBrainModel v-bind="yuriBrainConfig" />

        <Suspense>
            <reflectorDUDV :position="[0, -1.36, 0]" v-bind="reflectorState" />
        </Suspense>
    </TresCanvas>
    <h1 v-if="!qiankunWindow.__POWERED_BY_QIANKUN__" class="text-center text-white w-full absolute">请通过qiankun主程序访问此页面</h1>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { reflectorDUDV } from 'PLS/floor'
import yuriBrainModel from 'PLS/medical/components/yuriBrain/index.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const reflectorState = reactive({
    reflectivity: 0.8,
    showGridHelper: false,
    scale: 1,
})

const yuriBrainConfig = reactive({
    tubesColor: '#59b5ff',
    particlesColor: '#97ffcc',
    speed: 1,
})
const height = ref('auto')
onMounted(() => {
    const parentElement = document.querySelector('.app-main')
    if (parentElement) {
        height.value = `${parentElement.clientHeight}px`
    }
})
</script>
