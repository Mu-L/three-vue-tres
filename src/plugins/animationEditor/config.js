/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2026-05-28 12:16:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-06-01 15:56:09
 */
export default {
    name: 'animationEditor',
    title: '动画编辑器',
    intro: `基于tvt.js的动画编辑器，支持动画编辑、动画播放、动画导出等功能<br>
    插件详情：<a style="color: #5384ff;" href="https://www.icegl.cn/tvtstore/animationEditor.html" target="_blank">icegl.cn/tvtstore/animationEditor</a><br>
    `,
    version: '1.0.0',
    author: 'Jsonco and Sunny',
    website: "https://www.icegl.cn/ask/experts.html",
    state: 'active',
    require: ['resourceManager'],
    tvtstore: 'LICENSE',
    preview: [
        {
            src: 'plugins/animationEditor/preview/预览图.png', type: 'img', name: 'index', title: '动画编辑器', disableFPSGraph: true,
            disableSrcBtn: true, url: 'https://animationeditor.icegl.cn/#/plugins/animationEditor/index',
        },

    ],
};
