import{bU as t,bS as n,ab as e,ad as o}from"./three.6E5muTWJ1722409645193.js";import{d as s}from"./@tresjs.qmCJ68Vp1722409645193.js";import{P as r}from"./tweakpane.yHWGBmom1722409645193.js";import{_ as a}from"./index.wA-ySsCv1722409645193.js";import{l as i}from"./util.6uLnSyh11722409645193.js";import{_ as u}from"./cloudPoints.vue_vue_type_script_setup_true_lang.dDwuVhYY1722409645193.js";import{_ as l,a as c}from"./bubblesEffect.vue_vue_type_script_setup_true_lang.H_temEEw1722409645193.js";import{d as p,r as f,a4 as m,e as d,o as _,D as h,j as b,u as g,g as j,aj as y,ak as w,J as v,f as I,m as k,I as T,al as x,F as S}from"./@vue.9bHx4gg21722409645193.js";import"./@vueuse.NFOCyQQL1722409645193.js";import"./default.vue_vue_type_script_setup_true_lang.MqZzmSQO1722409645193.js";import"./@fesjs.QnrTigdw1722409645193.js";import"./vue-router.14za1TD_1722409645193.js";import"./lodash-es.nFpJXAf-1722409645193.js";import"./@qlin.yHhFDldE1722409645193.js";import"./pinia.QNLxZzKW1722409645193.js";import"./@floating-ui.BPbuo5Gx1722409645193.js";import"./@juggle.7yjBMqoW1722409645193.js";import"./three-mesh-ui.module.fXO2jpbD1722409645193.js";const A=R;!function(t,n){const e=R,o=z();for(;;)try{if(443217===parseInt(e(380))/1+-parseInt(e(333))/2*(parseInt(e(359))/3)+parseInt(e(367))/4+-parseInt(e(361))/5*(-parseInt(e(334))/6)+-parseInt(e(383))/7*(parseInt(e(370))/8)+-parseInt(e(344))/9+parseInt(e(350))/10)break;o.push(o.shift())}catch(s){o.push(o.shift())}}();const B=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[R(348)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();!function(){B(this,(function(){const t=R,n=new RegExp("function *\\( *\\)"),e=new RegExp(t(354),"i"),o=q(t(346));n[t(369)](o+t(372))&&e[t(369)](o+"input")?q():o("0")}))()}();const P=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function z(){const t=["apply","while (true) {}","5164290hvdPNs","warn","TresGroup","点云显示","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","string","#000","prototype","counter","1669326mFqgnU","toString","5qockdC","脑组织显示","debu",'{}.constructor("return this")( )',"脑组织透明度","show","2147412XrSYYy","log","test","87632scOLyz","bind","chain","TresCanvas","error","#9e00af","脑轮廓显示","__proto__","TresPerspectiveCamera","console","411242SOGLaZ","color","TresAmbientLight","84AzkAfA","脑轮廓颜色","#84ccff","2NOYUfB","1217730TPXegj","action","点云颜色","addBinding","点云透明度","opacity","model","return (function() ","gger","call","4827348GiyZTT","#fff","init","constructor"];return(z=function(){return t})()}P(void 0,(function(){const t=R;let n;try{n=Function(t(341)+t(364)+");")()}catch(s){n=window}const e=n[t(379)]=n[t(379)]||{},o=[t(368),t(351),"info",t(374),"exception","table","trace"];for(let r=0;r<o.length;r++){const n=P[t(347)][t(357)].bind(P),s=o[r],a=e[s]||n;n[t(377)]=P[t(371)](P),n[t(360)]=a[t(360)].bind(a),e[s]=n}}))();const C=v(A(378),{position:[100,400,500],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),G=v(A(382),{intensity:.5},null,-1),O={position:[0,120,0]},F=v("TresGridHelper",{args:[400,10]},null,-1);function R(t,n){const e=z();return(R=function(t,n){return e[t-=331]})(t,n)}const Z=p({__name:"digitalBrain",async setup(p){const B=A;let P,z;const R=f({color:B(345),show:!0,opacity:1}),Z=new r({title:"参数"});Z[B(337)](R,B(366),{label:B(353)}),Z[B(337)](R,B(381),{label:B(336)}),Z[B(337)](R,B(339),{label:B(338),min:0,max:1,step:.1});const q=f({color:B(332),show:!0,opacity:1});Z[B(337)](q,"show",{label:B(376)}),Z.addBinding(q,B(381),{label:B(331)}),Z[B(337)](q,"opacity",{label:"脑轮廓透明度",min:0,max:1,step:.1});const E=f({color:B(375),show:!0,opacity:1});Z[B(337)](E,"show",{label:B(362)}),Z.addBinding(E,B(381),{label:"脑组织颜色"}),Z[B(337)](E,B(339),{label:B(365),min:0,max:1,step:.1});const L=new t,U=([P,z]=m((()=>i("./plugins/medical/model/brainparts.OBJ",L))),P=await P,z(),P),Y=f({clearColor:B(356),shadows:!0,alpha:!1,shadowMapType:n,outputColorSpace:e,toneMapping:o}),J=f({autoRotate:!0,autoRotateSpeed:2});return(t,n)=>{const e=B,o=d(e(373));return _(),h(S,null,[b(g(a)),b(o,k(Y,{"window-size":""}),{default:j((()=>[C,b(g(s),y(w(J)),null,16),G,v(e(352),O,[R[e(366)]?(_(),I(u,k({key:0,model:g(U)},R),null,16,[e(340)])):T("",!0),(_(),I(x,null,{default:j((()=>[q.show?(_(),I(l,k({key:0,model:g(U)},q),null,16,["model"])):T("",!0)])),_:1})),E[e(366)]?(_(),I(c,k({key:1,model:g(U)},E),null,16,[e(340)])):T("",!0)]),F])),_:1},16)],64)}}});function q(t){function n(t){const e=R;if(typeof t===e(355))return function(t){}[e(347)](e(349)).apply(e(358));1!==(""+t/t).length||t%20==0?function(){return!0}[e(347)]("debu"+e(342))[e(343)](e(335)):function(){return!1}[e(347)](e(363)+e(342)).apply("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{Z as default};
