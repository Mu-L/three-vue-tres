/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-02 18:59:21
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-23 11:34:44
 */
import { defineRuntimeConfig, useModel } from '@fesjs/fes'
import { reactive } from 'vue'
import { FMenu } from '@fesjs/fes-design'
import Tres from '@tresjs/core'
import chalk from 'chalk'

import 'uno.css'
import 'animate.css/animate.min.css'

// 注册图标 iconify goview
import { addCollection } from 'iconify-icon'
import uimIcons from '@iconify/json/json/uim.json'
import lineMdIcons from '@iconify/json/json/line-md.json'
import wiIcons from '@iconify/json/json/wi.json'
import { useQiankunTvtStore } from '@/plugins/qiankunTvt/stores/index'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import UserCenter from '@/components/forPreview/userCenter.vue'
import PageLoading from '@/components/pageLoading.vue'
import { useForPreviewStore } from '@/stores/forPreview'

addCollection(uimIcons)
addCollection(lineMdIcons)
addCollection(wiIcons)

let qiankunTvtStore = null
export default defineRuntimeConfig({
    beforeRender: {
        loading: <PageLoading />,
        action () {
            if (qiankunWindow.__POWERED_BY_QIANKUN__) {
                qiankunTvtStore = useQiankunTvtStore()
                const purl = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
                globalThis.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = purl
                window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = purl
                console.log('qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__', qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
                // window.__webpack_public_path__ = purl
                // qiankunWindow.__webpack_public_path__ = purl
                // Object.defineProperty(import.meta, 'url', { get: () => purl })
            }
            const { signin, getMenu } = useForPreviewStore()
            // const { signin, getMenu } = useModel('useAuthModel')
            signin()
            if ((process.env.FES_APP_PLUGINS === 'true' && process.env.NODE_ENV === 'development') || process.env.FES_APP_ONLINE_API) {
                getMenu()
            }
        },
    },
})

export function layout (layoutConfig) {
    return {
        renderCustom: () => <UserCenter />,
        ...layoutConfig,
        menus: () => {
            window.layoutConfig = layoutConfig
            return layoutConfig.menus
        }
    }
}


export function onAppCreated ({ app }) {
    app.use(FMenu)
    app.use(Tres)

    window.$vue = app

    // if (process.env.FES_APP_PLUGINS === 'true') { 
    console.log(chalk.hex('#1c86e5')(`
     ░▒▓████████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓████████▓▒░                 ░▒▓█▓▒░  ░▒▓███████▓▒░ 
        ░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░    ░▒▓█▓▒░                     ░▒▓█▓▒░ ░▒▓█▓▒░        
        ░▒▓█▓▒░      ░▒▓█▓▒▒▓█▓▒░     ░▒▓█▓▒░                     ░▒▓█▓▒░ ░▒▓█▓▒░        
        ░▒▓█▓▒░      ░▒▓█▓▒▒▓█▓▒░     ░▒▓█▓▒░                     ░▒▓█▓▒░  ░▒▓██████▓▒░  
        ░▒▓█▓▒░       ░▒▓█▓▓█▓▒░      ░▒▓█▓▒░              ░▒▓█▓▒░░▒▓█▓▒░        ░▒▓█▓▒░ 
        ░▒▓█▓▒░       ░▒▓█▓▓█▓▒░      ░▒▓█▓▒░     ░▒▓██▓▒░ ░▒▓█▓▒░░▒▓█▓▒░        ░▒▓█▓▒░ 
        ░▒▓█▓▒░        ░▒▓██▓▒░       ░▒▓█▓▒░     ░▒▓██▓▒░  ░▒▓██████▓▒░  ░▒▓███████▓▒░  
        `))
    console.log(chalk.hex('#5384ff').bold('· 二次开发如用于商业性质或开源竞品请不要删除和修改 TvT.js 源码头部的版权与作者声明及出处。'))
    console.log(chalk.hex('#5384ff').bold('· 本项目遵循 Apache2 开源协议发布，并提供永久免费使用以及商用，但是不允许二次开源出来并进行收费。'))
    console.log(chalk.hex('#1c86e5').bold('版权所有 Copyright © 2022-2025 by 🧊icegl (https://www.icegl.cn)'))
    // }
}
const findStringBetween = (str) => {
    const regex = /plugins\/([^/]+)\/pages\//
    const match = str.match(regex)
    if (match && match[1]) {
        return match[1]
    }
    return null
}

export function patchRoutes ({ routes }) {
    if (process.env.FES_APP_PLUGINS === 'false') {
        console.log('项目开发模式: 配置 不自动增加插件plugins里面各个pages的页面路由')
        return
    }

    // 自动读取plugins目录下所有插件的pages的目录下的*.vue 并加入路由
    let viteModules = import.meta.glob('./plugins/**/pages/**/*.vue')
    if (process.env.FES_APP_PLSNAME !== undefined) {
        const filteredModules = Object.fromEntries(
            Object.entries(viteModules).filter(([path]) => path.startsWith(`./plugins/${process.env.FES_APP_PLSNAME}/pages/`))
        )
        viteModules = filteredModules
    }
    const needAddRouter = {
        path: '/plugins',
        component: () => import("./components/forPreview/suspenseLayout.vue"),
        children: []
    }
    // eslint-disable-next-line guard-for-in
    for (const [key, value] of Object.entries(viteModules)) {
        const pluginName = findStringBetween(key)
        const urlList = key.match(/\.\/(.+)\.vue$/)[1].split('/')
        if (urlList.length === 4) {  //插件一级目录 普通插件
            needAddRouter.children.unshift({
                path: `/plugins/${pluginName}/${urlList[3]}`,
                component: value
            })
        }
        else if (urlList.length === 5) { //插件二级目录 目前只存在已 basic 基础功能展示
            needAddRouter.children.unshift({
                path: `/plugins/${pluginName}/${urlList[3]}/${urlList[4]}`,
                component: value
            })
        } else {  // 若目录异常 那么直接跳过
            return
        }
    }
    routes.unshift(needAddRouter)
}

export function modifyRoute (memo) {
    if (process.env.FES_APP_PREINDEX === 'true') {
        console.log('预览模式下 已经自动替换index的路由为 plugins/preview.vue')
        let indexRoute = memo.routes.find(route => route.path === '/')
        if (indexRoute) {
            indexRoute = indexRoute.children.find(route => route.path === '/')
            if (indexRoute) {
                indexRoute.component = () => import("./plugins/preview.vue")
                indexRoute.meta = {
                    name: 'preview',
                    title: '开源框架展示',
                }
            }
        }
    }
    if (process.env.FES_APP_PLUGINS === 'false') {
        console.log('项目开发模式: 默认路由 去除layout模式')
        const indexRoute = memo.routes.find(route => route.path === '/')
        if (indexRoute) {
            indexRoute.component = null
        }
    }

    return {
        ...memo,
        routes: [
            ...memo.routes
        ]
    }
}

export const qiankun = { 
    // 应用加载之前
    async bootstrap (props) {
        console.log('son TvT.js bootstrap', props)
    },
    // 应用 render 之前触发
    async mount (props) {
        console.log('son TvT.js mount', props)
        if (props) {
            props.onGlobalStateChange((state, prev) => {
                qiankunTvtStore.setGlobalState(state)
            })
            window.qiankunProps = props
        }
    },
    // 当 props 更新时触发
    async update (props) {
        console.log('son TvT.js update', props)
    },
    // 应用卸载之后触发
    async unmount (props) {
        console.log('son TvT.js unmount', props)
    },
}