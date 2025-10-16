import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createRequire } from 'module'
import fs from 'fs/promises'
import glob from 'glob'
import { pathToFileURL } from 'url'

// ESM 下恢复 __dirname 的功能
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 创建 require 函数
const require = createRequire(import.meta.url)

const getPluginsConfig = async () => {
    const configFiles = glob.sync('../plugins/*/config.js', { cwd: __dirname })
    const configs = {}

    for (const file of configFiles) {
        // 用 import() 动态加载 ESM 模块
        const filePath = join(__dirname, file)
        const moduleUrl = pathToFileURL(filePath).href
        const configModule = await import(moduleUrl)
        const config = configModule.default
        configs[config.name] = config
    }

    return { configs, date: new Date().toLocaleString() }
}

export default function addExtraScriptPlugin() {
    return {
        name: 'add-extra-script-plugin',
        async generateBundle() {
            try {
                const pluginsConfig = await getPluginsConfig()
                const content = JSON.stringify(pluginsConfig, null, 2)
                await fs.writeFile('dist/menu.json', content, 'utf8')
                console.log('✅ menu.json written successfully.')
            } catch (error) {
                console.error('❌ Error writing file:', error)
            }
        },
    }
}
