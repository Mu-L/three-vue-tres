// 浏览器版本的 MQTT 封装类
// 依赖：mqtt/dist/mqtt.min
import { EventEmitter } from 'events'
import mqtt from "mqtt"

export class MqttClientWrapper extends EventEmitter {
  constructor(config) {
    super()
    this.config = config
    this.client = null
    this.connected = false
  }

  connect() {
    const {
      host = 'localhost',
      port = 8083, // 默认 WebSocket 端口
      clientId = `tvt-client-${Math.random().toString(16).slice(2, 8)}`,
      username,
      password,
      protocol = 'ws', // ws / wss
      path = '/mqtt'   // 常见路径如 /mqtt
    } = this.config

    const url = `${protocol}://${host}:${port}${path}`

    this.client = mqtt.connect(url, {
      clientId,
      username,
      password,
      reconnectPeriod: 2000,
      clean: true
    })

    this.client.on('connect', () => {
      this.connected = true
      this.emit('connected')
      console.log('[MQTT] Connected to:', url)
    })

    this.client.on('reconnect', () => {
      this.emit('reconnect')
      console.log('[MQTT] Reconnecting...')
    })

    this.client.on('close', () => {
      this.connected = false
      this.emit('close')
      console.warn('[MQTT] Connection closed')
    })

    this.client.on('error', (err) => {
      this.emit('error', err)
      console.error('[MQTT] Error:', err)
    })

    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString())
        this.emit('message', topic, data)
        this.emit(`message:${topic}`, data)
      } catch (e) {
        console.error('[MQTT] JSON Parse Error:', e)
      }
    })
  }

  subscribe(topic) {
    if (!this.client || !this.connected) return
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('[MQTT] Subscribe Error:', err)
      } else {
        console.log(`[MQTT] Subscribed to ${topic}`)
        this.emit('subscribed', topic)
      }
    })
  }

  publish(topic, payload) {
    if (!this.client || !this.connected) return
    try {
      const message = JSON.stringify(payload)
      this.client.publish(topic, message)
    } catch (err) {
      console.error('[MQTT] Publish Error:', err)
    }
  }

  unsubscribe(topic) {
    if (!this.client || !this.connected) return
    this.client.unsubscribe(topic, (err) => {
      if (err) {
        console.error('[MQTT] Unsubscribe Error:', err)
      } else {
        console.log(`[MQTT] Unsubscribed from ${topic}`)
      }
    })
  }

  disconnect() {
    if (this.client) {
      this.client.end()
      this.connected = false
      this.emit('disconnected')
      console.log('[MQTT] Disconnected')
    }
  }
}
