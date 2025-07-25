/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-25 18:10:33
 */
import { defineBuildConfig } from '@fesjs/fes'
import copyPublicWithPluginExclusion from './src/common/copySelectedPublicDirsPlugin'

export default defineBuildConfig({
    layout: {
        title: 'TvT.js',
        navigation: 'top',
        multiTabs: false,
        isFixedHeader: true,
        logo: 'logo.png',
        menus: [
            {
                name: 'preview',
                path: '/',
                title: '📀 预览演示',
            },
            {
                path: 'https://gitee.com/ice-gl/icegl-three-vue-tres',
                title: '📜 源码地址',
            },
            {
                title: '📚 说明文档',
                children: [
                    {
                        path: 'http://docs.icegl.cn',
                        title: '🧊 TvT框架文档',
                    },
                    {
                        path: 'https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene',
                        title: '🎲 three.js',
                    },
                    {
                        path: 'https://tresjs.org/guide/',
                        title: '⚡ tres.js',
                    },
                    {
                        path: 'https://fesjs.mumblefe.cn/',
                        title: '💠 fes.js',
                    },
                ],
            },
            {
                path: 'https://www.bilibili.com/video/BV1LH4y1p7Yn',
                title: '📀 TvT视频教程',
            },
            {
                path: 'https://www.icegl.cn/tvtstore',
                title: '🧩 插件市场',
            },
            {
                path: 'https://www.icegl.cn/',
                title: '🧊 ICEGL官网',
            },
            {
                title: '👨‍🏫 课程中心',
                children: [
                    {
                        path: 'https://icegl.cn/courses',
                        title: '🌁 WebGL初/中/高级教程',
                    },
                    {
                        path: 'https://www.bilibili.com/video/BV1iR4y1C7LQ/',
                        title: '🏙 WebGL Shader初级教程',
                    },
                    {
                        path: 'http://m.study.163.com/provider/480000002303414/index.htm?share=2&shareId=480000002303414',
                        title: '🌇 WebGL Shader中级教程',
                    },
                ],
            },
            {
                path: 'https://www.icegl.cn/ask',
                title: '🙋‍♀️ 社区问答',
            },
            {
                path: 'https://www.icegl.cn/tvtstore/uniAppView',
                title: '🪅 小程序生态',
            },
            {
                path: 'https://www.icegl.cn/d/demand/post',
                title: '🪢 定制开发',
            },
            {
                path: 'https://www.icegl.cn/p/aboutus',
                title: '💫 关于我们',
            },
        ],
    },
    viteOption: {
        build: {
            copyPublicDir: false, // 禁止 Vite 默认复制 public 目录
        },
        plugins: [
            copyPublicWithPluginExclusion(), // 不用传值，内部自动处理
        ],
        server: {
            proxy: {
                // 开发代理服务器配置
                '/api.icegl': {
                    target: 'https://www.icegl.cn/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api.icegl/, ''),
                },
                // 天地图本地代理
                '/tianditu.map': {
                    target: 'https://t0.tianditu.gov.cn/',
                    changeOrigin: true,
                    headers: {
                        Origin: 'oss.icegl.cn',
                        Referer: 'http://oss.icegl.cn',
                    },
                    rewrite: (path) => path.replace(/^\/tianditu.map/, ''),
                }
            },
        },
    },
})
