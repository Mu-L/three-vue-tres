/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-29 17:25:00
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 17:34:35
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

async function loadArrayBufferFromRelativePath(relativePath) {
    try {
        const response = await fetch(relativePath)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        return arrayBuffer
    } catch (err) {
        console.error('读取失败:', err)
        return null
    }
}

/**
 * 异步加载支持 Draco 的 glb buffer 并返回 gltf 结构
 * @param {ArrayBuffer} arrayBuffer - 二进制模型数据
 * @returns {Promise<THREE.Group>} - 返回 （模型）
 */
async function loadGLTFBufferIntoScene(arrayBuffer) {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    loader.setDRACOLoader(dracoLoader)

    return new Promise((resolve, reject) => {
        loader.parse(
            arrayBuffer,
            '',
            (gltf) => {
                resolve(gltf)
            },
            (error) => {
                console.error('GLB 加载失败:', error)
                reject(error)
            },
        )
    })
}

export { loadArrayBufferFromRelativePath, loadGLTFBufferIntoScene }
