import{Z as f,$ as M,a0 as T,a1 as b,a2 as m,k as a,a5 as g,ak as x,an as y,ao as B,w as v,ap as V,o as t,v as w,C as k,a6 as C,J as i,a7 as G,V as e,c as r,W as n,a as P,aa as L}from"./vendor.0ec982781705022653473.js";const N=e("TresPerspectiveCamera",{position:[11,11,11],fov:45,near:.1,far:1e3,"look-at":[-8,3,-3]},null,-1),R=e("TresDirectionalLight",{position:[0,8,4],intensity:.2,"cast-shadow":""},null,-1),S=["material"],E=e("TresBoxGeometry",{args:[1,1,1]},null,-1),I=[E],$={key:0,position:[4,0,0]},z=e("TresBoxGeometry",{args:[1,1,1]},null,-1),A=e("TresMeshToonMaterial",{color:"#efefef"},null,-1),D=[z,A],J={key:1,position:[4,1,0]},U=e("TresBoxGeometry",{args:[1,1,1]},null,-1),W=e("TresMeshToonMaterial",{color:"#efefef"},null,-1),Z=[U,W],j={key:2,position:[0,-4,-5]},q=e("TresGroup",null,[e("TresMesh",{position:[0,0,0]},[e("TresBoxGeometry",{args:[1,1,1]}),e("TresMeshBasicMaterial",{color:"#efef11"})]),e("TresMesh",{position:[0,2,0]},[e("TresBoxGeometry",{args:[1,1,1]}),e("TresMeshBasicMaterial",{color:"#ef11ef"})])],-1),F=[q],H=e("TresAmbientLight",{intensity:.5},null,-1),Q=f({__name:"theConditional",setup(K){const d=M({clearColor:"#000000",shadows:!0,alpha:!1,shadowMapType:T,outputColorSpace:b,toneMapping:m,useLegacyLights:!1}),s=a({groupVisible:!0,boxPropMaterialVisible:!0}),_=a(null),l=a(!0);let o=null,c=null;g(()=>{o||(o=new x({title:"显隐参数",expanded:!0}),o.addBinding(l,"value",{label:"boxVisible"}),o.addBinding(s.value,"boxPropMaterialVisible"),o.addBinding(s.value,"groupVisible")),c=y().proxy}),B(()=>{o&&(o.dispose(),o=null)}),v(()=>l,(p,u)=>{u!==void 0&&(c.$refs.boxRef.visible=p.value)},{deep:!0});const h=new V({color:"#ff0000"});return(p,u)=>(t(),w(i(G),C(d,{"window-size":""}),{default:k(()=>[N,R,e("TresMesh",{ref_key:"boxRef",ref:_,position:[0,0,0],material:i(h)},I,8,S),s.value.boxPropMaterialVisible?(t(),r("TresMesh",$,D)):n("",!0),s.value.boxPropMaterialVisible?(t(),r("TresMesh",J,Z)):n("",!0),s.value.groupVisible?(t(),r("TresGroup",j,F)):n("",!0),P(i(L)),H]),_:1},16))}});export{Q as default};
