import{bT as t,bR as n,aa as e,bS as o}from"./three.c_4mN3mZ1720750938663.js";import{d as s}from"./@tresjs.toBU36DO1720750938663.js";import{P as r}from"./tweakpane.yHWGBmom1720750938663.js";import{_ as a}from"./index.bAaRkCbu1720750938663.js";import{l as i}from"./util.KVpGfKR01720750938663.js";import{_ as u}from"./cloudPoints.vue_vue_type_script_setup_true_lang.Cq8LZP4I1720750938663.js";import{_ as l,a as c}from"./bubblesEffect.vue_vue_type_script_setup_true_lang.s5V0_5iI1720750938663.js";import{d as p,r as f,a3 as m,e as d,o as _,D as g,j as b,u as j,g as h,aj as y,ak as w,J as v,f as I,m as x,I as R,al as k,F as B}from"./@vue.ApkyOKE71720750938663.js";import"./@vueuse.NiHn2U_k1720750938663.js";import"./default.vue_vue_type_script_setup_true_lang.hGi5e-e11720750938663.js";import"./@fesjs.hPzU4o281720750938663.js";import"./vue-router.cSmWJIl41720750938663.js";import"./lodash-es.nFpJXAf-1720750938663.js";import"./@qlin.yHhFDldE1720750938663.js";import"./pinia.1mscjV6X1720750938663.js";import"./@floating-ui.BPbuo5Gx1720750938663.js";import"./@juggle.7yjBMqoW1720750938663.js";const T=C;!function(t,n){const e=C,o=z();for(;;)try{if(600826===parseInt(e(509))/1+parseInt(e(514))/2*(parseInt(e(515))/3)+parseInt(e(525))/4+-parseInt(e(522))/5*(parseInt(e(498))/6)+parseInt(e(529))/7+-parseInt(e(493))/8*(parseInt(e(496))/9)+parseInt(e(532))/10*(-parseInt(e(488))/11))break;o.push(o.shift())}catch(s){o.push(o.shift())}}();const A=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){A(this,(function(){const t=C,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(530),"i"),o=V(t(495));n.test(o+t(531))&&e[t(507)](o+t(508))?V():o("0")}))()}();const S=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function z(){const t=["chain","125150EVSRgm","return (function() ","stateObject","call","gger","bind","trace","error","while (true) {}","color","TresGridHelper","1793aCfVhA","addBinding","点云显示","warn","apply","432232JgjRYL","exception","init","90nwBfSD","脑轮廓透明度","364830sVqRLV",'{}.constructor("return this")( )',"TresPerspectiveCamera","脑轮廓颜色","counter","脑组织透明度","点云透明度","TresCanvas","show","test","input","1161086sRnAPb","脑组织显示","model","log","opacity","1682HcujoH","3975pOdmWr","constructor","digitalBrain","#9e00af","debu","toString","脑组织颜色","50xJYoLH","#fff","脑轮廓显示","4609556zBaYge","TresAmbientLight","TresGroup","info","2529177LopeuU","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)"];return(z=function(){return t})()}function C(t,n){const e=z();return(C=function(t,n){return e[t-=485]})(t,n)}S(void 0,(function(){const t=C;let n;try{n=Function(t(533)+t(499)+");")()}catch(s){n=window}const e=n.console=n.console||{},o=[t(512),t(491),t(528),t(539),t(494),"table",t(538)];for(let r=0;r<o.length;r++){const n=S[t(516)].prototype.bind(S),s=o[r],a=e[s]||n;n.__proto__=S[t(537)](S),n[t(520)]=a[t(520)][t(537)](a),e[s]=n}}))();const L=v(T(500),{position:[100,400,500],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),P=v(T(526),{intensity:.5},null,-1),E={position:[0,120,0]},H=v(T(487),{args:[400,10]},null,-1),J=p({__name:T(517),async setup(p){const A=T;let S,z;const C=f({color:A(523),show:!0,opacity:1}),J=new r({title:"参数"});J[A(489)](C,A(506),{label:A(490)}),J.addBinding(C,A(486),{label:"点云颜色"}),J[A(489)](C,A(513),{label:A(504),min:0,max:1,step:.1});const V=f({color:"#84ccff",show:!0,opacity:1});J[A(489)](V,A(506),{label:A(524)}),J[A(489)](V,A(486),{label:A(501)}),J[A(489)](V,A(513),{label:A(497),min:0,max:1,step:.1});const O=f({color:A(518),show:!0,opacity:1});J[A(489)](O,A(506),{label:A(510)}),J.addBinding(O,A(486),{label:A(521)}),J[A(489)](O,A(513),{label:A(503),min:0,max:1,step:.1});const Y=new t,q=([S,z]=m((()=>i("./plugins/medical/model/brainparts.OBJ",Y))),S=await S,z(),S),D=f({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:n,outputColorSpace:e,toneMapping:o}),F=f({autoRotate:!0,autoRotateSpeed:2});return(t,n)=>{const e=A,o=d(e(505));return _(),g(B,null,[b(j(a)),b(o,x(D,{"window-size":""}),{default:h((()=>[L,b(j(s),y(w(F)),null,16),P,v(e(527),E,[C.show?(_(),I(u,x({key:0,model:j(q)},C),null,16,[e(511)])):R("",!0),(_(),I(k,null,{default:h((()=>[V[e(506)]?(_(),I(l,x({key:0,model:j(q)},V),null,16,[e(511)])):R("",!0)])),_:1})),O[e(506)]?(_(),I(c,x({key:1,model:j(q)},O),null,16,[e(511)])):R("",!0)]),H])),_:1},16)],64)}}});function V(t){function n(t){const e=C;if("string"==typeof t)return function(t){}[e(516)](e(485))[e(492)](e(502));1!==(""+t/t).length||t%20==0?function(){return!0}[e(516)](e(519)+e(536))[e(535)]("action"):function(){return!1}[e(516)]("debu"+e(536))[e(492)](e(534)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{J as default};
