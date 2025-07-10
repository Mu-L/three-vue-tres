<script setup lang="ts">
import { watch, inject } from 'vue'
import { Levioso, ContactShadows, useGLTF, useAnimations } from '@tresjs/cientos'

const props = defineProps({
    color: {
        type: String,
        required: true,
    },
})

const { nodes, animations } = (await useGLTF(
    `${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn'}/model/eCommerce/eFan/nFan.gltf`,
)) as any

const modelAttUVarr = (name: any) => nodes.Sketchfab_model.getObjectByName(name).geometry.attributes.uv.array
//备份原始UV值
const srcUVslist = {
    Object_4: new Float32Array(modelAttUVarr('Object_4')),
    Object_8: new Float32Array(modelAttUVarr('Object_8')),
    Object_6: new Float32Array(modelAttUVarr('Object_6')),
    Object_6001: new Float32Array(modelAttUVarr('Object_6001')),
}
const setColorUV = (color: any) => {
    const colorList = {
        '#ff8b04': 0,
        '#999999': 0.04,
        '#d3ac10': 0.19,
        '#ffbec4': -0.06,
        '#d0d5c6': 0.55,
    } as any
    for (const [key, value] of Object.entries(srcUVslist)) {
        for (let i = 0; i < modelAttUVarr(key).length; i++) {
            modelAttUVarr(key)[i] = value[i] + colorList[color]
        }
        nodes.Sketchfab_model.getObjectByName(key).geometry.getAttribute('uv').needsUpdate = true
    }
}

const switcherModel = nodes.Sketchfab_model.getObjectByName('Object_6001')
const { actions } = useAnimations(animations, nodes.Sketchfab_model)
const currentAction = actions.Animation
// currentAction.play()
const animationPlay = inject('animationPlay') as any
watch(
    () => props.color,
    (color) => {
        setColorUV(color)
    },
    { immediate: true },
)
watch(
    () => animationPlay.value,
    (play) => {
        if (play) {
            currentAction.reset().play()
            switcherModel?.rotateY(-Math.PI)
        } else {
            currentAction.fadeOut(0.6).paused = true
            switcherModel?.rotateY(Math.PI)
        }
    },
    { immediate: true },
)

</script>

<template>
    <Levioso :range="[-0.5, -0.5]" :speed="2">
        <primitive :position="[-2, 0, 0]" :object="nodes.Sketchfab_model" :scale="3.0" />
    </Levioso>
    <ContactShadows :opacity="0.3" :blur="2.6" :position="[0, -2, 0]" />
</template>
