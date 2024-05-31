import{aX as v,an as H,q as p,a5 as U,c6 as O,bl as V,aA as w,aa as N,o as y,c as _,a1 as M,T as r,K as P,ay as D,aB as X,at as $,_ as F,ab as G,aU as R,O as k,S as Y,t as q,a3 as z,aH as J,a6 as S,au as K,a as m,J as W,ac as B}from"./vendor.E5SXPLW-1717132684252.js";import{_ as Q,l as Z,b as ee}from"./pagesShow.vue_vue_type_script_setup_true_lang.K1Jz5NPd1717132684252.js";import{h as te}from"./heatmap.7KSsyecr1717132684252.js";import{r as ae}from"./utils.S_ZFNnfQ1717132684252.js";import{m as oe}from"./BufferGeometryUtils.Ga3MQiuz1717132684252.js";import{c as ne,d as se,a as ie}from"./ExtensionUtilities.agNJerPN1717132684252.js";import"./vanilla.8-DC9lKw1717132684252.js";import"./object_hash.3ShajMuP1717132684252.js";import"./_commonjsHelpers.5-cIlDoe1717132684252.js";import"./_commonjs-dynamic-modules.h-SxKiO41717132684252.js";import"./builtins-300es.Tm_BdSQ71717132684252.js";import"./LineSegments2.yumBiimp1717132684252.js";import"./Water2.wszU1_iN1717132684252.js";import"./Reflector.HltIu0qV1717132684252.js";const T=36,f=-10,C=(o,e)=>o.getValueAt(e)+f,re=(o,e)=>{if(!e){let t=0;for(e=[];t<1e3;)e.push({x:v.randInt(1,o._config.width),y:v.randInt(1,o._config.height),value:v.randInt(f,T)}),t++}o.setData({max:T,min:f,data:e})},ce=(o=250,e=250,t=!0)=>{const a=document.createElement("heatmap-canvas");return a.style.position="absolute",t||(a.style.display="none"),a.style.top="0",a.style.left="0",document.body.appendChild(a),te.create({container:a,width:o,height:e,blur:".8",radius:10,gradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"}})},I=H("buildingsHeatmap",()=>{const o=p(!1),e=p(0);function t(n){o.value=n}function a(n){e.value=n}return{showDiv:o,temperature:e,setShowDiv:t,setTemperature:a}}),le=["object","rotation-x"],ue=["object"],me=U({__name:"buildingsHeatmap",props:{model:{},opacity:{default:1}},setup(o){(()=>{D.prototype.computeBoundsTree=ne,D.prototype.disposeBoundsTree=se,w.prototype.raycast=ie})();const t=o,a=ce();re(a);const n=new O(a._renderer.canvas);n.needsUpdate=!0;const c=s=>new X({vertexShader:"\n		varying vec2 vUv;\n		void main() {\n			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n			vUv = uv;\n		}\n		",fragmentShader:"\n		uniform sampler2D heightMap;\n		uniform float uOpacity;\n		varying vec2 vUv;\n		void main() {\n			gl_FragColor = vec4(texture2D(heightMap, vUv.xy).rgb, uOpacity);\n    }\n		",uniforms:{uOpacity:{value:t.opacity},heightMap:{type:"t",value:s}},depthWrite:!0,depthTest:!0,transparent:!0,side:$}),i=t.model.city.clone();delete i.geometry.attributes.normal,delete i.geometry.attributes.uv;const g=i.geometry.clone().applyMatrix4(i.matrix),l=t.model.land.clone();delete l.geometry.attributes.normal;const b=l.geometry.clone().applyMatrix4(l.matrix),u=oe([g,b]);u.applyMatrix4(new V().makeRotationX(Math.PI/2)),ae(u),u.computeBoundsTree();const x=c(n),A=new w(u,x);N(()=>{t.opacity&&(x.uniforms.uOpacity.value=t.opacity)});const d=I(),E=s=>{if(s){const h={x:s.uv.x*a._config.width,y:(1-s.uv.y)*a._config.height};console.log("数值：",s),console.log("数值———：",C(a,h)),d.setTemperature(C(a,h))}},L=s=>{s&&d.$patch({showDiv:!0})},j=s=>{s&&d.setShowDiv(!1)};return(s,h)=>(y(),_(P,null,[M("primitive",{object:r(A),"rotation-x":-Math.PI/2,onPointerMove:E,onPointerEnter:L,onPointerLeave:j},null,40,le),M("primitive",{object:t.model.model.children[0].clone()},null,8,ue)],64))}}),pe={__name:"dataDiv",setup(o){const e=I(),t=p({top:0,left:0});function a(n){t.value.left=n.clientX+5+"px",t.value.top=n.clientY-20+"px"}return G(()=>{window.addEventListener("mousemove",a)}),R(()=>{window.removeEventListener("mousemove",a)}),(n,c)=>k((y(),_("div",{class:"title",style:z(t.value)},"温度："+q(r(e).temperature)+"℃ ",5)),[[Y,r(e).showDiv]])}},de=F(pe,[["__scopeId","data-v-fac3e7fd"]]),Ce=U({__name:"heatmap2",async setup(o){let e,t;const a=p(!1),n=([e,t]=J(()=>Z()),e=await e,t(),e);a.value=!0;const c=S({width:1,color:"#000",opacity:1,show:!0}),i=S({opacity:.9});return new K({title:"参数",expanded:!0}).addBinding(i,"opacity",{label:"透明度",min:0,max:1,step:.1}),(l,b)=>(y(),_(P,null,[m(Q,{showBuildings:!1,autoRotate:!1},{ability:W(()=>[m(me,B({model:r(n)},i),null,16,["model"]),m(ee,B(c,{builds:r(n).city}),null,16,["builds"])]),_:1}),m(de)],64))}});export{Ce as default};
