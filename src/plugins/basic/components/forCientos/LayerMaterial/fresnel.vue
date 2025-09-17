<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-04-03 14:43:58
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-17 16:57:34
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import { useTresContext } from '@tresjs/core'
import { Fresnel } from './material'
const props = defineProps<{ [key: string]: any }>()
const { extend } = useTresContext()
extend({ Fresnel })
</script>
<template>
	<TresFresnel :args="[props]" :visible="true" />
</template>
