import{a1 as p,aD as w,aE as x,o as n,c as g,Y as d,L as r,x as i,E as s,a,a8 as b,aK as S,ag as c,az as m,l as z,a9 as T,ad as N,a6 as P,r as M,G as j,ac as y,aa as C,ab as I}from"./vendor.1SfJ1rT91715934934621.js";/* empty css                                                                                 */import{_ as L}from"./randomLoading.vue_vue_type_script_setup_true_lang.xUWhpzn21715934934621.js";import{_ as k}from"./model.vue_vue_type_script_setup_true_lang.kvOk6QSF1715934934621.js";import"./starLoading.cIKWU4cs1715934934621.js";import"./cssLoaders.FNdhmzXt1715934934621.js";import"./bubbleLoading.2dQ7sL0Q1715934934621.js";const D=["rotate-x"],$=["object"],B=p({__name:"floorText",async setup(_){let e,l;const{nodes:o}=([e,l]=w(()=>x("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/floor/redTextFloor/scene.gltf",{draco:!0,decoderPath:"./draco/"})),e=await e,l(),e);console.log(o);const t=o.Sketchfab_model.getObjectByName("floor_grid_07_-_Default_0"),u={size:16,height:3,curveSegments:5,bevelEnabled:!0,bevelThickness:.05,bevelSize:.12,bevelOffset:.2,bevelSegments:4};return(h,v)=>(n(),g("TresGroup",{"rotate-x":-Math.PI/2},[d("primitive",{object:r(t),scale:3,"receive-shadow":""},null,8,$),(n(),i(c,null,{default:s(()=>[a(r(S),b({text:"DFS 230A-1 新型滑翔机",position:[-145,-265,2]},u,{"cast-shadow":"",font:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/fonts/FZLanTingHeiS-UL-GB_Regular.json",center:""}),null,16)]),_:1}))],8,D))}}),E=["position","scale","rotation"],F=["object","position-z","rotation-z"],G=["object","position-z","rotation-y","rotation-z"],q=["color","emissive"],f=p({__name:"arrow2.5D",props:{position:{default:[0,0,0]},rotation:{default:[0,0,0]},textRotation:{default:[0,0,0]},scale:{default:10},text:{default:"文本"},zRoom:{default:5},arrScale:{default:[2,2,.8]},color:{default:"#9a7a4d"}},async setup(_){let e,l;const o=_,{nodes:t}=([e,l]=w(()=>x("./plugins/UIdemo/model/arrowWhite2.5d.glb")),e=await e,l(),e);console.log(t.RootNode),t.RootNode.scale.set(o.arrScale[0],o.arrScale[1],o.arrScale[2]),t.RootNode.children[0].children[0].material.color=new m(o.color),t.RootNode.children[0].children[0].material.emissive=new m(o.color),t.RootNode.children[0].children[0].castShadow=!0,t.RootNode.children[0].children[0].roughness=0,t.RootNode.children[1].children[0].material.color=new m(o.color),t.RootNode.children[1].children[0].material.emissive=new m(o.color),t.RootNode.children[1].children[0].castShadow=!0,t.RootNode.children[1].children[0].roughness=0;const u={size:.7,height:.1,curveSegments:5,bevelEnabled:!0,bevelThickness:.05,bevelSize:.006,bevelOffset:.02,bevelSegments:4};let h=z(0);const{onLoop:v}=T();return v(({delta:R})=>{h.value+=R*2}),(R,U)=>(n(),g("TresGroup",{position:o.position,scale:o.scale,rotation:o.rotation},[d("primitive",{object:r(t).RootNode,"position-z":o.zRoom,"rotation-z":r(h)},null,8,F),d("primitive",{object:r(t).RootNode.clone(),"position-z":-o.zRoom,"rotation-y":-Math.PI,"rotation-z":r(h)},null,8,G),(n(),i(c,null,{default:s(()=>[a(r(S),b({text:o.text,position:[0,.2,0]},u,{"cast-shadow":"",rotation:o.textRotation,font:"https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/fonts/FZLanTingHeiS-UL-GB_Regular.json",center:""}),{default:s(()=>[d("TresMeshStandardMaterial",{color:o.color,emissive:o.color},null,8,q)]),_:1},16,["text","rotation"])]),_:1}))],8,E))}}),A=d("TresPerspectiveCamera",{position:[-100,800,500],fov:50,near:.1,far:1e4},null,-1),O=d("TresAmbientLight",{color:"#ffffff",intensity:"2"},null,-1),Q=p({__name:"sizeMark",setup(_){const e=N();P(()=>{e.value&&(e.value.shadow.mapSize.set(2048,2048),e.value.shadow.camera.near=.1,e.value.shadow.camera.far=5e3,e.value.shadow.camera.top=500,e.value.shadow.camera.right=500,e.value.shadow.camera.left=-500,e.value.shadow.camera.bottom=-500,e.value.shadow.radius=2)});const l={enableDamping:!0,dampingFactor:.05,autoRotate:!0,autoRotateSpeed:2};return(o,t)=>{const u=M("TresCanvas");return n(),g(j,null,[a(r(L)),a(u,{clearColor:"#999","window-size":"",shadows:""},{default:s(()=>[A,a(r(y),C(I(l)),null,16),O,d("TresDirectionalLight",{ref_key:"TDirectionalLight",ref:e,color:"#ffffff",position:[260,260,350],intensity:6,"cast-shadow":""},null,512),(n(),i(c,null,{default:s(()=>[a(k)]),_:1})),(n(),i(c,null,{default:s(()=>[a(B)]),_:1})),(n(),i(c,null,{default:s(()=>[a(f,{position:[230,10,0],scale:30,text:"长:86m",textRotation:[-Math.PI/5,0,0]},null,8,["textRotation"])]),_:1})),(n(),i(c,null,{default:s(()=>[a(f,{position:[0,10,230],scale:30,text:"宽:62m",rotation:[0,-Math.PI/2,Math.PI/5],zRoom:3,textRotation:[-Math.PI/5,Math.PI/2,Math.PI/5],arrScale:[2,2,.4]},null,8,["rotation","textRotation"])]),_:1})),(n(),i(c,null,{default:s(()=>[a(f,{position:[-230,96,0],scale:30,text:"高:46m",rotation:[Math.PI/2,0,0],zRoom:2,arrScale:[2,2,.4],textRotation:[-Math.PI/1.5,0,0]},null,8,["rotation","textRotation"])]),_:1}))]),_:1})],64)}}});export{Q as default};
