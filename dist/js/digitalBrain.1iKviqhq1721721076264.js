import{bT as t,bS as n,ab as o,ad as e}from"./three.fnkrvySq1721721076264.js";import{d as s}from"./@tresjs.tWkmYPO61721721076264.js";import{P as r}from"./tweakpane.yHWGBmom1721721076264.js";import{_ as a}from"./index.in0yaDdV1721721076264.js";import{l as i}from"./util.0hQMIhT21721721076264.js";import{_ as u}from"./cloudPoints.vue_vue_type_script_setup_true_lang.Tw_sDW2J1721721076264.js";import{_ as l,a as c}from"./bubblesEffect.vue_vue_type_script_setup_true_lang.hFHuWoeC1721721076264.js";import{d as p,r as f,a4 as m,e as d,o as _,D as b,j as h,u as j,g,aj as y,ak as w,J as v,f as I,m as x,I as k,al as T,F as B}from"./@vue.Q1VpS3901721721076264.js";import"./@vueuse._hUvP73U1721721076264.js";import"./default.vue_vue_type_script_setup_true_lang.EpPllvFF1721721076264.js";import"./@fesjs.ODHTSx0A1721721076264.js";import"./vue-router.wK6Z5ZPK1721721076264.js";import"./lodash-es.nFpJXAf-1721721076264.js";import"./@qlin.yHhFDldE1721721076264.js";import"./pinia.G6Yd8Ztp1721721076264.js";import"./@floating-ui.BPbuo5Gx1721721076264.js";import"./@juggle.7yjBMqoW1721721076264.js";const E=Z;!function(t,n){const o=Z,e=S();for(;;)try{if(722848===-parseInt(o(189))/1*(-parseInt(o(213))/2)+-parseInt(o(235))/3*(-parseInt(o(181))/4)+-parseInt(o(197))/5*(parseInt(o(204))/6)+-parseInt(o(218))/7+-parseInt(o(227))/8*(-parseInt(o(195))/9)+-parseInt(o(205))/10*(parseInt(o(192))/11)+-parseInt(o(208))/12)break;e.push(e.shift())}catch(s){e.push(e.shift())}}();const G=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o[Z(220)](n,arguments);return o=null,t}}:function(){};return t=!1,e}}();!function(){G(this,(function(){const t=Z,n=new RegExp(t(200)),o=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),e=J(t(224));n.test(e+t(198))&&o[t(187)](e+t(226))?J():e("0")}))()}();const L=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o[Z(220)](n,arguments);return o=null,t}}:function(){};return t=!1,e}}();L(void 0,(function(){const t=Z,n=function(){const t=Z;let n;try{n=Function(t(222)+t(221)+");")()}catch(o){n=window}return n}(),o=n.console=n[t(179)]||{},e=[t(203),t(180),"info","error",t(188),"table",t(233)];for(let s=0;s<e.length;s++){const n=L.constructor.prototype.bind(L),r=e[s],a=o[r]||n;n[t(212)]=L[t(207)](L),n[t(223)]=a[t(223)][t(207)](a),o[r]=n}}))();const A=v(E(182),{position:[100,400,500],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),C=v(E(186),{intensity:.5},null,-1),F={position:[0,120,0]},R=v(E(216),{args:[400,10]},null,-1);function S(){const t=["20VAmrmb","TresPerspectiveCamera","#fff","gger","color","TresAmbientLight","test","exception","1pJjiaq","opacity","length","1394657mMBdoG","show","点云透明度","3090591jREoZU","脑轮廓透明度","5EMiyGo","chain","stateObject","function *\\( *\\)","counter","#9e00af","log","4378854DmFlfA","100LSULhf","constructor","bind","2296440tJFPxF","model","while (true) {}","action","__proto__","1810694HGHeLT","脑轮廓颜色","digitalBrain","TresGridHelper","addBinding","1733382UEqUWH","点云显示","apply",'{}.constructor("return this")( )',"return (function() ","toString","init","debu","input","32cwCuyB","脑组织颜色","#000","脑组织显示","脑轮廓显示","call","trace","string","528348ZtGuLZ","console","warn"];return(S=function(){return t})()}function Z(t,n){const o=S();return(Z=function(t,n){return o[t-=179]})(t,n)}const H=p({__name:E(215),async setup(p){const G=E;let L,S;const Z=f({color:G(183),show:!0,opacity:1}),H=new r({title:"参数"});H[G(217)](Z,"show",{label:G(219)}),H[G(217)](Z,"color",{label:"点云颜色"}),H[G(217)](Z,G(190),{label:G(194),min:0,max:1,step:.1});const J=f({color:"#84ccff",show:!0,opacity:1});H[G(217)](J,G(193),{label:G(231)}),H[G(217)](J,"color",{label:G(214)}),H[G(217)](J,"opacity",{label:G(196),min:0,max:1,step:.1});const M=f({color:G(202),show:!0,opacity:1});H[G(217)](M,G(193),{label:G(230)}),H[G(217)](M,G(185),{label:G(228)}),H.addBinding(M,G(190),{label:"脑组织透明度",min:0,max:1,step:.1});const P=new t,U=([L,S]=m((()=>i("./plugins/medical/model/brainparts.OBJ",P))),L=await L,S(),L),q=f({clearColor:G(229),shadows:!0,alpha:!1,shadowMapType:n,outputColorSpace:o,toneMapping:e}),z=f({autoRotate:!0,autoRotateSpeed:2});return(t,n)=>{const o=G,e=d("TresCanvas");return _(),b(B,null,[h(j(a)),h(e,x(q,{"window-size":""}),{default:g((()=>[A,h(j(s),y(w(z)),null,16),C,v("TresGroup",F,[Z[o(193)]?(_(),I(u,x({key:0,model:j(U)},Z),null,16,["model"])):k("",!0),(_(),I(T,null,{default:g((()=>[J.show?(_(),I(l,x({key:0,model:j(U)},J),null,16,[o(209)])):k("",!0)])),_:1})),M[o(193)]?(_(),I(c,x({key:1,model:j(U)},M),null,16,[o(209)])):k("",!0)]),R])),_:1},16)],64)}}});function J(t){function n(t){const o=Z;if(typeof t===o(234))return function(t){}[o(206)](o(210))[o(220)](o(201));1!==(""+t/t)[o(191)]||t%20==0?function(){return!0}[o(206)]("debugger")[o(232)](o(211)):function(){return!1}[o(206)](o(225)+o(184)).apply(o(199)),n(++t)}try{if(t)return n;n(0)}catch(o){}}export{H as default};
