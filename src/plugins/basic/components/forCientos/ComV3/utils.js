/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-26 15:44:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 15:55:54
 */
import { Resource } from 'PLS/resourceManager'
import { watch } from 'vue'

export async function useGLTF (path) {
	const name = path.split('/').pop()
	Resource.getResource('GLTFLoader', path, name)
	const modelR = Resource.getReactiveItem(name)

	return new Promise((resolve, reject) => {
		const stopWatch = watch(
			() => modelR(),
			(model) => {
				if (model) {
					stopWatch()
					resolve(model)
				} else {
					reject(new Error('useGLTF 加载失败，未得到模型'))
				}
			}
		)
	})
}

export async function useTexture (path) {
	const name = path.split('/').pop()
	Resource.getResource('TextureLoader', path, name)
	const modelR = Resource.getReactiveItem(name)

	return new Promise((resolve, reject) => {
		const stopWatch = watch(
			() => modelR(),
			(model) => {
				if (model) {
					stopWatch()
					resolve(model)
				} else {
					reject(new Error('useTexture 加载失败，未得到模型'))
				}
			}
		)
	})
}