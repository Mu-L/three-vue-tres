
	<template>
	<primitive :object="glbsGroup" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as THREE from 'three'
import { Resource } from 'PLS/resourceManager'
import { standardizationMeshCopy } from '@/common/forEditor'
import { useAnimations } from '@tresjs/cientos'

const setupLightingForModel = (selectedMesh: THREE.Object3D, value: boolean, type: string) => {
    selectedMesh.traverse((child: any) => {
        if (child.isMesh) {
            child[type] = value
        }
    })
}
const syncMeshProp = (glb :THREE.Object3D, meshProp:any, animations:any) => {
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
	
            const oneglb0_0 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_0 = {"uuid":"576b1cc5-d02e-4b25-86f1-876392c10e8f","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":8.787,"y":0.019,"z":-1.437},"scale":{"x":4,"y":1,"z":8},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_0, op0_0, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_0)
            
            const oneglb0_1 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_1 = {"uuid":"e64bc3f2-b46e-4fa0-a3fd-14a0df53bbf0","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.28,"y":0.02,"z":2.61},"scale":{"x":2.5,"y":1,"z":2},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_1, op0_1, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_1)
            
            const oneglb0_2 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_2 = {"uuid":"bd279b01-83bc-420f-83bb-928faadebbd5","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-1.672,"y":0.02,"z":2.61},"scale":{"x":3,"y":1,"z":3},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_2, op0_2, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_2)
            
            const oneglb0_3 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_3 = {"uuid":"88d36d98-d9d2-4de1-ac88-372f54809ce4","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-0.073,"y":0.02,"z":-1.597},"scale":{"x":3,"y":1,"z":3},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_3, op0_3, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_3)
            
            const oneglb0_4 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_4 = {"uuid":"0bae698e-3dd7-49d0-8da4-77795f689986","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.025,"y":0.02,"z":-1.44},"scale":{"x":1.5,"y":1,"z":1.5},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_4, op0_4, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_4)
            
            const oneglb0_5 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_5 = {"uuid":"cc5994a9-4ba9-4ce2-a71c-f41802919d80","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-2.351,"y":0.02,"z":-5.746},"scale":{"x":6,"y":1,"z":3},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_5, op0_5, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_5)
            
            const oneglb0_6 = standardizationMeshCopy(Resource.getItem('floor.glb').scene)
            const op0_6 = {"uuid":"f8db597e-298e-4adc-9125-2b6a6b835103","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.788,"y":0.02,"z":-6.354},"scale":{"x":4,"y":1,"z":3},"renderOrder":0,"castShadow":false,"receiveShadow":true,"name":"floor","type":"Model","path":"./plugins/zone3Deditor/models/低像素市场/models/floor.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb0_6, op0_6, Resource.getItem('floor.glb').animations)
            glbsGroup.add(oneglb0_6)
            
            const oneglb1_0 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_0 = {"uuid":"29b4e0f2-6e7b-4ba8-8dfc-895cc0028994","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":7.79605991910698,"y":0,"z":0.251},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_0, op1_0, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_0)
            
            const oneglb1_1 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_1 = {"uuid":"18b2a5bb-e90f-4457-bb23-b1525e69dbaa","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":7.79605991910698,"y":0,"z":-1.354},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_1, op1_1, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_1)
            
            const oneglb1_2 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_2 = {"uuid":"77ce8987-c084-46b5-b85d-98ae345e0801","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":7.79605991910698,"y":0,"z":1.722},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_2, op1_2, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_2)
            
            const oneglb1_3 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_3 = {"uuid":"67da04f6-a95a-4f9b-8adb-67a8d01738db","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":7.79605991910698,"y":0,"z":-2.984},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_3, op1_3, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_3)
            
            const oneglb1_4 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_4 = {"uuid":"ec9c2d8c-38dd-4e56-a97e-3daf5a697554","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":7.79605991910698,"y":0,"z":-4.449},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_4, op1_4, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_4)
            
            const oneglb1_5 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_5 = {"uuid":"e8d675b4-fd69-4cdd-80fb-d8a93be56dea","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":9.789,"y":0.045,"z":1.722},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_5, op1_5, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_5)
            
            const oneglb1_6 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_6 = {"uuid":"b4d8c0ae-2df7-4fb7-910e-8971a5dddc14","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":9.783,"y":0,"z":0.251},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_6, op1_6, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_6)
            
            const oneglb1_7 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_7 = {"uuid":"d033e173-df6d-4e75-9c7f-a3c8e371ce4c","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":9.792,"y":0,"z":-1.354},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_7, op1_7, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_7)
            
            const oneglb1_8 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_8 = {"uuid":"3f8c943b-aa8e-4c80-b71c-41e79d8e0b29","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":9.796,"y":0,"z":-2.984},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_8, op1_8, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_8)
            
            const oneglb1_9 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_9 = {"uuid":"cebfed3a-c0e1-4b88-9e26-21dd4095d9f5","rotation":{"x":0,"y":1.4900000000000002,"z":0},"visible":true,"position":{"x":9.841000000000001,"y":0,"z":-4.449},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_9, op1_9, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_9)
            
            const oneglb1_10 = standardizationMeshCopy(Resource.getItem('gasTank.glb').scene)
            const op1_10 = {"uuid":"d0433574-5a31-481c-b500-1652601535fe","rotation":{"x":0,"y":1.4500000000000006,"z":0},"visible":true,"position":{"x":-1.673,"y":0.017,"z":3.528},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gasTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/gasTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb1_10, op1_10, Resource.getItem('gasTank.glb').animations)
            glbsGroup.add(oneglb1_10)
            
            const oneglb2_0 = standardizationMeshCopy(Resource.getItem('oilTruck.glb').scene)
            const op2_0 = {"uuid":"26706a27-6570-489c-81f0-b3fa430ab947","rotation":{"x":3.141592653589793,"y":-1.5615926535897844,"z":3.141592653589793},"visible":true,"position":{"x":11.32,"y":0.122,"z":1.25},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilTruck","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilTruck.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb2_0, op2_0, Resource.getItem('oilTruck.glb').animations)
            glbsGroup.add(oneglb2_0)
            
            const oneglb2_1 = standardizationMeshCopy(Resource.getItem('oilTruck.glb').scene)
            const op2_1 = {"uuid":"1b039658-4780-46b9-8d13-a0077581aa04","rotation":{"x":3.141592653589793,"y":-1.5615926535897844,"z":3.141592653589793},"visible":true,"position":{"x":11.332,"y":0.138,"z":-1.32},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilTruck","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilTruck.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb2_1, op2_1, Resource.getItem('oilTruck.glb').animations)
            glbsGroup.add(oneglb2_1)
            
            const oneglb2_2 = standardizationMeshCopy(Resource.getItem('oilTruck.glb').scene)
            const op2_2 = {"uuid":"e4128341-fa43-4652-80eb-90f397e1316d","rotation":{"x":3.141592653589793,"y":-1.5615926535897844,"z":3.141592653589793},"visible":true,"position":{"x":11.339,"y":0.088,"z":-3.8930000000000002},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilTruck","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilTruck.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb2_2, op2_2, Resource.getItem('oilTruck.glb').animations)
            glbsGroup.add(oneglb2_2)
            
            const oneglb3_0 = standardizationMeshCopy(Resource.getItem('cCringUnit.glb').scene)
            const op3_0 = {"uuid":"72ba200e-284d-4d95-9b8f-705614a7c149","rotation":{"x":-3.141592653589793,"y":1.545906008118207,"z":-3.141592653589793},"visible":true,"position":{"x":4.369,"y":0.036000000000000004,"z":2.6601508132022422},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"cCringUnit","type":"Model","path":"http://localhost:4000/static/4低像素/models/cCringUnit.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb3_0, op3_0, Resource.getItem('cCringUnit.glb').animations)
            glbsGroup.add(oneglb3_0)
            
            const oneglb4_0 = standardizationMeshCopy(Resource.getItem('house.glb').scene)
            const op4_0 = {"uuid":"85b5bae1-8803-4ad8-902c-df31537030c0","rotation":{"x":-3.141592653589793,"y":1.5615926535898086,"z":-3.141592653589793},"visible":true,"position":{"x":-1.449,"y":0.091,"z":2.003},"scale":{"x":2,"y":2,"z":2},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"house","type":"Model","path":"http://localhost:4000/static/4低像素/models/house.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb4_0, op4_0, Resource.getItem('house.glb').animations)
            glbsGroup.add(oneglb4_0)
            
            const oneglb5_0 = standardizationMeshCopy(Resource.getItem('ccUnit.glb').scene)
            const op5_0 = {"uuid":"9e4abbd0-b245-4a83-b96b-81ce55bebb66","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.285,"y":0.914,"z":2.274},"scale":{"x":0.3,"y":0.3,"z":0.3},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"ccUnit","type":"Model","path":"http://localhost:4000/static/4低像素/models/ccUnit.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb5_0, op5_0, Resource.getItem('ccUnit.glb').animations)
            glbsGroup.add(oneglb5_0)
            
            const oneglb6_0 = standardizationMeshCopy(Resource.getItem('oilHeater.glb').scene)
            const op6_0 = {"uuid":"a79ce505-e268-4d34-bfc4-3a516f3efe5d","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-0.088834118311226,"y":0.055,"z":-1.4384752323294805},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilHeater","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilHeater.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb6_0, op6_0, Resource.getItem('oilHeater.glb').animations)
            glbsGroup.add(oneglb6_0)
            
            const oneglb7_0 = standardizationMeshCopy(Resource.getItem('tower.glb').scene)
            const op7_0 = {"uuid":"bdb80b7c-76db-42e4-b368-b6a214d786cc","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.0600000000000005,"y":0,"z":-1.391},"scale":{"x":0.8,"y":0.8,"z":0.8},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"tower","type":"Model","path":"http://localhost:4000/static/4低像素/models/tower.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb7_0, op7_0, Resource.getItem('tower.glb').animations)
            glbsGroup.add(oneglb7_0)
            
            const oneglb8_0 = standardizationMeshCopy(Resource.getItem('oilTank.glb').scene)
            const op8_0 = {"uuid":"e9ff16a4-27a6-4f44-9b53-3e4da147d9d8","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-3.709,"y":0.064,"z":-5.523},"scale":{"x":3,"y":3,"z":3},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb8_0, op8_0, Resource.getItem('oilTank.glb').animations)
            glbsGroup.add(oneglb8_0)
            
            const oneglb8_1 = standardizationMeshCopy(Resource.getItem('oilTank.glb').scene)
            const op8_1 = {"uuid":"2bf85ed6-a4ea-4ffb-b64c-5c5633d3fe34","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":-0.904,"y":0.043000000000000003,"z":-5.523},"scale":{"x":3,"y":3,"z":3},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"oilTank","type":"Model","path":"http://localhost:4000/static/4低像素/models/oilTank.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb8_1, op8_1, Resource.getItem('oilTank.glb').animations)
            glbsGroup.add(oneglb8_1)
            
            const oneglb9_0 = standardizationMeshCopy(Resource.getItem('machine.glb').scene)
            const op9_0 = {"uuid":"c77534fe-5b7d-4183-b79f-5bc19e23328d","rotation":{"x":3.141592653589793,"y":-1.5315926535897928,"z":3.141592653589793},"visible":true,"position":{"x":3.93,"y":0,"z":-6.9670000000000005},"scale":{"x":1.8,"y":1.8,"z":1.8},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"machine","type":"Model","path":"http://localhost:4000/static/4低像素/models/machine.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb9_0, op9_0, Resource.getItem('machine.glb').animations)
            glbsGroup.add(oneglb9_0)
            
            const oneglb10_0 = standardizationMeshCopy(Resource.getItem('srUnit.glb').scene)
            const op10_0 = {"uuid":"fc93bb6b-b3cd-4cc3-ba49-4f3549c71a53","rotation":{"x":0,"y":-0.23000000000000012,"z":0},"visible":true,"position":{"x":5.85508464374394,"y":0,"z":-6.939710421081546},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"srUnit","type":"Model","path":"http://localhost:4000/static/4低像素/models/srUnit.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb10_0, op10_0, Resource.getItem('srUnit.glb').animations)
            glbsGroup.add(oneglb10_0)
            
            const oneglb11_0 = standardizationMeshCopy(Resource.getItem('tank2.glb').scene)
            const op11_0 = {"uuid":"04a1ac61-18c3-4406-808c-e867b18df1b8","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":5.809887141081189,"y":0,"z":-5.567},"scale":{"x":1.5,"y":1.5,"z":1.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"tank2","type":"Model","path":"http://localhost:4000/static/4低像素/models/tank2.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb11_0, op11_0, Resource.getItem('tank2.glb').animations)
            glbsGroup.add(oneglb11_0)
            
            const oneglb12_0 = standardizationMeshCopy(Resource.getItem('gtUnit.glb').scene)
            const op12_0 = {"uuid":"f3b12e77-c792-47dd-ab80-68bc3ab83d7c","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":3.295,"y":0,"z":-5.45},"scale":{"x":0.5,"y":0.5,"z":0.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gtUnit","type":"Model","path":"http://localhost:4000/static/4低像素/models/gtUnit.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb12_0, op12_0, Resource.getItem('gtUnit.glb').animations)
            glbsGroup.add(oneglb12_0)
            
            const oneglb12_1 = standardizationMeshCopy(Resource.getItem('gtUnit.glb').scene)
            const op12_1 = {"uuid":"2856dbbc-e196-4cea-b56e-d56df961fc7a","rotation":{"x":0,"y":0,"z":0},"visible":true,"position":{"x":4.188,"y":0,"z":-5.45},"scale":{"x":0.5,"y":0.5,"z":0.5},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"gtUnit","type":"Model","path":"http://localhost:4000/static/4低像素/models/gtUnit.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb12_1, op12_1, Resource.getItem('gtUnit.glb').animations)
            glbsGroup.add(oneglb12_1)
            
            const oneglb13_0 = standardizationMeshCopy(Resource.getItem('flaringDevice.glb').scene)
            const op13_0 = {"uuid":"5bcd1a21-20c2-4a1f-b7e3-78c24d53a57b","rotation":{"x":-3.141592653589793,"y":0.02159265358979313,"z":-3.141592653589793},"visible":true,"position":{"x":5.635,"y":0.079,"z":-2.734},"scale":{"x":1,"y":1,"z":1},"renderOrder":0,"castShadow":true,"receiveShadow":false,"name":"flaringDevice","type":"Model","path":"http://localhost:4000/static/4低像素/models/flaringDevice.glb","isCollision":true,"canSelect":true,"actionList":{"timeScale":1,"actions":{}}}
            syncMeshProp(oneglb13_0, op13_0, Resource.getItem('flaringDevice.glb').animations)
            glbsGroup.add(oneglb13_0)
            </script>