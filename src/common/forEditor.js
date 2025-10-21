/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-08-14 10:52:40
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-21 11:41:55
 */
import { ref, shallowReactive } from 'vue'
import * as THREE from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { useSeek } from 'PLS/basic'

function useAnimations (onBeforeRender, animations, modelRef) {
	const reference = ref(modelRef)

	const mixer = new THREE.AnimationMixer(reference.value)

	const actions = shallowReactive({})

	animations.forEach((animation) => {
		const action = mixer.clipAction(animation, reference.value)
		actions[animation.name] = action
	})

	onBeforeRender(() => {
		mixer.update(0.008)
	})

	return {
		actions,
		mixer,
	}
}

function containsSkinnedMesh (object) {
	let hasSkinnedMesh = false

	object.traverse((child) => {
		if (child.isSkinnedMesh) {
			hasSkinnedMesh = true
		}
	})

	return hasSkinnedMesh
}
function bakeWorldTransformToGeometryTree (object) {
	// 克隆保动画结构，包括骨骼引用、名字等
	let cloned = null
	if (containsSkinnedMesh(object)) {
		cloned = SkeletonUtils.clone(object)
		cloned.updateMatrixWorld(true)
	} else {
		cloned = object.clone()
	}
	return cloned
}

function centerObjectAtOrigin (object) {
	// 创建包围盒
	const box = new THREE.Box3().setFromObject(object)
	const center = new THREE.Vector3()
	box.getCenter(center)

	const size = new THREE.Vector3()
	box.getSize(size)
	const yOffset = box.min.y // 物体底部的 Y 坐标

	const wrapper = new THREE.Group()
	wrapper.name = 'centeredGroup'
	object.position.sub(center)
	object.position.y = -yOffset // 让底部贴地
	wrapper.add(object)

	return wrapper
}

function standardizationMeshCopy (mesh) {
	const ms = bakeWorldTransformToGeometryTree(mesh)
	return centerObjectAtOrigin(ms)
}

/**
 * 安全地将字符串形式的函数恢复为可执行函数
 * @param code 字符串形式的函数 (e.g. "(e) => console.log(e)")
 */
function parseEventFunction (code) {
	try {
		// 最推荐的方式：通过 Function 构造器解析，而不是 eval
		// 等价于 new Function("return " + code)()
		// 例如输入 "(e)=>console.log(e)" 会生成可执行函数
		// 这个函数只在当前作用域运行，不访问外部上下文
		const fn = new Function(`return (
			(e) => {
				const PointerEvent = e
				const currentObject = e.currentObject
				const point = e.point
				const object = e.object
				const distance = e.distance
				${code}
			}
		)`)()
		return typeof fn === 'function' ? fn : null
	} catch (err) {
		console.warn('⚠️ 无法解析事件函数:', code, err)
		return null
	}
}
function useEventBinding (isPreview, events) {
	return (uuid) => {
		if (!isPreview) return {}

		const handlers = {}

		// 提前提取函数
		const eventFns = {
			click: null,
			doubleclick: null,
			contextmenu: null,
			pointerenter: null,
			pointerleave: null,
		}

		for (const ev of events) {
			if (!ev.enabled) continue
			const fn = parseEventFunction(ev.eventFun)
			if (!fn) continue
			eventFns[ev.eventType] = fn
		}

		let clickTimer = null

		// ✅ click/doubleclick 处理逻辑
		if (eventFns.click || eventFns.doubleclick) {
			handlers.click = (e) => {
				if (clickTimer) clearTimeout(clickTimer)

				// 如果有双击事件，则延迟触发单击
				if (eventFns.doubleclick) {
					clickTimer = setTimeout(() => {
						eventFns.click?.(e)
					}, 250)
				} else {
					eventFns.click?.(e)
				}
			}

			if (eventFns.doubleclick) {
				handlers.dblclick = (e) => {
					if (clickTimer) {
						clearTimeout(clickTimer)
						clickTimer = null
					}
					eventFns.doubleclick?.(e)
				}
			}
		}

		// ✅ 其他事件正常绑定
		if (eventFns.contextmenu) handlers.contextmenu = eventFns.contextmenu
		if (eventFns.pointerenter) handlers.pointerenter = eventFns.pointerenter
		if (eventFns.pointerleave) handlers.pointerleave = eventFns.pointerleave

		return handlers
	}
}


/**
 * ✅ 自动为所有启用的事件绑定到目标对象（或场景树中）
 * 支持 click / doubleclick 冲突解决
 * @param root 场景或模型根对象（可递归查找 uuid）
 * @param allEvents 场景事件列表（SceneEvent[]）
 */
function bindToTarget (root, allEvents) {
	if (!root || !allEvents?.length) return

	const clickTimers = new Map()

	// 遍历所有启用事件
	for (const ev of allEvents) {
		if (!ev.enabled) continue
		console.log('绑定事件:', ev)

		// 通过 uuid 查找对应对象
		const target = useSeek().seek(root, 'uuid', ev.uuid)
		if (!target || typeof target.addEventListener !== 'function') continue

		const fn = parseEventFunction(ev.eventFun)
		if (!fn) continue

		const eventType = ev.eventType === 'doubleclick' ? 'dblclick' : ev.eventType

		try {
			// ✅ click / doubleclick 冲突处理
			if (ev.eventType === 'click') {
				const handleClick = (e) => {
					const timer = clickTimers.get(target.uuid)
					if (timer) clearTimeout(timer)
					const newTimer = setTimeout(() => {
						fn(e)
						clickTimers.delete(target.uuid)
					}, 250)
					clickTimers.set(target.uuid, newTimer)
				}
				target.addEventListener('click', handleClick)
			} else if (ev.eventType === 'doubleclick') {
				const handleDoubleClick = (e) => {
					const timer = clickTimers.get(target.uuid)
					if (timer) {
						clearTimeout(timer)
						clickTimers.delete(target.uuid)
					}
					fn(e)
				}
				target.addEventListener('dblclick', handleDoubleClick)
			} else {
				// ✅ 其他事件直接绑定
				target.addEventListener(eventType, fn)
			}

			console.log(`✅ 已为物体(${ev.uuid}) 绑定事件: ${eventType}`)
		} catch (err) {
			console.warn(`⚠️ 绑定事件失败: ${ev.eventType}`, err)
		}
	}
}

export { standardizationMeshCopy, useAnimations, useEventBinding, bindToTarget }