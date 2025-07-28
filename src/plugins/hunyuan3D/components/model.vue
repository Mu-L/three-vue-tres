<template>
    <TresGroup>
        <TresMesh :position="model.position" :rotation="model.rotation" :scale="model.scale" :geometry="model.geometry">
            <TresMeshBasicMaterial color="#ffff00" />
        </TresMesh>
    </TresGroup>
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('./plugins/hunyuan3D/model/icegl-bm.glb', {
    draco: true,
    decoderPath: './draco/',
})

const model = scene.children[0].children[0] as any
</script>
