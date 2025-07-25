/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-25 18:10:50
 */
import { defineBuildConfig } from '@fesjs/fes'
// import viteCompression from 'vite-plugin-compression'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'
import addExtraScriptPlugin from './src/common/addExtraScriptPlugin'

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
                path: 'https://oss.icegl.cn/p/zone3Deditor/#/plugins/zone3Deditor/index',
                title: '🆓 区域场景编辑器',
            },
            {
                title: '🧊 ICEGL官网社区',
                children: [
                    {
                        path: 'https://www.icegl.cn/',
                        title: '🧊 ICEGL官网',
                    },
                    {
                        path: 'https://www.icegl.cn/ask',
                        title: '🙋‍♀️ 社区问答',
                    },
                ],
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
        plugins: [
            addExtraScriptPlugin(),
            // viteCompression({
            //     // 压缩配置选项
            //     verbose: true, // 默认即可，是否在控制台显示压缩信息
            //     disable: false, // 默认即可，是否禁用插件
            //     threshold: 10240, // 默认10240字节（10KB），只有大小超过此阈值的资源才会被处理。注意这里指的是资源原始大小，不是gzip后的体积。
            //     algorithm: 'gzip', // 使用gzip压缩
            //     ext: '.gz', // 生成的压缩包后缀
            //     deleteOriginFile: false, // 是否删除原始文件
            //     compressionOptions: {
            //         level: 9, // 压缩级别，范围为 1-9，9 为最高压缩率
            //     },
            // }),
            process.env.NODE_ENV === 'production' &&
            javascriptObfuscator({
                apply: 'build',
                include: [/src\/.*\.js$/],
                exclude: [
                    'node_modules/**',
                    '!node_modules/three/**',
                    '!node_modules/@tresjs/core/**',
                    '!node_modules/@tresjs/cientos/**',
                    'src/plugins/geojson23dtiles/lib/**',
                    /[\\/]@alienkitty[\\/]/,
                ],
                options: {
                    optionsPreset: 'high-obfuscation', //'default',
                    debugProtection: false,
                    disableConsoleOutput: true,
                    controlFlowFlattening: false, // 🚀 关闭控制流混淆，避免 Babel 解析错误
                    identifierNamesGenerator: 'hexadecimal', // 仅修改变量名，不影响语法结构
                    reservedStrings: [
                        'suspenseLayout.vue',
                        /* 排除编辑器需要的引用的组件 start */
                        'coneAnchorMeshB.vue',
                        'bannerLabel.vue',
                        'staticWater.vue',
                        'reflectorRoundedBox.vue',
                        'flexiblePipe.vue',
                        'utils.js',
                        /* 排除编辑器需要的引用的组件 end */
                    ],
                    compact: true,
                    stringArray: true,
                    stringArrayThreshold: 0.75,
                    stringArrayEncoding: ['rc4'],
                    splitStrings: false,
                    transformObjectKeys: false,
                    // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
                },
            }),
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
