<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-09-19 10:02:15
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 17:37:22
-->
<template>
    <TresGroup ref="tgRef" :rotate-y="Math.PI"></TresGroup>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'

// 目前这部分 每一个模型的都在它自己得DropInViewer中维护，无法在外部进行管理，所以编辑器不用这个库来维护
const viewer = new GaussianSplats3D.DropInViewer({
    sharedMemoryForWorkers: false,
    dynamicScene: true,
})

viewer.addSplatScenes(
    [
        {
            path: './plugins/gaussianSplatting/model/luigi.ply',
            splatAlphaRemovalThreshold: 5,
        },
    ],
    true,
)

const tgRef = ref(null) as any
watch(tgRef, (tg) => {
    viewer.children[0].geometry.setAttribute('position',[]) // @mkkellogg/gaussian-splats-3d 兼容tres.js 的bugger
    tg.add(viewer) 
})
// setTimeout(() => {
// 	viewer.removeSplatScene(0)
// }, 2000);

// viewer
//     .addSplatScenes(
//         [
//             {
//                 path: './plugins/gaussianSplatting/model/luigi.splat',
//                 splatAlphaRemovalThreshold: 5,
//             },
//         ],
//         true,
//     )
//     .then(() => {
//         scene.value.add(viewer)
// 		})

// const viewer = new (GaussianSplats3D as any).Viewer({
//     threeScene: scene.value,
//     selfDrivenMode: false,
//     renderer: renderer.value,
//     camera: camera.value,
//     useBuiltInControls: false,
//     ignoreDevicePixelRatio: false,
//     gpuAcceleratedSort: true,
//     enableSIMDInSort: true,
//     sharedMemoryForWorkers: false,
//     integerBasedSort: true,
//     halfPrecisionCovariancesOnGPU: true,
//     dynamicScene: false,
//     webXRMode: GaussianSplats3D.WebXRMode.None,
//     renderMode: GaussianSplats3D.RenderMode.OnChange,
//     sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
//     antialiased: false,
//     focalAdjustment: 1.0,
//     logLevel: GaussianSplats3D.LogLevel.None,
//     sphericalHarmonicsDegree: 0,
//     enableOptionalEffects: false,
//     inMemoryCompressionLevel: 2,
//     freeIntermediateSplatData: false,
// })
</script>
