<template></template>

<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'; //useRenderLoop
import { useTexture  } from '@tresjs/cientos';
import * as THREE from 'three';
import { postComposer } from '../common/postComposer.js';
import { deepCopy, generateUUID } from '../common/utils.js';

import { Pane } from 'tweakpane';
import InvertPass from '../shaders/invert-fs.glsl'
import FXAAPass from '../shaders/fxaa-fs.glsl'
import SSAOPass from '../shaders/ssao-fs.glsl'
import SEPIAPass from '../shaders/sepia-fs.glsl'
import SNOISEPass from '../shaders/noise-fs.glsl'
import BOXBLURPass from '../shaders/box-blur2-fs.glsl'
import DENOISEPass from '../shaders/denoise-fs.glsl'
import CGAPass from '../shaders/cga-fs.glsl'
import SOBELPass from '../shaders/sobel-fs.glsl'
import RGBPass from '../shaders/rgb-split-fs.glsl'
import DOTPass from '../shaders/dot-screen-fs.glsl'
import CIRCULARPass from '../shaders/circular-blur-fs.glsl'
import POISSONPass from '../shaders/poisson-disc-blur-fs.glsl'
import VIGNETTE2Pass from '../shaders/vignette2-fs.glsl'
import VIGNETTE1Pass from '../shaders/vignette-fs.glsl'
import FREICHENPass from '../shaders/frei-chen-fs.glsl'
import TOONPass from '../shaders/toon-fs.glsl'
import ASCIIPass from '../shaders/ascii-fs.glsl'

import depthfs from '../shaders/packed-depth-fs.glsl'
import depthvs from '../shaders/packed-depth-vs.glsl'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { watch } from 'vue';
const { camera, renderer, scene, sizes } = useTres();

var mergedGeometry = new THREE.BufferGeometry();

var boxGeometries = [];

for (var i = 0; i < 100; i++) {
    var boxGeometry = new THREE.BoxGeometry(100, 100, 100);
    boxGeometry.translate(Math.random() * 1500, Math.random() * 1500, Math.random() * 1500);
    boxGeometries.push(boxGeometry);
}
mergedGeometry = BufferGeometryUtils.mergeGeometries(boxGeometries);
const  { state: mapimg }  =  useTexture(
     'plugins/postProcessing/image/1324.jpg');
const  { state: normalmapimg }   =  useTexture( 'plugins/postProcessing/image/1324-normal.jpg');

var material = new THREE.MeshPhongMaterial({
 
    normalMap: normalmapimg.map,
    normalScale: new THREE.Vector2(0.8, -0.8),
    shininess: 100,
});
var model = new THREE.Mesh(mergedGeometry, material);
model.castShadow = true;
model.receiveShadow = true;
scene.value.add(model);
const Composer = new postComposer(renderer, {
    useRGBA: true,
});

const pane = new Pane();
let addPassInfo: any = null;

let listData = [
    { text: 'InvertPass', value: { InvertPass } },
    { text: 'FXAAPass', value: { FXAAPass } },
    { text: 'SEPIAPass', value: { SEPIAPass, params: { amount: 10 } } },
    { text: 'SNOISEPass', value: { SNOISEPass, params: { amount: 0.1, speed: 0 } } },
    { text: 'BOXBLURPass', value: { BOXBLURPass, params: { deltax: 10, deltay: 10, taps: 1 } } },
    { text: 'DENOISEPass', value: { DENOISEPass, params: { exponent: 1, strength: 10 } } },
    { text: 'CGAPass', value: { CGAPass, params: { pixelDensity: 4, cgaMap: normalmapimg.map } } },
    { text: 'SOBELPass', value: { SOBELPass } },
    { text: 'RGBPass', value: { RGBPass, params: { x: 1000, y: 1000 } } },
    { text: 'DOTPass', value: { DOTPass } },
    { text: 'CIRCULARPass', value: { CIRCULARPass } },
    { text: 'POISSONPass', value: { POISSONPass } },
    { text: 'VIGNETTE1Pass', value: { VIGNETTE1Pass, params: { falloff: 10, amount: 2 } } },
    { text: 'VIGNETTE2Pass', value: { VIGNETTE2Pass, params: { reduction: 10, boost: 2 } } },
    { text: 'FREICHENPass', value: { FREICHENPass } },
    { text: 'TOONPass', value: { TOONPass } },
];
let key = 'InvertPass';
let value = InvertPass;
let params: any = null;
pane.addBlade({
    view: 'list',
    label: '后处理类型',
    options: listData,
    value: '',
}).on('change', (e) => {
    addPassInfo = e.value;
});
const btn = pane.addButton({
    title: '新增',
    label: '新增通道', // optional
});
let count = 0;
btn.on('click', (e) => {
    key = Object.keys(addPassInfo)[0];
    value = Object.values(addPassInfo)[0];
    params = Object.values(addPassInfo)[1];
    let uuid = count++;
    let f1 = pane.addFolder({
        title: key,
    });
    for (const keyindex in params) {
        let element = params[keyindex];
        f1.addBlade({
            view: 'text',
            label: keyindex,
            parse: (v) => String(v),
            value: element,
        });
    }
    const removebtn = f1
        .addButton({
            title: `移除~${uuid}`,
            label: '关闭通道', // optional
        })
        .on('click', (e) => {
            let uuid = e.target.title.split('~')[1]; // 使用 split() 方法拆分字符串，并获取第二部分
            Composer.removePass(uuid);
        });

    removebtn.on('click', () => {
        f1.dispose();
    });

    let newParams = deepCopy(params, e.target.label, e.value);
    Composer.addPass(key, value, newParams, uuid);
});
Composer.onWindowResize(renderer, camera.value);
watch(
  () => mapimg.value,
  (mapv) => {
    if (mapv) {
      mapv.wrapS = THREE.RepeatWrapping
      material.map = mapv
    }
  }
)
watch(
  () => normalmapimg.value,
  (mapv) => {
    if (mapv) {
      mapv.wrapS = THREE.RepeatWrapping
      material.normalMap = mapv
    }
  }
)

const { onBeforeRender } = useLoop();
let stack: any = null;
onBeforeRender(({ delta }) => {
    if (model) {
        renderer.autoClearColor = true;
        Composer.Reset();

        model.material = material;
        Composer.render(scene.value, camera.value);
        // stack = Composer.Stack;
        // console.log(stack);
        Composer.pass();
        Composer.toScreen(scene.value, camera.value);
    }
});
</script>
<style scoped>
.tp-rotv_c {
    height: 500px;
}
</style>
