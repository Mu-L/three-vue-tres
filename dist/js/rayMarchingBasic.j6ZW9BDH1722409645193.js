import{$ as n,d as t}from"./@tresjs.qmCJ68Vp1722409645193.js";import{Z as e,j as r}from"./three.6E5muTWJ1722409645193.js";import{d as o,a1 as i,o as c,D as s,J as u,aj as a,ak as f,q as l,e as p,f as h,g as d,j as v,u as g,m}from"./@vue.9bHx4gg21722409645193.js";import"./tweakpane.yHWGBmom1722409645193.js";import"./@vueuse.NFOCyQQL1722409645193.js";const w=x;!function(n,t){const e=x,r=T();for(;;)try{if(714053===parseInt(e(485))/1*(parseInt(e(441))/2)+parseInt(e(447))/3+-parseInt(e(470))/4*(-parseInt(e(451))/5)+-parseInt(e(462))/6+parseInt(e(453))/7*(-parseInt(e(464))/8)+-parseInt(e(484))/9*(-parseInt(e(448))/10)+-parseInt(e(460))/11*(parseInt(e(481))/12))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const _=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[x(469)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){_(this,(function(){const n=x,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(482),"i"),r=k("init");t.test(r+n(471))&&e[n(445)](r+n(487))?k():r("0")}))()}();const y=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[x(469)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();y(void 0,(function(){const n=x,t=function(){const n=x;let t;try{t=Function(n(468)+n(457)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(443)]||{},r=[n(479),n(449),"info",n(472),n(440),"table",n(467)];for(let o=0;o<r[n(459)];o++){const t=y[n(450)][n(473)][n(478)](y),i=r[o],c=e[i]||t;t[n(476)]=y[n(478)](y),t.toString=c.toString[n(478)](c),e[i]=t}}))();const I=["rotation"],b={ref:w(452),args:[1e3,1e3]};function x(n,t){const e=T();return(x=function(n,t){return e[n-=440]})(n,t)}function T(){const n=["prototype","TresMesh","uniforms","__proto__","mousemove","bind","log","debu","5268GTxIRV","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","rayMarchingMaterialBasic","477nzrOgM","6338pkWbSc","string","input","exception","226xTDrrS","u_mouse","console","addEventListener","test","innerHeight","3550425GzPtAg","138770CdJlGy","warn","constructor","230coACVQ","TresTubeGeometryRef","590954aVhXpZ","TresPlaneGeometry","value","clientX",'{}.constructor("return this")( )',"u_time","length","52690FxubkK","stateObject","2660190xDyodv","TresShaderMaterial","72dmhsEs","counter","innerWidth","trace","return (function() ","apply","120424DBkaBi","chain","error"];return(T=function(){return n})()}const j=o({__name:w(483),setup(t){const o=w,{onLoop:l,onAfterLoop:p}=n(),h={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat map(vec3 p){\n  return length(p)-1.;\n}\nvoid main(){\n  vec3 ro=vec3(0.,0.,-3.);//起始位置\n  vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n  float t=0.;\n  vec3 color=vec3(0.);\n  for(int i=0;i<80;i++){\n    vec3 p=ro+rd*t;\n    float d=map(p);\n    t+=d;\n    //优化效率\n    if(t>100.||d<.001){\n      break;\n    }\n    \n  }\n  color=vec3(t)*.2;\n  gl_FragColor=vec4(color,1.);\n  \n}",uniforms:{u_resolution:{value:new r(window[o(466)],window[o(446)])},u_mouse:{value:new r(0,0)},u_time:{value:0}}},d=window.innerWidth/2,v=window[o(446)]/2;let g=0,m=0;return document[o(444)](o(477),(function(n){g=n[o(456)]-d,m=n.clientY-v}),!1),i((()=>{})),l((({elapsed:n})=>{const t=o;h[t(475)][t(458)].value+=.001,h[t(475)][t(442)][t(455)]=new r(g,m)})),p((()=>{})),(n,t)=>{const e=o;return c(),s(e(474),{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[u(e(454),b,null,512),u(e(463),a(f(h)),null,16)],8,I)}}});function k(n){function t(n){const e=x;if(typeof n===e(486))return function(n){}.constructor("while (true) {}")[e(469)](e(465));1!==(""+n/n)[e(459)]||n%20==0?function(){return!0}[e(450)](e(480)+"gger").call("action"):function(){return!1}[e(450)](e(480)+"gger").apply(e(461)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const A=R;!function(n,t){const e=R,r=F();for(;;)try{if(607935===parseInt(e(139))/1+parseInt(e(154))/2*(-parseInt(e(166))/3)+-parseInt(e(143))/4+parseInt(e(135))/5+-parseInt(e(137))/6+-parseInt(e(136))/7+parseInt(e(161))/8)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const M=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[R(142)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();function R(n,t){const e=F();return(R=function(n,t){return e[n-=127]})(n,t)}!function(){M(this,(function(){const n=R,t=new RegExp(n(127)),e=new RegExp(n(159),"i"),r=D(n(144));t[n(156)](r+n(128))&&e[n(156)](r+n(134))?D():r("0")}))()}();const C=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[R(142)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();C(void 0,(function(){const n=R;let t;try{t=Function(n(131)+n(145)+");")()}catch(o){t=window}const e=t[n(163)]=t[n(163)]||{},r=[n(160),"warn",n(151),n(140),"exception",n(147),n(129)];for(let i=0;i<r[n(133)];i++){const t=C.constructor[n(157)][n(130)](C),o=r[i],c=e[o]||t;t.__proto__=C[n(130)](C),t[n(148)]=c[n(148)].bind(c),e[o]=t}}))();const L={ref:A(149),position:[0,800,0],fov:45,near:1,far:1e4},S=u("TresAmbientLight",{color:"#ffffff"},null,-1),z=u(A(162),{position:[100,100,0],intensity:.5,color:A(165)},null,-1),G=u(A(158),{args:[1e3],position:[0,19,0]},null,-1),E=u(A(164),{args:[6e3,100],position:[0,19,0]},null,-1),Z=o({__name:A(146),setup(e){const r={clearColor:A(138),shadows:!0,alpha:!1,useLegacyLights:!0},o={autoRotate:!0,enableDamping:!0},{onLoop:i}=n();return i((({delta:n})=>{})),l((()=>{})),(n,e)=>{const i=p("TresCanvas");return c(),h(i,m(r,{"window-size":""}),{default:d((()=>[u("TresPerspectiveCamera",L,null,512),v(g(t),a(f(o)),null,16),S,z,v(j),G,E])),_:1},16)}}});function D(n){function t(n){const e=R;if("string"==typeof n)return function(n){}[e(152)](e(150))[e(142)](e(153));1!==(""+n/n).length||n%20==0?function(){return!0}[e(152)](e(155)+e(132)).call(e(141)):function(){return!1}[e(152)](e(155)+e(132)).apply("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}function F(){const n=["return (function() ","gger","length","input","4807820BkwrWe","3375484CFQtPe","6380274OToGwQ","#000000","130275xjZlfh","error","action","apply","1838828WgYRci","init",'{}.constructor("return this")( )',"rayMarchingBasic","table","toString","perspectiveCameraRef","while (true) {}","info","constructor","counter","6sfylky","debu","test","prototype","TresAxesHelper","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","log","15637064uruFQm","TresDirectionalLight","console","TresGridHelper","#ffffff","433239AeQUNC","function *\\( *\\)","chain","trace","bind"];return(F=function(){return n})()}export{Z as default};
