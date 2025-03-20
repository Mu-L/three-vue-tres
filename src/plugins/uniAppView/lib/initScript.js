/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-03-05 11:49:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-20 09:06:06
 */
export function loadJweixin () {
	return new Promise((resolve, reject) => {
		if (window.wx) {
			resolve(window.wx)
			return
		}
		const script = document.createElement('script')
		script.src = '/lib/jweixin-1.6.0.js'//'https://res.wx.qq.com/open/js/jweixin-1.6.0.js' // 适当更换版本
		script.onload = () => resolve(window.wx)
		script.onerror = reject
		document.body.appendChild(script)
	})
}

export function loadWebView () {
	return new Promise((resolve, reject) => {
		if (window.uni) {
			resolve(window.uni)
			return
		}
		const script = document.createElement('script')
		script.src = '/lib/uni.webview.0.1.52.js'//'https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.0.1.52.js' // 适当更换版本
		script.onload = () => resolve(window.wx)
		script.onerror = reject
		document.body.appendChild(script)
	})
}