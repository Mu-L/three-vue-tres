import{a5 as y,aH as E,aI as F,ao as G,bR as w,aa as V,aD as H,o as g,c as I,a1 as n,T as v,K as J,ad as K,a6 as _,a7 as O,a8 as X,a9 as j,au as q,r as Q,C as M,J as k,ac as U,a as x,ae as S,af as T,ag as W,ak as Y}from"./vendor.E5SXPLW-1717132684252.js";import{r as Z,u as ee}from"./device.ZOubmtKp1717132684252.js";import"./BufferGeometryUtils.Ga3MQiuz1717132684252.js";import"./EffectComposer.hKpSDIPf1717132684252.js";import"./Pass.tq3Txdzw1717132684252.js";import"./UnrealBloomPass.aaOycp5W1717132684252.js";import"./OutputPass.tgFsIId91717132684252.js";const te=["object"],ae=["object"],se=y({__name:"ByComposerTres",props:{threshold:{default:0},strength:{default:.972},radius:{default:.21}},async setup(C){let r,l;const t=C,{nodes:a}=([r,l]=E(()=>F("./plugins/industry4/model/modelDraco.glb",{draco:!0,decoderPath:"./draco/"})),r=await r,l(),r),i=Z(a.Sketchfab_model),{camera:d,renderer:u,scene:p,sizes:b}=G();let h=null,m=null,s=null;const P=new w({color:"black"});V(()=>{if(d.value){const{finalComposer:e,effectComposer:o,bloomPass:$}=ee(p.value,d.value,u.value,b.width.value,b.height.value);h=e,m=o,s=$,s.threshold=t.threshold,s.strength=t.strength,s.radius=t.radius}t.threshold&&(s.threshold=t.threshold),t.strength&&(s.strength=t.strength),t.radius&&(s.radius=t.radius)});const c={},L=e=>{e.isMesh&&(c[e.uuid]=e.material,e.material=P)},N=e=>{c[e.uuid]&&(e.material=c[e.uuid],delete c[e.uuid])},{onLoop:R,onAfterLoop:z}=K();let B=.03,f=a.Sketchfab_model.getObjectByName("canister_turbine_011_Nickel-Light-PBR_0"),A=f.material.clone(),D=new w({color:new H("red"),transparent:!0,opacity:1});return R(({elapsed:e})=>{a.hull_turbine&&(a.hull_turbine.rotation.x+=B,a.blades_turbine_003.rotation.x+=B),Math.floor(e)%2?f.material=A:f.material=D}),z(({elapsed:e})=>{m&&(p.value.traverse(o=>{L(o)}),m.render(e)),h&&(p.value.traverse(o=>{N(o)}),h.render(e))}),(e,o)=>(g(),I(J,null,[n("primitive",{object:v(a).Sketchfab_model},null,8,te),n("primitive",{object:v(i)},null,8,ae)],64))}}),re=n("TresPerspectiveCamera",{position:[5,5,5],fov:45,near:1,far:1e3},null,-1),oe=n("TresAmbientLight",{color:"#ffffff",intensity:"40"},null,-1),ne=n("TresDirectionalLight",{position:[0,2,-4],intensity:1},null,-1),me=y({__name:"deviceLightByComposerTres",setup(C){const r=_({clearColor:"#000",shadows:!0,alpha:!1,shadowMapType:O,outputColorSpace:X,toneMapping:j}),l=_({autoRotate:!0}),t=_({threshold:0,strength:.972,radius:.21}),a=new q({title:"参数"});return a.addBinding(t,"threshold",{label:"阈值",min:0,max:1,step:.1}),a.addBinding(t,"strength",{label:"强度",min:0,max:3,step:.2}),a.addBinding(t,"radius",{label:"半径",min:0,max:1,step:.1}),a.addBlade({view:"text",label:"post-processing",parse:i=>String(i),value:"未完成：等待Tresjs库更新"}),(i,d)=>{const u=Q("TresCanvas");return g(),M(u,U(r,{"window-size":""}),{default:k(()=>[re,x(v(W),S(T(l)),null,16),oe,ne,(g(),M(Y,null,{default:k(()=>[x(se,S(T(t)),null,16)]),_:1}))]),_:1},16)}}});export{me as default};
