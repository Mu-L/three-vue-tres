import{P as t}from"./tweakpane.yHWGBmom1722409645193.js";import{b as n}from"./pagesShow.vue_vue_type_script_setup_true_lang.OkSaFJOI1722409645193.js";import{a6 as o,cm as r,ce as e,cn as i,C as s}from"./three.6E5muTWJ1722409645193.js";import{r as c}from"./utils.qo3aX1Gv1722409645193.js";import{d as u,a1 as a,o as p,D as f,J as l,u as h,r as m,f as d,g,j as v}from"./@vue.9bHx4gg21722409645193.js";import"./@tresjs.qmCJ68Vp1722409645193.js";import"./@vueuse.NFOCyQQL1722409645193.js";import"./three-custom-shader-material.Tfk8gm3s1722409645193.js";import"./object-hash.Une5niKX1722409645193.js";import"./@amap.VDWlHANn1722409645193.js";import"./jszip.EBLL5bdU1722409645193.js";import"./glsl-tokenizer.bKHxJMPW1722409645193.js";import"./glsl-token-string.tLooI1vy1722409645193.js";import"./glsl-token-functions.9RlG2kRC1722409645193.js";import"./@fesjs.QnrTigdw1722409645193.js";import"./vue-router.14za1TD_1722409645193.js";import"./lodash-es.nFpJXAf-1722409645193.js";import"./@qlin.yHhFDldE1722409645193.js";import"./pinia.QNLxZzKW1722409645193.js";import"./@floating-ui.BPbuo5Gx1722409645193.js";import"./@juggle.7yjBMqoW1722409645193.js";import"./three-mesh-bvh.7hCYy4D71722409645193.js";const j=_;!function(t,n){const o=_,r=b();for(;;)try{if(342608===parseInt(o(256))/1*(-parseInt(o(263))/2)+-parseInt(o(217))/3+-parseInt(o(221))/4+-parseInt(o(258))/5*(-parseInt(o(254))/6)+-parseInt(o(219))/7+parseInt(o(215))/8+parseInt(o(251))/9)break;r.push(r.shift())}catch(e){r.push(r.shift())}}();const w=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,r}}();!function(){w(this,(function(){const t=_,n=new RegExp(t(238)),o=new RegExp(t(260),"i"),r=O(t(229));n.test(r+t(214))&&o[t(222)](r+t(249))?O():r("0")}))()}();const y=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[_(234)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();function b(){const t=["1604280aJUnhx","rotation-x","1592805fSVeDu","getPoints","1275449xWyGXC","table","377632rZcgft","test","Shape","constructor","#ffff00","console","\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ","TresGroup","init","DoubleSide","flatMap","return (function() ","toString","apply","while (true) {}","trace","value","function *\\( *\\)","length","\n    varying vec2 vUv;\n\t\tuniform vec3 color;\n    void main() {\n\t\t\t// 计算距离四条边的最小距离\n        float distance = max(max(vUv.x, -vUv.x), max(vUv.y, -vUv.y));\n\n        // 将距离映射到透明度（从边缘到中心逐渐变透明）\n        float alpha = smoothstep(0.1, 0.9, distance*1.1);\n\n        // 设置最终颜色和透明度\n        gl_FragColor = vec4(color, alpha);\n    }\n  ","ShaderMaterial",'{}.constructor("return this")( )',"exception","ShapeGeometry","moveTo","bind","uniforms","info","input","__proto__","10043154wfEoGe","setPositions","color","174ZckBKS","uvs","28263LgjOSy","log","78535YCXanw","positionSrc","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","lineTo","forEach","44WEVIOh","gger","call","object","regionGlow","Mesh","Color","stateObject","chain"];return(b=function(){return t})()}y(void 0,(function(){const t=_;let n;try{n=Function(t(232)+t(242)+");")()}catch(e){n=window}const o=n[t(226)]=n.console||{},r=[t(257),"warn",t(248),"error",t(243),t(220),t(236)];for(let i=0;i<r[t(239)];i++){const n=y.constructor.prototype[t(246)](y),e=r[i],s=o[e]||n;n[t(250)]=y[t(246)](y),n[t(233)]=s[t(233)].bind(s),o[e]=n}}))();const x=["object",j(216)],I=[j(209),"rotation-x"];function _(t,n){const o=b();return(_=function(t,n){return o[t-=207]})(t,n)}const S=u({__name:j(210),props:{positionSrc:{default:[[0,0],[1,1]]},color:{default:j(225)}},setup(t){const n=j,u=t,m=new(o[n(223)]);u[n(259)][n(262)](((t,o)=>{const r=n;0===o?m[r(245)](t[0],t[1]):m[r(261)](t[0],t[1])}));const d=new(o[n(241)])({vertexShader:n(227),fragmentShader:n(240),transparent:!0,side:o[n(230)],depthWrite:!1,depthTest:!0,uniforms:{color:{type:n(255),value:new(o[n(212)])(u[n(253)])}}});let g=new(o[n(244)])(m);c(g,!0);const v=new(o[n(211)])(g,d),w=m[n(218)](),y=new r;y[n(252)](w[n(231)]((t=>[t.x,t.y,0])));var b=new e({color:new(o[n(212)])(u[n(253)]),linewidth:.002});const _=new i(y,b);return a((()=>{const t=n;d[t(247)][t(253)][t(237)]=new s(u.color),b[t(253)]=new(o[t(212)])(u[t(253)])})),(t,o)=>{const r=n;return p(),f(r(228),null,[l("primitive",{object:h(v),renderOrder:9999,"rotation-x":Math.PI/2},null,8,x),l("primitive",{object:h(_),renderOrder:9999,"rotation-x":Math.PI/2},null,8,I)])}}});function O(t){function n(t){const o=_;if("string"==typeof t)return function(t){}[o(224)](o(235))[o(234)]("counter");1!==(""+t/t)[o(239)]||t%20==0?function(){return!0}[o(224)]("debu"+o(207))[o(208)]("action"):function(){return!1}[o(224)]("debu"+o(207))[o(234)](o(213)),n(++t)}try{if(t)return n;n(0)}catch(o){}}function z(){const t=["regionGlow","color","while (true) {}","7mwlcti","#0054ff","counter","331767gxIuuO","2qHNzTz","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","__proto__","init","3664896OecDqx","156090yGQSCs","5OsGNMY","debu","string","constructor","trace","apply","bind","#00ffdd","position-y","chain","return (function() ","1167558PVaVbX","198104vYOVVp","height","gger","log","error","info","1317856oZSvAa","pagesShowRef","addBinding","272ujtcvX","12tzLjTc","区域边界发光","length","4690862OfZQFI","exception","table","call","stateObject","function *\\( *\\)"];return(z=function(){return t})()}const k=U;!function(t,n){const o=U,r=z();for(;;)try{if(795533===-parseInt(o(481))/1*(parseInt(o(463))/2)+-parseInt(o(480))/3+-parseInt(o(443))/4*(-parseInt(o(469))/5)+parseInt(o(467))/6*(-parseInt(o(459))/7)+parseInt(o(446))/8*(parseInt(o(462))/9)+-parseInt(o(468))/10+-parseInt(o(450))/11*(-parseInt(o(447))/12))break;r.push(r.shift())}catch(e){r.push(r.shift())}}();const G=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[U(474)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();!function(){G(this,(function(){const t=U,n=new RegExp(t(455)),o=new RegExp(t(464),"i"),r=E(t(466));n.test(r+t(478))&&o.test(r+"input")?E():r("0")}))()}();const M=function(){let t=!0;return function(n,o){const r=t?function(){if(o){const t=o[U(474)](n,arguments);return o=null,t}}:function(){};return t=!1,r}}();function U(t,n){const o=z();return(U=function(t,n){return o[t-=440]})(t,n)}M(void 0,(function(){const t=U,n=function(){const t=U;let n;try{n=Function(t(479)+'{}.constructor("return this")( ));')()}catch(o){n=window}return n}(),o=n.console=n.console||{},r=[t(440),"warn",t(442),t(441),t(451),t(452),t(473)];for(let e=0;e<r[t(449)];e++){const n=M.constructor.prototype.bind(M),i=r[e],s=o[i]||n;n[t(465)]=M[t(475)](M),n.toString=s.toString[t(475)](s),o[i]=n}}))();const Z=u({__name:k(456),setup(o){const r=k,e=m({color:r(476),height:26}),i=new t({title:r(448),expanded:!0});return i[r(445)](e,r(457),{label:"颜色"}),i.addBinding(e,r(482),{label:"高度",min:0,max:80,step:1}),(t,o)=>{const i=r;return p(),d(n,{ref:i(444)},{ability:g((()=>[v(S,{"position-y":26,positionSrc:[[-292,4.27*40],[-296,402],[-196,401.2],[-196,178.4],[-292,4.27*40]]}),v(S,{"position-y":e[i(482)],color:e[i(457)],positionSrc:[[10.8,40*-1.19],[12.8,-220],[-303.6,-236],[-304,-52],[10.8,40*-1.19]]},null,8,[i(477),"color"]),v(S,{position:[500,86,300],color:i(460),positionSrc:[[10.8,40*-1.19],[12.8,-220],[-303.6,-236],[-343.6,-156],[-304,-52],[-104,52],[104,-52],[10.8,40*-1.19]]})])),_:1},512)}}});function E(t){function n(t){const o=U;if(typeof t===o(471))return function(t){}.constructor(o(458))[o(474)](o(461));1!==(""+t/t)[o(449)]||t%20==0?function(){return!0}[o(472)](o(470)+o(483))[o(453)]("action"):function(){return!1}.constructor(o(470)+o(483))[o(474)](o(454)),n(++t)}try{if(t)return n;n(0)}catch(o){}}export{Z as default};
