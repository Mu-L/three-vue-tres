/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-13 16:23:57
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-06-16 08:42:54
 */
export default {
    name: 'gaussianSplatting',
    title: '高斯泼渐',
    intro: `关于高斯泼渐的最佳实践<br/>
    1、读取展示ply的点云文件<br/>
    2、读取展示splat的泼渐文件<br/>
    3、场景一是把高斯泼渐的格式 splat 转成 glb 再减面压缩后，适用于web场景的高效展示<br/>
    QA详情请见：<br/>
    <a style="color: #5384ff;" href="https://www.icegl.cn/ask/article/22762.html" target="_blank">高斯溅射的最佳实践[链接与教程]</a>`,
    version: '1.0.0',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    creatTime: '2025-06-13',
    updateTime: '2025-06-13',
    require: [],
    preview: [
        {
            src: 'plugins/gaussianSplatting/preview/plyPage.png',
            type: 'img',
            name: 'plyPage',
            title: '点云实例',
            disableFPSGraph: false,
            disableSrcBtn: false,
        },
        {
            src: 'plugins/gaussianSplatting/preview/splatPage.png',
            type: 'img',
            name: 'splatPage',
            title: 'splat实例',
            disableFPSGraph: false,
            disableSrcBtn: false,
        },
        {
            src: 'plugins/gaussianSplatting/preview/glb.png',
            type: 'img',
            name: 'glb',
            title: '转glb',
            disableFPSGraph: false,
            disableSrcBtn: false,
        },
    ],
}
