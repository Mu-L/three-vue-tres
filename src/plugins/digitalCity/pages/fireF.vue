<!--
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-12-03 15:24:52
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 14:06:08
-->
<template>
    <pagesShow ref="pagesShowRef">
        <template v-slot:ability>
            <fireF :position="[0, 20, 10]" :scale="40" />
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import fireF from '../components/fire/fireF.vue'

const pagesShowRef = ref() as any
watch(
    () => pagesShowRef.value?.contextReady,
    (newVal: any) => {
        if (newVal) {
            pagesShowRef.value.context.context.camera.activeCamera.value.position.set(580, 360, 500)
        }
    }
)
</script>
