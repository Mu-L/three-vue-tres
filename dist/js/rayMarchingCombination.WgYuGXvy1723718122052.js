import{$ as n,d as t}from"./@tresjs.GO-cpSrO1723718122052.js";import{Z as e,j as o}from"./three.eXhPIzTa1723718122052.js";import{d as r,a1 as i,o as a,D as s,J as c,aj as u,ak as f,q as p,e as l,f as m,g as h,j as v,u as d,m as x}from"./@vue.Q1VpS3901723718122052.js";import"./tweakpane.yHWGBmom1723718122052.js";import"./@vueuse.z522fCYR1723718122052.js";const y=g;function g(n,t){const e=w();return(g=function(n,t){return e[n-=179]})(n,t)}!function(n,t){const e=g,o=w();for(;;)try{if(670570===-parseInt(e(208))/1+parseInt(e(220))/2*(parseInt(e(221))/3)+-parseInt(e(187))/4+parseInt(e(207))/5+-parseInt(e(189))/6*(-parseInt(e(200))/7)+-parseInt(e(211))/8*(parseInt(e(203))/9)+parseInt(e(222))/10*(-parseInt(e(199))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const _=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){_(this,(function(){const n=g,t=new RegExp(n(210)),e=new RegExp(n(195),"i"),o=j("init");t.test(o+n(179))&&e[n(224)](o+n(213))?j():o("0")}))()}();const q=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[g(186)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function w(){const n=["test","console","chain","while (true) {}","u_mouse","innerWidth","addEventListener","mousemove","call","apply","2815744EuhoVG","prototype","96090hwWGaL","exception","counter","value","__proto__","clientY","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","u_time","bind","stateObject","66ZJVetV","539CrFONy","innerHeight","gger","639jMVcLs","TresTubeGeometryRef","TresShaderMaterial","TresPlaneGeometry","4996305MTJKkj","547011Gurjim","constructor","function *\\( *\\)","2776IRbGMu","clientX","input","debu","TresMesh","info","toString","uniforms","rayMarchingMaterialCombination","372520ZtQgrt","6jPamgZ","1097970fPUvZZ","rotation"];return(w=function(){return n})()}q(void 0,(function(){const n=g,t=function(){let n;try{n=Function('return (function() {}.constructor("return this")( ));')()}catch(t){n=window}return n}(),e=t[n(225)]=t[n(225)]||{},o=["log","warn",n(216),"error",n(190),"table","trace"];for(let r=0;r<o.length;r++){const t=q[n(209)][n(188)][n(197)](q),i=o[r],a=e[i]||t;t[n(193)]=q[n(197)](q),t[n(217)]=a[n(217)][n(197)](a),e[i]=t}}))();const z=[y(223)],b={ref:y(204),args:[1e3,1e3]},I=r({__name:y(219),setup(t){const r=y,{onLoop:p,onAfterLoop:l}=n(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",uniforms:{u_resolution:{value:new o(window[r(182)],window[r(201)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},h=window[r(182)]/2,v=window[r(201)]/2;let d=0,x=0;return document[r(183)](r(184),(function(n){const t=r;d=n[t(212)]-h,x=n[t(194)]-v}),!1),i((()=>{})),p((({elapsed:n})=>{const t=r;m[t(218)][t(196)][t(192)]+=.001,m[t(218)][t(181)].value=new o(d,x)})),l((()=>{})),(n,t)=>{const e=r;return a(),s(e(215),{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[c(e(206),b,null,512),c(e(205),u(f(m)),null,16)],8,z)}}});function j(n){function t(n){const e=g;if("string"==typeof n)return function(n){}.constructor(e(180))[e(186)](e(191));1!==(""+n/n).length||n%20==0?function(){return!0}[e(209)](e(214)+"gger")[e(185)]("action"):function(){return!1}.constructor(e(214)+e(202))[e(186)](e(198)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const M=F;!function(n,t){const e=F,o=T();for(;;)try{if(683219===-parseInt(e(237))/1*(-parseInt(e(246))/2)+-parseInt(e(250))/3+parseInt(e(242))/4+parseInt(e(247))/5*(-parseInt(e(260))/6)+parseInt(e(274))/7+parseInt(e(263))/8+-parseInt(e(270))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const L=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[F(236)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function T(){const n=["#ffffff","7233152gRMAgb","while (true) {}","return (function() ","trace","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","call","exception","17980335VuMwLS","error","debu","TresCanvas","8276457Geuxbr","toString","info","bind","counter","apply","161087TgScaz","console","TresPerspectiveCamera","function *\\( *\\)","rayMarchingCombination","797416ymxNpx","__proto__","TresAmbientLight","prototype","12sEcvMP","485mCrYFq","string","chain","1320288mhjajl","warn","test","init","constructor",'{}.constructor("return this")( )',"#000000","perspectiveCameraRef","gger","length","8118JlxyAW","TresDirectionalLight"];return(T=function(){return n})()}!function(){L(this,(function(){const n=F,t=new RegExp(n(240)),e=new RegExp(n(267),"i"),o=A(n(253));t.test(o+n(249))&&e[n(252)](o+"input")?A():o("0")}))()}();const R=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[F(236)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();R(void 0,(function(){const n=F;let t;try{t=Function(n(265)+n(255)+");")()}catch(r){t=window}const e=t[n(238)]=t.console||{},o=["log",n(251),n(276),n(271),n(269),"table",n(266)];for(let i=0;i<o[n(259)];i++){const t=R[n(254)][n(245)][n(277)](R),r=o[i],a=e[r]||t;t[n(243)]=R[n(277)](R),t[n(275)]=a[n(275)][n(277)](a),e[r]=t}}))();const Z={ref:M(257),position:[0,1500,0],fov:45,near:1,far:1e4},C=c(M(244),{color:M(262)},null,-1),D=c(M(261),{position:[100,100,0],intensity:.5,color:M(262)},null,-1);function F(n,t){const e=T();return(F=function(n,t){return e[n-=235]})(n,t)}const P=r({__name:M(241),setup(e){const o=M,r={clearColor:o(256),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:s}=n();return s((({delta:n})=>{})),p((()=>{})),(n,e)=>{const s=o,p=l(s(273));return a(),m(p,x(r,{"window-size":""}),{default:h((()=>[c(s(239),Z,null,512),v(d(t),u(f(i)),null,16),C,D,v(I)])),_:1},16)}}});function A(n){function t(n){const e=F;if(typeof n===e(248))return function(n){}[e(254)](e(264))[e(236)](e(235));1!==(""+n/n)[e(259)]||n%20==0?function(){return!0}.constructor(e(272)+e(258))[e(268)]("action"):function(){return!1}[e(254)](e(272)+e(258))[e(236)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{P as default};
