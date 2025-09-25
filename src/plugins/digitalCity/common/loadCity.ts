/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-10-20 10:13:19
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-12-27 14:57:03
 */
import { useFBX } from '@tresjs/cientos'
import { watch } from 'vue'

export const loadCityFBX = async () => {
	const path = (process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn') + '/model/digitalCity/shanghai.FBX'
	const { state, isLoading } = useFBX(path)

	return new Promise((resolve, reject) => {
		const stopWatch = watch(
			() => isLoading.value,
			(loading) => {
				if (!loading) {
					stopWatch() // 停止监听
					if (state.value) {
						let CITY_UNTRIANGULATED = null
						let LANDMASS = null
						let roads = null
						state.value.traverse((child) => {
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
							model: state.value,
							city: CITY_UNTRIANGULATED,
							land: LANDMASS,
							roads
						})
					} else {
						reject(new Error('FBX 加载失败，未得到模型'))
					}
				}
			},
			{ immediate: true }
		)
	})
}