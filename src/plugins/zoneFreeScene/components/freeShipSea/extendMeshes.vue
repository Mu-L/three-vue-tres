<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-08 09:00:42
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-08 17:22:41
-->
<template>
    <TresGroup>

        <Suspense>
            <ribbonArrow :position="[-135.023, 0.1, 10.726]" :rotation="[-1.55, 0, 0]" :scale="[5, 5, 5]" name="滚动箭头组件"
                uuid="9d8aa48a-5303-4227-b335-f1740742de50" :castShadow="false" :receiveShadow="false" :renderOrder="0"
                :visible="true" v-bind="eMeshState0" />
        </Suspense>

        <Suspense>
            <ribbonArrow :position="[95.032, 0.1, -45.215]"
                :rotation="[-1.5915919188276957, -0.00017482726218845442, -3.1331871250633148]" :scale="[5, 5, 5]"
                name="滚动箭头组件" uuid="13b3c540-85ec-4529-93e8-a00027f08a3a" :castShadow="false" :receiveShadow="false"
                :renderOrder="0" :visible="true" v-bind="eMeshState1" />
        </Suspense>

        <Suspense>
            <shapesforEditor :position="[13.619, 0.851, 24.773]" :rotation="[0, 0, 0]" :scale="[7, 1, 1]" name="图形合集组件"
                uuid="59ba73a5-6d86-4c27-977e-78c95c7bb340" :castShadow="false" :receiveShadow="false" :renderOrder="0"
                :visible="true" v-bind="eMeshState2" />
        </Suspense>

        <Suspense>
            <generalFont :position="[11.285, 1.3900000000000001, 24.641000000000002]"
                :rotation="[-1.6600000000000004, 0, 0]" :scale="[1, 1, 1]" name="标准三维字体"
                uuid="85280b80-7a1c-4031-8cc8-aaf70f892041" :castShadow="false" :receiveShadow="false" :renderOrder="0"
                :visible="true" v-bind="eMeshState3" />
        </Suspense>

        <Suspense>
            <lineArrow :position="[-5.89, 0.354, 22.939]"
                :rotation="[-1.5298976620779419, -0.07073732188678589, -1.5679040721375466]" :scale="[1.5, 1, 1.5]"
                name="箭头线组件" uuid="ea09fd01-9c32-4e07-838d-28a4d6379448" :castShadow="false" :receiveShadow="false"
                :renderOrder="0" :visible="true" v-bind="eMeshState4" />
        </Suspense>

        <Suspense>
            <lineArrow :position="[-16.14, 0.354, -30.504]"
                :rotation="[-1.5298976620779419, -0.07073732188678589, -1.5679040721375466]" :scale="[1.5, 1, 1.5]"
                name="箭头线组件" uuid="3a2b9c28-5cb3-40c2-9811-4e06fcf7ed3a" :castShadow="false" :receiveShadow="false"
                :renderOrder="0" :visible="true" v-bind="eMeshState5" />
        </Suspense>

        <Suspense>
            <shapesforEditor :position="[2.387, 0.851, -27.739]" :rotation="[0, 0, 0]" :scale="[6.5, 1, 1]" name="图形合集组件"
                uuid="fdd0ac03-4039-4a30-8c03-a1b5e170fef4" :castShadow="false" :receiveShadow="false" :renderOrder="0"
                :visible="true" v-bind="eMeshState6" />
        </Suspense>

        <Suspense>
            <generalFont :position="[0.40900000000000003, 1.3900000000000001, -27.722]"
                :rotation="[-1.6600000000000004, 0, 0]" :scale="[1, 1, 1]" name="标准三维字体"
                uuid="124add95-dcae-4b8e-98cd-0fb79f90a276" :castShadow="false" :receiveShadow="false" :renderOrder="0"
                :visible="true" v-bind="eMeshState7" />
        </Suspense>

        <Suspense>
            <domPanel :position="[-20.97, 14.288, -44.687]"
                :rotation="[-9.689998818189584e-18, 0.010000000000000989, 2.446423349157282e-16]" :scale="[5, 5, 5]"
                name="dom面板" uuid="00346b27-ba1e-4b17-a699-8ba3248060a6" :castShadow="false" :receiveShadow="false"
                :renderOrder="0" :visible="tvtDomPanel1visible" v-bind="eMeshState8" />
        </Suspense>

        <Suspense>
            <domPanel :position="[2.758, 9.34, 8.858]"
                :rotation="[-9.689998818189584e-18, 0.010000000000000989, 2.446423349157282e-16]" :scale="[5, 5, 5]"
                name="dom面板" uuid="0c4f4069-85da-4feb-95c1-a808eb53f315" :castShadow="false" :receiveShadow="false"
                :renderOrder="0" :visible="tvtDomPanel2visible" v-bind="eMeshState9" />
        </Suspense>
    </TresGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { ribbonArrow } from 'PLS/floor'
import { shapesforEditor } from 'PLS/basic'
import { generalFont } from 'PLS/UIdemo'
import { lineArrow } from 'PLS/UIdemo'
import { domPanel } from 'PLS/UIdemo'

const eMeshState0 = { "length": 60, "speed": 1, "width": 1.4, "bendPosition": 1, "curvature": 0.33, "backgroundColor": "#D32709", "backgroundAlpha": 0.25, "segments": 240, "arrowColor": "#ffffff", "arrowWidth": 5.2, "arrowHeight": 5.6, "arrowSpacing": 4.6, "arrowOffset": 0, "arrowLineWidth": 18, "arrowStyle": "chevron", "pixelWorldScale": 0.066 }

const eMeshState1 = { "length": 60, "speed": 1, "width": 1.4, "bendPosition": 1, "curvature": 0.33, "backgroundColor": "#0949D3", "backgroundAlpha": 0.25, "segments": 240, "arrowColor": "#ffffff", "arrowWidth": 5.2, "arrowHeight": 5.6, "arrowSpacing": 4.6, "arrowOffset": 0, "arrowLineWidth": 18, "arrowStyle": "chevron", "pixelWorldScale": 0.066 }

const eMeshState2 = { "modelValue": { "type": "Box", "args": [5, 1.1, 3, 2, 1, 2] }, "materialType": "TransmissionMaterial", "materialProps": { "color": "#FFFFFF", "roughness": 0.11, "reflectivity": 0.73, "attenuationColor": "#6C6C6C", "attenuationDistance": 0.38, "chromaticAberration": 0, "anisotropicBlur": 0.37, "distortion": 0.3, "temporalDistortion": 0, "backside": false, "thickness": 0.17, "backsideThickness": 0.46 } }

const eMeshState3 = { "text": "MRC集装箱货轮 - 18260GT", "size": 1.5, "height": 0.22, "curveSegments": 9, "bevelEnabled": true, "bevelThickness": 0.05, "bevelSize": 0.02, "bevelOffset": 0, "bevelSegments": 4, "center": true, "materialType": "MeshStandardMaterial", "materialProps": { "color": "#993B3B", "map": null, "wireframe": false, "opacity": 1, "transparent": false, "side": 0, "alphaTest": 0, "blending": 1, "depthTest": true, "depthWrite": true, "emissive": "#000000", "emissiveIntensity": 1, "metalness": 0.49, "roughness": 0.72, "metalnessMap": null, "roughnessMap": null, "normalMap": null, "normalScale": { "x": 1, "y": 1 }, "bumpMap": null, "bumpScale": 1, "displacementMap": null, "displacementScale": 0.85, "displacementBias": 0, "aoMap": null, "aoMapIntensity": 1, "envMap": null, "envMapIntensity": 1 } }

const eMeshState4 = { "color": "#993B3B", "hasArrow": true, "radius": 0.1, "length": 10, "cutoffRatio": 0.91, "roughness": 0.16, "metalness": 0.62 }

const eMeshState5 = { "color": "#344AAB", "hasArrow": true, "radius": 0.1, "length": 10, "cutoffRatio": 0.91, "roughness": 0.16, "metalness": 0.62 }

const eMeshState6 = { "modelValue": { "type": "Box", "args": [5, 1.1, 2.7, 2, 1, 2] }, "materialType": "TransmissionMaterial", "materialProps": { "color": "#FFFFFF", "roughness": 0.11, "reflectivity": 0.73, "attenuationColor": "#6C6C6C", "attenuationDistance": 0.38, "chromaticAberration": 0, "anisotropicBlur": 0.37, "distortion": 0.3, "temporalDistortion": 0, "backside": false, "thickness": 0.17, "backsideThickness": 0.46 } }

const eMeshState7 = { "text": "豪华邮轮探险号 - 3280GT", "size": 1.5, "height": 0.22, "curveSegments": 9, "bevelEnabled": true, "bevelThickness": 0.05, "bevelSize": 0.02, "bevelOffset": 0, "bevelSegments": 4, "center": true, "materialType": "MeshStandardMaterial", "materialProps": { "color": "#344AAB", "map": null, "wireframe": false, "opacity": 1, "transparent": false, "side": 0, "alphaTest": 0, "blending": 1, "depthTest": true, "depthWrite": true, "emissive": "#000000", "emissiveIntensity": 1, "metalness": 0.49, "roughness": 0.72, "metalnessMap": null, "roughnessMap": null, "normalMap": null, "normalScale": { "x": 1, "y": 1 }, "bumpMap": null, "bumpScale": 1, "displacementMap": null, "displacementScale": 0.85, "displacementBias": 0, "aoMap": null, "aoMapIntensity": 1, "envMap": null, "envMapIntensity": 1 } }

const eMeshState8 = { "center": true, "transform": true, "sprite": false, "distanceFactor": 3, "domContent": "<div class=\"semi-wrap\" aria-hidden=\"true\">\n  <div class=\"semi\">\n    <div class=\"ring\" style=\"--p:86;\"></div>\n    <div class=\"sheen\"></div>\n  </div>\n\n  <div class=\"info\">\n    <div class=\"label\">仓位</div>\n    <div class=\"percent\">86%</div>\n  </div>\n</div>\n\n<style>\n/* 组件局部变量，无全局污染 */\n.semi-wrap{\n  --size: 240px;\n  --thickness: 44px;\n  --accent: #2fb0ff;\n  --base: rgba(255,255,255,0.08);\n  --p: 86;\n\n  width: var(--size);\n  height: calc(var(--size)/2 + 56px);\n  position: relative;\n  font-family: \"Segoe UI\", Roboto, \"PingFang SC\", \"Helvetica Neue\", Arial;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n/* 半圆容器 */\n.semi-wrap .semi{\n  width: var(--size);\n  height: var(--size);\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  overflow: hidden;\n  pointer-events: none;\n}\n\n/* 环 */\n.semi-wrap .ring{\n  --d: var(--size);\n  width: var(--d);\n  height: var(--d);\n  border-radius: 50%;\n  position: absolute;\n  left: 0;\n  top: 0;\n\n  transform: rotate(90deg);\n  transform-origin: 50% 50%;\n\n  background-image:\n    conic-gradient(from 180deg, var(--accent) calc(var(--p) * 1.8deg), transparent 0),\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      rgba(0,0,0,0) calc(50% - var(--thickness) + .5px)\n    );\n  background-blend-mode: normal;\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  -webkit-mask-composite: source-in;\n  mask-composite: exclude;\n\n  filter: drop-shadow(0 8px 20px rgba(47,176,255,0.14));\n}\n\n/* 高光 */\n.semi-wrap .sheen{\n  position: absolute;\n  width: var(--size);\n  height: var(--size);\n  left: 0;\n  top: 0;\n  border-radius: 50%;\n  pointer-events: none;\n  opacity: .9;\n\n  background:\n    conic-gradient(from 180deg,\n      rgba(255,255,255,0) 0deg,\n      rgba(255,255,255,.22) 2deg,\n      rgba(255,255,255,0) 4deg,\n      transparent 5deg\n    );\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n\n  animation: sheen-rotate 3.2s linear infinite;\n  transform-origin: 50% 50%;\n}\n\n/* 发光呼吸 */\n.semi-wrap .ring::after{\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  pointer-events: none;\n\n  box-shadow: 0 0 18px rgba(47,176,255,0.12), 0 0 36px rgba(47,176,255,0.06);\n  opacity: 1;\n  animation: glow 2.8s ease-in-out infinite;\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n}\n\n/* 信息区 */\n.semi-wrap .info{\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  top: 4px;\n  text-align: center;\n  color: white;\n  pointer-events: none;\n  width: 100%;\n}\n\n.semi-wrap .label{\n  font-size: 26px;\n  opacity: 1;\n  margin-bottom: -8px;\n  font-weight: 800;\n}\n\n.semi-wrap .percent{\n  font-size: 32px;\n  font-weight: 800;\n  letter-spacing: .4px;\n  text-shadow: 0 3px 10px rgba(0,0,0,.45);\n}\n\n/* 动效 */\n@keyframes sheen-rotate{\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n@keyframes glow{\n  0%   { opacity: .75; transform: scale(1); }\n  50%  { opacity: 1;   transform: scale(1.02); }\n  100% { opacity: .75; transform: scale(1); }\n}\n</style>" }

const eMeshState9 = { "center": true, "transform": true, "sprite": false, "distanceFactor": 3, "domContent": "<div class=\"semi-wrap2\" aria-hidden=\"true\">\n  <div class=\"semi\">\n    <div class=\"ring\" style=\"--p:68;\"></div>\n    <div class=\"sheen\"></div>\n  </div>\n\n  <div class=\"info\">\n    <div class=\"label\">仓位</div>\n    <div class=\"percent\">68%</div>\n  </div>\n</div>\n\n<style>\n/* 组件局部变量，无全局污染 */\n.semi-wrap2{\n  --size: 240px;           /* 外圆直径（半圆基于此） */\n  --thickness: 44px;       /* 环厚 */\n  --accent: #D32709;       /* 填充色（进度）*/\n  --base: rgba(255,255,255,0.08); /* 未填充透明/弱色（尽量透明）*/\n  --p: 68;                 /* 默认百分比（0-100），可覆盖到元素上 */\n\n  width: var(--size);\n  height: calc(var(--size)/2 + 56px);\n  position: relative;\n  font-family: \"Segoe UI\", Roboto, \"PingFang SC\", \"Helvetica Neue\", Arial;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n}\n\n/* 半圆容器 */\n.semi-wrap2 .semi{\n  width: var(--size);\n  height: var(--size);\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  overflow: hidden;\n  pointer-events: none;\n}\n\n/* 环 */\n.semi-wrap2 .ring{\n  --d: var(--size);\n  width: var(--d);\n  height: var(--d);\n  border-radius: 50%;\n  position: absolute;\n  left: 0;\n  top: 0;\n\n  transform: rotate(90deg);\n  transform-origin: 50% 50%;\n\n  background-image:\n    conic-gradient(from 180deg, var(--accent) calc(var(--p) * 1.8deg), transparent 0),\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      rgba(0,0,0,0) calc(50% - var(--thickness) + .5px)\n    );\n  background-blend-mode: normal;\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  -webkit-mask-composite: source-in;\n  mask-composite: exclude;\n\n  filter: drop-shadow(0 8px 20px rgba(47,176,255,0.14));\n}\n\n/* 高光 */\n.semi-wrap2 .sheen{\n  position: absolute;\n  width: var(--size);\n  height: var(--size);\n  left: 0;\n  top: 0;\n  border-radius: 50%;\n  pointer-events: none;\n  opacity: .9;\n\n  background:\n    conic-gradient(from 180deg,\n      rgba(255,255,255,0) 0deg,\n      rgba(255,255,255,.22) 2deg,\n      rgba(255,255,255,0) 4deg,\n      transparent 5deg\n    );\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n\n  animation: sheen-rotate 3.2s linear infinite;\n  transform-origin: 50% 50%;\n}\n\n/* 发光呼吸 */\n.semi-wrap2 .ring::after{\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  pointer-events: none;\n\n  box-shadow: 0 0 18px rgba(47,176,255,0.12), 0 0 36px rgba(47,176,255,0.06);\n  opacity: 1;\n  animation: glow 2.8s ease-in-out infinite;\n\n  -webkit-mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n  mask:\n    radial-gradient(circle at center,\n      transparent calc(50% - var(--thickness)),\n      black calc(50% - var(--thickness) + .5px)\n    );\n}\n\n/* 信息区 */\n.semi-wrap2 .info{\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  top: 4px;\n  text-align: center;\n  color: white;\n  pointer-events: none;\n  width: 100%;\n}\n\n.semi-wrap2 .label{\n  font-size: 26px;\n  opacity: 1;\n  margin-bottom: -8px;\n  font-weight: 800;\n}\n\n.semi-wrap2 .percent{\n  font-size: 32px;\n  font-weight: 800;\n  letter-spacing: .4px;\n  text-shadow: 0 3px 10px rgba(0,0,0,.45);\n}\n\n/* 动效 */\n@keyframes sheen-rotate{\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n@keyframes glow{\n  0%   { opacity: .75; transform: scale(1); }\n  50%  { opacity: 1;   transform: scale(1.02); }\n  100% { opacity: .75; transform: scale(1); }\n}\n</style>" }

const tvtDomPanel1visible = ref(false)
const tvtDomPanel2visible = ref(false)

declare global {
  interface Window {
    tvtDomPanel1visible: Ref<boolean>;
    tvtDomPanel2visible: Ref<boolean>;
  }
}
window.tvtDomPanel1visible = tvtDomPanel1visible
window.tvtDomPanel2visible = tvtDomPanel2visible
</script>