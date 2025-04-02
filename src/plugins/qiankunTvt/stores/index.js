/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-04-02 10:17:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-04-02 11:40:45
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQiankunTvtStore = defineStore('qiankunTvtStore', () => {
    const globalState = ref({})
    const floatMove = ref(true)

    function setGlobalState(value) {
        globalState.value = value
        if (value.curType === 'floatMove') {
            floatMove.value = !floatMove.value
        }
    }
    return { floatMove, setGlobalState, globalState }
})
