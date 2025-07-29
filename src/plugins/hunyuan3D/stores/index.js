/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-02 11:40:46
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 17:20:29
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMaterialDiyStore = defineStore('materialDiyStore', () => {
    const curType = ref('MeshBasicMaterial')
    const curState = ref({})
    const curModelArrayBuffer = ref(null)

    return { curState, curType, curModelArrayBuffer }
})
