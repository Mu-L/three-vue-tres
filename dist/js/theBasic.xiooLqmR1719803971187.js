import{bR as t,aa as n,bS as e}from"./three.BsQyBKrV1719803971187.js";import{d as o,r}from"./@tresjs.rn1P_YDI1719803971187.js";import{d as a,r as s,b as i,X as c,a2 as u,q as l,e as p,o as f,f as h,g as m,j as d,u as g,aj as I,ak as w,J as y,m as T}from"./@vue.CpOXM7bB1719803971187.js";import"./@vueuse.T5wlwfAk1719803971187.js";import"./tweakpane.qqn77PB81719803971187.js";const b=k;!function(t,n){const e=k,o=P();for(;;)try{if(736712===-parseInt(e(232))/1*(parseInt(e(213))/2)+parseInt(e(220))/3*(parseInt(e(212))/4)+parseInt(e(209))/5+parseInt(e(192))/6*(-parseInt(e(235))/7)+-parseInt(e(208))/8*(-parseInt(e(197))/9)+-parseInt(e(225))/10*(-parseInt(e(246))/11)+parseInt(e(223))/12*(-parseInt(e(194))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const M=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function P(){const t=["call","26262KJrdtI","constructor","13pbzIUT","TresSphereGeometry","counter","27lagCSo","#201919","sin","debu","gger",'{}.constructor("return this")( )',"camera","#006060","console","bottom","value","1755648nUkIIQ","5993725cXDTKV","exception","shadow","4dlFkyV","2675726ZKLBEM","length","TresDirectionalLight","sphereRef2","log","TresAmbientLight","while (true) {}","4240779RdAIoC","TresGridHelper","#DFFF45","22030992XYLRvb","near","6660470LJQghQ","apply","TresCanvas","TDirectionalLight","set","prototype","material","1askpQQ","bind","TresMesh","42lrkMfN","TresPlaneGeometry","input","string","chain","test","toString","__proto__","rotation","color","position","11oteuEx","return (function() ","TresPerspectiveCamera"];return(P=function(){return t})()}function k(t,n){const e=P();return(k=function(t,n){return e[t-=190]})(t,n)}!function(){M(this,(function(){const t=k,n=new RegExp("function *\\( *\\)"),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=C("init");n[t(240)](o+t(239))&&e[t(240)](o+t(237))?C():o("0")}))()}();const v=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[k(226)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();v(void 0,(function(){const t=k;let n;try{n=Function(t(247)+t(202)+");")()}catch(r){n=window}const e=n[t(205)]=n.console||{},o=[t(217),"warn","info","error",t(210),"table","trace"];for(let a=0;a<o[t(214)];a++){const n=v[t(193)][t(230)][t(233)](v),r=o[a],s=e[r]||n;n[t(242)]=v[t(233)](v),n.toString=s[t(241)][t(233)](s),e[r]=n}}))();const _=y(b(190),{position:[15,15,15],fov:45,near:.1,far:1e3,"look-at":[0,0,0]},null,-1),j=y(b(218),{intensity:.5},null,-1),S=[y(b(195),{args:[2,32,32]},null,-1),y("TresMeshToonMaterial",{color:b(204)},null,-1)],A=[y(b(195),{args:[2,32,32]},null,-1),y("TresMeshToonMaterial",{color:b(204)},null,-1)],R=[b(243)],x=[y(b(236),{args:[20,20,20,20]},null,-1),y("TresMeshToonMaterial",null,null,-1)],L=y(b(215),{position:[10,2,4],intensity:1,"cast-shadow":""},null,-1),z=y(b(221),{"position-y":.1},null,-1),D=a({__name:"theBasic",setup(a){const M=b,P=s({clearColor:M(198),shadows:!0,alpha:!1,shadowMapType:t,outputColorSpace:n,toneMapping:e}),k=s({enableDamping:!0,dampingFactor:.05,enableZoom:!0,autoRotate:!1,autoRotateSpeed:2,maxPolarAngle:Math.PI,minPolarAngle:0,maxAzimuthAngle:Math.PI,minAzimuthAngle:-Math.PI,enablePan:!0,keyPanSpeed:7,maxDistance:100,minDistance:0,minZoom:0,maxZoom:100,zoomSpeed:1,enableRotate:!0,rotateSpeed:1}),v=i(),D=i(),C=c(),{onLoop:E}=r();function F(t){const n=M;t&&t.object[n(231)][n(244)][n(229)](n(222))}function Z(t){const n=M;t&&t.material.color[n(229)](n(204))}return E((({elapsed:t})=>{const n=M;v[n(207)]&&(v[n(207)][n(245)].y+=.01*Math[n(199)](t),D.value[n(245)].y+=.01*Math.sin(t))})),u((()=>{const t=M;C[t(207)]&&(C[t(207)][t(211)].mapSize[t(229)](1e3,1e3),C[t(207)][t(211)].camera[t(224)]=.5,C[t(207)].shadow[t(203)].top=20,C[t(207)].shadow[t(203)].right=20,C[t(207)].shadow.camera.left=-20,C[t(207)].shadow[t(203)][t(206)]=-20)})),l((()=>{})),(t,n)=>{const e=M,r=p(e(227));return f(),h(r,T(P,{"window-size":""}),{default:m((()=>[_,d(g(o),I(w(k)),null,16),j,y("TresMesh",{ref_key:"sphereRef",ref:v,position:[0,4,0],"cast-shadow":"",onPointerEnter:F,onPointerLeave:Z},S,544),y("TresMesh",{ref_key:e(216),ref:D,position:[4,4,0],"cast-shadow":"",onPointerEnter:F,onPointerLeave:Z},A,544),y(e(234),{rotation:[-Math.PI/2,0,0],"receive-shadow":""},x,8,R),y(e(215),{ref_key:e(228),ref:C,position:[10,8,4],intensity:1,"cast-shadow":""},null,512),L,z])),_:1},16)}}});function C(t){function n(t){const e=k;if(typeof t===e(238))return function(t){}[e(193)](e(219))[e(226)](e(196));1!==(""+t/t)[e(214)]||t%20==0?function(){return!0}[e(193)]("debu"+e(201))[e(191)]("action"):function(){return!1}[e(193)](e(200)+"gger")[e(226)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{D as default};
