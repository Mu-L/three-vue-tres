import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { useLoader } from '@tresjs/core'
import { ref } from 'vue'

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
    }
    loadResources(list: Array<{ functionName: string; url: string; resourceID?: string }>) {
        list.forEach(({ functionName, url, resourceID }) => {
            this.loadItem(functionName, url, resourceID)
        })
    }
    loadItem(functionName: string, url: string, resourceID: string = '') {
        const loaderFunction = this.loaderMapping[functionName]
        if (loaderFunction === undefined) {
            console.error(`找不到对应的loader：${functionName}`)
            return
        }
        if (!resourceID) {
            const match = url.match(/[^\\/]+$/)
            resourceID = match ? match[0] : url
        }
        let initDraco = null as any
        this.curIndex++
        this.lenth++
        if (functionName === 'GLTFLoader') {
            initDraco = (loader: any) => {
                const dracoLoader = new DRACOLoader()
                dracoLoader.setDecoderPath(this.decoderPath)
                dracoLoader.preload()
                loader.setDRACOLoader(dracoLoader)
            }
        }
        const onProgress = (event: any) => {
            console.log(`${resourceID}文件加载进度：${Math.floor((event.loaded / event.total) * 100)}%`)
        }
        useLoader(loaderFunction, url, initDraco, onProgress).then((data: any) => {
            this.items[resourceID] = data

            this.curIndex--
            this.progress.value = Math.floor((this.lenth - this.curIndex) / this.lenth * 100)
            if (this.curIndex === 0) {
                this.hasAllFinished.value = true
            }
        })
    }
    getItem(resourceID: string) {
        return this.items[resourceID]
    }
}
const instance = new Resource()
// Object.freeze(instance)
export default instance
