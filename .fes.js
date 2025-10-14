/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-16 10:53:09
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-14 08:44:18
 */
// import { resolve } from 'path';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineBuildConfig } from '@fesjs/fes'
import { templateCompilerOptions } from '@tresjs/core'
// eslint-disable-next-line import/no-unresolved
import UnoCSS from 'unocss/vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import glsl from 'vite-plugin-glsl'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const timeStamp = new Date().getTime()
const combinedIsCustomElement = (tag) => tag.startsWith('iconify-icon') || templateCompilerOptions.template.compilerOptions.isCustomElement(tag)

export default defineBuildConfig({
    mountElementId: 'tvt-app',
    title: 'TvT.js',
    publicPath: './', // './' 若在线部署用于生产环境 且 是使用qiankun微前端时，需要配置base为主应用地址 https://cos.icegl.cn/qiankun/tvt/
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        navigation: null,
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
    qiankun: {
        micro: {
            useDevMode: true,
        },
    },
    //add by 地虎降天龙
    viteVuePlugin: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => combinedIsCustomElement(tag),
            },
        },
    },
    viteOption: {
        plugins: [
            UnoCSS({
                /* options */
            }),
            glsl({
                warnDuplicatedImports: false, // 禁用重复导入警告
            })
        ],
        build: {
            target: 'esnext', // 或者 'es2020' 以支持 BigInt
            chunkSizeWarningLimit: 1000, // 单位为KB
            rollupOptions: {
                output: {
                    manualChunks (id) {
                        // 自定义拆分策略，例如将特定的第三方库拆分为单独的 chunk
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0]
                        }
                    },
                    format: 'es',
                    chunkFileNames: `js/[name].[hash]${timeStamp}.js`,
                    entryFileNames: `js/[name].[hash]${timeStamp}.js`,
                    assetFileNames: `[ext]/[name].[hash]${timeStamp}.[ext]`,
                    name: 'TvT.js',
                },
            },
            sourcemap: false,
            minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
        },
        // 全局 css 注册
        css: {
            preprocessorOptions: {
                scss: {
                    // javascriptEnabled: true,
                    // additionalData: `@import "src/plugins/goView/lib/scss/style.scss";`,
                    additionalData: (content, filename) => {
                        if (filename.includes('src/plugins/goView') || filename.includes('src/plugins/zone3Deditor')) {
                            return `@import "src/plugins/goView/lib/scss/style.scss";\n${content}`
                        }
                        return content
                    }
                },
            },
        },
        server: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            host: '0.0.0.0',
            proxy: {
                '/resource.cos': {
                    target: 'https://opensource.cdn.icegl.cn',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/resource.cos/, ''),
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
    alias: {
        PLS: join(__dirname, './src/plugins'),
    },
    // { find: 'pls', replacement: resolve(__dirname, './src/plugins') },
    // { '@': join(__dirname, '/src') }
})