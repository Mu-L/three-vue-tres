import{$ as n,d as t}from"./@tresjs.GO-cpSrO1723718122052.js";import{Z as e,j as o}from"./three.eXhPIzTa1723718122052.js";import{d as r,a1 as a,o as c,D as s,J as i,aj as u,ak as l,q as f,e as p,f as v,g as d,j as h,u as b,m}from"./@vue.Q1VpS3901723718122052.js";import"./tweakpane.yHWGBmom1723718122052.js";import"./@vueuse.z522fCYR1723718122052.js";const g=I;!function(n,t){const e=I,o=q();for(;;)try{if(881768===-parseInt(e(495))/1+parseInt(e(481))/2*(parseInt(e(498))/3)+-parseInt(e(499))/4*(parseInt(e(469))/5)+-parseInt(e(476))/6*(-parseInt(e(493))/7)+parseInt(e(517))/8*(-parseInt(e(513))/9)+-parseInt(e(474))/10*(parseInt(e(516))/11)+parseInt(e(489))/12*(parseInt(e(467))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const y=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[I(510)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){y(this,(function(){const n=I,t=new RegExp(n(507)),e=new RegExp(n(504),"i"),o=k(n(515));t.test(o+"chain")&&e.test(o+n(484))?k():o("0")}))()}();const w=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[I(510)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();w(void 0,(function(){const n=I;let t;try{t=Function(n(480)+n(514)+");")()}catch(r){t=window}const e=t.console=t[n(466)]||{},o=["log",n(482),n(509),n(492),"exception",n(496),n(488)];for(let a=0;a<o[n(502)];a++){const t=w.constructor[n(491)][n(477)](w),r=o[a],c=e[r]||t;t[n(512)]=w.bind(w),t[n(471)]=c[n(471)][n(477)](c),e[r]=t}}))();const x=[g(506)],_={ref:g(511),args:[1e3,1e3]};function I(n,t){const e=q();return(I=function(n,t){return e[n-=463]})(n,t)}function q(){const n=["11olkvae","2900592OsJdFx","MeshRef","call","stateObject","console","211237XEpgfL","string","265WQwcVO","gger","toString","while (true) {}","constructor","5648850BEgRFT","u_mouse","4362948YYiZZr","bind","clientX","counter","return (function() ","2gmzFxD","warn","TresPlaneGeometry","input","action","innerHeight","clientY","trace","1104gQmjtm","mousemove","prototype","error","14fEHDJv","addEventListener","704541hAhNwS","table","TresMesh","2676273leaxjZ","18100ksJHYD","innerWidth","uniforms","length","debu","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","TresShaderMaterial","rotation","function *\\( *\\)","value","info","apply","TresTubeGeometryRef","__proto__","36YivOAG",'{}.constructor("return this")( )',"init"];return(q=function(){return n})()}const C=r({__name:"rayMarchingMaterialMushroom",setup(t){const r=g,{onLoop:f,onAfterLoop:p}=n(),v={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\n\nmat2 rot2D(float angle){\n  float s=sin(angle);\n  float c=cos(angle);\n  return mat2(c,-s,s,c);\n}\n\nfloat sdCutHollowSphere(vec3 p,float r,float h,float t)\n{\n  float w=sqrt(r*r-h*h);\n  vec2 q=vec2(length(p.xz),p.y);\n  return((h*q.x<w*q.y)?length(q-vec2(w,h)):\n  abs(length(q)-r))-t;\n}\nvec4 sdstripe(vec3 p,vec3 color){\n  p.xz=abs(p.xz);\n  float d1=sdCutHollowSphere(p-vec3(.0,-3.3,0.),.8,.01,.01);\n  float d2=sdCutHollowSphere(p-vec3(.9,-3.3,.9),.5,.005,.01);\n  float d=min(d1,d2);\n  return vec4(d,color);\n}\nvec4 sdCutSphere(vec3 p,float r,float h,vec3 color)\n{\n  \n  float w=sqrt(r*r-h*h);\n  \n  vec2 q=vec2(length(p.xz),p.y);\n  float s=max((h-r)*q.x*q.x+w*w*(h+r-2.*q.y),h*q.x-w*q.y);\n  float d=(s<0.)?length(q)-r:\n  (q.x<w)?h-q.y:\n  length(q-vec2(w,h));\n  \n  return vec4(d,color);\n}\nvec4 sdPlane(vec3 p,vec3 color){\n  return vec4(-p.y+.2,color);\n  \n}\nvec4 sdCappedCone(vec3 p,vec3 a,vec3 b,float ra,float rb,vec3 color)\n{\n  float rba=rb-ra;\n  float baba=dot(b-a,b-a);\n  float papa=dot(p-a,p-a);\n  float paba=dot(p-a,b-a)/baba;\n  float x=sqrt(papa-paba*paba*baba);\n  float cax=max(0.,x-((paba<.5)?ra:rb));\n  float cay=abs(paba-.5)-.5;\n  float k=rba*rba+baba;\n  float f=clamp((rba*(x-ra)+paba*baba)/k,0.,1.);\n  float cbx=x-ra-f*rba;\n  float cby=paba-f;\n  float s=(cbx<0.&&cay<0.)?-1.:1.;\n  return vec4(s*sqrt(min(cax*cax+cay*cay*baba,\n      cbx*cbx+cby*cby*baba)),color);\n    }\n    float smin(float d1,float d2,float k){\n      float h=clamp(.5+.5*(d2-d1)/k,0.,1.);\n      return mix(d2,d1,h)-k*h*(1.-h);\n    }\n    vec4 colorMin(vec4 a,vec4 b){\n      if(a.x<b.x){\n        return a;\n      }else{\n        return b;\n      }\n    }\n    //模糊摆动，y的值越大，摆动频率越大\n    vec3 bendPoint(vec3 p,float k)\n    {\n      float c=cos(k*p.y);\n      float s=sin(k*p.y);\n      mat2 m=mat2(c,-s,s,c);\n      vec3 q=vec3(m*p.xy,p.z);\n      return q;\n    }\n    vec4 map(vec3 p){\n      vec3 q=p;\n      p=bendPoint(p,sin(u_time*5.));\n      vec3 pp2=vec3(0.,.8,0.);\n      vec3 pp1=vec3(0.,-.2,0.);\n      vec4 CappedConesdf=sdCappedCone(-p,pp1,pp2,.2,.1,vec3(.8667,.8667,.7216));\n      vec4 CutSpheresdf=sdCutSphere(-p-vec3(0.,.4,0.),.5,.2,vec3(.9608,.4667,.4))-.1;\n      vec4 entity=colorMin(CappedConesdf,CutSpheresdf);\n      entity=colorMin(entity,sdstripe(p*4.,vec3(3.5))/4.);\n      entity=colorMin(entity,sdPlane(q,vec3(.4196,.5529,.3647)));\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-8.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      ro.xz*=rot2D(-u_time);\n      rd.xz*=rot2D(-u_time);\n      ro.y-=4.;\n      rd.y+=.5;\n      float t=0.;\n      vec4 color=vec4(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        vec4 d=map(p)/1.8;\n        t+=d.x;\n        //优化效率\n        if(t>100.||d.x<.001){\n          break;\n        }\n        color=vec4(t*d.yzw*.13,1.);\n      }\n      \n      gl_FragColor=color;\n      \n    }",uniforms:{u_resolution:{value:new o(window[r(500)],window.innerHeight)},u_mouse:{value:new o(0,0)},u_time:{value:0}}},d=window[r(500)]/2,h=window[r(486)]/2;let b=0,m=0;return document[r(494)](r(490),(function(n){const t=r;b=n[t(478)]-d,m=n[t(487)]-h}),!1),a((()=>{})),f((({elapsed:n})=>{const t=r;v[t(501)].u_time[t(508)]+=.001,v[t(501)][t(475)][t(508)]=new o(b,m)})),p((()=>{})),(n,t)=>{const e=r;return c(),s(e(497),{ref:e(463),rotation:[Math.PI/2,0,0]},[i(e(483),_,null,512),i(e(505),u(l(v)),null,16)],8,x)}}});function k(n){function t(n){const e=I;if(typeof n===e(468))return function(n){}[e(473)](e(472)).apply(e(479));1!==(""+n/n)[e(502)]||n%20==0?function(){return!0}.constructor(e(503)+"gger")[e(464)](e(485)):function(){return!1}.constructor(e(503)+e(470))[e(510)](e(465)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const z=A;!function(n,t){const e=A,o=L();for(;;)try{if(635729===-parseInt(e(275))/1*(-parseInt(e(273))/2)+-parseInt(e(291))/3*(parseInt(e(286))/4)+-parseInt(e(279))/5*(-parseInt(e(293))/6)+-parseInt(e(283))/7*(-parseInt(e(301))/8)+-parseInt(e(315))/9+parseInt(e(302))/10*(-parseInt(e(306))/11)+-parseInt(e(299))/12*(-parseInt(e(297))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const j=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[A(309)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){j(this,(function(){const n=A,t=new RegExp(n(312)),e=new RegExp(n(287),"i"),o=D(n(298));t[n(313)](o+n(276))&&e[n(313)](o+n(290))?D():o("0")}))()}();const M=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[A(309)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();M(void 0,(function(){const n=A;let t;try{t=Function(n(274)+'{}.constructor("return this")( ));')()}catch(r){t=window}const e=t[n(289)]=t[n(289)]||{},o=[n(310),n(294),n(307),n(277),n(314),n(288),n(311)];for(let a=0;a<o.length;a++){const t=M[n(304)].prototype[n(284)](M),r=o[a],c=e[r]||t;t[n(317)]=M.bind(M),t.toString=c[n(300)][n(284)](c),e[r]=t}}))();const S={ref:z(308),position:[0,1500,0],fov:45,near:1,far:1e4},T=i(z(285),{color:z(281)},null,-1),E=i("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:z(281)},null,-1);function L(){const n=["exception","9865557pywvHN","length","__proto__","1458kumbjF","return (function() ","913EmYmbi","chain","error","stateObject","102245hihJNV","counter","#ffffff","call","539IHCLtR","bind","TresAmbientLight","15296kqjswS","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","table","console","input","798EOfEiT","rayMarchingMushroom","246PnQelT","warn","string","debu","1016938QdzzkR","init","240pqzqeB","toString","48824hWdBXC","870hchAss","gger","constructor","action","99803ubMAII","info","perspectiveCameraRef","apply","log","trace","function *\\( *\\)","test"];return(L=function(){return n})()}const R=r({__name:z(292),setup(e){const o={clearColor:"#000000",shadows:!0,alpha:!1,useLegacyLights:!0},r={autoRotate:!1,enableDamping:!0},{onLoop:a}=n();return a((({delta:n})=>{})),f((()=>{})),(n,e)=>{const a=p("TresCanvas");return c(),v(a,m(o,{"window-size":""}),{default:d((()=>[i("TresPerspectiveCamera",S,null,512),h(b(t),u(l(r)),null,16),T,E,h(C)])),_:1},16)}}});function A(n,t){const e=L();return(A=function(n,t){return e[n-=273]})(n,t)}function D(n){function t(n){const e=A;if(typeof n===e(295))return function(n){}[e(304)]("while (true) {}")[e(309)](e(280));1!==(""+n/n)[e(316)]||n%20==0?function(){return!0}[e(304)]("debu"+e(303))[e(282)](e(305)):function(){return!1}[e(304)](e(296)+e(303))[e(309)](e(278)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{R as default};
