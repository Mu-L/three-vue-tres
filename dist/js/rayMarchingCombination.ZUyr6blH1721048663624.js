import{r as n,d as t}from"./@tresjs.Xiq_TH801721048663624.js";import{Z as e,j as o}from"./three.HEgnMaTu1721048663624.js";import{d as r,a2 as i,o as a,D as s,J as c,aj as u,ak as f,q as p,e as l,f as m,g as d,j as h,u as v,m as x}from"./@vue.ApkyOKE71721048663624.js";import"./@vueuse.2IVIyoVR1721048663624.js";import"./tweakpane.yHWGBmom1721048663624.js";const y=b;!function(n,t){const e=b,o=w();for(;;)try{if(474910===parseInt(e(328))/1+parseInt(e(302))/2*(-parseInt(e(307))/3)+parseInt(e(312))/4*(-parseInt(e(324))/5)+parseInt(e(332))/6+parseInt(e(293))/7*(parseInt(e(320))/8)+-parseInt(e(299))/9+parseInt(e(298))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[b(333)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){g(this,(function(){const n=b,t=new RegExp(n(306)),e=new RegExp(n(313),"i"),o=j(n(325));t.test(o+n(327))&&e[n(314)](o+"input")?j():o("0")}))()}();const q=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[b(333)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();q(void 0,(function(){const n=b;let t;try{t=Function(n(294)+n(303)+");")()}catch(r){t=window}const e=t[n(309)]=t[n(309)]||{},o=["log",n(292),n(301),"error",n(336),"table",n(289)];for(let i=0;i<o[n(326)];i++){const t=q[n(291)].prototype[n(321)](q),r=o[i],a=e[r]||t;t[n(308)]=q[n(321)](q),t[n(317)]=a[n(317)].bind(a),e[r]=t}}))();const _=[y(311)],z={ref:y(329),args:[1e3,1e3]};function w(){const n=["\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","test","clientY","TresShaderMaterial","toString","addEventListener","counter","16VlkLXK","bind","TresMesh","call","314130LfEzzJ","init","length","chain","175460DlpSnS","TresTubeGeometryRef","debu","u_time","1762416HBYLqN","apply","value","innerHeight","exception","TresPlaneGeometry","rayMarchingMaterialCombination","trace","u_mouse","constructor","warn","1393105NQiuqQ","return (function() ","MeshRef","mousemove","stateObject","10284610FPuAtL","1220607ZcjGCi","gger","info","143944XKFyXU",'{}.constructor("return this")( )',"while (true) {}","action","function *\\( *\\)","30JGeeDo","__proto__","console","uniforms","rotation","36BrKwxs"];return(w=function(){return n})()}function b(n,t){const e=w();return(b=function(n,t){return e[n-=288]})(n,t)}const I=r({__name:y(288),setup(t){const r=y,{onLoop:p,onAfterLoop:l}=n(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",uniforms:{u_resolution:{value:new o(window.innerWidth,window[r(335)])},u_mouse:{value:new o(0,0)},u_time:{value:0}}},d=window.innerWidth/2,h=window.innerHeight/2;let v=0,x=0;return document[r(318)](r(296),(function(n){const t=r;v=n.clientX-d,x=n[t(315)]-h}),!1),i((()=>{})),p((({elapsed:n})=>{const t=r;m[t(310)][t(331)][t(334)]+=.001,m[t(310)][t(290)][t(334)]=new o(v,x)})),l((()=>{})),(n,t)=>{const e=r;return a(),s(e(322),{ref:e(295),rotation:[Math.PI/2,0,0]},[c(e(337),z,null,512),c(e(316),u(f(m)),null,16)],8,_)}}});function j(n){function t(n){const e=b;if("string"==typeof n)return function(n){}.constructor(e(304))[e(333)](e(319));1!==(""+n/n)[e(326)]||n%20==0?function(){return!0}[e(291)](e(330)+"gger")[e(323)](e(305)):function(){return!1}[e(291)](e(330)+e(300))[e(333)](e(297)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const L=F;!function(n,t){const e=F,o=C();for(;;)try{if(367059===parseInt(e(334))/1*(-parseInt(e(335))/2)+-parseInt(e(338))/3*(parseInt(e(368))/4)+-parseInt(e(367))/5+-parseInt(e(352))/6+-parseInt(e(336))/7+parseInt(e(363))/8+parseInt(e(337))/9)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const D=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[F(359)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){D(this,(function(){const n=F,t=new RegExp(n(341)),e=new RegExp(n(364),"i"),o=k("init");t[n(350)](o+"chain")&&e.test(o+n(347))?k():o("0")}))()}();const M=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[F(359)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function C(){const n=["input","constructor","string","test","perspectiveCameraRef","1184238xsZchn","toString","call","counter","log","table","return (function() ","apply","warn","error","gger","2036752gOXYZK","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","length","debu","3313300SiaCOw","33804zqsmHZ","#000000","bind","info","25yXVgcz","55294MCBaRt","2536548YokWZo","18462510jPUSNO","9GMsViH","while (true) {}","TresPerspectiveCamera","function *\\( *\\)","exception","#ffffff","console",'{}.constructor("return this")( )',"__proto__"];return(C=function(){return n})()}M(void 0,(function(){const n=F,t=function(){const n=F;let t;try{t=Function(n(358)+n(345)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(344)]||{},o=[n(356),n(360),n(333),n(361),n(342),n(357),"trace"];for(let r=0;r<o[n(365)];r++){const t=M.constructor.prototype.bind(M),i=o[r],a=e[i]||t;t[n(346)]=M[n(332)](M),t[n(353)]=a[n(353)][n(332)](a),e[i]=t}}))();const S={ref:L(351),position:[0,1500,0],fov:45,near:1,far:1e4},T=c("TresAmbientLight",{color:"#ffffff"},null,-1),Z=c("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:L(343)},null,-1);function F(n,t){const e=C();return(F=function(n,t){return e[n-=331]})(n,t)}const R=r({__name:"rayMarchingCombination",setup(e){const o=L,r={clearColor:o(331),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:s}=n();return s((({delta:n})=>{})),p((()=>{})),(n,e)=>{const s=o,p=l("TresCanvas");return a(),m(p,x(r,{"window-size":""}),{default:d((()=>[c(s(340),S,null,512),h(v(t),u(f(i)),null,16),T,Z,h(I)])),_:1},16)}}});function k(n){function t(n){const e=F;if(typeof n===e(349))return function(n){}[e(348)](e(339)).apply(e(355));1!==(""+n/n)[e(365)]||n%20==0?function(){return!0}[e(348)](e(366)+e(362))[e(354)]("action"):function(){return!1}[e(348)](e(366)+e(362))[e(359)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{R as default};
