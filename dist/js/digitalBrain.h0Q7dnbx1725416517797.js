import{bU as t,bS as n,ab as o,ad as e}from"./three.VTQVqxMx1725416517797.js";import{d as s}from"./@tresjs.5lh7VmqZ1725416517797.js";import{P as r}from"./tweakpane.yHWGBmom1725416517797.js";import{_ as a}from"./index.KZVn_uwt1725416517797.js";import{l as i}from"./util.-jV8P27y1725416517797.js";import{_ as u}from"./cloudPoints.vue_vue_type_script_setup_true_lang.7B2twIXJ1725416517797.js";import{_ as l,a as c}from"./bubblesEffect.vue_vue_type_script_setup_true_lang.O18QfkeF1725416517797.js";import{d as p,r as f,a5 as m,e as d,o as j,E as _,j as h,u as b,g,aj as y,ak as w,L as v,f as k,m as x,J as I,al as T,F as B}from"./@vue._6MD2XyK1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";import"./index.gebJ5XSZ1725416517797.js";import"./@fesjs.ILazvsHx1725416517797.js";import"./vue-router.oJSnFzhA1725416517797.js";import"./lodash-es.kYt-_xTG1725416517797.js";import"./@qlin.yHhFDldE1725416517797.js";import"./pinia.QjdSMCYS1725416517797.js";import"./@floating-ui.BPbuo5Gx1725416517797.js";import"./@juggle.7yjBMqoW1725416517797.js";import"./chalk.sAH7iSuz1725416517797.js";/* empty css                                 */import"./iconify-icon.l-H2-fnN1725416517797.js";import"./@iconify.9PoCakEb1725416517797.js";import"./utils.niQh9fO11725416517797.js";import"./default.vue_vue_type_script_setup_true_lang.XiUa4s0U1725416517797.js";import"./three-mesh-ui.module.jT3A9sPc1725416517797.js";const R=z;function z(t,n){const o=F();return(z=function(t,n){return o[t-=198]})(t,n)}!function(t,n){const o=z,e=F();for(;;)try{if(523911===-parseInt(o(214))/1+parseInt(o(227))/2+parseInt(o(239))/3+parseInt(o(243))/4*(-parseInt(o(229))/5)+parseInt(o(213))/6*(-parseInt(o(226))/7)+parseInt(o(199))/8+parseInt(o(244))/9*(-parseInt(o(204))/10))break;e.push(e.shift())}catch(s){e.push(e.shift())}}();const C=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,e}}();!function(){C(this,(function(){const t=z,n=new RegExp(t(206)),o=new RegExp(t(231),"i"),e=J(t(203));n[t(245)](e+"chain")&&o.test(e+"input")?J():e("0")}))()}();const E=function(){let t=!0;return function(n,o){const e=t?function(){if(o){const t=o.apply(n,arguments);return o=null,t}}:function(){};return t=!1,e}}();E(void 0,(function(){const t=z;let n;try{n=Function(t(235)+'{}.constructor("return this")( ));')()}catch(s){n=window}const o=n[t(240)]=n[t(240)]||{},e=[t(225),t(223),t(233),t(224),t(228),t(230),"trace"];for(let r=0;r<e[t(220)];r++){const n=E[t(205)][t(241)].bind(E),s=e[r],a=o[s]||n;n.__proto__=E[t(219)](E),n[t(221)]=a[t(221)].bind(a),o[s]=n}}))();const S=v(R(216),{position:[100,400,500],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),A=v(R(242),{intensity:.5},null,-1),G={position:[0,120,0]},O=v("TresGridHelper",{args:[400,10]},null,-1);function F(){const t=["addBinding","gger","bind","length","toString","点云透明度","warn","error","log","140NsQYQz","1728250DxYcWa","exception","7930FTAJdB","table","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","debu","info","stateObject","return (function() ","string","点云显示","apply","873408RDXTre","console","prototype","TresAmbientLight","1996RCoEvM","2685231npLvhn","test","脑组织颜色","#fff","脑轮廓颜色","model","action","脑轮廓显示","6596480mBzhGV","show","color","脑轮廓透明度","init","10opuGdQ","constructor","function *\\( *\\)","TresGroup","digitalBrain","脑组织透明度","while (true) {}","脑组织显示","#84ccff","21366OOKHkd","294917NUujHf","#000","TresPerspectiveCamera"];return(F=function(){return t})()}const H=p({__name:R(208),async setup(p){const z=R;let C,E;const F=f({color:z(247),show:!0,opacity:1}),H=new r({title:"参数"});H[z(217)](F,z(200),{label:z(237)}),H[z(217)](F,z(201),{label:"点云颜色"}),H[z(217)](F,"opacity",{label:z(222),min:0,max:1,step:.1});const J=f({color:z(212),show:!0,opacity:1});H[z(217)](J,z(200),{label:z(198)}),H[z(217)](J,z(201),{label:z(248)}),H.addBinding(J,"opacity",{label:z(202),min:0,max:1,step:.1});const L=f({color:"#9e00af",show:!0,opacity:1});H.addBinding(L,z(200),{label:z(211)}),H[z(217)](L,z(201),{label:z(246)}),H[z(217)](L,"opacity",{label:z(209),min:0,max:1,step:.1});const M=new t,P=([C,E]=m((()=>i("./plugins/medical/model/brainparts.OBJ",M))),C=await C,E(),C),Q=f({clearColor:z(215),shadows:!0,alpha:!1,shadowMapType:n,outputColorSpace:o,toneMapping:e}),D=f({autoRotate:!0,autoRotateSpeed:2});return(t,n)=>{const o=z,e=d("TresCanvas");return j(),_(B,null,[h(b(a)),h(e,x(Q,{"window-size":""}),{default:g((()=>[S,h(b(s),y(w(D)),null,16),A,v(o(207),G,[F[o(200)]?(j(),k(u,x({key:0,model:b(P)},F),null,16,["model"])):I("",!0),(j(),k(T,null,{default:g((()=>[J[o(200)]?(j(),k(l,x({key:0,model:b(P)},J),null,16,[o(249)])):I("",!0)])),_:1})),L[o(200)]?(j(),k(c,x({key:1,model:b(P)},L),null,16,[o(249)])):I("",!0)]),O])),_:1},16)],64)}}});function J(t){function n(t){const o=z;if(typeof t===o(236))return function(t){}[o(205)](o(210))[o(238)]("counter");1!==(""+t/t).length||t%20==0?function(){return!0}[o(205)](o(232)+o(218)).call(o(250)):function(){return!1}[o(205)](o(232)+o(218))[o(238)](o(234)),n(++t)}try{if(t)return n;n(0)}catch(o){}}export{H as default};
