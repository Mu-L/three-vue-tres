<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 15:11:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 17:40:32
-->
<template>
    <TresCanvas v-bind="state" window-size>
        <TresPerspectiveCamera :position="[0, 1, 2]" :fov="45" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresAmbientLight :intensity="2" />

        <Levioso>
            <model />
        </Levioso>

        <Backdrop :floor="1" :segments="20" :position="[-0.1, -0.8, -0.5]" :scale="[4, 2, 2]" receive-shadow>
            <TresMeshPhysicalMaterial color="orange" :roughness="1" receiveShadow />
        </Backdrop>

        <TresDirectionalLight :position="[1, 1, 2]" :intensity="6" cast-shadow ref="tdl" />
    </TresCanvas>
    <setupUI />
    <n-dialog-provider>
        <n-message-provider>
            <leftImg />
        </n-message-provider>
    </n-dialog-provider>
</template>

<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, watchEffect } from 'vue'
import { NMessageProvider, NDialogProvider } from 'naive-ui'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Backdrop, Levioso } from '@tresjs/cientos'
import model from '../components/model.vue'
import setupUI from '../components/setupUI.vue'
import leftImg from '../components/leftImg.vue'

const state = reactive({
    clearColor: '#201919',
    shadows: true,
    alpha: false,

    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
})

const tdl = ref(null as any)
watchEffect(() => {
    if (tdl.value) {
        tdl.value.shadow.mapSize.width = 1024
        tdl.value.shadow.mapSize.height = 1024
        tdl.value.shadow.camera.near = 0.1
        tdl.value.shadow.camera.far = 10
        tdl.value.shadow.camera.left = -1
        tdl.value.shadow.camera.right = 1
        tdl.value.shadow.camera.top = 1
        tdl.value.shadow.camera.bottom = -1
        tdl.value.shadow.bias = -0.0001
    }
})
</script>
