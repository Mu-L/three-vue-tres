import{p as n,$ as t,d as o}from"./@tresjs.qmCJ68Vp1722409645193.js";import{j as e,bY as r,bW as i,c6 as a}from"./three.6E5muTWJ1722409645193.js";import{d as c,e as u,o as s,f,g as l,J as p,j as v,u as d,al as h,m as g}from"./@vue.9bHx4gg21722409645193.js";import"./tweakpane.yHWGBmom1722409645193.js";import"./@vueuse.NFOCyQQL1722409645193.js";const m=b;!function(n,t){const o=b,e=y();for(;;)try{if(692012===parseInt(o(158))/1*(parseInt(o(190))/2)+parseInt(o(171))/3+-parseInt(o(161))/4+-parseInt(o(162))/5*(-parseInt(o(197))/6)+-parseInt(o(188))/7*(parseInt(o(184))/8)+-parseInt(o(194))/9+-parseInt(o(154))/10*(-parseInt(o(185))/11))break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const x=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[b(187)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){x(this,(function(){const n=b,t=new RegExp(n(174)),o=new RegExp(n(175),"i"),e=k(n(163));t[n(176)](e+n(189))&&o[n(176)](e+"input")?k():e("0")}))()}();const w=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[b(187)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function y(){const n=["log","trace","function *\\( *\\)","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","test","warn","debu","exception","uniforms","value","stateObject","prototype","8BsHJNV","16226386BrHtKo",'{}.constructor("return this")( )',"apply","3602557qEaiSf","chain","6ITtHop","toString","length","gger","8704557MahcdE","iTime","bind","42yCPnDI","call","10QTNWMk","constructor","__proto__","render","437846XAZbsO","counter","action","4174268dGfjpM","101665SRWmfh","init","innerWidth","console","while (true) {}","lightEffect","error","addPass","info","859224SlYLkQ"];return(y=function(){return n})()}function b(n,t){const o=y();return(b=function(n,t){return o[n-=153]})(n,t)}w(void 0,(function(){const n=b,t=function(){const n=b;let t;try{t=Function("return (function() "+n(186)+");")()}catch(o){t=window}return t}(),o=t[n(165)]=t[n(165)]||{},e=[n(172),n(177),n(170),n(168),n(179),"table",n(173)];for(let r=0;r<e[n(192)];r++){const t=w[n(155)][n(183)][n(196)](w),i=e[r],a=o[i]||t;t[n(156)]=w.bind(w),t.toString=a[n(191)].bind(a),o[i]=t}}))();const I=c({__name:m(167),setup(o){const c=m,{camera:u,renderer:s,scene:f,sizes:l}=n(),{onLoop:p,onAfterLoop:v}=t(),d={uniforms:{iResolution:{type:"v2",value:new e(window[c(164)],window.innerHeight)},iTime:{type:"f",value:null},tDiffuse:{value:null}},vertexShader:"varying vec2 vUv;\nvoid main(){\n\tvec4 mvPosition=modelViewMatrix*vec4(position,1.);\n\tgl_Position=projectionMatrix*mvPosition;\n\tvUv=uv;\n}",fragmentShader:"uniform vec2 iResolution;\nuniform float iTime;\nvarying vec2 vUv;\nuniform sampler2D tDiffuse;\nfloat rand(float x)\n{\n\treturn fract(sin(x)*75154.32912);\n}\n\nfloat rand3d(vec3 x)\n{\n\treturn fract(375.10297*sin(dot(x,vec3(103.0139,227.0595,31.05914))));\n}\n\nfloat noise(float x)\n{\n\tfloat i=floor(x);\n\tfloat a=rand(i),b=rand(i+1.);\n\tfloat f=x-i;\n\treturn mix(a,b,f);\n}\n\nfloat perlin(float x)\n{\n\tfloat r=0.,s=1.,w=1.;\n\tfor(int i=0;i<6;i++){\n\t\ts*=2.;\n\t\tw*=.5;\n\t\tr+=w*noise(s*x);\n\t}\n\treturn r;\n}\n\nfloat noise3d(vec3 x)\n{\n\tvec3 i=floor(x);\n\tfloat i000=rand3d(i+vec3(0.,0.,0.)),i001=rand3d(i+vec3(0.,0.,1.));\n\tfloat i010=rand3d(i+vec3(0.,1.,0.)),i011=rand3d(i+vec3(0.,1.,1.));\n\tfloat i100=rand3d(i+vec3(1.,0.,0.)),i101=rand3d(i+vec3(1.,0.,1.));\n\tfloat i110=rand3d(i+vec3(1.,1.,0.)),i111=rand3d(i+vec3(1.,1.,1.));\n\tvec3 f=x-i;\n\treturn mix(mix(mix(i000,i001,f.z),mix(i010,i011,f.z),f.y),\n\tmix(mix(i100,i101,f.z),mix(i110,i111,f.z),f.y),f.x);\n}\n\nfloat perlin3d(vec3 x)\n{\n\tfloat r=0.;\n\tfloat w=1.,s=1.;\n\tfor(int i=0;i<5;i++){\n\t\tw*=.5;\n\t\ts*=2.;\n\t\tr+=w*noise3d(s*x);\n\t}\n\treturn r;\n}\n\nfloat f(float y)\n{\n\tfloat w=.4;// width of strike\n\treturn w*(perlin(2.*y)-.5);\n}\n\nfloat plot(vec2 p,float d,bool thicker)\n{\n\tif(thicker)d+=5.*abs(f(p.y+.001)-f(p.y));\n\treturn smoothstep(d,0.,abs(f(p.y)-p.x));\n}\n\nfloat cloud(vec2 uv,float speed,float scale,float cover)\n{\n\tfloat c=perlin3d(vec3(uv*scale,iTime*speed*2.));\n\treturn max(0.,c-(1.-cover));\n}\n\nfloat mountain(vec2 uv,float scale,float offset,float h1,float h2)\n{\n\tfloat h=h1+perlin(scale*uv.x+offset)*(h2-h1);\n\treturn smoothstep(h,h+.01,uv.y);\n}\n\nvec3 render(vec2 uv)\n{\n\tfloat x=iTime+.1;\n\t\n\tfloat m=.25;// max duration of strike\n\tfloat i=floor(x/m);\n\tfloat f=x/m-i;\n\tfloat k=.4;// frequency of strikes\n\tfloat n=noise(i);\n\tfloat t=ceil(n-k);// occurrence\n\tfloat d=max(0.,n-k)/(1.-k);// duration\n\tfloat o=ceil(t-f-(1.-d));// occurrence with duration\n\tfloat gt=.1;// glare duration\n\tfloat go=ceil(t-f-(1.-gt));// glare occurrence\n\t\n\tfloat lightning=0.;\n\tfloat light=0.;\n\tfloat glare=0.;\n\t\n\tif(o==1.){\n\t\tvec2 uv2=uv;\n\t\tuv2.y+=i*2.;// select type of lightning\n\t\tfloat p=(noise(i+10.)-.5)*2.;// position of lightning\n\t\tuv2.x-=p;\n\t\t\n\t\tfloat strike=plot(uv2,.01,true);\n\t\tfloat glow=plot(uv2,.04,false);\n\t\tfloat glow2=plot(uv2,1.5,false);\n\t\t\n\t\tlightning=strike*.4+glow*.15;\n\t\t\n\t\tfloat h=noise(i+5.);// height\n\t\tlightning*=smoothstep(h,h+.05,uv.y+perlin(1.2*uv.x+4.*h)*.03);\n\t\tlightning+=glow2*.3;\n\t\tlight=smoothstep(5.,0.,abs(uv.x-p));\n\t\tglare=go*light;\n\t}\n\t\n\tvec3 clouds=\n\tvec3(.5,.7,1.)*mix(.6,.9,cloud(uv,.2,.1,1.))+\n\tvec3(.7,.8,1.)*.6*cloud(uv*vec2(.5,1.),.06,.8,.8)+\n\tvec3(.9,.9,1.)*.3*cloud(uv*vec2(.1,1.),.08,5.5,.6)+\n\tvec3(1.,1.,1.)*.4*cloud(uv*vec2(.1,1.),.07,10.,.5);\n\t\n\tfloat horizon=mountain(uv,.8,9.,.3,.6);\n\tvec3 terrain=mix(vec3(.25,.3,.3)*.5,1.5*vec3(.15,.2,.3),\n\t1.-(1.-mountain(uv,.8,3.,.2,.4))*.5-\n\t(1.-mountain(uv,.8,17.5,.05,.25))*.5);\n\t\n\tvec3 background=mix(terrain,clouds,horizon);\n\tbackground*=(.2+light*.5);\n\tvec4 previousPassColor=texture2D(tDiffuse,vUv);\n\treturn vec3(background+lightning+previousPassColor.xyz);\n}\n\nvoid main()\n{\n\tvec2 uv=vUv;\n\tuv.x=2.*uv.x-1.;\n\tuv.x*=iResolution.x/iResolution.y;\n\t\n\tgl_FragColor=vec4(render(uv),1.);\n}"},h=new r(s.value);h[c(169)](new i(f[c(181)],u[c(181)]));const g=new a(d);return h[c(169)](g),p((({elapsed:n})=>{const t=c;g[t(180)][t(195)].value=.3*n})),v((()=>{h[c(157)]()})),(n,t)=>null}});function k(n){function t(n){const o=b;if("string"==typeof n)return function(n){}[o(155)](o(166))[o(187)](o(159));1!==(""+n/n).length||n%20==0?function(){return!0}[o(155)](o(178)+"gger")[o(153)](o(160)):function(){return!1}[o(155)](o(178)+o(193)).apply(o(182)),t(++n)}try{if(n)return t;t(0)}catch(o){}}const _=j;!function(n,t){const o=j,e=P();for(;;)try{if(590614===parseInt(o(387))/1*(-parseInt(o(400))/2)+-parseInt(o(374))/3*(parseInt(o(373))/4)+-parseInt(o(378))/5*(parseInt(o(395))/6)+-parseInt(o(384))/7+parseInt(o(391))/8*(-parseInt(o(381))/9)+parseInt(o(409))/10*(-parseInt(o(410))/11)+-parseInt(o(403))/12*(-parseInt(o(389))/13))break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const z=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[j(390)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();function j(n,t){const o=P();return(j=function(n,t){return o[n-=370]})(n,t)}function P(){const n=["123992SApmZO","perspectiveCameraRef","prototype",'{}.constructor("return this")( )',"66kTIxYI","debu","length","stateObject","gger","201426nPhoYs","warn","TresDirectionalLight","96WqNzNh","table","TresAmbientLight","bind","exception","function *\\( *\\)","11145490LZKRbo","11bLujKw","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","toString","error","trace","4Idnklc","1923927uZcbHg","test","constructor","console","413710CsyNQP","__proto__","#000000","495ypoPDx","TresPerspectiveCamera","init","8142008REzPkH","info","call","1KVBwZc","#ffffff","8731021TrBPBO","apply"];return(P=function(){return n})()}!function(){z(this,(function(){const n=j,t=new RegExp(n(408)),o=new RegExp(n(411),"i"),e=Z(n(383));t[n(375)](e+"chain")&&o[n(375)](e+"input")?Z():e("0")}))()}();const T=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[j(390)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();T(void 0,(function(){const n=j;let t;try{t=Function("return (function() "+n(394)+");")()}catch(r){t=window}const o=t[n(377)]=t[n(377)]||{},e=["log",n(401),n(385),n(371),n(407),n(404),n(372)];for(let i=0;i<e[n(397)];i++){const t=T[n(376)][n(393)][n(406)](T),r=e[i],a=o[r]||t;t[n(379)]=T[n(406)](T),t[n(370)]=a[n(370)].bind(a),o[r]=t}}))();const R={ref:_(392),position:[600,750,-1221],fov:45,near:1,far:1e4},C=p(_(405),{color:_(388)},null,-1),L=p(_(402),{position:[400,400,400],intensity:1,color:"red"},null,-1),S=c({__name:"lightning",setup(n){const t=_,e={clearColor:t(380),shadows:!0,alpha:!1,useLegacyLights:!0};return(n,r)=>{const i=t,a=u("TresCanvas");return s(),f(a,g(e,{"window-size":""}),{default:l((()=>[p(i(382),R,null,512),v(d(o)),C,L,(s(),f(h,null,{default:l((()=>[v(I)])),_:1}))])),_:1},16)}}});function Z(n){function t(n){const o=j;if("string"==typeof n)return function(n){}[o(376)]("while (true) {}")[o(390)]("counter");1!==(""+n/n).length||n%20==0?function(){return!0}[o(376)](o(396)+"gger")[o(386)]("action"):function(){return!1}[o(376)](o(396)+o(399)).apply(o(398)),t(++n)}try{if(n)return t;t(0)}catch(o){}}export{S as default};
