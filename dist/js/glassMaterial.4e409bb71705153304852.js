import{Z as _,k as u,ab as r,w as d,o as h,v as f,C as n,a6 as g,J as s,a7 as M,a0 as m,a1 as T,a2 as w,V as e,a,ag as i,az as x,aE as y,aJ as C,aa as B}from"./vendor.3829f59f1705153304852.js";const k=e("TresPerspectiveCamera",{position:[3,3,3]},null,-1),v={"position-x":3},R=e("TresTorusKnotGeometry",{args:[1,.4,256,20]},null,-1),b={position:[0,0,-1]},G=e("TresPlaneGeometry",{args:[3,3]},null,-1),S=["side"],z=e("TresGridHelper",{args:[10,10]},null,-1),D=e("TresAmbientLight",{intensity:1},null,-1),N=e("TresDirectionalLight",{intensity:1,position:[2,2,2]},null,-1),J=_({__name:"glassMaterial",setup(P){const c={clearColor:"#82DBC5",shadows:!0,alpha:!1,shadowMapType:m,outputColorSpace:T,toneMapping:w},p=u(),t=r(),o=r();return d(t,l=>{o.value.value.material.dispose(),o.value.value.material=l.MeshGlassMaterialClass}),(l,V)=>(h(),f(s(M),g(c,{ref_key:"context",ref:p,"window-size":""}),{default:n(()=>[k,e("TresMesh",v,[R,a(s(i),{ref_key:"glassMaterialRef",ref:t},null,512)]),a(s(x),{scale:.5},{default:n(()=>[a(s(i))]),_:1}),a(s(y),{ref_key:"boxRef",ref:o,"position-x":-3},null,512),e("TresMesh",b,[G,e("TresMeshBasicMaterial",{side:s(C),color:16716049},null,8,S)]),z,D,N,a(s(B))]),_:1},16))}});export{J as default};
