import{a0 as _,a1 as o,o as i,v as c,D as l,a7 as p,K as f,ak as y,X as t,H as w,k as b,a8 as k,a2 as R,a3 as T,a4 as I,r as M,c as P,a,E as z,ab as B,a9 as x,aa as g,af as C}from"./vendor.UoMSxCrE1712649228867.js";import{_ as $}from"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.-gzWPf_t1712649228867.js";/* empty css                                                                                 */import{_ as O}from"./randomLoading.vue_vue_type_script_setup_true_lang.EmP0BIQm1712649228867.js";import{i as E}from"./index.oRU9r-cR1712649228867.js";import{_ as L}from"./device.vue_vue_type_script_setup_true_lang.t2ZoGK521712649228867.js";import"./ReflectorMaterial.Phz1F30L1712649228867.js";import"./dither.glsl.y2WXw1t-1712649228867.js";import"./OimoPhysicsBuffer.suR-_k-u1712649228867.js";import"./starLoading.yt4qZ33C1712649228867.js";import"./bubbleLoading.uoh3VGV41712649228867.js";import"./device.tOlWDydJ1712649228867.js";import"./BufferGeometryUtils.H-QtrDfP1712649228867.js";import"./EffectComposer.1rpTZ31Z1712649228867.js";import"./UnrealBloomPass.DHtM37DM1712649228867.js";import"./OutputPass.7LQHm_0E1712649228867.js";const F=t("div",{class:"card pos-relative text-white"},[t("div",{class:"card-body"},[t("h3",null,[t("span",null,"⚙️"),w(" Toyota 2JZ-GTE")]),t("div",{class:"flex justify-between flex-wrap"},[t("div",{class:"Onec"},[t("p",null," 输出功率 kW "),t("h1",null," 980 - 1000 ")]),t("div",{class:"Onec"},[t("p",null," 排量 升 "),t("h1",null," 3.0 - 3.5 ")]),t("div",{class:"Onec"},[t("p",null," 最大扭矩 磅-英尺 "),t("h1",null," 320 - 330 ")])])])],-1),N=_({__name:"divContent",setup(h){const s=o({wrapperClass:"illustrateTire",as:"div",transform:!0,distanceFactor:1,zIndexRange:[9e5,0]});return(e,n)=>(i(),c(f(y),p(s,{position:[1,0,2],scale:[2,2,2],rotation:[-Math.PI/2,0,-Math.PI/2]}),{default:l(()=>[F]),_:1},16,["rotation"]))}}),D=t("div",{id:"main",style:{width:"500px",height:"300px"}},null,-1),G=_({__name:"useHtmlComChart",setup(h){const s=o({wrapperClass:"chartDiv",as:"div",transform:!0,distanceFactor:2,zIndexRange:[9e5,0]});let e=null;const n={title:{text:"最大输出功率",textStyle:{fontSize:18},padding:[20,20]},backgroundColor:"#b8e4ff3b",grid:{left:"10",right:"20",bottom:"10",top:"70",containLabel:!0},xAxis:{type:"category",data:["01","03","06","09","12","15","18"],axisLabel:{fontSize:18}},yAxis:{type:"value",axisLabel:{fontSize:18}},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0,lineStyle:{color:"#ffffffff"},animationDuration:function(v){return v*100+3e3}}],animationEasing:"elasticOut"},u=()=>{e=E(document.getElementById("main"),"dark"),e.setOption(n),e.on("finished",()=>{r=!0})},d=b(null);let r=!1;const m=()=>{r=!1,e.off("finished"),e.clear(),e.on("finished",()=>{r=!0}),e.setOption(n)},{onLoop:S}=k();return S(()=>{d.value&&!e&&u(),e&&r&&m()}),(v,V)=>(i(),c(f(y),p({ref_key:"htmlRef",ref:d},s,{position:[0,0,-1]}),{default:l(()=>[D]),_:1},16))}}),H=t("TresPerspectiveCamera",{position:[-4,5,4],fov:45,near:1,far:1e3},null,-1),nt=_({__name:"deviceLightReflector",setup(h){const s=o({reflectivity:.1,mirror:.92,mixStrength:36,showGridHelper:!1}),e=o({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:R,outputColorSpace:T,toneMapping:I,disableRender:!0}),n=o({autoRotate:!0}),u=o({threshold:.37,strength:1.6,radius:.1});return(d,r)=>{const m=M("TresCanvas");return i(),P(z,null,[a(f(O)),a(m,p(e,{"window-size":""}),{default:l(()=>[H,a(f(B),x(g(n)),null,16),(i(),c(C,null,{default:l(()=>[a(L,x(g(u)),null,16)]),_:1})),(i(),c(C,null,{default:l(()=>[a($,p(s,{position:[0,0,0]}),null,16)]),_:1})),a(N),a(G,{position:[-.5,-.001,2.25],rotation:[-Math.PI/2,0,-Math.PI/2]},null,8,["rotation"])]),_:1},16)],64)}}});export{nt as default};
