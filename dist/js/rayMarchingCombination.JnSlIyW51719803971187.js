import{r as n,d as t}from"./@tresjs.rn1P_YDI1719803971187.js";import{Z as e,j as o}from"./three.BsQyBKrV1719803971187.js";import{d as r,a2 as i,o as a,D as s,J as c,aj as u,ak as f,q as p,e as l,f as m,g as h,j as d,u as v,m as x}from"./@vue.CpOXM7bB1719803971187.js";import"./@vueuse.T5wlwfAk1719803971187.js";import"./tweakpane.qqn77PB81719803971187.js";const y=z;!function(n,t){const e=z,o=b();for(;;)try{if(635643===-parseInt(e(403))/1*(parseInt(e(439))/2)+parseInt(e(438))/3*(-parseInt(e(443))/4)+-parseInt(e(400))/5+-parseInt(e(409))/6*(-parseInt(e(446))/7)+-parseInt(e(437))/8*(-parseInt(e(423))/9)+-parseInt(e(405))/10+-parseInt(e(413))/11*(-parseInt(e(404))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){g(this,(function(){const n=z,t=new RegExp(n(412)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=j(n(407));t[n(417)](o+n(422))&&e[n(417)](o+n(426))?j():o("0")}))()}();const q=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();q(void 0,(function(){const n=z;let t;try{t=Function(n(428)+n(425)+");")()}catch(r){t=window}const e=t.console=t.console||{},o=["log",n(410),n(398),"error",n(406),n(434),"trace"];for(let i=0;i<o[n(444)];i++){const t=q.constructor[n(429)][n(432)](q),r=o[i],a=e[r]||t;t[n(415)]=q.bind(q),t[n(441)]=a.toString[n(432)](a),e[r]=t}}))();const _=[y(401)],w={ref:y(424),args:[1e3,1e3]};function z(n,t){const e=b();return(z=function(n,t){return e[n-=397]})(n,t)}function b(){const n=["__proto__","mousemove","test","uniforms","addEventListener","call","TresPlaneGeometry","chain","38691mkOIWF","TresTubeGeometryRef",'{}.constructor("return this")( )',"input","TresMesh","return (function() ","prototype","MeshRef","TresShaderMaterial","bind","value","table","while (true) {}","u_time","920yquWip","5466elutnc","10Sanmyh","clientY","toString","clientX","2216LCopKR","length","constructor","13811OHpLYU","rayMarchingMaterialCombination","apply","info","innerHeight","5951240AfEpXR","rotation","innerWidth","159875kuEAqB","2004VCfuBa","3080900kAeDMD","exception","init","gger","2946unJAOq","warn","u_mouse","function *\\( *\\)","163328mZkqrU","stateObject"];return(b=function(){return n})()}const I=r({__name:y(447),setup(t){const r=y,{onLoop:p,onAfterLoop:l}=n(),m={transparent:!0,depthWrite:!0,depthTest:!0,side:e,vertexShader:"varying vec2 vUv;\nvoid main(){\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n\tvUv=uv;\n}",fragmentShader:"#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",uniforms:{u_resolution:{value:new o(window[r(402)],window.innerHeight)},u_mouse:{value:new o(0,0)},u_time:{value:0}}},h=window.innerWidth/2,d=window[r(399)]/2;let v=0,x=0;return document[r(419)](r(416),(function(n){const t=r;v=n[t(442)]-h,x=n[t(440)]-d}),!1),i((()=>{})),p((({elapsed:n})=>{const t=r;m[t(418)][t(436)][t(433)]+=.001,m[t(418)][t(411)][t(433)]=new o(v,x)})),l((()=>{})),(n,t)=>{const e=r;return a(),s(e(427),{ref:e(430),rotation:[Math.PI/2,0,0]},[c(e(421),w,null,512),c(e(431),u(f(m)),null,16)],8,_)}}});function j(n){function t(n){const e=z;if("string"==typeof n)return function(n){}[e(445)](e(435))[e(397)]("counter");1!==(""+n/n)[e(444)]||n%20==0?function(){return!0}[e(445)]("debu"+e(408))[e(420)]("action"):function(){return!1}.constructor("debu"+e(408))[e(397)](e(414)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const A=B;!function(n,t){const e=B,o=R();for(;;)try{if(560540===-parseInt(e(218))/1+parseInt(e(227))/2*(-parseInt(e(215))/3)+parseInt(e(226))/4+-parseInt(e(209))/5+-parseInt(e(223))/6*(-parseInt(e(204))/7)+-parseInt(e(198))/8*(parseInt(e(222))/9)+parseInt(e(199))/10)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const D=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){D(this,(function(){const n=B,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(201),"i"),o=S(n(212));t[n(195)](o+"chain")&&e[n(195)](o+n(214))?S():o("0")}))()}();const C=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[B(208)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();C(void 0,(function(){const n=B;let t;try{t=Function(n(231)+n(196)+");")()}catch(r){t=window}const e=t[n(200)]=t[n(200)]||{},o=[n(210),"warn","info","error","exception","table",n(213)];for(let i=0;i<o[n(230)];i++){const t=C[n(228)][n(221)][n(206)](C),r=o[i],a=e[r]||t;t[n(216)]=C[n(206)](C),t.toString=a.toString[n(206)](a),e[r]=t}}))();const k={ref:"perspectiveCameraRef",position:[0,1500,0],fov:45,near:1,far:1e4},L=c(A(224),{color:"#ffffff"},null,-1),M=c("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:A(202)},null,-1);function R(){const n=["bind","counter","apply","1736895EKGomk","log","rayMarchingCombination","init","trace","input","21CjIpai","__proto__","gger","504067zPAAaN","TresPerspectiveCamera","while (true) {}","prototype","963063BpDMSr","4098wBjXpn","TresAmbientLight","action","863120qBZlGU","177390hUCqjx","constructor","string","length","return (function() ","TresCanvas","test",'{}.constructor("return this")( )',"#000000","56hFwvtJ","14480490liohBR","console","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","#ffffff","debu","11459aACEtD","call"];return(R=function(){return n})()}function B(n,t){const e=R();return(B=function(n,t){return e[n-=195]})(n,t)}const E=r({__name:A(211),setup(e){const o=A,r={clearColor:o(197),shadows:!0,alpha:!1,useLegacyLights:!0},i={autoRotate:!1,enableDamping:!0},{onLoop:s}=n();return s((({delta:n})=>{})),p((()=>{})),(n,e)=>{const s=o,p=l(s(232));return a(),m(p,x(r,{"window-size":""}),{default:h((()=>[c(s(219),k,null,512),d(v(t),u(f(i)),null,16),L,M,d(I)])),_:1},16)}}});function S(n){function t(n){const e=B;if(typeof n===e(229))return function(n){}[e(228)](e(220))[e(208)](e(207));1!==(""+n/n)[e(230)]||n%20==0?function(){return!0}[e(228)]("debugger")[e(205)](e(225)):function(){return!1}[e(228)](e(203)+e(217)).apply("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{E as default};
