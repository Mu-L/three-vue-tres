import{a5 as _,a6 as o,o as i,C as c,J as l,ac as p,T as f,ap as y,a1 as t,N as w,q as b,ad as T,a7 as R,a8 as k,a9 as M,r as P,c as z,a,K as B,ag as I,ae as g,af as x,ak as C}from"./vendor.E5SXPLW-1717132684252.js";import{_ as $}from"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.J29K_-l81717132684252.js";/* empty css                                                                                 */import{_ as O}from"./randomLoading.vue_vue_type_script_setup_true_lang.1Mu5VAOm1717132684252.js";import{i as L}from"./index.HCo4Abnh1717132684252.js";import{_ as N}from"./device.vue_vue_type_script_setup_true_lang.91cmyAwB1717132684252.js";import"./ReflectorMaterial.Rh-L4Bh41717132684252.js";import"./dither.glsl.y2WXw1t-1717132684252.js";import"./Reflector.D1REcKVJ1717132684252.js";import"./OimoPhysicsBuffer.b5DejoFC1717132684252.js";import"./starLoading.-4r_CWIf1717132684252.js";import"./cssLoaders.ib6ZIO651717132684252.js";import"./bubbleLoading.bfeG_mi41717132684252.js";import"./device.ZOubmtKp1717132684252.js";import"./BufferGeometryUtils.Ga3MQiuz1717132684252.js";import"./EffectComposer.hKpSDIPf1717132684252.js";import"./Pass.tq3Txdzw1717132684252.js";import"./UnrealBloomPass.aaOycp5W1717132684252.js";import"./OutputPass.tgFsIId91717132684252.js";const E=t("div",{class:"card pos-relative text-white"},[t("div",{class:"card-body"},[t("h3",null,[t("span",null,"⚙️"),w(" Toyota 2JZ-GTE")]),t("div",{class:"flex justify-between flex-wrap"},[t("div",{class:"Onec"},[t("p",null," 输出功率 kW "),t("h1",null," 980 - 1000 ")]),t("div",{class:"Onec"},[t("p",null," 排量 升 "),t("h1",null," 3.0 - 3.5 ")]),t("div",{class:"Onec"},[t("p",null," 最大扭矩 磅-英尺 "),t("h1",null," 320 - 330 ")])])])],-1),F=_({__name:"divContent",setup(h){const s=o({wrapperClass:"illustrateTire",as:"div",transform:!0,distanceFactor:1,zIndexRange:[9e5,0]});return(e,n)=>(i(),c(f(y),p(s,{position:[1,0,2],scale:[2,2,2],rotation:[-Math.PI/2,0,-Math.PI/2]}),{default:l(()=>[E]),_:1},16,["rotation"]))}}),G=t("div",{id:"main",style:{width:"500px",height:"300px"}},null,-1),V=_({__name:"useHtmlComChart",setup(h){const s=o({wrapperClass:"chartDiv",as:"div",transform:!0,distanceFactor:2,zIndexRange:[9e5,0]});let e=null;const n={title:{text:"最大输出功率",textStyle:{fontSize:18},padding:[20,20]},backgroundColor:"#b8e4ff3b",grid:{left:"10",right:"20",bottom:"10",top:"70",containLabel:!0},xAxis:{type:"category",data:["01","03","06","09","12","15","18"],axisLabel:{fontSize:18}},yAxis:{type:"value",axisLabel:{fontSize:18}},series:[{data:[820,932,901,934,1290,1330,1320],type:"line",smooth:!0,lineStyle:{color:"#ffffffff"},animationDuration:function(v){return v*100+3e3}}],animationEasing:"elasticOut"},u=()=>{e=L(document.getElementById("main"),"dark"),e.setOption(n),e.on("finished",()=>{r=!0})},d=b(null);let r=!1;const m=()=>{r=!1,e.off("finished"),e.clear(),e.on("finished",()=>{r=!0}),e.setOption(n)},{onLoop:S}=T();return S(()=>{d.value&&!e&&u(),e&&r&&m()}),(v,D)=>(i(),c(f(y),p({ref_key:"htmlRef",ref:d},s,{position:[0,0,-1]}),{default:l(()=>[G]),_:1},16))}}),A=t("TresPerspectiveCamera",{position:[-4,5,4],fov:45,near:1,far:1e3},null,-1),lt=_({__name:"deviceLightReflector",setup(h){const s=o({reflectivity:.1,mirror:.92,mixStrength:36,showGridHelper:!1}),e=o({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:R,outputColorSpace:k,toneMapping:M,disableRender:!0}),n=o({autoRotate:!0}),u=o({threshold:.37,strength:1.6,radius:.1});return(d,r)=>{const m=P("TresCanvas");return i(),z(B,null,[a(f(O)),a(m,p(e,{"window-size":""}),{default:l(()=>[A,a(f(I),g(x(n)),null,16),(i(),c(C,null,{default:l(()=>[a(N,g(x(u)),null,16)]),_:1})),(i(),c(C,null,{default:l(()=>[a($,p(s,{position:[0,0,0]}),null,16)]),_:1})),a(F),a(V,{position:[-.5,-.001,2.25],rotation:[-Math.PI/2,0,-Math.PI/2]},null,8,["rotation"])]),_:1},16)],64)}}});export{lt as default};
