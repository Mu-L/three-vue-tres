import{p as n,$ as e,N as t,d as r}from"./@tresjs.5lh7VmqZ1725416517797.js";import{W as o,j as i,c6 as s,bY as a,bW as u,Z as c,l as f,b6 as l}from"./three.VTQVqxMx1725416517797.js";import{d as p,a5 as v,a2 as m,o as d,E as h,L as g,u as y,F as w,e as x,f as D,g as S,j as b,al as E,m as R}from"./@vue._6MD2XyK1725416517797.js";import"./tweakpane.yHWGBmom1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";function I(n,e){const t=M();return(I=function(n,e){return t[n-=442]})(n,e)}const _=I;!function(n,e){const t=I,r=M();for(;;)try{if(227821===parseInt(t(473))/1*(parseInt(t(498))/2)+-parseInt(t(454))/3*(-parseInt(t(466))/4)+-parseInt(t(464))/5+parseInt(t(442))/6*(parseInt(t(458))/7)+-parseInt(t(496))/8*(parseInt(t(477))/9)+parseInt(t(465))/10+-parseInt(t(487))/11)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const C=function(){let n=!0;return function(e,t){const r=n?function(){if(t){const n=t[I(494)](e,arguments);return t=null,n}}:function(){};return n=!1,r}}();!function(){C(this,(function(){const n=I,e=new RegExp(n(445)),t=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=L(n(457));e[n(480)](r+n(452))&&t[n(480)](r+n(449))?L():r("0")}))()}();const k=function(){let n=!0;return function(e,t){const r=n?function(){if(t){const n=t.apply(e,arguments);return t=null,n}}:function(){};return n=!1,r}}();k(void 0,(function(){const n=I;let e;try{e=Function(n(462)+n(444)+");")()}catch(o){e=window}const t=e[n(447)]=e.console||{},r=[n(478),n(482),n(460),n(456),n(461),n(486),n(470)];for(let i=0;i<r[n(481)];i++){const e=k[n(499)][n(476)][n(450)](k),o=r[i],s=t[o]||e;e[n(493)]=k[n(450)](k),e.toString=s[n(492)][n(450)](s),t[o]=e}}))();const P=[_(484),_(451)],j=[g(_(453),{args:[400,400,400]},null,-1),g(_(471),{color:_(446),shininess:0},null,-1)],N=[_(484)],T=[g(_(500),{args:[50,32,32]},null,-1),g(_(471),{color:_(446),shininess:0},null,-1)];function M(){const n=['{}.constructor("return this")( )',"function *\\( *\\)","#ffffff","console","innerHeight","input","bind","rotation-x","chain","TresBoxGeometry","3OkynBc","value","error","init","5467LyedKv","\n    varying vec2 vUv;\n    void main() {\n        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);\n        gl_Position = projectionMatrix * mvPosition;\n        vUv = uv;\n    }\n","info","exception","return (function() ","gger","297020uSgQmR","1812210EGXDEx","1616712kFypEk","material","derivatives","renderToScreen","trace","TresMeshPhongMaterial","debu","5084PkvWyW","TresMesh","addPass","prototype","72QHjvcG","log","uniforms","test","length","warn","width","side","iTime","table","4390881pIEkww","innerWidth","counter","noiseContour","texture","toString","__proto__","apply","action","360048Ggwoem","\nuniform sampler2D tDiffuse;\nuniform sampler2D tNoise;\nuniform float iTime;\n\nvarying vec2 vUv;\n\n#define EdgeColor vec4(0.2, 0.2, 0.15, 1.0)\n#define BackgroundColor vec4(1,0.95,0.85,1)\n#define NoiseAmount 0.01\n#define ErrorPeriod 30.0\n#define ErrorRange 0.003\n\n// Reference: https://www.shadertoy.com/view/MsSGD1\nfloat triangle(float x)\n{\n    return abs(1.0 - mod(abs(x), 2.0)) * 2.0 - 1.0;\n}\n\nfloat rand(float x)\n{\n    return fract(sin(x) * 43758.5453);\n}\n\nvoid main()\n{\n    float time = floor(iTime * 16.0) / 16.0;\n    vec2 uv = vUv;\n    uv += vec2(triangle(uv.y * rand(time) * 1.0) * rand(time * 1.9) * 0.005,\n            triangle(uv.x * rand(time * 3.4) * 1.0) * rand(time * 2.1) * 0.005);\n\n    float noise = (texture2D(tNoise, uv * 0.5).r - 0.5) * NoiseAmount;\n    vec2 uvs[3];\n    uvs[0] = uv + vec2(ErrorRange * sin(ErrorPeriod * uv.y + 0.0) + noise, ErrorRange * sin(ErrorPeriod * uv.x + 0.0) + noise);\n    uvs[1] = uv + vec2(ErrorRange * sin(ErrorPeriod * uv.y + 1.047) + noise, ErrorRange * sin(ErrorPeriod * uv.x + 3.142) + noise);\n    uvs[2] = uv + vec2(ErrorRange * sin(ErrorPeriod * uv.y + 2.094) + noise, ErrorRange * sin(ErrorPeriod * uv.x + 1.571) + noise);\n\n    float edge = texture2D(tDiffuse, uvs[0]).r * texture2D(tDiffuse, uvs[1]).r * texture2D(tDiffuse, uvs[2]).r;\n    float diffuse = texture2D(tDiffuse, uv).g;\n\n    float w = fwidth(diffuse) * 2.0;\n    vec4 mCol = mix(BackgroundColor * 0.5, BackgroundColor, mix(0.0, 1.0, smoothstep(-w, w, diffuse - 0.3)));\n    gl_FragColor = mix(EdgeColor, mCol, edge);\n}\n","68DhOlDQ","constructor","TresSphereGeometry","string","2214pDbbIX","render"];return(M=function(){return n})()}const U=_(459),F=_(497),A=p({__name:_(490),async setup(r){const p=_;let x,D;const{camera:S,renderer:b,scene:E,sizes:R}=n(),I=([x,D]=v((()=>t({map:"./plugins/shadertoyToThreejs/image/noise.png"}))),x=await x,D(),x),{onLoop:C,onAfterLoop:k}=e(),M=new o(1,1,{minFilter:f,magFilter:f,format:l,stencilBuffer:!1}),A=new i(window[p(488)],window[p(448)]);let L=null;const z=new s({uniforms:{tDiffuse:{type:"t",value:null},tShadow:{type:"t",value:null},iResolution:{type:"v2",value:A}},vertexShader:U,fragmentShader:"\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tShadow;\n    uniform vec2 iResolution;\n\n    varying vec2 vUv;\n    #define Sensitivity (vec2(0.3, 1.5) * iResolution.y / 400.0)\n    float checkSame(vec4 center, vec4 samplef)\n    {\n        vec2 centerNormal = center.xy;\n        float centerDepth = center.z;\n        vec2 sampleNormal = samplef.xy;\n        float sampleDepth = samplef.z;\n\n        vec2 diffNormal = abs(centerNormal - sampleNormal) * Sensitivity.x;\n        bool isSameNormal = (diffNormal.x + diffNormal.y) < 0.1;\n        float diffDepth = abs(centerDepth - sampleDepth) * Sensitivity.y;\n        bool isSameDepth = diffDepth < 0.1;\n\n        return (isSameNormal && isSameDepth) ? 1.0 : 0.0;\n    }\n\n    void main( )\n    {\n        vec4 sample0 = texture2D(tDiffuse, vUv);\n        vec4 sample1 = texture2D(tDiffuse, vUv + (vec2(1.0, 1.0) / iResolution.xy));\n        vec4 sample2 = texture2D(tDiffuse, vUv + (vec2(-1.0, -1.0) / iResolution.xy));\n        vec4 sample3 = texture2D(tDiffuse, vUv + (vec2(-1.0, 1.0) / iResolution.xy));\n        vec4 sample4 = texture2D(tDiffuse, vUv + (vec2(1.0, -1.0) / iResolution.xy));\n\n        float edge = checkSame(sample1, sample2) * checkSame(sample3, sample4);\n\n        // gl_FragColor = vec4(edge, sample0.w, 1.0, 1.0);\n        float shadow = texture2D(tShadow, vUv).x;\n        gl_FragColor = vec4(edge, shadow, 1.0, 1.0);\n\n    }\n"}),B=new s({uniforms:{tDiffuse:{type:"t",value:null},iTime:{type:"f",value:0},tNoise:{type:"t",value:I}},vertexShader:U,fragmentShader:F});return B[p(469)]=!0,B[p(467)].extensions[p(468)]=!0,m((()=>{const n=p;R[n(483)][n(455)]&&(L=new a(b[n(455)]),L.addPass(new u(E[n(455)],S[n(455)])),L[n(475)](z),L[n(475)](B))})),C((({elapsed:n})=>{const e=p;b[e(455)].render(E.value,S.value,M),z[e(479)].tShadow.value=M[e(491)],B[e(479)][e(485)].value=n})),k((()=>{L&&L[p(443)]()})),(n,e)=>{const t=p;return d(),h(w,null,[g("TresMesh",{ref:"noiseContourMeshRef2",side:y(c),position:[400,100,0],"rotation-x":2*Math.PI/360*90,"cast-shadow":""},j,8,P),g(t(474),{ref:"noiseContourMeshRef1",side:y(c),position:[0,150,0],"cast-shadow":""},T,8,N)],64)}}});function L(n){function e(n){const t=I;if(typeof n===t(501))return function(n){}[t(499)]("while (true) {}")[t(494)](t(489));1!==(""+n/n)[t(481)]||n%20==0?function(){return!0}[t(499)](t(472)+t(463)).call(t(495)):function(){return!1}[t(499)](t(472)+t(463))[t(494)]("stateObject"),e(++n)}try{if(n)return e;e(0)}catch(t){}}const z=G;!function(n,e){const t=G,r=X();for(;;)try{if(348201===-parseInt(t(129))/1+parseInt(t(103))/2+parseInt(t(143))/3*(parseInt(t(137))/4)+parseInt(t(127))/5+-parseInt(t(111))/6*(-parseInt(t(138))/7)+parseInt(t(114))/8*(parseInt(t(141))/9)+-parseInt(t(112))/10)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const B=function(){let n=!0;return function(e,t){const r=n?function(){if(t){const n=t[G(132)](e,arguments);return t=null,n}}:function(){};return n=!1,r}}();!function(){B(this,(function(){const n=G,e=new RegExp(n(119)),t=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),r=Y(n(118));e[n(102)](r+n(106))&&t.test(r+n(104))?Y():r("0")}))()}();const W=function(){let n=!0;return function(e,t){const r=n?function(){if(t){const n=t.apply(e,arguments);return t=null,n}}:function(){};return n=!1,r}}();function G(n,e){const t=X();return(G=function(n,e){return t[n-=100]})(n,e)}W(void 0,(function(){const n=G,e=function(){const n=G;let e;try{e=Function(n(117)+n(125)+");")()}catch(t){e=window}return e}(),t=e[n(136)]=e.console||{},r=[n(107),"warn",n(121),"error",n(133),n(108),n(135)];for(let o=0;o<r[n(140)];o++){const e=W.constructor[n(128)][n(116)](W),i=r[o],s=t[i]||e;e[n(101)]=W[n(116)](W),e[n(123)]=s[n(123)].bind(s),t[i]=e}}))();const O={ref:z(110),position:[600,750,-1221],fov:45,near:1,far:1e4},Z=g(z(126),{color:z(120)},null,-1),$=g(z(122),{position:[400,400,400],intensity:1,color:z(139)},null,-1),Q=p({__name:z(130),setup(n){const e=z,t={clearColor:e(142),shadows:!0,alpha:!1,useLegacyLights:!0};return(n,o)=>{const i=x(e(109));return d(),D(i,R(t,{"window-size":""}),{default:S((()=>[g("TresPerspectiveCamera",O,null,512),b(y(r)),Z,$,(d(),D(E,null,{default:S((()=>[b(A)])),_:1}))])),_:1},16)}}});function X(){const n=["debu","__proto__","test","1051390SyVZDM","input","string","chain","log","table","TresCanvas","perspectiveCameraRef","6rEwobj","14356240RFYRUA","action","265808BXceea","gger","bind","return (function() ","init","function *\\( *\\)","#ffffff","info","TresDirectionalLight","toString","call",'{}.constructor("return this")( )',"TresAmbientLight","3009675LUdrWd","prototype","222044lktIQJ","noiseContourPage","stateObject","apply","exception","constructor","trace","console","32kOYSfX","1709743MSjKNW","red","length","171qxRMce","#000000","1011YHucOg","while (true) {}"];return(X=function(){return n})()}function Y(n){function e(n){const t=G;if(typeof n===t(105))return function(n){}[t(134)](t(144)).apply("counter");1!==(""+n/n)[t(140)]||n%20==0?function(){return!0}.constructor(t(100)+t(115))[t(124)](t(113)):function(){return!1}[t(134)]("debugger").apply(t(131)),e(++n)}try{if(n)return e;e(0)}catch(t){}}export{Q as default};
