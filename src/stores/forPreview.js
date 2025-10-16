import { reactive } from 'vue'
import { access, request } from '@fesjs/fes'


import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useForPreviewStore = defineStore('forPreviewStore', () => {
	const user = reactive({ userName: '' })

		const signin = () => {
				const { setRole } = access
				user.userName = 'V5版'
				setRole('admin')
		}

		const signout = () => {}

		const menuSetup = reactive([])

		const getMenu = () => {
				request(
						`${process.env.NODE_ENV === 'development' ? 'api.icegl' : 'https://www.icegl.cn'}/addons/tvt/index/getMenuSetup`,
						{},
						{
								method: 'get',
						},
				)
						.then((res) => {
								const arrObject = {}
								res.code.menuSetup.forEach((item) => {
										const { m1text, m2text } = item
										if (!arrObject[m1text]) {
												arrObject[m1text] = {}
										}
										arrObject[m1text][m2text] = item
								})
								menuSetup.value = arrObject
						})
						.catch((err) => {
								// 处理异常
								console.log(err, '请连接网络，获得样例的更新')
						})
		}

		return {
				user,
				signin,
				signout,
				menuSetup,
				getMenu,
		}
})