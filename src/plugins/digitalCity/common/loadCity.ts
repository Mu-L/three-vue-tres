/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-20 10:13:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 10:58:26
 */
import { Resource } from 'PLS/resourceManager'
import { watch } from 'vue'

export const loadCityFBX = async () => {
	const path = (process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/model/digitalCity/shanghai.FBX'
	Resource.getResource('FBXLoader',path, 'shanghai.FBX')

	const modelR = Resource.getReactiveItem('shanghai.FBX')
	
	return new Promise((resolve, reject) => {
		const stopWatch = watch(
			() => modelR(),
			(model) => {
					if (model) {
					stopWatch() // 停止监听
						let CITY_UNTRIANGULATED = null
						let LANDMASS = null
						let roads = null
						model.traverse((child) => {
							if (child.name === 'CITY_UNTRIANGULATED') {
								CITY_UNTRIANGULATED = child
							}
							if (child.name === 'LANDMASS') {
								LANDMASS = child
							}
							if (child.name === 'ROADS') {
								roads = child
							}
						})
						resolve({
							model: model,
							city: CITY_UNTRIANGULATED,
							land: LANDMASS,
							roads
						})
					} else {
						reject(new Error('FBX 加载失败，未得到模型'))
					}
			}
		)
	})
}