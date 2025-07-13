<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-09 16:11:43
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-09 16:46:35
-->
<script setup>
import { NMessageProvider } from 'naive-ui'
import MqttTester from '../components/MqttTesterUI.vue'
</script>

<template>
  <n-message-provider>
    <mqtt-tester />
  </n-message-provider>
</template>