import{$ as n,d as t}from"./@tresjs.qmCJ68Vp1722409645193.js";import{Z as e,j as o}from"./three.6E5muTWJ1722409645193.js";import{d as r,a1 as i,o as s,D as c,J as u,aj as a,ak as f,q as l,e as p,f as h,g as d,j as m,u as v,m as g}from"./@vue.9bHx4gg21722409645193.js";import"./tweakpane.yHWGBmom1722409645193.js";import"./@vueuse.NFOCyQQL1722409645193.js";const _=b;!function(n,t){const e=b,o=T();for(;;)try{if(579094===-parseInt(e(465))/1+-parseInt(e(462))/2+parseInt(e(486))/3+-parseInt(e(445))/4+parseInt(e(487))/5+parseInt(e(451))/6*(parseInt(e(473))/7)+-parseInt(e(476))/8*(-parseInt(e(460))/9))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const w=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[b(485)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){w(this,(function(){const n=b,t=new RegExp(n(455)),e=new RegExp(n(452),"i"),o=M(n(439));t[n(483)](o+n(464))&&e.test(o+n(450))?M():o("0")}))()}();const y=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[b(485)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function b(n,t){const e=T();return(b=function(n,t){return e[n-=439]})(n,t)}y(void 0,(function(){const n=b,t=function(){const n=b;let t;try{t=Function(n(478)+n(454)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(459)]||{},o=[n(466),n(471),n(447),n(472),n(442),n(446),n(448)];for(let r=0;r<o[n(480)];r++){const t=y[n(474)].prototype[n(463)](y),i=o[r],s=e[i]||t;t[n(468)]=y.bind(y),t.toString=s[n(482)][n(463)](s),e[i]=t}}))();const I=[_(481)],j={ref:"TresTubeGeometryRef",args:[1e3,1e3]};function T(){const n=["1036332ZjpSQR","table","info","trace","addEventListener","input","174zKbBHG","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","innerHeight",'{}.constructor("return this")( )',"function *\\( *\\)","while (true) {}","MeshRef","innerWidth","console","29943sLCcYM","value","1821976WXbASc","bind","chain","50118ilHAOq","log","TresMesh","__proto__","debu","gger","warn","error","277851SckpYy","constructor","u_mouse","632NlgTjG","mousemove","return (function() ","uniforms","length","rotation","toString","test","clientX","apply","177129LBHGlp","1631550NRBuMS","stateObject","TresShaderMaterial","init","string","action","exception","counter","TresPlaneGeometry"];return(T=function(){return n})()}const x=r({__name:"rayMarchingMaterialTranform",setup(t){const r=_,{onLoop:l,onAfterLoop:p}=n(),h={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*abs(sin(u_time))*2.)-d)/abs(sin(u_time))/2.;\n}\nmat2 rot2D(float angle){\n  float s=sin(angle);\n  float c=cos(angle);\n  return mat2(c,-s,s,c);\n}\nfloat map(vec3 p){\n  p.xy*=rot2D(u_time);\n  vec3 pos=vec3(sin(u_time*10.),0.,0.);\n  float spheresdf=sphere(p-pos,.5);\n  return spheresdf;\n}\n\nvoid main(){\n  vec3 ro=vec3(0.,0.,-3.);//起始位置\n  vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n  float t=0.;\n  vec3 color=vec3(0.);\n  for(int i=0;i<80;i++){\n    vec3 p=ro+rd*t;\n    float d=map(p);\n    t+=d;\n    //优化效率\n    if(t>100.||d<.001){\n      break;\n    }\n    \n  }\n  color=vec3(t)*.2;\n  gl_FragColor=vec4(color,1.);\n  \n}",uniforms:{u_resolution:{value:new o(window[r(458)],window[r(453)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},d=window[r(458)]/2,m=window[r(453)]/2;let v=0,g=0;return document[r(449)](r(477),(function(n){v=n[r(484)]-d,g=n.clientY-m}),!1),i((()=>{})),l((({elapsed:n})=>{const t=r;h[t(479)].u_time[t(461)]+=.001,h[t(479)][t(475)][t(461)]=new o(v,g)})),p((()=>{})),(n,t)=>{const e=r;return s(),c(e(467),{ref:e(457),rotation:[Math.PI/2,0,0]},[u(e(444),j,null,512),u(e(489),a(f(h)),null,16)],8,I)}}});function M(n){function t(n){const e=b;if(typeof n===e(440))return function(n){}[e(474)](e(456))[e(485)](e(443));1!==(""+n/n)[e(480)]||n%20==0?function(){return!0}.constructor(e(469)+"gger").call(e(441)):function(){return!1}[e(474)]("debu"+e(470))[e(485)](e(488)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const L=D;function S(){const n=["\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","10yOgiNk","test","__proto__","string","constructor","console","2456528ppqPle","exception",'{}.constructor("return this")( )',"1734838OCAqQD","warn","prototype","TresDirectionalLight","debu","TresAxesHelper","function *\\( *\\)","toString","counter","while (true) {}","info","call","trace","534BYFhFx","log","apply","TresCanvas","length","TresAmbientLight","41516xUbenx","table","input","init","663ylyjEM","action","1744395lNPiLo","chain","gger","#ffffff","perspectiveCameraRef","#000000","17585676zuyTMp","4003638bhcCYp","return (function() ","bind"];return(S=function(){return n})()}!function(n,t){const e=D,o=S();for(;;)try{if(489731===-parseInt(e(186))/1*(parseInt(e(176))/2)+-parseInt(e(188))/3+parseInt(e(182))/4*(parseInt(e(199))/5)+-parseInt(e(195))/6+parseInt(e(163))/7+-parseInt(e(205))/8+parseInt(e(194))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const A=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){A(this,(function(){const n=D,t=new RegExp(n(169)),e=new RegExp(n(198),"i"),o=P(n(185));t[n(200)](o+n(189))&&e.test(o+n(184))?P():o("0")}))()}();const R=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[D(178)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();R(void 0,(function(){const n=D;let t;try{t=Function(n(196)+n(162)+");")()}catch(r){t=window}const e=t.console=t[n(204)]||{},o=[n(177),n(164),n(173),"error",n(206),n(183),n(175)];for(let i=0;i<o[n(180)];i++){const t=R[n(203)][n(165)][n(197)](R),r=o[i],s=e[r]||t;t[n(201)]=R[n(197)](R),t[n(170)]=s.toString[n(197)](s),e[r]=t}}))();const k={ref:L(192),position:[0,1500,0],fov:45,near:1,far:1e4},z=u(L(181),{color:L(191)},null,-1),C=u(L(166),{position:[100,100,0],intensity:.5,color:L(191)},null,-1),E=u(L(168),{args:[1e3],position:[0,19,0]},null,-1),G=u("TresGridHelper",{args:[6e3,100],position:[0,19,0]},null,-1);function D(n,t){const e=S();return(D=function(n,t){return e[n-=162]})(n,t)}const H=r({__name:"rayMarchingTranform",setup(e){const o=L,r={clearColor:o(193),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:c}=n();return c((({delta:n})=>{})),l((()=>{})),(n,e)=>{const c=p(o(179));return s(),h(c,g(r,{"window-size":""}),{default:d((()=>[u("TresPerspectiveCamera",k,null,512),m(v(t),a(f(i)),null,16),z,C,m(x),E,G])),_:1},16)}}});function P(n){function t(n){const e=D;if(typeof n===e(202))return function(n){}[e(203)](e(172))[e(178)](e(171));1!==(""+n/n).length||n%20==0?function(){return!0}.constructor(e(167)+e(190))[e(174)](e(187)):function(){return!1}[e(203)](e(167)+e(190))[e(178)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{H as default};
