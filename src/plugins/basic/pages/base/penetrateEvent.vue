<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-05 08:42:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-23 16:15:34
-->
<script lang="ts" setup>
import { OrbitControls, Html } from '@tresjs/cientos'
import { Pane } from 'tweakpane'
import { FMessage } from '@fesjs/fes-design'

const log = (text: string) => {
    console.log(text)
    FMessage.info(text)
}

const boxOneBlocksPointerEvents = { value: true }
const pane = new Pane({
    title: '阻止冒泡',
    expanded: true,
})
pane.addBinding(boxOneBlocksPointerEvents, 'value', { label: '阻止冒泡' })
</script>

<template>
    <TresCanvas window-size>
        <TresPerspectiveCamera :look-at="[0, 4, 0]" />
        <TresGroup @click="log('点击了 外包围 Group')">
            <TresMesh
                :position="[-2, 0, -2]"
                name="box 2"
                @click="
                    (event) => {
                        log('点击了 Big Box 📦')
                        if (boxOneBlocksPointerEvents.value) {
                            event.stopPropagation()
                        }
                    }
                "
            >
                <TresBoxGeometry :args="[2, 2, 2]" />
                <TresMeshNormalMaterial transparent :opacity="1" />
                <Html :center="true" transform>
                    <h1 class="bg-white text-xs p-0.5 rounded -mt-15">Big Box 📦</h1>
                </Html>
            </TresMesh>
        </TresGroup>

        <OrbitControls />
        <TresGridHelper />
        <TresAmbientLight :intensity="1" />
    </TresCanvas>
</template>
