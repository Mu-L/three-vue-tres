/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-05-14 15:15:24
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-24 09:54:18
 */
export default {
    name: 'zone3Deditor',
    title: '区域场景编辑器',
    intro: `基于tvt生态的区域编辑器，用于快速落地园区、区域范围类的场景，导出配置或者源码，便于二次开发。<br>
    免费使用、免费预览、免费导入导出配置，以及按照自己得需求设计，引入自己得模型服务，编辑好后，免费导出插件源码进行二次开发。<br>
    1、测试用模型服务的管理器源码（内附说明）: <a style="color: #5384ff;" href="https://pan.quark.cn/s/eb755abf0f9c" target="_blank">modelServer.zip</a><br>
    2、测试用编辑器案例配置(最佳实践) : <a style="color: #5384ff;" href="https://oss.icegl.cn/p/zone3Deditor/plugins/zone3Deditor/TvTzone3Deditor.json" target="_blank">TvTzone3Deditor.json</a><br>
    3、测试用编辑器goview的配置 : <a style="color: #5384ff;" href="https://oss.icegl.cn/p/zone3Deditor/plugins/zone3Deditor/GoView.json" target="_blank">GoView.json</a><br>
    整体文档教程和插件下载详见：<a style="color: #5384ff;" href="https://www.icegl.cn/tvtstore/zone3Deditor" target="_blank">区域场景编辑器</a><br>
    QA:<br>
    1、导出插件包安装后，需要再安装下免费插件依赖： <a style="color: #5384ff;" href="https://www.icegl.cn/tvtstore/useViewportGizmo" target="_blank">ViewportGizmo插件</a><br>
    此插件会和tvt.js生态持续协同，不断加入组件，用于您项目的快速落地<br>`,
    version: '1.3.1',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    creatTime: '2025-04-18',
    updateTime: '2025-07-24',
    require: ['basic','digitalCity','floor','UIdemo','industry4','water'],
    tvtstore: 'LICENSE',
    preview: [
        {
            src: 'plugins/zone3Deditor/preview/index.png',
            type: 'img',
            name: 'index',
            title: '实例',
            disableFPSGraph: true,
            disableSrcBtn: true,
            url: 'https://oss.icegl.cn/p/zone3Deditor/#/plugins/zone3Deditor/index',
        },
        {
            src: '编辑好后的预览页面',
            type: 'text',
            name: 'preview',
            title: '预览页面',
            disableFPSGraph: false,
            disableSrcBtn: true,
            url: 'https://oss.icegl.cn/p/zone3Deditor/#/plugins/zone3Deditor/preview',
        },
        {
            src: 'plugins/zone3Deditor/preview/preview.png',
            type: 'img',
            name: 'pluginOne',
            title: '导出插件案例',
            disableFPSGraph: true,
            disableSrcBtn: true,
            url: 'https://oss.icegl.cn/p/zone3Deditor/#/plugins/zone3Deditor/pluginOne',
        },
    ],
}
