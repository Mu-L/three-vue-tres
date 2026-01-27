<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-22 15:52:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-27 11:15:21
-->

<template>
    <pagesShow>
        <template v-slot:ability>
            <Suspense>
                <fireC :position="[10, 30, 0]" :scale="100" v-bind="fireConfig" />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import { fireC } from 'PLS/digitalCity'
import { Pane } from 'tweakpane'
import { reactive } from 'vue'

const fireConfig = reactive({
    color: '#ffaa33',
})
const paneControl = new Pane()
paneControl.addBinding(fireConfig, 'color', {
    label: 'firecolor',
})
</script>
