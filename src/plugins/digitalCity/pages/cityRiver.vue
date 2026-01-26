<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-12-11 11:20:54
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-26 18:57:34
-->
<template>
    <pagesShow ref="pagesShowRef" :showAxesHelper="false" :showGridHelper="false" :showBuildings="false"
        :autoRotate="false">
        <template v-slot:ability>
            <Suspense>
                <cityRiver />
            </Suspense>
        </template>
    </pagesShow>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import pagesShow from '../components/pagesShow.vue'
import cityRiver from '../components/cityRiver/index.vue'

const pagesShowRef = shallowRef() as any

watch(
    () => pagesShowRef.value?.contextReady,
    (newVal: any) => {
        if (newVal) {
            pagesShowRef.value.context.context.camera.activeCamera.value.position.set(4.0, 2.15, 3.6)
            pagesShowRef.value?.context.context.controls.value.target.set(0, -1, 0)
        }
    }
)

</script>
