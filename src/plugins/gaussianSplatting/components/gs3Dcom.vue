<template>
    <primitive :object="viewer" :rotate-y="Math.PI" />
</template>
<script lang="ts" setup>
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
