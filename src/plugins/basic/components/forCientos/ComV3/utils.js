/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-26 15:44:01
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-15 10:32:57
 */
import { Resource } from 'PLS/resourceManager'
import { watch } from 'vue'

// export async function useGLTF (path) {
// 	const name = path.split('/').pop()
// 	Resource.getResource('GLTFLoader', path, name)
// 	const modelR = Resource.getReactiveItem(name)

// 	return new Promise((resolve, reject) => {
// 		// 1️⃣ 先检查是否已有加载结果
// 		const existingModel = modelR()
// 		if (existingModel) {
// 			resolve(existingModel)
// 			return
// 		}
// 		const stopWatch = watch(
// 			() => modelR(),
// 			(model) => {
// 				if (model) {
// 					stopWatch()
// 					resolve(model)
// 				} else {
// 					reject(new Error('useGLTF 加载失败，未得到模型'))
// 				}
// 			},
// 			{ immediate: false } // 不要立即触发
// 		)
// 		// ✅ 也可以设置一个超时（可选）
// 		setTimeout(() => {
// 			if (!modelR()) {
// 				stopWatch()
// 				reject(new Error('useGLTF 加载超时，未得到模型'))
// 			}
// 		}, 10000)
// 	})
// }

export async function useTexture (path) {
	const name = path.split('/').pop()
	Resource.getResource('TextureLoader', path, name)
	const modelR = Resource.getReactiveItem(name)

	return new Promise((resolve, reject) => {
		// 1️⃣ 先检查是否已有加载结果
		const existingModel = modelR()
		if (existingModel) {
			resolve(existingModel)
			return
		}
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
		// ✅ 也可以设置一个超时（可选）
		// setTimeout(() => {
		// 	if (!modelR()) {
		// 		stopWatch()
		// 		reject(new Error('useTexture 加载超时，未得到模型'))
		// 	}
		// }, 10000)
	})
}