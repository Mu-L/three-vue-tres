import{bS as n,ab as t,ad as e}from"./three.eXhPIzTa1723718122052.js";import{q as a,d as o}from"./@tresjs.GO-cpSrO1723718122052.js";import{d as i,r,e as s,o as l,D as u,j as c,g as m,u as p,m as f,F as d,J as b}from"./@vue.Q1VpS3901723718122052.js";import"./tweakpane.yHWGBmom1723718122052.js";import"./@vueuse.z522fCYR1723718122052.js";const h=x;!function(n,t){const e=x,a=A();for(;;)try{if(251692===parseInt(e(214))/1*(-parseInt(e(193))/2)+parseInt(e(202))/3*(-parseInt(e(217))/4)+-parseInt(e(221))/5*(-parseInt(e(191))/6)+-parseInt(e(196))/7+parseInt(e(248))/8*(-parseInt(e(190))/9)+parseInt(e(235))/10*(-parseInt(e(223))/11)+parseInt(e(226))/12*(parseInt(e(237))/13))break;a.push(a.shift())}catch(o){a.push(a.shift())}}();const g=function(){let n=!0;return function(t,e){const a=n?function(){if(e){const n=e[x(194)](t,arguments);return e=null,n}}:function(){};return n=!1,a}}();function x(n,t){const e=A();return(x=function(n,t){return e[n-=182]})(n,t)}!function(){g(this,(function(){const n=x,t=new RegExp(n(222)),e=new RegExp(n(225),"i"),a=D(n(195));t.test(a+n(211))&&e[n(244)](a+n(183))?D():a("0")}))()}();const I=function(){let n=!0;return function(t,e){const a=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,a}}();function A(){const n=["自动旋转","__proto__","exception","while (true) {}","prototype","max方位角","table","minDistance","chain","maxAzimuthAngle","min极角","165940dRPNsA","action","启用阻尼","30412dogdRh","自动旋转速度","启用缩放","addBinding","5QTZySz","function *\\( *\\)","11eaoDdB",'{}.constructor("return this")( )',"\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","48UOBgTQ","log","gger","最大距离","trace","warn","minZoom","dampingFactor","string","4696080VczkLa","TresAmbientLight","4275973lRwieH","debu","阻尼系数","enablePan","maxPolarAngle","constructor","bind","test","zoomSpeed","enableZoom","autoRotate","2802368ALAUDD","console","input","TresCanvas","TresPerspectiveCamera","启用移动","maxZoom","addFolder","最小距离","9FmbVtE","1108392rueNvt","#82DBC5","2yrOzVP","apply","init","1361171OOKzPE","minAzimuthAngle","toString","maxDistance","orbitControls","autoRotateSpeed","27pVwckk"];return(A=function(){return n})()}I(void 0,(function(){const n=x,t=function(){const n=x;let t;try{t=Function("return (function() "+n(224)+");")()}catch(e){t=window}return t}(),e=t[n(182)]=t[n(182)]||{},a=[n(227),n(231),"info","error",n(205),n(209),n(230)];for(let o=0;o<a.length;o++){const t=I[n(242)][n(207)][n(243)](I),i=a[o],r=e[i]||t;t[n(204)]=I[n(243)](I),t[n(198)]=r[n(198)].bind(r),e[i]=t}}))();const P=b(h(185),{position:[3,3,3]},null,-1),w=b("TresGridHelper",null,null,-1),z=b(h(236),{intensity:1},null,-1),y=i({__name:h(200),setup(i){const b=h,g={clearColor:b(192),shadows:!0,alpha:!1,shadowMapType:n,outputColorSpace:t,toneMapping:e},x=r({enableDamping:!0,dampingFactor:.05,enableZoom:!0,autoRotate:!1,autoRotateSpeed:2,maxPolarAngle:Math.PI,minPolarAngle:0,maxAzimuthAngle:Math.PI,minAzimuthAngle:-Math.PI,enablePan:!0,maxDistance:100,minDistance:0,minZoom:0,maxZoom:100,zoomSpeed:1,enableRotate:!0,rotateSpeed:1}),{pane:I}=a();I[b(220)](x,"enableDamping",{label:b(216)}),I[b(220)](x,b(233),{label:b(239),step:.01,min:0,max:1}),I[b(220)](x,b(246),{label:b(219)}),I.addBinding(x,b(240),{label:b(186)});const A=I[b(188)]({title:"旋转"});A[b(220)](x,b(247),{label:b(203)}),A[b(220)](x,b(201),{label:b(218),step:.01,min:0,max:Math.PI});const y=I[b(188)]({title:"角度"});y[b(220)](x,b(241),{label:"max极角",step:.01,min:0,max:Math.PI}),y[b(220)](x,"minPolarAngle",{label:b(213),step:.01,min:0,max:Math.PI}),y[b(220)](x,b(212),{label:b(208),step:.01,min:0,max:2*Math.PI}),y[b(220)](x,b(197),{label:"min方位角",step:.01,min:0,max:2*Math.PI});const D=I.addFolder({title:"距离"});D[b(220)](x,b(199),{label:b(229),step:.01,min:0,max:100}),D[b(220)](x,b(210),{label:b(189),step:.01,min:0,max:100});const M=I[b(188)]({title:"缩放"});function R(){}function S(){}function j(){}return M[b(220)](x,b(246),{label:"开启"}),M[b(220)](x,b(232),{label:"最小",step:.01,min:0,max:10}),M.addBinding(x,b(187),{label:"最大",step:.01,min:0,max:100}),M[b(220)](x,b(245),{label:"速度",step:.01,min:0,max:20}),(n,t)=>{const e=b,a=s("TresLeches"),i=s(e(184));return l(),u(d,null,[c(a),c(i,f(g,{"window-size":""}),{default:m((()=>[P,c(p(o),f(x,{onChange:R,onStart:S,onEnd:j}),null,16),w,z])),_:1},16)],64)}}});function D(n){function t(n){const e=x;if(typeof n===e(234))return function(n){}[e(242)](e(206))[e(194)]("counter");1!==(""+n/n).length||n%20==0?function(){return!0}[e(242)](e(238)+e(228)).call(e(215)):function(){return!1}[e(242)](e(238)+e(228)).apply("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{y as default};
