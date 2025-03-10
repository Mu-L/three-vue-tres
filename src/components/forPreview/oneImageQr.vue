<template>
    <div v-if="hasPreview">
        <FTooltip mode="popover" :offset="-208" placement="bottom" :getContainer="getContainer">
            <FImage class="w-full max-h-70 h-14em" style="cursor: pointer" fit="contain" :src="publicPath + onePreview.src" lazy />
            <template #content>
                <div style="width: 280px; height: 180px; display: flex; justify-content: center; align-items: center">
                    <div class="one-item-qrcode">
                        <FImage :src="urlMobile" @error="errH5Img">
                            <template #placeholder>
                                <div class="image-slot">
                                    <div class="image-slot">生成中<span class="dot">...</span></div>
                                </div>
                            </template>
                        </FImage>
                        <span>H5移动端</span>
                    </div>
                    <div class="one-item-qrcode" style="border-left: 2px #a2a2a2 dashed">
                        <span>微信小程序</span>
                        <FImage :src="urlmini" @error="errMiNiImg">
                            <template #placeholder>
                                <div class="image-slot">
                                    <div class="image-slot">生成中<span class="dot">...</span></div>
                                </div>
                            </template>
                        </FImage>
                    </div>
                </div>
            </template>
        </FTooltip>
    </div>
    <div v-else>
        <FImage class="w-full max-h-70 h-14em" style="cursor: pointer" fit="contain" :src="publicPath + onePreview.src" lazy />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { FImage, FTooltip } from '@fesjs/fes-design'

const props = defineProps({
    onePreview: {
        default: {
            src: '',
            type: '',
            name: '',
            url: '',
        },
    },
    onePlugin: {
        default: {},
    } as any,
})

const publicPath = process.env.BASE_URL

// console.log(props.onePreview)
// console.log(props.onePlugin)

let hasPreview = true
let comUrl = 'https://opensource.icegl.cn/#/plugins/'
let imgName = ''
if (props.onePreview.url) {
    comUrl = props.onePreview.url
    imgName = encodeURIComponent(comUrl.slice(-16))
    if (props.onePreview.url.startsWith('https://www.icegl.cn/tvtstore/') || props.onePreview.url.startsWith('https://www.bilibili.com/')) {
        hasPreview = false
    }
} else {
    if (props.onePlugin.pNode) {
        comUrl += props.onePlugin.pNode + '/'
    }
    comUrl += props.onePlugin.name + '/'
    comUrl += props.onePreview.name + '/'
    imgName = encodeURIComponent((props.onePlugin.name + props.onePreview.name).slice(-16))
}
comUrl = encodeURIComponent(comUrl)
let miniPre = `https://www.icegl.cn/addons/tvt/mini/onePreview?urlPath=${comUrl}`
miniPre = encodeURIComponent(miniPre)
const urlMobile = ref('https://www.icegl.cn/uploads/qrcode/b-' + imgName + '.png')
const urlmini = ref('https://www.icegl.cn/uploads/qrcode/m-' + imgName + '.png')
// const urlMobile = ref(
//     `https://icegl.cn/addons/qrcode/index/show?text=${comUrl}&logo=1&labelalignment=center&foreground=%23333333&background=%23ffffff&size=180&padding=1&logosize=30&errorcorrection=quartile`,
// )
// const urlmini = ref(
//     `https://icegl.cn/addons/qrcode/index/show?text=${miniPre}&logo=1&labelalignment=center&foreground=%2300367b&background=%23ffffff&size=160&padding=1&logosize=30&errorcorrection=quartile`,
// )
const errH5Img = (e: any) => {
    fetch(
        `https://icegl.cn/addons/qrcode/index/show?text=${comUrl}&logo=1&labelalignment=center&foreground=%23333333&background=%23ffffff&size=180&padding=1&logosize=30&errorcorrection=quartile&imgName=b-${imgName}`,
    ).then((response) => {
        response
            .text()
					.then((data) => {
                urlMobile.value = data
            })
            .catch((error) => {
                console.error('Error fetching volume data:', error)
            })
    })
}
const errMiNiImg = (e: any) => {
    fetch(
        `https://icegl.cn/addons/qrcode/index/show?text=${miniPre}&logo=1&labelalignment=center&foreground=%2300367b&background=%23ffffff&size=160&padding=1&logosize=30&errorcorrection=quartile&imgName=m-${imgName}`,
    ).then((response) => {
        response
            .text()
            .then((data) => {
                urlmini.value = data
            })
            .catch((error) => {
                console.error('Error fetching volume data:', error)
            })
    })
}

const getContainer = (container: any) => {
    debugger
    return document.querySelector('#right-page-list-id')
}
</script>
<style lang="less">
.fes-tooltip-confirm,
.fes-tooltip-popover {
    background-color: #000000ab;
}
.one-item-qrcode {
    width: 50%;
    color: white;
    text-align: center;
    font-size: 16px;
    font-weight: bolder;
    img {
        width: 80%;
        margin: 10px auto;
        display: block;
    }
}
</style>
<style lang="less" scoped></style>
