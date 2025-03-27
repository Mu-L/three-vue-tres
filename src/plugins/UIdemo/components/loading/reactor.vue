<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-03-13 17:14:11
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-03-27 08:42:47
-->
<template>
    <div class="container circle" v-if="!hasFinishLoading">
        <div class="box1 circle center"></div>
        <div class="box2 circle center"></div>
        <div class="box3 circle center"></div>
        <div class="box4 circle center"></div>
        <div class="box5 circle center"></div>
        <div class="box6 circle">
            <div class="coil" style="--i: 0"></div>
            <div class="coil" style="--i: 1"></div>
            <div class="coil" style="--i: 2"></div>
            <div class="coil" style="--i: 3"></div>
            <div class="coil" style="--i: 4"></div>
            <div class="coil" style="--i: 5"></div>
            <div class="coil" style="--i: 6"></div>
            <div class="coil" style="--i: 7"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hasPlugin } from '@/common/utils'
import { useProgress } from '@tresjs/cientos'
import { Resource } from 'PLS/resourceManager'

const props = withDefaults(
    defineProps<{
        isDemo?: boolean
        showProgress?: boolean
        useResourceManager?: boolean
    }>(),
    {
        isDemo: false,
        showProgress: true,
        useResourceManager: false,
    },
)

let progress = null as any
let hasFinishLoading = null as any

if (props.useResourceManager) {
    if (hasPlugin('resourceManager', '资源管理器插件')) {
        // const modules = import.meta.glob('/src/plugins/resourceManager/index.js')
        // const { Resource } = await modules['/src/plugins/resourceManager/index.js']()
        progress = Resource.progress
        hasFinishLoading = Resource.hasAllFinished
    }
} else {
    const uP = await useProgress()
    progress = uP.progress
    hasFinishLoading = uP.hasFinishLoading
}

const animloop = () => {
    if (progress.value++ > 100) {
        progress.value = 0
    }
    requestAnimationFrame(animloop)
}
if (props.isDemo) {
    requestAnimationFrame(animloop)
}
</script>

<style lang="scss" scoped>

/* 定义一下几个盒子相同的部分 */
.circle {
	/* 圆形 */
	border-radius: 50%;
}
.center {
	position: absolute;
	top: 50%;
	left: 50%;
	/* 元素走自身高度/宽度 的一半 */
	transform: translate(-50%, -50%);
}
.container {
	/* 相对定位 */
	position: relative;
    top:calc(50vh - 150px) ;
    left:calc(50% - 150px) ;
	width: 300px;
	height: 300px;
	border: 1px solid rgb(18, 20, 20);
	background-color: #384c50;
	/* 盒子阴影 默认是外部阴影 写了inset 就是内部阴影 */
	box-shadow: 0 0 32px 8px rgb(18, 20, 20), 0 0 4px 1px rgb(18, 20, 20) inset;
}
.container .box1 {
	width: 238px;
	height: 238px;
	background-color: rgb(22, 26, 27);
	box-shadow: 0 0 4px 1px #52fefe;
}
.container .box2 {
	width: 220px;
	height: 220px;
	background-color: #fff;
	box-shadow: 0 0 5px 1px #52fefe, 0 0 5px 4px #52fefe inset;
}
.container .box3 {
	width: 180px;
	height: 180px;
	background-color: #073c4b;
	box-shadow: 0 0 5px 4px #52fefe, 0 0 6px 2px #52fefe inset;
}
.container .box4 {
	width: 120px;
	height: 120px;
	border: 1px solid #52fefe;
	background-color: #fff;
	box-shadow: 0 0 2px 1px #52fefe, 0 0 10px 5px #52fefe inset;
}
.container .box5 {
	width: 70px;
	height: 70px;
	border: 5px solid #1b4e5f;
	box-shadow: 0 0 7px 5px #52fefe, 0 0 10px 10px #52fefe inset;
}
.container .box6 {
	position: relative;
	width: 100%;
	height: 100%;
	/* 动画 名称 时长 linear 是匀速运动 infinite是无限次播放 */
	animation: rotate 3s linear infinite;
}
.container .box6 .coil {
	position: absolute;
	width: 30px;
	height: 20px;
	/* calc方法自动计算位移距离 */
	top: calc(50% - 110px);
	left: calc(50% - 15px);
	background-color: #073c4b;
	box-shadow: 0 0 5px #52fefe inset;
	/* calc方法自动计算数值 var函数调用了我们刚刚给元素定义的--i属性值 然后分别乘以45度 算出各自的度数 */
	transform: rotate(calc(var(--i) * 45deg));
	/* 这个是旋转的中心 */
	transform-origin: center 110px;
}
/* 定义一下旋转动画 */
@keyframes rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
