/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-11 08:59:53
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-11 09:47:42
 */

export default {
    name: 'zoneFreeScene',
    title: '编辑器直出免费项目',
    intro: `这里都是基于TVT区域场景编辑器直接编辑导出的场景，包含了全部源码、模型、编辑器配置等，方便大家快速二次开发和学习。<br>
    1、低像素炼油厂<br>
    全套项目源码：<a style="color: #5384ff;" href="https://gitee.com/ice-gl/icegl-three-vue-tres/blob/master/src/plugins/zoneFreeScene/pages/freeRefiningIndustry.vue" target="_blank">gitee源码跳转</a><br>
    基于编辑器的配置，用于二次编辑使用：<a style="color: #5384ff;" href="https://opensource.icegl.cn/plugins/zoneFreeScene/freeRefiningIndustry.json" target="_blank">freeRefiningIndustry.json</a><br>
    在线编辑器再次编辑后免费导出源码项目二开：<a style="color: #ef4035;" href="https://oss.icegl.cn/p/zone3Deditor/#/plugins/zone3Deditor/index?sceneConfig=freeRefiningIndustry" target="_blank">zone3Deditor页面跳转</a><br>
    `,
    version: '1.0.0',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    creatTime: '2025-09-11',
    updateTime: '2025-09-11',
    require: [],
    tvtstore: 'FREE',
    preview: [{ src: './plugins/zoneFreeScene/preview/freeRefiningIndustry.png', type: 'img', name: 'freeRefiningIndustry', title: '低像素炼油厂', disableFPSGraph: false, disableSrcBtn: false }],
}
