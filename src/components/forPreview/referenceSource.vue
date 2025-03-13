<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-01-29 19:30:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-13 11:59:31
-->
<template>
    <FButton
        v-if="referenceSourceConfig && detectDeviceType() !== 'Mobile'"
        type="info"
        class="absolute"
        size="small"
        style="left: 10px; bottom: 10px"
        @click="jump"
    >
        <template #icon> <StarOutlined /> </template>参考出处 ：{{ referenceSourceConfig.title }}
    </FButton>
</template>
<script setup lang="ts">
import { StarOutlined } from '@fesjs/fes-design/icon'
import { FButton } from '@fesjs/fes-design'
import { detectDeviceType } from '../../common/utils'

const props = withDefaults(
    defineProps<{
        referenceSourceConfig: any
    }>(),
    {},
)

const jump = () => {
    window.open(props.referenceSourceConfig.url)
}
</script>
