<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-03 16:02:49
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-25 18:01:44
-->
<template>
    <FDivider titlePlacement="left">{{ onePlugin.title + ' - ' + onePlugin.name }}</FDivider>
    <FSpace vertical>
        <span style="text-decoration: none; color: black">
            <FText
                v-if="props.onePlugin.author"
                class="mt-[-24px] position-absolute right-[12px]"
                @click="toAuthorPage(onePlugin.website)"
                style="color: #0f1222;cursor: pointer"
                size="small"
            >
                <UserOutlined class="position-relative top-[2px]" /> 作者：
                {{ props.onePlugin.author }}
            </FText>
        </span>
        <div class="p-2 ml-13" style="" v-html="props.onePlugin.intro"></div>
    </FSpace>
    <div class="flex flex-wrap flex-justify-start content-start mt-6 pl-6">
        <div class="w-80 mr-10 mb-10 overflow-hidden relative" v-for="(onePreview, okey) in onePlugin.preview" :key="okey">
            <template v-if="onePlugin.waitForGit || onePreview.waitForGit">
                <div v-if="hasStyle(props.onePlugin, onePreview.name)" class="tag-sheared" :class="classText(props.onePlugin, onePreview.name)">
                    {{ hasStyle(props.onePlugin, onePreview.name) }}
                </div>
                <FCard :header="onePreview.title" shadow="hover">
                    <div
                        class="w-full h-48 text-5 line-height-1.5em text-left mb-2 text-#5384ff"
                        style="background-color: rgb(55 56 61); overflow: hidden; border-radius: 10px"
                    >
                        <div class="p-2">官网已经更新样例功能，请git 更新代码!</div>
                    </div>
                    <div class="cursor-pointer text-right" style="margin-top: 6px; margin-bottom: -8px" @click="toPage(props.onePlugin, onePreview, true)">
                        点击web端演示
                    </div>
                </FCard>
            </template>
            <template v-else>
                <div v-if="hasStyle(props.onePlugin, onePreview.name)" class="tag-sheared" :class="classText(props.onePlugin, onePreview.name)">
                    {{ hasStyle(props.onePlugin, onePreview.name) }}
                </div>
                <FCard :header="onePreview.title" shadow="hover">
                    <video controls class="w-full max-h-70 h-14em" v-if="onePreview.type === 'video'">
                        <source :src="publicPath + onePreview.src" type="video/mp4" autoplay="true" loop="true" />
                    </video>
                    <oneImageQr v-else-if="onePreview.type === 'img'" :onePreview="onePreview" :onePlugin="onePlugin" />
                    <div
                        class="w-full h-48 text-3 text-left mb-2"
                        style="background-color: rgb(55 56 61); overflow: hidden; border-radius: 10px"
                        v-else-if="onePreview.type === 'text'"
                    >
                        <div class="p-2" style="color: white" v-html="onePreview.src"></div>
                    </div>
                    <div class="cursor-pointer text-right" style="margin-top: 6px; margin-bottom: -8px" @click="toPage(props.onePlugin, onePreview)">
                        点击web端演示
                    </div>
                </FCard>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { FCard, FDivider, FSpace, FText } from '@fesjs/fes-design'
import { useRouter, useModel } from '@fesjs/fes' //fesJS的路由被他自己封装了
import { UserOutlined } from '@fesjs/fes-design/icon'
import oneImageQr from './oneImageQr.vue'
import { loadJweixin, loadWebView } from 'PLS/uniAppView/lib/initScript'

const props = withDefaults(
    defineProps<{
        onePlugin: any
    }>(),
    {},
)
const { menuSetup } = useModel('forPreview')
let publicPath = process.env.BASE_URL

const toAuthorPage = (url: string) => {
    window.open(url, '_blank')
}

onMounted(async () => {
    await loadJweixin()
    await loadWebView()
})

declare const uni: any

const router = useRouter()

// 小程序 uniapp端的跳转，若自己调试请更换地址  https://oss.icegl.cn
const jumpType = (url: string, addPreUrl: boolean) => {
    if (!uni.getEnv) {
        window.open(url, '_blank')
    } else {
        uni.getEnv((res: any) => {
            if (res.miniprogram) {
                const u = addPreUrl ? 'https://oss.icegl.cn' + url : url
                uni.navigateTo({
                    url: '/pages/debugDemo/onePreview/onePreview?urlPath=' + u,
                })
            } else {
                window.open(url, '_blank')
            }
        })
    }
}
const toPage = (plugin: any, value: any, isOnline = false) => {
    if (value.url) {
        return jumpType(value.url, false)
    }
    let path = `/plugins/${plugin.name}/${value.name}`
    if (plugin.pNode) {
        path = `/plugins/${plugin.pNode}/${plugin.name}/${value.name}`
    }
    if (isOnline) {
        path = 'https://oss.icegl.cn/#' + path
        return jumpType(path, false)
    }
    let routeUrl = router.resolve({
        path: path,
    })
    return jumpType(routeUrl.href, true)
}

const hasStyle = (plugin: any, value: any) => {
    if (menuSetup.value) {
        if (menuSetup.value[plugin.name] && menuSetup.value[plugin.name][value]) {
            return menuSetup.value[plugin.name][value].taglist_text
        }
    }
    return ''
}
const classText = (plugin: any, value: any) => {
    if (menuSetup.value) {
        if (menuSetup.value[plugin.name] && menuSetup.value[plugin.name][value]) {
            return menuSetup.value[plugin.name][value].taglist
        }
    }
    return ''
}
</script>

<style>
.fes-divider:not(.is-vertical) .fes-divider-text {
    font-size: 1.2em;
    background-color: #0f1222;
    font-weight: bolder;
    color: white;
}

.fes-divider {
    background-color: #0f1222;
    margin: 0px 10px 0px;
    width: 95%;
}

.fes-card__header {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
<style lang="less" scoped>
.tag-sheared {
    background-color: #063667;
    color: white;
    width: 100%;
    height: 12%;
    line-height: 246%;
    text-align: center;
    margin-left: 41%;
    margin-top: 4%;
    position: absolute;
    font-size: 1.1em;
    transform: rotate(45deg);

    &.recommend {
        background-color: #e6698b;
    }

    &.hot {
        background-color: #b51c22;
    }
}
</style>
