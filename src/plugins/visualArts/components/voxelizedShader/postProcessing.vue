<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-01-10 14:37:39
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-01-10 15:01:53
-->
<template></template>
<script setup lang="ts">
import { watch } from 'vue'
import * as THREE from 'three'
import { useTresContext, useLoop, useRenderLoop } from '@tresjs/core'

const props = defineProps({
    use: { default: true },
    start: { default: 0 },
    translate: { default: 0 },
})

const { camera, renderer, scene, sizes } = useTresContext() as any

const sourceRenderTarget = new THREE.WebGLRenderTarget(sizes.width.value, sizes.height.value)
let renderTarget1 = new THREE.WebGLRenderTarget(sizes.width.value, sizes.height.value)
let renderTarget2 = new THREE.WebGLRenderTarget(sizes.width.value, sizes.height.value)

const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
orthoCamera.position.z = 1
const orthoScene = new THREE.Scene()
const postQuad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
        uniforms: {
            current: { value: null },
            prev: { value: null },
            start: { value: props.start },
            time: { value: 0 },
            translate: { value: props.translate },
        },
        vertexShader: `
        varying vec2 vUv;
        void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
            `,
        fragmentShader: `
        uniform sampler2D current;
        uniform sampler2D prev;
        uniform float start;
        uniform float time;
        uniform float translate;
        varying vec2 vUv;
        void main(){
            float PI = 3.14159265359;
            vec2 uv = vUv;
            uv -= vec2(0.5);
            uv *= vec2(2., 1.);
            uv.y += translate;
            uv /= 4.;
            
            uv.x += sin(uv.y * PI * 4. + time*0.3)*0.15;
            uv.x += sin(uv.y * PI * 16. + time*0.5)*0.15;

            uv += vec2(0.5);

            uv = mix(vUv,uv, start);

            vec4 currentColor = texture2D(current, uv);
            vec4 prevColor = texture2D(prev,vUv);

            vec4 color = vec4(mix( prevColor.rgb, currentColor.rgb, 0.05), 1.0);
            gl_FragColor = color;
            //gl_FragColor = vec4(vUv, 0.0, 1.0);
    }`,
    }),
)
orthoScene.add(postQuad)

const finalScene = new THREE.Scene()
const finalQuad = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: null,
    }),
)
finalScene.add(finalQuad)

const { render } = useLoop()
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
    postQuad.material.uniforms.time.value = elapsed
})
render(() => {
    if (props.use) {
        renderer.value.setRenderTarget(sourceRenderTarget)
        renderer.value.render(scene.value, camera.value)
        postQuad.material.uniforms.current.value = sourceRenderTarget.texture
        postQuad.material.uniforms.prev.value = renderTarget1.texture

        renderer.value.setRenderTarget(renderTarget2)
        renderer.value.render(orthoScene, orthoCamera)

        finalQuad.material.map = renderTarget1.texture
        renderer.value.setRenderTarget(null)
        renderer.value.render(finalScene, orthoCamera)

        // swap render targets
        const temp = renderTarget1
        renderTarget1 = renderTarget2
        renderTarget2 = temp

        renderer.value.render(orthoScene, orthoCamera)
    } else {
        renderer.value.render(scene.value, camera.value)
    }
})

watch(
    () => [props.start, props.translate],
    ([start, translate]) => {
        postQuad.material.uniforms.start.value = start
        postQuad.material.uniforms.translate.value = translate
    },
)
</script>
