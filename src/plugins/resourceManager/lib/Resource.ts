import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { useLoader } from '@tresjs/core'
import { ref, reactive } from 'vue'

const loaderMapping: { [key: string]: any } = {
    GLTFLoader: GLTFLoader,
    TextureLoader: THREE.TextureLoader,
    STLLoader: STLLoader,
    RGBELoader: RGBELoader,
    FileLoader: THREE.FileLoader,
}

class Resource {
    decoderPath: string
    items: Record<string, any>
    reactiveItems: Record<string, any> // 新增响应式容器
    loadingMap: Record<string, Promise<any>>
    hasAllFinished = ref(false)
    progress = ref(0)
    lenth = 0
    curIndex = 0
    loaderMapping = loaderMapping
    // private setLoadingManager() {
    //     THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    //         console.log('开始加载文件: ' + url + '.\n已加载 ' + itemsLoaded + ' of ' + itemsTotal + ' 文件.')
    //     }
    //     THREE.DefaultLoadingManager.onLoad = function () {
    //         console.log('加载完成!')
    //     }
    //     THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    //         console.log('加载文件中: ' + url + '.\n已加载 ' + itemsLoaded + ' / ' + itemsTotal + ' 文件.')
    //     }
    //     THREE.DefaultLoadingManager.onError = function (url) {
    //         console.error('加载资源文件错误：' + url)
    //     }
    // }
    constructor({ decoderPath = './draco/' } = {}) {
        this.decoderPath = decoderPath
        // this.setLoadingManager()
        this.items = {}
        this.reactiveItems = reactive({})
        this.loadingMap = {}
    }
    loadResources(list: Array<{ functionName: string; url: string; resourceID?: string }>) {
        list.forEach(({ functionName, url, resourceID }) => {
            this.loadItem(functionName, url, resourceID)
        })
    }
    loadItem(functionName: string, url: string, resourceID: string = ''): Promise<any> {
        if (!resourceID) {
            const match = url.match(/[^\\/]+$/)
            resourceID = match ? match[0] : url
        }

        // ✅ 如果已存在加载中 promise，直接返回
        if (this.loadingMap[resourceID] !== undefined) {
            return this.loadingMap[resourceID]
        }

        // ✅ 如果已加载，返回一个立即 resolve 的 promise
        if (this.items[resourceID]) {
            return Promise.resolve(this.items[resourceID])
        }

        const loaderFunction = this.loaderMapping[functionName]
        if (!loaderFunction) {
            console.error(`找不到对应的loader：${functionName}`)
            return Promise.reject(`找不到对应的loader：${functionName}`)
        }

        let initDraco = null as any
        if (functionName === 'GLTFLoader') {
            initDraco = (loader: any) => {
                const dracoLoader = new DRACOLoader()
                dracoLoader.setDecoderPath(this.decoderPath)
                dracoLoader.preload()
                loader.setDRACOLoader(dracoLoader)
            }
        }

        this.curIndex++
        this.lenth++

        const promise = useLoader(loaderFunction, url, initDraco).then((data: any) => {
            this.items[resourceID] = data
            this.reactiveItems[resourceID] = data

            this.curIndex--
            this.progress.value = Math.floor(((this.lenth - this.curIndex) / this.lenth) * 100)
            if (this.curIndex === 0) {
                this.hasAllFinished.value = true
            }

            return data
        })

        // ✅ 保存 loading 状态
        this.loadingMap[resourceID] = promise

        return promise
    }
    getItem(resourceID: string) {
        return this.items[resourceID]
    }
    // ✅ 获取响应式资源（可监听）
    getReactiveItem(resourceID: string) {
        return () => this.reactiveItems[resourceID]
    }
    // ✅ 高级封装：组件统一调用这个方法
    getResource(functionName: string, url: string, resourceID?: string): Promise<any> {
        return this.loadItem(functionName, url, resourceID)
    }
}
const instance = new Resource()
// Object.freeze(instance)
export default instance
