<template>
    <div class="w-full" style="background-color: #ffffff">
        <n-card title="MQTT 调试面板" class="max-w-4xl mx-auto">
            <n-form :model="form" label-width="100">
                <n-form-item label="地址">
                    <n-input v-model:value="form.host" placeholder="例如: broker.hivemq.com" />
                </n-form-item>
                <n-form-item label="端口">
                    <n-input-number v-model:value="form.port" :min="1" /><n-tag :style="{'margin-left': '10px'}" type="info">浏览器端只支持：wws方式 的 mqtt</n-tag>
                </n-form-item>
                <n-form-item label="Client ID">
                    <n-input v-model:value="form.clientId" placeholder="随机生成也可" />
                </n-form-item>
                <n-form-item label="用户名">
                    <n-input v-model:value="form.username" />
                </n-form-item>
                <n-form-item label="密码">
                    <n-input v-model:value="form.password" />
                </n-form-item>
                <n-form-item label="订阅主题">
                    <n-input v-model:value="form.topic" placeholder="例如: tvt/demo" />
                </n-form-item>

                <n-space>
                    <n-button type="primary" :disabled="connected || isConnecting" :loading="isConnecting" @click="handleConnect">连接</n-button>
                    <n-button type="warning" :disabled="!connected" @click="handleDisconnect">断开</n-button>
                    <n-button type="success" :disabled="!connected" @click="handleSubscribe">订阅</n-button>
                </n-space>
            </n-form>
            <n-divider>已订阅主题</n-divider>
            <n-space>
                <n-tag v-for="topic in Array.from(subscribedTopics)" :key="topic" type="info" round>
                    {{ topic }}
                </n-tag>
            </n-space>
            <n-divider>发送消息 [主题/json消息]</n-divider>
            <n-input v-model:value="sendTopic" placeholder="主题" class="mb-2" />
            <n-input v-model:value="sendMessage" type="textarea" placeholder="{ &quot;key&quot;: &quot;value&quot; }" :rows="4" />
            <n-button type="info" class="mt-2" :disabled="!connected" @click="handlePublish">发送</n-button>

            <n-divider>收到的消息</n-divider>
            <n-log :log="messages.join('\n')" :rows="12" />
        </n-card>
    </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useMessage, NCard, NInput, NDivider, NButton, NSpace, NFormItem, NInputNumber, NForm, NLog, NTag } from 'naive-ui'
import { MqttClientWrapper } from '../lib/mqttTvt'

const message = useMessage()

const form = reactive({
    host: 'oc276716.ala.asia-southeast1.emqxsl.com',
    port: 8084,
    protocol: 'wss',
    clientId: `tvt-test-client-${Math.random().toString(16).slice(2, 8)}`,
    username: 'tvt.js',
    password: 'test',
    topic: 'tvtDevices/#',
})

const sendTopic = ref('tvtDevices/uiDemo')
const sendMessage = ref('{ "hello": "world" }')

const mqtt = ref(null)
const connected = ref(false)
const messages = ref([])
const isConnecting = ref(false)

function cleanupOldClient() {
    if (mqtt.value) {
        mqtt.value.removeAllListeners()
        mqtt.value.disconnect()
        mqtt.value = null
        connected.value = false
    }
}
function handleConnect() {
    cleanupOldClient()

    isConnecting.value = true // ⏳ 设置连接中

    mqtt.value = new MqttClientWrapper(form)
    mqtt.value.on('connected', () => {
        connected.value = true
        isConnecting.value = false
        message.success('MQTT 连接成功')
    })
    mqtt.value.on('close', () => {
        connected.value = false
        isConnecting.value = false
        message.warning('MQTT 连接关闭')
    })
    mqtt.value.on('error', (err) => {
        isConnecting.value = false
        console.error(err)
        message.error(`MQTT 错误: ${err.message}`)
    })
    mqtt.value.on('message', (topic, data) => {
        messages.value.push(`[${topic}] ${JSON.stringify(data)}`)
        if (messages.value.length > 100) messages.value.shift()
    })
    mqtt.value.connect()
}

const subscribedTopics = ref(new Set())
function handleDisconnect() {
    if (mqtt.value) {
        for (const topic of subscribedTopics.value) {
            mqtt.value.unsubscribe(topic)
        }
    }

    subscribedTopics.value.clear()
    cleanupOldClient()
    message.success('已断开连接')
}

function handleSubscribe() {
    if (!mqtt.value || !connected.value) {
        message.warning('尚未连接 MQTT')
        return
    }

    const topic = form.topic?.trim()
    if (!topic) {
        message.warning('请输入订阅主题')
        return
    }

    if (subscribedTopics.value.has(topic)) {
        message.info(`已订阅该主题：${topic}`)
        return
    }

    mqtt.value.subscribe(topic)
    subscribedTopics.value.add(topic)
    message.success(`订阅成功：${topic}`)
}

function handlePublish() {
    try {
        const payload = JSON.parse(sendMessage.value)
        mqtt.value.publish(sendTopic.value, payload)
        message.info('已发送消息')
    } catch (e) {
        message.error('JSON 格式错误')
    }
}

onUnmounted(() => {
    handleDisconnect()
})
</script>

<style scoped>
.max-w-4xl {
    max-width: 64rem;
}
</style>
