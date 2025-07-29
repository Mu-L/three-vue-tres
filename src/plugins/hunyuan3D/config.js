/*
 * @Description:
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-07-28 15:11:28
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-07-29 11:11:07
 */
export default {
    name: 'hunyuan3D',
    title: '结合混元3D图生模型',
    intro: `使用最新的腾迅混元3D图生模型，从图像中生成3D模型，本地部署，自动导入tvt.js三维场景中。</br>
    Hunyuan3D-2代码 github地址：<a style="color:#5384ff;" href="github.com/Tencent-Hunyuan/Hunyuan3D-2" target="_blank">https://github.com/Tencent-Hunyuan/Hunyuan3D-2</a></br>
    Hunyuan3D-2模型 huggingface地址：<a style="color:#5384ff;" href="huggingface.co/tencent/Hunyuan3D-2" target="_blank">https://huggingface.co/tencent/Hunyuan3D-2</a></br>`,
    version: '1.0.0',
    author: '地虎降天龙',
    website: 'https://gitee.com/hawk86104',
    state: 'active',
    creatTime: '2025-07-28',
    updateTime: '2025-07-28',
    require: [],
    preview: [
        {
            src: 'plugins/hunyuan3D/preview/index.png',
            type: 'img',
            name: 'index',
            title: '导入混元模型',
            disableFPSGraph: false,
            disableSrcBtn: false,
        },
    ],
}
