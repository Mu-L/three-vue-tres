<template>
    <TresCanvas clearColor="#201919" window-size v-bind="state"  @loop="onLoop">
        <TresPerspectiveCamera :fov="60" :near="0.1" :far="2000" :position="[0, 10, -28]" />
        <TresAmbientLight :intensity="1" />
        <OrbitControls />
        <Suspense>
            <primitive :object="pState?.scene" v-if="pState"/>
        </Suspense>
    </TresCanvas>
</template>

<script setup lang="ts">
import { reactive, onMounted ,watch} from 'vue'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { useLoop  } from '@tresjs/core'
import { Pane } from 'tweakpane'
import * as TWEEN from '@tweenjs/tween.js'
import _ from 'lodash'
import * as THREE from 'three'

const { state: pState } =  useGLTF(`${process.env.NODE_ENV === 'development' ? 'resource.cos' : 'https://opensource.cdn.icegl.cn' }/model/operationTool/湖中小亭/湖中小亭.gltf`)

const state = reactive({
    alpha: true,
    antialias: true,
 
})
const twGroup = new TWEEN.Group()
const disintegrate = function () {
    pState?.value.scene.children.forEach((child, index) => {
        if (child.isMesh) {
            const boundingBox = new THREE.Box3().setFromObject(child)
            const childCenter = new THREE.Vector3()
            boundingBox.getCenter(childCenter)
            // let pos = childCenter.multiplyScalar(2);
            twGroup.add(new TWEEN.Tween(childCenter)
                .to(new THREE.Vector3(0, 0, 0), 3000)
                .onUpdate((val) => {
                    child.position.copy(val)
                })
                .start()
                .onComplete((val) => {}))
        }
    })
}
const explode = function () {
    pState?.value.scene.children.forEach((child, index) => {
        const origin = _.cloneDeep(child.position)
        child.userData.explode = {
            state: false,
            explode: origin,
        }
        if (child.isMesh) {
            const boundingBox = new THREE.Box3().setFromObject(child)
            const childCenter = new THREE.Vector3()
            boundingBox.getCenter(childCenter)
            const pos = childCenter.multiplyScalar(2)
            twGroup.add(new TWEEN.Tween(origin)
                .to(pos, 3000)
                .onUpdate((val) => {
                    child.position.copy(val)
                })
                .start()
                .onComplete((val) => {}))
        }
    })
}
onMounted(() => {
    const paneControl = new Pane({
        title: '炸开与还原',
        expanded: true,
    })
    // paneControl.containerElem_.style.top = '54px'

    const f1 = paneControl.addFolder({
        title: '参数',
    })

    f1.addButton({
        title: '炸开',
        label: '炸开', // optional
    }).on('click', () => {
        explode()
    })
    f1.addButton({
        title: '还原',
        label: '还原', // optional
    }).on('click', () => {
        disintegrate()
    })
})
watch(
  () => pState.value,
  (state) => {
    if (!state?.scene) return
    state.scene.updateMatrixWorld(true) // 强制更新
  }
)

const onLoop =function() {
 
    twGroup?.update()

}
// const { onBeforeRender  } = useLoop()

</script>

<style scoped></style>
