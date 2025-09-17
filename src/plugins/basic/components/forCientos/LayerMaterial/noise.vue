<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-02 21:09:18
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-17 16:57:08
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { Noise } from './material'
const props = defineProps<{ [key: string]: any }>()
const { extend } = useTresContext()
extend({ Noise })
</script>
<template>
	<TresNoise :args="[props]" :visible="true" />
</template>
