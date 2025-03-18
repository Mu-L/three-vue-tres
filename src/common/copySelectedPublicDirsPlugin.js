import fs from 'fs'
// import path from 'path'
// const fs = require('fs').promises
const path = require('path')
const glob = require('glob')

/**
 * 递归拷贝目录或单个文件，自动判断类型
 * @param {string} src 源路径（文件或目录）
 * @param {string} dest 目标路径
 */
async function copy(src, dest) {
    if (!fs.existsSync(src)) return

    const stat = await fs.promises.stat(src)

    if (stat.isDirectory()) {
        await fs.promises.mkdir(dest, { recursive: true })
        const entries = await fs.promises.readdir(src, { withFileTypes: true })

        for (const entry of entries) {
            if (entry.name.startsWith('.')) continue // 跳过隐藏文件

            const srcPath = path.join(src, entry.name)
            const destPath = path.join(dest, entry.name)

            await copy(srcPath, destPath)
        }
    } else {
        await fs.promises.copyFile(src, dest)
    }
}

const makeAllowPluginDirs = () => {
    const onePLAname = process.env.FES_APP_PLSNAME
    if (!onePLAname) {
        console.error('未设置插件名称')
    }
    const configFile = glob.sync(`../plugins/${onePLAname}/config.js`, { cwd: __dirname })
    const require2 = require('esm')(module)
    const requireConfig = require2(path.join(__dirname, configFile[0])).default
    // console.log(requireConfig)
    const allowPluginDirs = requireConfig.require
    allowPluginDirs.push(onePLAname)
    console.log(allowPluginDirs)
    return allowPluginDirs
}

/**
 * Vite 插件：拷贝 `public` 目录，排除 `plugins` 目录，但允许其中部分目录
 * @param {string[]} allowPluginDirs 允许从 `plugins` 目录拷贝的子目录
 * @param {string} publicDir 默认 public 目录路径
 * @param {string} outputDir 目标 dist 目录路径
 * @returns Vite 插件对象
 */
export default function copyPublicWithPluginExclusion (allowPluginDirs, publicDir = 'public', outputDir = 'dist') {
    
    return {
        name: 'vite-plugin-copy-public',
        apply: 'build',
        async closeBundle() {
            if (!fs.existsSync(publicDir)) return
            allowPluginDirs = makeAllowPluginDirs()

            const items = await fs.promises.readdir(publicDir, { withFileTypes: true })

            for (const item of items) {
                if (item.name.startsWith('.')) continue // 跳过隐藏文件
                if (item.name === 'plugins') continue // 跳过 plugins 目录

                const srcPath = path.join(publicDir, item.name)
                const destPath = path.join(outputDir, item.name)

                await copy(srcPath, destPath)
                console.log(`✔ Copied: ${srcPath} → ${destPath}`)
            }

            // 复制 `public/plugins/` 目录下允许的子目录
            const pluginsDir = path.join(publicDir, 'plugins')
            const pluginsDest = path.join(outputDir, 'plugins')

            if (fs.existsSync(pluginsDir)) {
                for (const plugin of allowPluginDirs) {
                    const pluginSrc = path.join(pluginsDir, plugin)
                    const pluginDest = path.join(pluginsDest, plugin)

                    if (fs.existsSync(pluginSrc)) {
                        await copy(pluginSrc, pluginDest)
                        console.log(`✔ Copied: ${pluginSrc} → ${pluginDest}`)
                    } else {
                        console.warn(`⚠ Warning: ${pluginSrc} does not exist, skipping...`)
                    }
                }
            }
        },
    }
}
