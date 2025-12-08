<template>
    <primitive :object="glbsGroup" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref } from 'vue'
import { Resource } from 'PLS/resourceManager'
import { standardizationMeshCopy, meshAddEvent, onReadySenceOnce } from '@/common/forEditor'
import { useAnimations } from '@tresjs/cientos'

const setupLightingForModel = (selectedMesh: THREE.Object3D, value: boolean, type: string) => {
    selectedMesh.traverse((child: any) => {
        if (child.isMesh) {
            child[type] = value
        }
    })
}
const syncMeshProp = (glb: THREE.Object3D, meshProp: any, animations: any) => {
    glb.uuid = meshProp.uuid
    glb.name = meshProp.name
    glb.rotation.set(meshProp.rotation.x, meshProp.rotation.y, meshProp.rotation.z)
    glb.position.set(meshProp.position.x, meshProp.position.y, meshProp.position.z)
    glb.scale.set(meshProp.scale.x, meshProp.scale.y, meshProp.scale.z)
    // glb.updateMatrixWorld(true)
    glb.visible = meshProp.visible
    glb.renderOrder = meshProp.renderOrder
    glb.castShadow = meshProp.castShadow
    glb.receiveShadow = meshProp.receiveShadow
    setupLightingForModel(glb, meshProp.castShadow, 'castShadow')
    setupLightingForModel(glb, meshProp.receiveShadow, 'receiveShadow')

    // 同步动画
    if (animations && meshProp.actionList && meshProp.actionList.actions && Object.keys(meshProp.actionList.actions).length > 0) {
        const { mixer, actions } = useAnimations(ref(animations), glb as any)
        mixer.value.timeScale = meshProp.actionList.timeScale || 1
        Object.keys(meshProp.actionList.actions).forEach((actionName) => {
            if (actions[actionName]) {
                if (meshProp.actionList.actions[actionName] !== 0) {
                    actions[actionName].play()
                }
            }
        })
    }
}

const glbsGroup = new THREE.Group()

const oneglb0_0 = standardizationMeshCopy(Resource.getItem('灯塔B.glb').scene) as any
const op0_0 = { "uuid": "4c8821f0-8ef6-41c0-a964-6b447bd56239", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": -89.642, "y": -0.784, "z": -79.459 }, "scale": { "x": 0.2, "y": 0.2, "z": 0.2 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "灯塔B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/灯塔B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb0_0, op0_0, Resource.getItem('灯塔B.glb').animations)
glbsGroup.add(oneglb0_0)

const oneglb1_0 = standardizationMeshCopy(Resource.getItem('货轮B.glb').scene) as any
const op1_0 = { "uuid": "670f59b7-487c-4cec-aaed-328e392965ff", "rotation": { "x": 0.011340316950557396, "y": 0.000015718236624510755, "z": 0.0027720668085343394 }, "visible": true, "position": { "x": 4.891, "y": -1.189124326363998, "z": 10.46 }, "scale": { "x": 0.6, "y": 0.6, "z": 0.6 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "货轮B", "type": "Model", "path": "http://localhost:4000/static/3船/models/货轮B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb1_0, op1_0, Resource.getItem('货轮B.glb').animations)
glbsGroup.add(oneglb1_0)

meshAddEvent(oneglb1_0, [
    {
        eventType: 'click',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("单击事件:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'doubleclick',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("双击事件:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'contextmenu',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("鼠标右键:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'pointerenter',
        enabled: true,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            window.tvtDomPanel2visible.value = true
            document.body.style.cursor = 'pointer'
            console.log("鼠标移入:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'pointerleave',
        enabled: true,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            window.tvtDomPanel2visible.value = false
            document.body.style.cursor = 'default'
            console.log("鼠标移出:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    },])

const oneglb2_0 = standardizationMeshCopy(Resource.getItem('游轮A.glb').scene) as any
const op2_0 = { "uuid": "75ef2b5c-62d6-4c23-b9c9-e8c2d6cd440a", "rotation": { "x": -0.028761572024479633, "y": 0.000053580117989377876, "z": -0.0037255517435211528 }, "visible": true, "position": { "x": -25.194, "y": -0.9499404222230202, "z": -44.363 }, "scale": { "x": 1, "y": 1, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "游轮A", "type": "Model", "path": "http://localhost:4000/static/3船/models/游轮A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb2_0, op2_0, Resource.getItem('游轮A.glb').animations)
glbsGroup.add(oneglb2_0)

meshAddEvent(oneglb2_0, [
    {
        eventType: 'click',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("单击事件:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'doubleclick',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("双击事件:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'contextmenu',
        enabled: false,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("鼠标右键:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'pointerenter',
        enabled: true,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            console.log("鼠标移入:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
            window.tvtDomPanel1visible.value = true
            document.body.style.cursor = 'pointer'
            console.log("鼠标移入:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    }, {
        eventType: 'pointerleave',
        enabled: true,
        function: (PointerEvent: any, currentObject: any, point: any, object: any, distance: any) => {
            window.tvtDomPanel1visible.value = false
            document.body.style.cursor = 'default'
            console.log("鼠标移出:" + currentObject.uuid, PointerEvent, currentObject, point, object, distance)
        }
    },])

const oneglb3_0 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_0 = { "uuid": "7229e153-93c4-446f-8c67-319ae4c40487", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": -20.865000000000002, "y": -0.523, "z": -102.563 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_0, op3_0, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_0)

const oneglb3_1 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_1 = { "uuid": "f0110b48-c960-4ce1-8e98-fbce2fdaa037", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": 31.039, "y": -0.523, "z": -144.81900000000002 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_1, op3_1, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_1)

const oneglb3_2 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_2 = { "uuid": "c5c14774-7b51-4bcc-906d-f1706d951c0a", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": -18.967, "y": -0.523, "z": -155.776 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_2, op3_2, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_2)

const oneglb3_3 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_3 = { "uuid": "a4b5c472-ebbc-49f6-b4cb-241ef1dd8810", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": 6.238, "y": -0.523, "z": -150.404 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_3, op3_3, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_3)

const oneglb3_4 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_4 = { "uuid": "26aa2615-d20b-4d82-8106-a896781540a8", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": 3.747, "y": -0.523, "z": -100.664 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_4, op3_4, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_4)

const oneglb3_5 = standardizationMeshCopy(Resource.getItem('风电机B.glb').scene) as any
const op3_5 = { "uuid": "87cc1f5b-334b-4dfd-b846-ffdabb6d80f9", "rotation": { "x": -3.141592653589793, "y": 0.8915926535897933, "z": -3.141592653589793 }, "visible": true, "position": { "x": 29.54, "y": -0.523, "z": -97.354 }, "scale": { "x": 1, "y": 1.2, "z": 1 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机B", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机B.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "WindTurbines": 1 } } }
syncMeshProp(oneglb3_5, op3_5, Resource.getItem('风电机B.glb').animations)
glbsGroup.add(oneglb3_5)

const oneglb4_0 = standardizationMeshCopy(Resource.getItem('风电机A.glb').scene) as any
const op4_0 = { "uuid": "5ae98182-959e-4790-99c4-697f3a71f972", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": -47.114000000000004, "y": -0.49, "z": -116.732 }, "scale": { "x": 2, "y": 2.5, "z": 2 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "风电机A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/风电机A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": { "TurbineRotation": 1 } } }
syncMeshProp(oneglb4_0, op4_0, Resource.getItem('风电机A.glb').animations)
glbsGroup.add(oneglb4_0)

const oneglb5_0 = standardizationMeshCopy(Resource.getItem('浮标A.glb').scene) as any
const op5_0 = { "uuid": "52df6326-8128-4687-a752-51b56df75185", "rotation": { "x": 0.14006728658097345, "y": 0.010700356584025858, "z": 0.15224562763014243 }, "visible": true, "position": { "x": -76.925, "y": -2.7408526475183908, "z": -18.594 }, "scale": { "x": 0.02, "y": 0.02, "z": 0.02 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "浮标A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb5_0, op5_0, Resource.getItem('浮标A.glb').animations)
glbsGroup.add(oneglb5_0)

const oneglb5_1 = standardizationMeshCopy(Resource.getItem('浮标A.glb').scene) as any
const op5_1 = { "uuid": "f0c2641d-e5d5-47cd-b638-91cbaf06af5e", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": -54.084, "y": -0.86, "z": -18.071 }, "scale": { "x": 0.02, "y": 0.02, "z": 0.02 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "浮标A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb5_1, op5_1, Resource.getItem('浮标A.glb').animations)
glbsGroup.add(oneglb5_1)

const oneglb5_2 = standardizationMeshCopy(Resource.getItem('浮标A.glb').scene) as any
const op5_2 = { "uuid": "6200a408-1b9f-4073-824a-063ae623a5ba", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": -24.257, "y": -0.86, "z": -18.071 }, "scale": { "x": 0.02, "y": 0.02, "z": 0.02 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "浮标A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb5_2, op5_2, Resource.getItem('浮标A.glb').animations)
glbsGroup.add(oneglb5_2)

const oneglb5_3 = standardizationMeshCopy(Resource.getItem('浮标A.glb').scene) as any
const op5_3 = { "uuid": "c37ca173-1ffd-43d5-8645-254547b96e36", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": 9.359, "y": -0.86, "z": -18.071 }, "scale": { "x": 0.02, "y": 0.02, "z": 0.02 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "浮标A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb5_3, op5_3, Resource.getItem('浮标A.glb').animations)
glbsGroup.add(oneglb5_3)

const oneglb5_4 = standardizationMeshCopy(Resource.getItem('浮标A.glb').scene) as any
const op5_4 = { "uuid": "59a38498-8204-4279-8d6b-c84704941f3c", "rotation": { "x": 0, "y": 0, "z": 0 }, "visible": true, "position": { "x": 42.304, "y": -0.86, "z": -18.071 }, "scale": { "x": 0.02, "y": 0.02, "z": 0.02 }, "renderOrder": 0, "castShadow": false, "receiveShadow": false, "name": "浮标A", "type": "Model", "path": "https://oss.icegl.cn/p/modelServer/models/4海上标识/models/浮标A.glb", "isCollision": true, "canSelect": true, "actionList": { "timeScale": 1, "actions": {} } }
syncMeshProp(oneglb5_4, op5_4, Resource.getItem('浮标A.glb').animations)
glbsGroup.add(oneglb5_4)

setTimeout(() => { onReadySenceOnce(); }, 1500)
</script>