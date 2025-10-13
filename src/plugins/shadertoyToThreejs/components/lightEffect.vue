<!--
 * @Descripttion: 
 * @version: 
 * @Author: Jsonco
 * @Date: 2023-11-29 20:09:06
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-10-13 08:00:22
-->
<template></template>

<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core';
import { Vector2 } from 'three';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import VERTEX from '../shaders/light.vert'
import FRAGMENT from '../shaders/light.frag'

const { camera, renderer, scene, sizes } = useTres();

const { onBeforeRender,render } = useLoop();

const resolution = new Vector2(window.innerWidth, window.innerHeight);
const drawShader = {
    uniforms: {
        iResolution: { type: 'v2', value: resolution },
        iTime: { type: 'f', value: null },
        tDiffuse: { value: null },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
};

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene.value, camera.value));
const pass = new ShaderPass(drawShader);
// pass.renderToScreen = true;
composer.addPass(pass);

onBeforeRender(({ elapsed }) => {
    pass.uniforms.iTime.value = elapsed * 0.3;
    composer.render();
})
</script>
