import{Y as d,o,s as m,B as C,a6 as g,I as c,a7 as T,$ as B,a0 as M,a1 as k,a as w,aa as P,c as n,D as a,C as s,U as t}from"./vendor-524e5929.js";const x=t("TresPerspectiveCamera",{position:[11,11,11],"look-at":[0,0,0]},null,-1),y=["position"],L=t("TresBoxGeometry",{args:[1,1,1]},null,-1),S=t("TresMeshToonMaterial",{color:"#efefef"},null,-1),b=[L,S],E=t("TresDirectionalLight",{intensity:1},null,-1),F=t("TresAmbientLight",{intensity:1},null,-1),G=d({__name:"theEvents",setup(N){const u={clearColor:"#202020",shadows:!0,alpha:!1,shadowMapType:B,outputColorSpace:M,toneMapping:k};function p(e){e&&e.object.material.color.set("#008080")}function _(e){e&&e.object.material.color.set("#CCFF03")}function f(e){e&&e.material.color.set("#efefef")}function h(e){e&&console.log(e)}return(e,j)=>(o(),m(c(T),g(u,{"window-size":""}),{default:C(()=>[x,w(c(P)),(o(),n(s,null,a([-2.5,0,2.5],r=>(o(),n(s,null,[(o(),n(s,null,a([-2.5,0,2.5],i=>(o(),n(s,null,[(o(),n(s,null,a([-2.5,0,2.5],l=>t("TresMesh",{key:"".concat([r,i,l]),position:[r,i,l],onClick:p,onPointerEnter:_,onPointerLeave:f,onPointerMove:h},b,40,y)),64))],64))),64))],64))),64)),E,F]),_:1},16))}});export{G as default};
