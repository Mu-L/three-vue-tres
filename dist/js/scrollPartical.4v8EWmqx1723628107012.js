import{b as t}from"./index.nljFLUxY1723628107012.js";import{$ as n,p as e,a as o,y as r}from"./@tresjs.SUe87xao1723628107012.js";import{a6 as i,n as s,bU as a,o as u,O as c,bV as l,bW as f,bX as p,j as d,bY as h,ab as m}from"./three.LOnTLfxo1723628107012.js";import{P as g}from"./tweakpane.yHWGBmom1723628107012.js";import{l as v}from"./util.rPAg2Eci1723628107012.js";import{d as x,o as w,D as y,u as b,b as I,a4 as _,f as j,a1 as P,r as S,e as M,j as z,g as F,al as B,aj as A,ak as R,F as T,am as C,an as U,J as D}from"./@vue.9bHx4gg21723628107012.js";import{_ as E}from"./@fesjs.BuhZYZEQ1723628107012.js";import"./index.4_UN2mlQ1723628107012.js";import"./chalk.sAH7iSuz1723628107012.js";/* empty css                                 */import"./iconify-icon.l-H2-fnN1723628107012.js";import"./@iconify.9PoCakEb1723628107012.js";import"./vue-router.XBF1ZL3N1723628107012.js";import"./lodash-es.nFpJXAf-1723628107012.js";import"./@vueuse.t-c8gU4-1723628107012.js";import"./@qlin.yHhFDldE1723628107012.js";import"./pinia.nipTyfok1723628107012.js";import"./@floating-ui.BPbuo5Gx1723628107012.js";import"./@juggle.7yjBMqoW1723628107012.js";import"./utils.khGxV-lR1723628107012.js";import"./default.vue_vue_type_script_setup_true_lang.WPDwyMNb1723628107012.js";import"./three-mesh-ui.module.P4QQ5Mqd1723628107012.js";function k(){const t=["call","RGBAFormat","chain","ShaderMaterial","DataTexture","stateObject","Mesh","console","array","732702WYDMbG","test","1056sUBGaq","input","log","gger","sqrt","count","trace","while (true) {}","bind","BufferAttribute","5860878qvpFqU","counter","toString","attributes","7RLiIuR","length","setAttribute","constructor","debu","action","function *\\( *\\)","3770530uslPOc","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","position","floor","48114WyZeUk","init","13078950AQYMhu","2642232nncEBD","3104UiRCVN","table","BufferGeometry","needsUpdate","apply","ceil","prototype","info","470cRmOSM"];return(k=function(){return t})()}!function(t,n){const e=Y,o=k();for(;;)try{if(511814===-parseInt(e(340))/1*(parseInt(e(348))/2)+-parseInt(e(358))/3+parseInt(e(388))/4+-parseInt(e(381))/5+parseInt(e(370))/6*(parseInt(e(374))/7)+-parseInt(e(360))/8*(parseInt(e(385))/9)+parseInt(e(387))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const G=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[Y(344)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){G(this,(function(){const t=Y,n=new RegExp(t(380)),e=new RegExp(t(382),"i"),o=V(t(386));n[t(359)](o+t(351))&&e[t(359)](o+t(361))?V():o("0")}))()}();const O=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[Y(344)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function Y(t,n){const e=k();return(Y=function(t,n){return e[t-=340]})(t,n)}O(void 0,(function(){const t=Y,n=function(){let t;try{t=Function('return (function() {}.constructor("return this")( ));')()}catch(n){t=window}return t}(),e=n[t(356)]=n.console||{},o=[t(362),"warn",t(347),"error","exception",t(341),t(366)];for(let r=0;r<o[t(375)];r++){const n=O[t(377)][t(346)][t(368)](O),i=o[r],s=e[i]||n;n.__proto__=O[t(368)](O),n[t(372)]=s.toString.bind(s),e[i]=n}}))();const Z=t=>{const n=Y;let e=t[n(373)][n(383)][n(365)],o=Math.ceil(Math[n(364)](e)),r=Math[n(345)](e/o),a=new Float32Array(o*r*4);!function(t){const e=n;for(let n=Math[e(384)](t[e(375)]/3)-1;n>0;n--){const o=Math[e(384)](Math.random()*(n+1));for(let e=0;e<3;e++){let r=t[3*n+e];t[3*n+e]=t[3*o+e],t[3*o+e]=r}}}(t[n(373)].position[n(357)]);for(let i=0;i<e;i++){const e=t[n(373)][n(383)][n(357)][3*i+0],o=t[n(373)][n(383)][n(357)][3*i+1],r=t[n(373)].position[n(357)][3*i+2],s=0;a[4*i+0]=e,a[4*i+1]=o,a[4*i+2]=r,a[4*i+3]=s}let u=new(i[n(353)])(a,o,r,i[n(350)],s);return u[n(343)]=!0,u},q=()=>{const t=Y,n=new(i[Y(352)])({uniforms:{uTextureA:{value:null},uTextureB:{value:null},uTime:{value:0},uScroll:{value:0}},vertexShader:"varying vec2 vUv;\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  vUv = uv;\n}",fragmentShader:"uniform sampler2D uTextureA;\nuniform sampler2D uTextureB;\nprecision mediump float; \nuniform float uTime;\nuniform float uScroll;\nvarying vec2 vUv;\n\nmat3 rotationMatrix3(vec3 axis, float angle) {\n  axis = normalize(axis);\n  float s = sin(angle);\n  float c = cos(angle);\n  float oc = 1. - c;\n\n  return mat3(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s,\n              oc * axis.z * axis.x + axis.y * s,\n              oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c,\n              oc * axis.y * axis.z - axis.x * s,\n              oc * axis.z * axis.x - axis.y * s,\n              oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c);\n}\n\nvoid main() {\n  vec3 textureA = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureA, vUv).xyz;\n  \n\n  vec3 textureB = rotationMatrix3(vec3(10., 6., 3.), sin(uTime) * .1) *\n                  texture2D(uTextureB, vUv).xyz;\n  \n\n  float t = uScroll;\n  vec3 pos = mix(textureA, textureB, t);\n\n  gl_FragColor = vec4(pos, 1.);\n}"}),e=new(i[t(342)]);return e[t(376)](t(383),new(i[t(369)])(new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0]),3)),e[t(376)]("uv",new(i[t(369)])(new Float32Array([0,1,1,1,1,0,0,1,1,0,0,0]),2)),new(i[t(355)])(e,n)};function V(t){function n(t){const e=Y;if("string"==typeof t)return function(t){}[e(377)](e(367))[e(344)](e(371));1!==(""+t/t)[e(375)]||t%20==0?function(){return!0}[e(377)]("debu"+e(363))[e(349)](e(379)):function(){return!1}[e(377)](e(378)+e(363))[e(344)](e(354)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const W=$;!function(t,n){const e=$,o=Q();for(;;)try{if(719399===parseInt(e(360))/1+parseInt(e(362))/2*(-parseInt(e(370))/3)+parseInt(e(380))/4+parseInt(e(371))/5+parseInt(e(341))/6*(parseInt(e(349))/7)+parseInt(e(379))/8+-parseInt(e(356))/9*(parseInt(e(369))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const L=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function $(t,n){const e=Q();return($=function(t,n){return e[t-=337]})(t,n)}function Q(){const t=["primitive","action","gger","while (true) {}","594HaOeJW","devicePixelRatio","call","__proto__","function *\\( *\\)","Color","ShaderMaterial","input","45024QelQgo","width","particalMesh","stateObject","min","length","counter","24561LFukTy","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","height","object","219074Rqxges","setAttribute","26qUHliw","console","exception","table","toString","trace","test","1940zFoltP","157347QWDZgw","1994485szFoDc","Points","apply","position","info","AdditiveBlending","BufferAttribute",'{}.constructor("return this")( )',"4111672Wvoose","647856NCxvQd","constructor","bind","BufferGeometry","#ffaa00","debu"];return(Q=function(){return t})()}!function(){L(this,(function(){const t=$,n=new RegExp(t(345)),e=new RegExp(t(357),"i"),o=N("init");n[t(368)](o+"chain")&&e[t(368)](o+t(348))?N():o("0")}))()}();const X=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[$(373)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();X(void 0,(function(){const t=$;let n;try{n=Function("return (function() "+t(378)+");")()}catch(r){n=window}const e=n[t(363)]=n[t(363)]||{},o=["log","warn",t(375),"error",t(364),t(365),t(367)];for(let i=0;i<o[t(354)];i++){const n=X[t(381)].prototype[t(382)](X),r=o[i],s=e[r]||n;n[t(344)]=X[t(382)](X),n.toString=s[t(366)].bind(s),e[r]=n}}))();const J=[W(359)],H=x({__name:W(351),props:{progress:{default:0},width:{default:256},height:{default:256}},setup(t,{expose:n}){const e=W,o=t;let r=((t,n)=>{const e=$,o=t*n;let r=new Float32Array(3*o);for(let i=0;i<o;i++){let e=3*i;r[e+0]=i%t/t,r[e+1]=i/t/n}const s=new(i[e(383)]);return s[e(361)](e(374),new(i[e(377)])(r,3)),new(i[e(372)])(s,(()=>{const t=$;return new(i[t(347)])({uniforms:{uPositions:{value:null},uSize:{value:12},uPixelRatio:{value:Math[t(353)](window[t(342)],2)},uColor:{value:new(i[t(346)])(t(384))}},vertexShader:"uniform sampler2D\n    uPositions; \nuniform float uSize;\nuniform float uPixelRatio;\nvarying vec3 vPos;\nvarying vec2 vUv;\nvoid main() {\n  vec3 pos = texture2D(uPositions, position.xy).xyz;\n\n  float customSize = uSize;\n\n  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectionPosition = projectionMatrix * viewPosition;\n\n  gl_Position = projectionPosition;\n  gl_PointSize = customSize * uPixelRatio;\n  gl_PointSize *= (1.0 / -viewPosition.z);\n\n  vPos = pos;\n}",fragmentShader:"precision mediump float;\nvarying vec3 vPos;\nuniform vec3 uColor; \nvoid main() {\n\n  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n  float strength = 0.05 / distanceToCenter - 0.1;\n\n  \n\n  gl_FragColor = vec4(uColor, strength * length(vPos));\n}",transparent:!0,depthWrite:!1,blending:i[t(376)]})})())})(o[e(350)],o[e(358)]);return n({particles:r}),(t,n)=>{const o=e;return w(),y(o(337),{object:b(r)},null,8,J)}}});function N(t){function n(t){const e=$;if("string"==typeof t)return function(t){}[e(381)](e(340))[e(373)](e(355));1!==(""+t/t).length||t%20==0?function(){return!0}[e(381)]("debu"+e(339))[e(343)](e(338)):function(){return!1}[e(381)](e(385)+e(339)).apply(e(352)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const K=ot;!function(t,n){const e=ot,o=et();for(;;)try{if(354140===-parseInt(e(413))/1+parseInt(e(446))/2*(parseInt(e(438))/3)+parseInt(e(419))/4+-parseInt(e(458))/5+-parseInt(e(467))/6*(parseInt(e(469))/7)+parseInt(e(445))/8+-parseInt(e(455))/9*(-parseInt(e(478))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const tt=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){tt(this,(function(){const t=ot,n=new RegExp(t(441)),e=new RegExp(t(454),"i"),o=it(t(407));n[t(476)](o+t(468))&&e[t(476)](o+t(459))?it():o("0")}))()}();const nt=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[ot(418)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function et(){const t=["scene","geometry","RGBAFormat","children","warn","clear","1216938WxJVEf","progress","stateObject","function *\\( *\\)","uniforms","add","tangent","3448024qvoYWe","2jIyQea","toString","console","FloatType","string","Mesh","pow","rotateX","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","168489vrFuGM","uTextureA","uTextureB","404930albCMk","input","./draco/","gger","texture","uScroll","traverse","bind","NearestFilter","284148qdqEgC","chain","77LukPbw","#ffaa00","mergeGeometries","constructor","setRenderTarget","material","pMesh","test","table","10HmtoKi","render","__proto__","uPositions","init","translate","SRGBColorSpace","counter","while (true) {}","uTime","303209dEdkUF","normal","scale","WebGLRenderTarget","height","apply","1615612fURuyD","exception","debu","particalFBO","log","error","value","width","call","deleteAttribute","prototype","color","setStyle"];return(et=function(){return t})()}function ot(t,n){const e=et();return(ot=function(t,n){return e[t-=406]})(t,n)}nt(void 0,(function(){const t=ot,n=function(){let t;try{t=Function('return (function() {}.constructor("return this")( ));')()}catch(n){t=window}return t}(),e=n[t(448)]=n[t(448)]||{},o=[t(423),t(436),"info",t(424),t(420),t(477),"trace"];for(let r=0;r<o.length;r++){const n=nt[t(472)][t(429)][t(465)](nt),i=o[r],s=e[i]||n;n[t(480)]=nt[t(465)](nt),n.toString=s[t(447)][t(465)](s),e[i]=n}}))();const rt=x({__name:K(422),props:{progress:{default:0},width:{default:256},height:{default:256},color:{default:K(470)}},async setup(t){const r=K;let s,f;const p=t,d=I(),h=new(i[r(416)])(p[r(426)],p[r(417)],{minFilter:i[r(466)],magFilter:i[r(466)],generateMipmaps:!1,colorSpace:i[r(409)],depthBuffer:!1,stencilBuffer:!1,format:i[r(434)],type:i[r(449)]}),m=t=>{const n=r,e=[];return t[n(464)]((t=>{const o=n;t instanceof i[o(451)]&&(t[o(433)][o(428)]("uv"),t[o(433)][o(428)](o(414)),t[o(433)][o(428)](o(444)),e.push(t[o(433)]))})),l[n(471)](e)},g=new a,x=m(([s,f]=_((()=>v("./plugins/medical/model/brainparts.OBJ",g))),s=await s,f(),s));x[r(415)](.01,.01,.01);const y=Z(x),b=m(([s,f]=_((()=>o("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/guanYu.glb",{draco:!0,decoderPath:r(460)}))),s=await s,f(),s)[r(432)][r(435)][0]);b[r(453)](Math.PI/2),b.translate(0,-.9,0);const P=Z(b),S=m(([s,f]=_((()=>o("./plugins/industry4/model/modelDraco.glb",{draco:!0,decoderPath:r(460)}))),s=await s,f(),s).scene.children[0]);S.rotateX(-Math.PI/2),S.rotateY(Math.PI/3),S[r(408)](0,0,0);const M=Z(S),z=q(),F=new u,B=new c(-1,1,1,-1,1/Math[r(452)](2,53),1);F[r(443)](z);const{onBeforeLoop:A}=n(),{camera:R,renderer:T}=e();return A((({elapsed:t})=>{const n=r;T[n(425)]&&R.value&&d.value&&(T[n(425)][n(473)](h),T[n(425)][n(437)](),T[n(425)][n(479)](F,B),T.value[n(473)](null),p.progress<.5?(z.material.uniforms[n(456)][n(425)]=P,z.material[n(442)][n(457)][n(425)]=y,z[n(474)][n(442)][n(463)][n(425)]=2*p[n(439)]):(z.material[n(442)][n(456)][n(425)]=y,z[n(474)][n(442)].uTextureB[n(425)]=M,z[n(474)][n(442)][n(463)][n(425)]=2*(p[n(439)]-.5)),z.material.uniforms[n(412)][n(425)]=t,d[n(425)].particles[n(474)][n(442)][n(406)][n(425)]=h[n(462)],d[n(425)].particles[n(474)][n(442)].uColor.value[n(431)](p[n(430)]))})),(t,n)=>{const e=r;return w(),j(H,{ref_key:e(475),ref:d,progress:t[e(439)]},null,8,[e(439)])}}});function it(t){function n(t){const e=ot;if(typeof t===e(450))return function(t){}[e(472)](e(411))[e(418)](e(410));1!==(""+t/t).length||t%20==0?function(){return!0}.constructor(e(421)+e(461))[e(427)]("action"):function(){return!1}[e(472)](e(421)+e(461))[e(418)](e(440)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const st=lt;function at(){const t=["function *\\( *\\)","length","threshold","WebGLRenderTarget","497icIULU","table","render","string","call","105hNjbmx","counter","log","stateObject","9qqVGBJ","width","12441744hndJDU","input","debu","4100290iRvfYh","test","prototype","145944QcWYtj","58074hVDLzV","153057XxSQMv","LinearFilter","SRGBColorSpace","220312VmCsHO","2409UioKxY","RGBAFormat","bind","gger","apply","error","value","constructor","warn","addPass","exception","262113eIZsEG","console","action","init","34DXsxFw","particalPass","toString","trace"];return(at=function(){return t})()}!function(t,n){const e=lt,o=at();for(;;)try{if(834012===-parseInt(e(415))/1+parseInt(e(419))/2*(parseInt(e(446))/3)+parseInt(e(449))/4*(-parseInt(e(432))/5)+-parseInt(e(445))/6*(-parseInt(e(427))/7)+-parseInt(e(438))/8*(parseInt(e(436))/9)+-parseInt(e(441))/10+parseInt(e(450))/11*(parseInt(e(444))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const ut=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[lt(408)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){ut(this,(function(){const t=lt,n=new RegExp(t(423)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=pt(t(418));n[t(442)](o+"chain")&&e[t(442)](o+t(439))?pt():o("0")}))()}();const ct=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[lt(408)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function lt(t,n){const e=at();return(lt=function(t,n){return e[t-=406]})(t,n)}ct(void 0,(function(){const t=lt,n=function(){let t;try{t=Function('return (function() {}.constructor("return this")( ));')()}catch(n){t=window}return t}(),e=n[t(416)]=n[t(416)]||{},o=[t(434),t(412),"info",t(409),t(414),t(428),t(422)];for(let r=0;r<o[t(424)];r++){const n=ct.constructor[t(443)][t(406)](ct),i=o[r],s=e[i]||n;n.__proto__=ct[t(406)](ct),n[t(421)]=s.toString[t(406)](s),e[i]=n}}))();const ft=x({__name:st(420),props:{use:{type:Boolean,default:!0}},setup(t){const o=t,{camera:r,renderer:s,scene:a,sizes:u}=e(),c={threshold:0,strength:.472,radius:1.61};let l=null;P((()=>{const t=lt;u[t(437)][t(410)]&&((t,n,e,o,r)=>{const s=lt,a=new f(t,n),u=new p(new d(o,r),c.strength,c.radius,c[s(425)]),m=new(i[s(426)])(o,r,{generateMipmaps:!1,minFilter:i[s(447)],magFilter:i[s(447)],format:i[s(451)],colorSpace:i[s(448)],samples:0});l=new h(e,m),l.addPass(a),l[s(413)](u)})(a[t(410)],r[t(410)],s[t(410)],u[t(437)][t(410)],u.height.value)}));const{onLoop:m}=n();return m((()=>{const t=lt;o.use?l&&l[t(429)]():s[t(410)]&&r[t(410)]&&s[t(410)][t(429)](a.value,r[t(410)])})),(t,n)=>null}});function pt(t){function n(t){const e=lt;if(typeof t===e(430))return function(t){}[e(411)]("while (true) {}")[e(408)](e(433));1!==(""+t/t)[e(424)]||t%20==0?function(){return!0}[e(411)]("debu"+e(407))[e(431)](e(417)):function(){return!1}[e(411)](e(440)+e(407))[e(408)](e(435)),n(++t)}try{if(t)return n;n(0)}catch(e){}}const dt=mt;!function(t,n){const e=mt,o=yt();for(;;)try{if(737238===parseInt(e(401))/1+parseInt(e(431))/2+-parseInt(e(404))/3+-parseInt(e(427))/4*(parseInt(e(419))/5)+-parseInt(e(406))/6+parseInt(e(425))/7*(-parseInt(e(417))/8)+-parseInt(e(403))/9*(-parseInt(e(426))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const ht=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[mt(433)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function mt(t,n){const e=yt();return(mt=function(t,n){return e[t-=388]})(t,n)}!function(){ht(this,(function(){const t=mt,n=new RegExp(t(389)),e=new RegExp(t(430),"i"),o=bt(t(411));n[t(405)](o+t(423))&&e[t(405)](o+t(438))?bt():o("0")}))()}();const gt=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[mt(433)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();gt(void 0,(function(){const t=mt;let n;try{n=Function(t(388)+t(439)+");")()}catch(r){n=window}const e=n[t(436)]=n[t(436)]||{},o=[t(393),t(415),t(400),t(441),t(428),t(392),"trace"];for(let i=0;i<o.length;i++){const n=gt.constructor[t(412)][t(414)](gt),r=o[i],s=e[r]||n;n[t(418)]=gt.bind(gt),n[t(394)]=s[t(394)][t(414)](s),e[r]=n}}))();const vt=t=>(C(dt(396)),t=t(),U(),t),xt=vt((()=>D("TresPerspectiveCamera",{position:[0,0,-4],fov:45,near:.1,far:1e3,"look-at":[0,0,0]},null,-1))),wt=vt((()=>D("main",null,[D(dt(429),null,[D("h1",null,dt(437))]),D(dt(429),null,[D("h1",{style:{"margin-left":dt(416),"margin-bottom":dt(420)}},"大脑 - Brain")]),D(dt(429),null,[D("h1",{style:{"margin-left":"11em","margin-bottom":dt(420)}},dt(432))])],-1)));function yt(){const t=["gger","chain","#ffaa00","662942OTVQqa","1129830BZcYsO","2168YcTACO","exception","section","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","53418hvlsyM","设备 - Device","apply","jaime ~ progress:","value","console","关羽 - GuanYu","input",'{}.constructor("return this")( )',"progress","error","action","return (function() ","function *\\( *\\)","TresCanvas","high-performance","table","log","toString","call","data-v-705b5632","debu","color","counter","info","705205BbKVYI","modelValue","351XWMuPw","3347442oaBHhi","test","8008518aVljWc","constructor","string","while (true) {}","use","init","prototype","#000","bind","warn","-11em","72wEFEFT","__proto__","10130nFXYbF","-10em","pass"];return(yt=function(){return t})()}function bt(t){function n(t){const e=mt;if(typeof t===e(408))return function(t){}[e(407)](e(409))[e(433)](e(399));1!==(""+t/t).length||t%20==0?function(){return!0}[e(407)](e(397)+"gger")[e(395)](e(442)):function(){return!1}[e(407)]("debu"+e(422))[e(433)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}const It=E(x({__name:"scrollPartical",setup(n){const e=dt,o=I(0);P((()=>{const t=mt;console.log(t(434),o[t(435)])}));const i={clearColor:e(413),outputColorSpace:m,windowSize:!0,renderMode:"manual",powerPreference:e(391),antialias:!1,alpha:!1,useLegacyLights:!1,physicallyCorrectLights:!0},s=S({pass:!0,color:e(424)}),a=new g({title:"参数",expanded:!0});return a.addBinding(s,e(421),{label:"后处理"}),a.addBinding(s,e(398),{label:"颜色"}),(n,a)=>{const u=e,c=M(u(390));return w(),y(T,null,[z(b(t),{styleNum:4}),z(c,A(R(i)),{default:F((()=>[xt,z(ft,{use:s[u(421)]},null,8,[u(410)]),z(b(r),{modelValue:o[u(435)],"onUpdate:modelValue":a[0]||(a[0]=t=>o.value=t),distance:10,"smooth-scroll":.1,"html-scroll":""},{default:F((()=>[(w(),j(B,null,{default:F((()=>[z(rt,{progress:o[u(435)],color:s[u(398)]},null,8,[u(440),u(398)])])),_:1}))])),_:1},8,[u(402)])])),_:1},16),wt],64)}}}),[["__scopeId","data-v-705b5632"]]);export{It as default};
