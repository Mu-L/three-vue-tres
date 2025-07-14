<template>
    <div class="w-100 absolute z-99999 mqttdebugger" style="background-color: #aaaaaa; margin-top: 40px">
        <n-card title="MQTT 调试面板">
            <n-divider style="margin-top: -10px">mqtt配置信息</n-divider>
            <n-input :value="JSON.stringify(config, null, 2)" type="textarea" :rows="9" disabled />
            <n-divider>连接状态</n-divider>
            <n-form-item label="mqtt代理通路">
                <n-switch :value="connected">
                    <template #checked> 已连接 </template>
                    <template #unchecked> 连接中 </template>
                </n-switch>
            </n-form-item>
            <n-form-item label="订阅主题">
                <n-input :value="config.topic" disabled />
            </n-form-item>
            <n-divider>信息日志列表</n-divider>
            <n-log :log="messages.join('\n')" :rows="12" />
            <n-divider>通过mqtt交互状态</n-divider>
            开关电风扇 : <n-switch :loading="eFanStateLoading" :round="false" v-model:value="eFanState" @update:value="handleChange" />
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, watch, inject } from 'vue'
import { useMessage, NCard, NInput, NLog, NFormItem, NDivider, NSwitch } from 'naive-ui'
import { MqttClientWrapper } from '../lib/mqttTvt'

const globeMessage = useMessage()

const eFanState = ref(false) // 电风扇状态
const eFanStateLoading = ref(false)

const config = {
    host: 'oc276716.ala.asia-southeast1.emqxsl.com',
    port: 8084,
    protocol: 'wss',
    clientId: `tvt-test-client-${Math.random().toString(16).slice(2, 8)}`,
    username: 'tvt.js',
    password: 'test',
    topic: 'tvtDevices/#',
}
const mqtt = ref(null) as any
const connected = ref(false)
const messages = ref([]) as any

function initMqttClient() {
    if (mqtt.value) {
        cleanupOldClient()
    }

    mqtt.value = new MqttClientWrapper(config)
    mqtt.value.on('connected', () => {
        connected.value = true
        console.log('MQTT 连接成功')
        handleSubscribe()
    })
    mqtt.value.on('close', () => {
        connected.value = false
        console.log('MQTT 连接关闭')
    })
    mqtt.value.on('error', (err: Error) => {
        console.error(`MQTT 错误: ${err.message}`)
    })
    mqtt.value.on('message', (topic: string, data: any) => {
        messages.value.push(`[${topic}] ${JSON.stringify(data)}`)
        if (messages.value.length > 100) messages.value.shift()

        if (!eFanStateLoading.value && data && data.status) {
            eFanState.value = data.status === '运行'
        }
        if (data && data.detail) {
            globeMessage.info('mqtt[' + data.deviceId + '] 设备详情：' + data.detail + '程序已运行：' + data.uptime, {
                keepAliveOnHover: true,
                duration: 18000,
            })
        }
    })
    mqtt.value.connect()
}

function handleSubscribe() {
    if (!mqtt.value) {
        return
    }
    mqtt.value.subscribe(config.topic, (err: Error) => {
        if (err) {
            console.error(`订阅失败: ${err.message}`)
        } else {
            console.log(`已订阅主题: ${config.topic}`)
        }
    })
}

function cleanupOldClient() {
    if (mqtt.value) {
        mqtt.value.removeAllListeners()
        mqtt.value.disconnect()
        mqtt.value = null
        connected.value = false
    }
}
onMounted(() => {
    initMqttClient()
})
const subscribedTopic = null
function handleDisconnect() {
    if (mqtt.value && subscribedTopic) {
        mqtt.value.unsubscribe(subscribedTopic)
    }
    cleanupOldClient()
}
onUnmounted(() => {
    handleDisconnect()
})

let localChangeTimeout: any = null
function handleChange(value: boolean) {
    eFanStateLoading.value = true
    const payload = {
        deviceId: 'tvtDevice001',
        status: value ? '运行' : '关闭',
    }
    mqtt.value.publish('tvtDevices/tvtDevice001/control', payload)
    // 1秒内不接受 MQTT 的反向控制，避免冲突
    clearTimeout(localChangeTimeout)
    localChangeTimeout = setTimeout(() => {
        eFanStateLoading.value = false
    }, 1000)
}
const animationPlay = inject('animationPlay') as any
watch(
    () => eFanState.value,
    (play) => {
        animationPlay.value = play
    },
    { immediate: true },
)
</script>
<style lang="less">
.mqttdebugger {
    textarea,
    input {
        color: black !important;
    }
}
</style>
