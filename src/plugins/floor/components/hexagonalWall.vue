<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Jsonco
 * @Date: 2025-06-05 09:50:35
 * @LastEditors: Jsonco
 * @LastEditTime: 2025-09-21 10:00:00
-->
<template>
    <primitive :object="scene" :position-y="0.01" />
</template>

<script setup lang="ts">
import { onMounted,watch } from 'vue'
import * as THREE from 'three'
import { useGLTF } from '@tresjs/cientos'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useTresContext, useTexture, useRenderLoop } from '@tresjs/core'
import { gsap } from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
const { renderer, scene: sceneValue, camera, sizes } = useTresContext()
const props = withDefaults(
    defineProps<{
        color?: string

    }>(),
    {
        color: '#7432B4',

    
    },
)
let effectComposer: EffectComposer | null = null

const textures = await useTexture({
    map: './plugins/floor/image/concrete_wet_floor_basecolor.jpg',
    normalMap: './plugins/floor/image/metal_plate_diff_1k.jpg'

})

const { scene, nodes } = await useGLTF('plugins/floor/models/topoBase/baseModelI.glb')

const meshData: Array<{
    mesh: THREE.Mesh,
    originalPosition: THREE.Vector3,
    scatteredPosition: THREE.Vector3
}> = []

let index = 0;
scene.traverse((child) => {
    index++;
    if (child instanceof THREE.Mesh) {
        const originalPosition = child.position.clone()
        
        const scatterRadius = 20 + Math.random() * 30
        const scatterAngle = Math.random() * Math.PI * 2
        const scatterHeight = (Math.random() - 0.5) * 20
        
        const scatteredPosition = new THREE.Vector3(
            originalPosition.x + Math.cos(scatterAngle) * scatterRadius,
            originalPosition.y + scatterHeight,
            originalPosition.z + Math.sin(scatterAngle) * scatterRadius
        )
        
        meshData.push({
            mesh: child,
            originalPosition: originalPosition,
            scatteredPosition: scatteredPosition
        })
        
        child.position.copy(scatteredPosition)
        
        if (child.name.includes('_')) {
            textures.map.wrapS = THREE.RepeatWrapping
            textures.map.wrapT = THREE.RepeatWrapping
            textures.map.repeat.set(10, 10)

            child.material.map = textures.map
            child.material.needsUpdate = true
            child.material.emissive = new THREE.Color('#7432B4')
            child.material.emissiveIntensity = 3.5
        } else {

            if (textures.map) {
                textures.normalMap.wrapS = THREE.RepeatWrapping
                textures.normalMap.wrapT = THREE.RepeatWrapping
                textures.normalMap.repeat.set(10, 10)
                child.material.map = textures.normalMap

            }

            child.material.color = new THREE.Color('#7432B4')
            child.material.metalness = 0.8
            child.material.roughness = 0.2
            child.material.envMapIntensity = 2.5
            child.material.needsUpdate = true
        }
    }
})

const createAssemblyAnimation = () => {
    if (meshData.length === 0) return
    
    const assemblyTimeline = gsap.timeline()
    
    meshData.forEach((data, index) => {
        const delay = Math.random() * 0.8
        
        const randomRotation = {
            x: (Math.random() - 0.5) * Math.PI * 2,
            y: (Math.random() - 0.5) * Math.PI * 2,
            z: (Math.random() - 0.5) * Math.PI * 2
        }
        
        data.mesh.rotation.set(randomRotation.x, randomRotation.y, randomRotation.z)
        
        assemblyTimeline.to(data.mesh.position, {
            x: data.originalPosition.x,
            y: data.originalPosition.y,
            z: data.originalPosition.z,
            duration: 3,
            ease: "power2.out",
            delay: delay
        }, 0)
        
        assemblyTimeline.to(data.mesh.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 3,
            ease: "power2.out",
            delay: delay
        }, 0)
    })
    
    assemblyTimeline.call(() => {
        startFloatingAnimations()
    })
    
    console.log(`开始拼合动画，共 ${meshData.length} 个mesh`)
}

const startFloatingAnimations = () => {
    meshData.forEach((data, index) => {
        gsap.to(data.mesh.position, {
            z: data.originalPosition.z + 3 + index / 50,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    })
    console.log('Z轴微动动画已启动')
}

const setupBloomEffect = () => {
    if (!renderer.value || !camera.value || !sizes.width.value) return
    effectComposer = new EffectComposer(renderer.value)
    const renderPass = new RenderPass(sceneValue.value, camera.value)
    effectComposer.addPass(renderPass)
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(sizes.width.value, sizes.height.value),
        0.6,
        0.05,
        0.25
    )
    effectComposer.addPass(bloomPass)
}

const setupEnvironment = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer.value);
    const environment = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(environment).texture;

    sceneValue.value.environment = envMap;

    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
            child.material.envMap = envMap;
            child.material.needsUpdate = true;
        }
    });

    environment.dispose();
};
const { onLoop } = useRenderLoop()
onLoop(() => {
    if (effectComposer) {
        effectComposer.render()
    }
})

onMounted(() => {
    setupEnvironment();
    setTimeout(() => {
        setupBloomEffect();
    }, 200);
    
    setTimeout(() => {
        createAssemblyAnimation();
    }, 100);
});

watch(
    () => [
        props.color,
    ],
    ([ color]) => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                child.material.color = new THREE.Color(color)
                child.material.emissive = new THREE.Color(color)
            }
        })
    },
)

</script>
