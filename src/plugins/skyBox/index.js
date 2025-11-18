/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-27 22:08:16
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-18 15:42:07
 */

import environmentForLightformers from './components/environmentForLightformers.vue'
import skyBoxAmesh from './components/skyBoxAmesh.vue'
import skyBoxBmesh from './components/skyBoxBmesh.vue'
import skyBoxDmesh from './components/skyBoxDmesh.vue'
import groundProjectedEnv from './components/groundProjectedEnvCom.vue'
import basiceEnv from './components/basiceEnv.vue'

const HDRfileList = {
	sunset: '/images/water/belfast_sunset_puresky_1k.hdr',
	desert: '/images/skyBox/desert_1k.hdr',
	room: '/images/skyBox/newConvert/abandoned_games_room_02_1k.hdr',
	canary: '/images/skyBox/newConvert/canary_wharf_1k.hdr',
	outdoor: '/images/skyBox/newConvert/outdoor_umbrellas_1k.hdr',
	haven: '/images/skyBox/newConvert/poly_haven_studio_1k.hdr',
	shanghai: '/images/skyBox/newConvert/shanghai_bund_1k.hdr',
	hangar: '/images/skyBox/newConvert/small_hangar_01_1k.hdr',
	snowy: '/images/skyBox/newConvert/snowy_forest_path_01_1k.hdr',
}
const HDRfilePath = process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'

export { environmentForLightformers, skyBoxAmesh, groundProjectedEnv, skyBoxBmesh, skyBoxDmesh, basiceEnv, HDRfileList, HDRfilePath }
