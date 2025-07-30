<template>
    <div v-if="uploading" class="upload-mask">
        <div class="upload-mask-content">
            <n-spin size="large" />
            <div class="upload-text">模型生成中，请稍候...</div>
        </div>
    </div>
    <div class="image-uploader-panel">
        <n-card
            title="参考图片生产3D"
            size="small"
            class="panel-card"
            :header-style="{
                textAlign: 'center',
            }"
            :style="{
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #444',
            }"
        >
            <div style="margin-bottom: 6px; padding-bottom: 6px; border-bottom: 2px solid #5f5f5f; word-break: break-all">
                <span>混元3D服务：</span><br />
                <span>{{ urlConfig ? urlConfig : '未配置' }}</span>
                <n-space justify="end">
                    <n-button type="primary" size="tiny" @click="setupConfig"> 设置 </n-button>
                    <n-button type="info" size="tiny" style="margin-right: 6px" @click="gotourl"> 说明 </n-button>
                </n-space>
            </div>
            <div v-if="!uploading && !uploaded">
                <n-upload :default-upload="false" :show-file-list="false" accept="image/*" @change="handleFileChange">
                    <n-button type="primary" size="small">选择图片</n-button>
                </n-upload>
            </div>

            <div v-if="selectedFile && !uploaded">
                <n-image :src="previewUrl" width="100" height="100" object-fit="cover" style="margin-top: 10px" />
                <div style="margin-top: 10px">
                    <n-button type="success" size="small" :loading="uploading" @click="submitImage"> 提交 </n-button>
                </div>
            </div>

            <div v-if="uploaded">
              <span>参考图片：</span><br />
                <n-image :src="previewUrl" width="100" height="100" object-fit="cover" style="margin-top: 10px" />
                <n-space>
                <div style="margin-top: 10px">
                    <n-button type="info" size="small" @click="removeImage">重新生产</n-button>
                </div>
                <div style="margin-left: 30px; margin-top: 10px">
                    <n-button type="success" size="small" @click="downloadModel">下载模型</n-button>
                </div>
                </n-space>
            </div>
        </n-card>
    </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { NCard, NButton, NUpload, useDialog, useMessage, NImage, NSpin, NSpace, NInput, NAlert } from 'naive-ui'
import { useMaterialDiyStore } from 'PLS/hunyuan3D/stores/index'
import { loadArrayBufferFromRelativePath } from 'PLS/hunyuan3D/common/util'
import { download } from 'naive-ui/es/_utils'

const materialDiyStore = useMaterialDiyStore()
materialDiyStore.curModelArrayBuffer = await loadArrayBufferFromRelativePath('./plugins/hunyuan3D/model/icegl-bm.glb') // icegl-bm

const message = useMessage()

const selectedFile = ref(null)
const previewUrl = ref('https://cdn.index.icegl.cn/uploads/20221122/9ed6756107c4e0c031ae26d54cb46c0d.png')
const uploaded = ref(true)
const uploading = ref(false)
const dialog = useDialog()
const urlConfig = ref('http://localhost:8081/generate')

function handleFileChange({ file }) {
    selectedFile.value = file.file
    previewUrl.value = URL.createObjectURL(file.file)
}
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const base64 = reader.result.split(',')[1] // 去掉前缀 data:image/png;base64,
            resolve(base64)
        }
        reader.onerror = reject
    })
}
async function submitImage() {
    if (!selectedFile.value) return

    uploading.value = true

    try {
        const base64 = await toBase64(selectedFile.value)

        const requestData = {
            image: base64,
        }

        const response = await fetch(urlConfig.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })

        materialDiyStore.curModelArrayBuffer = await response.arrayBuffer()

        // 👉 这里你可以使用 Blob 预览或下载
        // const blob = new Blob([arrayBuffer], { type: 'model/gltf-binary' })
        // const blobUrl = URL.createObjectURL(blob)
        // const a = document.createElement('a')
        // a.href = blobUrl
        // a.download = 'generated-model.glb'
        // a.click()
        // URL.revokeObjectURL(blobUrl)

        uploaded.value = true
        message.success('传递接口成功，模型已生成')
    } catch (error) {
        console.error(error)
        message.error('传递接口失败')
    } finally {
        uploading.value = false
    }
}

function downloadModel() {
    if (!materialDiyStore.curModelArrayBuffer) {
        message.error('没有可下载的模型')
        return
    }

    const blob = new Blob([materialDiyStore.curModelArrayBuffer], { type: 'model/gltf-binary' })
    const blobUrl = URL.createObjectURL(blob)
    download(blobUrl, 'generated-model.glb')
    URL.revokeObjectURL(blobUrl)
}

function removeImage() {
    selectedFile.value = null
    previewUrl.value = ''
  uploaded.value = false
    materialDiyStore.curModelArrayBuffer = null
}
const setupConfig = () => {
    const error = ref('')
    const tempurl = ref(urlConfig.value)
    dialog.create({
        title: '请输入混元3D服务地址:',
        content: () =>
            h('div', {}, [
                h(NInput, {
                    value: tempurl.value,
                    placeholder: "服务说明详见'说明'按钮",
                    onInput: (val) => {
                        tempurl.value = val
                        error.value = ''
                    },
                }),
                error.value &&
                    h(
                        NAlert,
                        {
                            type: 'error',
                            style: 'margin-top: 8px',
                        },
                        {
                            default: () => error.value,
                        },
                    ),
            ]),
        positiveText: '确认',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: () => {
            if (!tempurl.value.trim()) {
                error.value = '配置不能为空'
                return false
            }
            urlConfig.value = tempurl.value.trim()
            return true
        },
    })
}
const gotourl = () => {
    window.open('https://icegl.cn/ask/article/22765.html', '_blank')
}
</script>
<style lang="scss">
.image-uploader-panel {
    .n-card > .n-card-header .n-card-header__main {
        color: #fff !important;
    }
}
</style>
<style scoped lang="scss">
.image-uploader-panel {
    position: fixed;
    top: 50px;
    left: 20px;
    z-index: 9999;
}

.panel-card {
    width: 280px;
    padding: 10px;
}
.upload-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
}

.upload-mask-content {
    text-align: center;
    color: white;
    font-size: 16px;
}

.upload-text {
    margin-top: 12px;
}
</style>
