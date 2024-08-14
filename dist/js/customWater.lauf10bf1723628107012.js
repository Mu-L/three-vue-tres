import{a6 as t,Z as e,a9 as n}from"./three.LOnTLfxo1723628107012.js";import{$ as r,T as a,d as o,x as s}from"./@tresjs.SUe87xao1723628107012.js";import{a as i}from"./index.wzkl4CyW1723628107012.js";import"./index.KUg4qAlm1723628107012.js";import{C as l}from"./three-custom-shader-material.n4KbnW0V1723628107012.js";import"./object-hash.eRIADBNa1723628107012.js";import"./@amap.XsUkMUkF1723628107012.js";import"./glsl-tokenizer.ZmKauzU31723628107012.js";import{p as u}from"./gl-noise.BrVtymbx1723628107012.js";import{d as c,b as p,a1 as f,w as g,o as h,D as m,J as v,j as d,u as _,r as b,f as w,g as y,aj as x,ak as j,m as M,al as T}from"./@vue.9bHx4gg21723628107012.js";import{P as z}from"./tweakpane.yHWGBmom1723628107012.js";import{_ as C}from"./gridPlusCom.vue_vue_type_script_setup_true_lang.oCEronFX1723628107012.js";import"./@vueuse.t-c8gU4-1723628107012.js";import"./three-stdlib.kNzZmNMy1723628107012.js";import"./@pmndrs.m3RZ2qRu1723628107012.js";import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.MckyFGkF1723628107012.js";import"./all.three.608sn2Nq1723628107012.js";import"./oimophysics.x0jH7fze1723628107012.js";import"./reflectorDUDV.vue_vue_type_script_setup_true_lang.SFBs0Ad91723628107012.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.Kjdj4j4t1723628107012.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.d0Uigj7j1723628107012.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.KkZaaJuL1723628107012.js";import"./glsl-token-string.Z6_i_sVZ1723628107012.js";import"./glsl-token-functions.0T11p6mD1723628107012.js";import"./jszip.TSgBnMkQ1723628107012.js";const I=B;!function(t,e){const n=B,r=P();for(;;)try{if(532299===parseInt(n(369))/1+parseInt(n(424))/2*(-parseInt(n(385))/3)+parseInt(n(429))/4*(parseInt(n(368))/5)+-parseInt(n(394))/6+-parseInt(n(386))/7*(-parseInt(n(407))/8)+parseInt(n(395))/9*(-parseInt(n(406))/10)+parseInt(n(389))/11)break;r.push(r.shift())}catch(a){r.push(r.shift())}}();const G=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,r}}();!function(){G(this,(function(){const t=B,e=new RegExp("function *\\( *\\)"),n=new RegExp(t(411),"i"),r=W(t(391));e[t(422)](r+t(402))&&n[t(422)](r+"input")?W():r("0")}))()}();const S=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,r}}();function P(){const t=["TresBoxGeometry","2rhLFRT","args","call","waterHighlight","#b3ffff","20zTGsvu","gger","TresMesh","string","while (true) {}","vertex","877855wKmXQm","434606TGUrGA","customWaterMesh","counter","\nuniform float uTime;\nuniform float uHeight;\nvarying float vHeight;\n\nvec3 displace(vec3 point) {\n  vec3 p = point;\n  p.y += uTime * 2.0;\n  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.4, 1.0, 5, false, false);\n  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);\n  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);\n  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);\n  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);\n  vec3 n = vec3(0.0);\n  if(p.z >= uHeight / 2.0) {\n      n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 0.5), fbmOpts));\n      n += gln_GerstnerWave(p, A, uTime).xzy;\n      n += gln_GerstnerWave(p, B, uTime).xzy * 0.5;\n      n += gln_GerstnerWave(p, C, uTime).xzy * 0.25;\n      n += gln_GerstnerWave(p, D, uTime).xzy * 0.2;\n  }\n  vHeight = n.z;\n  return point + n;\n}\n\nvec3 orthogonal(vec3 v) {\n  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)\n  : vec3(0.0, -v.z, v.y));\n}\n\nvec3 recalcNormals(vec3 newPos) {\n  float offset = 0.001;\n  vec3 tangent = orthogonal(normal);\n  vec3 bitangent = normalize(cross(normal, tangent));\n  vec3 neighbour1 = position + tangent * offset;\n  vec3 neighbour2 = position + bitangent * offset;\n\n  vec3 displacedNeighbour1 = displace(neighbour1);\n  vec3 displacedNeighbour2 = displace(neighbour2);\n\n  vec3 displacedTangent = displacedNeighbour1 - newPos;\n  vec3 displacedBitangent = displacedNeighbour2 - newPos;\n\n  return normalize(cross(displacedTangent, displacedBitangent));\n}\n\nvoid main() {\n  csm_Position = displace(position);\n  csm_Normal = recalcNormals(csm_Position);\n}\n\t","length","convertLinearToSRGB","bind","needsUpdate","info","__proto__","flatShading","MeshPhysicalMaterial","brightness","height","return (function() ",'{}.constructor("return this")( )',"2775771aRdhPB","435582gvgGPh","side","baseMaterial","12221033HCCdft","stateObject","init","fragment","console","5060634PssPot","265833plFIQj","Flatshading","prototype","uHeight","fragmentShader","value","waterColor","chain","debu","DoubleSide","dispose","210mmVMFl","64EAxkKJ","constructor","\nvarying float vHeight;\nuniform vec3 waterColor;\nuniform vec3 waterHighlight;\nuniform float offset;\nuniform float contrast;\nuniform float brightness;\n\nvec3 calcColor() {\n  float mask = (pow(vHeight, 2.) - offset) * contrast;\n  vec3 diffuseColor = mix(waterColor, waterHighlight, mask);\n  diffuseColor *= brightness;\n  return diffuseColor;\n}\n\nvoid main() {\n  csm_DiffuseColor = vec4(calcColor(), 1.0);\n}\n\t","exception","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","log","material","rotation-x","#52a7f7","action","toString","error","Color","vertexShader","apply","test"];return(P=function(){return t})()}S(void 0,(function(){const t=B;let e;try{e=Function(t(383)+t(384)+");")()}catch(a){e=window}const n=e.console=e[t(393)]||{},r=[t(412),"warn",t(377),t(418),t(410),"table","trace"];for(let o=0;o<r[t(373)];o++){const e=S[t(408)][t(397)][t(375)](S),a=r[o],s=n[a]||e;e[t(378)]=S[t(375)](S),e[t(417)]=s[t(417)].bind(s),n[a]=e}}))();const H=[I(414)],k=[I(425)];function B(t,e){const n=P();return(B=function(t,e){return n[t-=367]})(t,e)}const O=c({__name:I(370),props:{height:{default:.2},Flatshading:{type:Boolean,default:!1},waterColor:{default:I(415)},waterHighlight:{default:I(428)},brightness:{default:1},baseMaterial:{default:t[I(380)]}},setup(n){const o=I,s=n,i=p(null),c={vertex:o(372),fragment:o(409)},b={uTime:{value:0},waterColor:{value:new(t[o(419)])(s[o(401)])[o(374)]()},waterHighlight:{value:new(t[o(419)])(s.waterHighlight)[o(374)]()},offset:{value:.4},contrast:{value:3.1},brightness:{value:s.brightness},uHeight:{value:s[o(382)]}},{onLoop:w}=r();return w((({elapsed:t})=>{b.uTime.value=-t/5})),f((()=>{const e=o;s[e(382)]&&(b[e(398)].value=s[e(382)]),s.waterColor&&(b[e(401)][e(400)]=new(t[e(419)])(s[e(401)])[e(374)]()),s.waterHighlight&&(b[e(427)][e(400)]=new(t[e(419)])(s.waterHighlight)[e(374)]()),s[e(381)]&&(b[e(381)][e(400)]=s[e(381)])})),g((()=>s[o(396)]),(t=>{const e=o;i.value[e(413)][e(376)]=!0})),g((()=>s.baseMaterial),(e=>{const n=o,r=new l({baseMaterial:t[e],vertexShader:u(c.vertex),fragmentShader:c[n(392)],uniforms:b,flatShading:s[n(396)],side:t[n(404)],roughness:.2,metalness:.1,silent:!0});i.value[n(413)][n(405)](),i[n(400)][n(413)]=r})),(n,r)=>{const s=o;return h(),m(s(431),{ref_key:"tmRef",ref:i,"rotation-x":-Math.PI/2},[v(s(423),{args:[5,5,n[s(382)],64,64,1]},null,8,k),d(_(a),{baseMaterial:t[s(380)],vertexShader:_(u)(c[s(367)]),fragmentShader:c[s(392)],uniforms:b,side:e,roughness:.2,metalness:.1,flatShading:n[s(396)],silent:""},null,8,[s(388),s(420),s(399),s(387),s(379)])],8,H)}}});function W(t){function e(t){const n=B;if(typeof t===n(432))return function(t){}.constructor(n(433))[n(421)](n(371));1!==(""+t/t)[n(373)]||t%20==0?function(){return!0}[n(408)](n(403)+n(430))[n(426)](n(416)):function(){return!1}[n(408)](n(403)+n(430)).apply(n(390)),e(++t)}try{if(t)return e;e(0)}catch(n){}}const D=Z;function F(){const t=["chain","pos-y.jpg","Flatshading","length","MeshNormalMaterial","brightness","action","customWater","test","neg-x.jpg",'{}.constructor("return this")( )',"change","apply","pos-z.jpg","function *\\( *\\)","debu","log","toString","4163931SvdfOP","trace","MeshToonMaterial","9WNPuly","addBlade","neg-z.jpg","2486520KkDQXV","MeshStandardMaterial","gger","info","pos-x.jpg","waterHighlight","MeshDepthMaterial","181328zmGJqT","neg-y.jpg","baseMaterial","value","bind","1033116bGMNDN","string","prototype","9963176leBkmN","MeshLambertMaterial","exception","TresDirectionalLight","4098lrGxTd","constructor","MeshPhysicalMaterial","counter","TresAmbientLight","2667LWIyOx","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","#b3ffff","MeshPhongMaterial","水体颜色","input","MeshBasicMaterial","return (function() ","120345umhfFi","addBinding"];return(F=function(){return t})()}!function(t,e){const n=Z,r=F();for(;;)try{if(848949===parseInt(n(191))/1+parseInt(n(166))/2+parseInt(n(211))/3+parseInt(n(171))/4+parseInt(n(217))/5+parseInt(n(178))/6*(-parseInt(n(183))/7)+parseInt(n(174))/8*(-parseInt(n(214))/9))break;r.push(r.shift())}catch(a){r.push(r.shift())}}();const N=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n[Z(205)](e,arguments);return n=null,t}}:function(){};return t=!1,r}}();!function(){N(this,(function(){const t=Z,e=new RegExp(t(207)),n=new RegExp(t(184),"i"),r=V("init");e.test(r+t(193))&&n[t(201)](r+t(188))?V():r("0")}))()}();const R=function(){let t=!0;return function(e,n){const r=t?function(){if(n){const t=n[Z(205)](e,arguments);return n=null,t}}:function(){};return t=!1,r}}();R(void 0,(function(){const t=Z;let e;try{e=Function(t(190)+t(203)+");")()}catch(a){e=window}const n=e.console=e.console||{},r=[t(209),"warn",t(162),"error",t(176),"table",t(212)];for(let o=0;o<r[t(196)];o++){const e=R[t(179)][t(173)][t(170)](R),a=r[o],s=n[a]||e;e.__proto__=R[t(170)](R),e[t(210)]=s[t(210)][t(170)](s),n[a]=e}}))();const A=v("TresPerspectiveCamera",{position:[5,5,5],fov:45,near:.1,far:1e3},null,-1),L=v(D(182),{intensity:.5},null,-1),E=v(D(177),{position:[15,15,15],intensity:1},null,-1);function Z(t,e){const n=F();return(Z=function(t,e){return n[t-=160]})(t,e)}const $=c({__name:D(200),setup(t){const e=D,r=b({alpha:!0,toneMapping:n,windowSize:!0,clearColor:10066329}),a=b({enableDamping:!0,autoRotate:!1}),l=b({cellSize:.6,cellThickness:1.1,cellColor:"#627179",sectionColor:"#3a78a2",sectionSize:2.4,sectionThickness:1.8,fadeDistance:27,fadeStrength:.76,followCamera:!1,infiniteGrid:!0}),u=b({height:.2,Flatshading:!1,waterColor:"#52a7f7",waterHighlight:e(185),brightness:1,baseMaterial:e(180)}),c=new z;return c[e(192)](u,"height",{label:"高度",min:.1,max:5,step:.1}),c[e(192)](u,"waterColor",{label:e(187)}),c.addBinding(u,e(164),{label:"浪头颜色"}),c[e(192)](u,e(198),{label:"亮度",min:0,max:1,step:.01}),c[e(192)](u,e(195),{label:e(195)}),c[e(215)]({view:"list",label:"材质",options:[{text:"MeshPhysicalMaterial",value:e(180)},{text:e(189),value:e(189)},{text:e(197),value:e(197)},{text:e(160),value:e(160)},{text:"MeshPhongMaterial",value:e(186)},{text:e(213),value:"MeshToonMaterial"},{text:e(175),value:e(175)},{text:e(165),value:e(165)}],value:u[e(168)]}),c.on(e(204),(t=>{const n=e;"材质"===t.target.label&&(u[n(168)]=t[n(169)])})),(t,n)=>{const c=e;return h(),w(_(s),M(r,{"window-size":""}),{default:y((()=>[A,d(_(o),x(j(a)),null,16),L,E,d(O,x(j(u)),null,16),d(_(C),M({args:[3,3]},l,{position:[0,-.5,0]}),null,16),(h(),w(T,null,{default:y((()=>[d(_(i),{files:[c(163),c(202),c(194),c(167),c(206),c(216)],path:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/"})])),_:1}))])),_:1},16)}}});function V(t){function e(t){const n=Z;if(typeof t===n(172))return function(t){}[n(179)]("while (true) {}")[n(205)](n(181));1!==(""+t/t)[n(196)]||t%20==0?function(){return!0}[n(179)](n(208)+"gger").call(n(199)):function(){return!1}.constructor(n(208)+n(161)).apply("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}export{$ as default};
