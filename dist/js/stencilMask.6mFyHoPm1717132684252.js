import{a5 as z,aH as M,aI as g,by as j,o as f,c as T,T as t,cM as C,cR as r,aA as P,a1 as e,cS as l,cT as _,a as i,J as h,b5 as x,K as k,r as v,ag as G,C as m,ak as p}from"./vendor.E5SXPLW-1717132684252.js";import{_ as S}from"./skyBoxDmesh.vue_vue_type_script_setup_true_lang.mNpdRled1717132684252.js";/* empty css                                                                                 */import{_ as B}from"./randomLoading.vue_vue_type_script_setup_true_lang.1Mu5VAOm1717132684252.js";import"./starLoading.-4r_CWIf1717132684252.js";import"./cssLoaders.ib6ZIO651717132684252.js";import"./bubbleLoading.bfeG_mi41717132684252.js";const F=["object"],$=z({__name:"stencilMaskBox",async setup(y){let s,c;const{nodes:a}=([s,c]=M(()=>g("./plugins/eCommerce/model/box.glb")),s=await s,c(),s),n=a.Sketchfab_model.getObjectByName("Cube004__0");return n.renderOrder=1,n.material.depthTest=!0,n.material.side=j,(b,w)=>{var d;return f(),T("primitive",{position:[0,0,0],object:(d=t(n))==null?void 0:d.clone(),scale:.5},null,8,F)}}}),I={name:"front-face",position:[0,0,.5]},A=e("TresPlaneGeometry",{args:[1,1]},null,-1),R=["stencil-func","stencil-z-pass"],O=["rotation-z","object"],q=["rotation-x"],L=e("TresPlaneGeometry",{args:[1,1]},null,-1),N=["stencil-func","stencil-z-pass"],W={name:"bottom-face-object",scale:.5},D=e("TresBoxGeometry",{args:[1,1,1]},null,-1),E=["stencil-func"],V=["rotation-x"],H=e("TresPlaneGeometry",{args:[1,1]},null,-1),J=["stencil-func","stencil-z-pass"],K={name:"top-face-object",scale:.05},Q=e("TresConeGeometry",{args:[5,10]},null,-1),U=["stencil-func"],X=["rotation-y"],Y=e("TresPlaneGeometry",{args:[1,1]},null,-1),Z=["stencil-func","stencil-z-pass"],ee=["object","rotation-y"],te=["rotation-y"],se=e("TresPlaneGeometry",{args:[1,1]},null,-1),ne=["stencil-func","stencil-z-pass"],oe={name:"right-face-object",scale:.05},ce=e("TresTorusGeometry",{args:[5,2]},null,-1),ie=["stencil-func"],ae=["rotation-y"],re=e("TresPlaneGeometry",{args:[1,1]},null,-1),le=["stencil-func","stencil-z-pass"],_e={name:"back-face-object",scale:.05},fe=e("TresDodecahedronGeometry",{args:[5,0]},null,-1),he=["stencil-func"],ue={__name:"stencilMaskModels",async setup(y){let s,c;const{nodes:a,materials:n,animations:b}=([s,c]=M(()=>g("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/eCommerce/eFan/nFan.gltf")),s=await s,c(),s),{actions:w}=C(b,a.Sketchfab_model);w.Animation.play(),n["Material.001"].stencilWrite=!0,n["Material.001"].stencilRef=1,n["Material.001"].stencilFunc=r,n["材质.002"].stencilWrite=!0,n["材质.002"].stencilRef=1,n["材质.002"].stencilFunc=r,a.Sketchfab_model.traverse(o=>{o instanceof P&&(o.renderOrder=1)});let u=([s,c]=M(()=>g("./plugins/basic/htmls/model/model.gltf",{draco:!0,decoderPath:"./draco/"})),s=await s,c(),s);return u=u.nodes.Macbook,u.traverse(o=>{o instanceof P&&(o.renderOrder=1,o.material.stencilWrite=!0,o.material.stencilRef=4,o.material.stencilFunc=r)}),(o,ge)=>(f(),T(k,null,[e("TresMesh",I,[A,e("TresMeshPhongMaterial",{color:16216071,"stencil-write":"","stencil-ref":1,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,R)]),i(t(x),{speed:2},{default:h(()=>[e("primitive",{"rotation-z":-Math.PI/2,object:t(a).Sketchfab_model,position:[0,-.35,0],scale:.5},null,8,O)]),_:1}),e("TresMesh",{name:"bottom-face","rotation-x":Math.PI*.5,position:[0,-.5,0]},[L,e("TresMeshPhongMaterial",{color:16250871,"stencil-write":"","stencil-ref":2,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,N)],8,q),e("TresMesh",W,[D,e("TresMeshPhongMaterial",{color:16776960,"stencil-write":"","stencil-ref":2,"stencil-func":t(r)},null,8,E)]),e("TresMesh",{name:"top-face","rotation-x":Math.PI*-.5,position:[0,.5,0]},[H,e("TresMeshPhongMaterial",{color:16250871,"stencil-write":"","stencil-ref":3,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,J)],8,V),e("TresMesh",K,[Q,e("TresMeshPhongMaterial",{color:16711935,"stencil-write":"","stencil-ref":3,"stencil-func":t(r)},null,8,U)]),e("TresMesh",{name:"left-face","rotation-y":Math.PI*-.5,position:[-.5,0,0]},[Y,e("TresMeshPhongMaterial",{color:2365978,"stencil-write":"","stencil-ref":4,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,Z)],8,X),i(t(x),{speed:2},{default:h(()=>[e("primitive",{object:t(u),"rotation-y":-Math.PI/2,position:[-.1,-.2,0],scale:.02},null,8,ee)]),_:1}),e("TresMesh",{name:"right-face","rotation-y":Math.PI*.5,position:[.5,0,0]},[se,e("TresMeshPhongMaterial",{color:16250871,"stencil-write":"","stencil-ref":5,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,ne)],8,te),e("TresMesh",oe,[ce,e("TresMeshPhongMaterial",{color:255,"stencil-write":"","stencil-ref":5,"stencil-func":t(r)},null,8,ie)]),e("TresMesh",{name:"back-face","rotation-y":Math.PI,position:[0,0,-.5]},[re,e("TresMeshPhongMaterial",{color:16250871,"stencil-write":"","stencil-ref":6,"stencil-func":t(l),"stencil-z-pass":t(_),"depth-write":!1},null,8,le)],8,ae),e("TresMesh",_e,[fe,e("TresMeshPhongMaterial",{color:6689075,"stencil-write":"","stencil-ref":6,"stencil-func":t(r)},null,8,he)])],64))}},de=e("TresPerspectiveCamera",{position:[-1,0,2],fov:45,aspect:1,near:.1,far:1e3},null,-1),me=e("TresPointLight",{position:[0,0,1],intensity:1},null,-1),pe=e("TresDirectionalLight",{position:[1,1,1],intensity:3},null,-1),Me=e("TresAmbientLight",{intensity:2},null,-1),ze={__name:"stencilMask",setup(y){return(s,c)=>{const a=v("TresCanvas");return f(),T(k,null,[i(t(B)),i(a,{ref:"canvasRef","window-size":"","clear-color":"#111"},{default:h(()=>[de,i(t(G),{"auto-rotate":""}),(f(),m(p,null,{default:h(()=>[i(S,{texture:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/workshop_blur.jpg"})]),_:1})),(f(),m(p,null,{default:h(()=>[i($)]),_:1})),(f(),m(p,null,{default:h(()=>[i(ue)]),_:1})),me,pe,Me]),_:1},512)],64)}}};export{ze as default};
