var _=Object.defineProperty;var r=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var l=(t,a,e)=>a in t?_(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,s=(t,a)=>{for(var e in a||(a={}))u.call(a,e)&&l(t,e,a[e]);if(r)for(var e of r(a))g.call(a,e)&&l(t,e,a[e]);return t};import{$ as v,k as x,a5 as w,a0 as n,c1 as p,an as B,o as c,c as R,a as i,D as f,E as b,v as h,a9 as k,aa as C,ag as S}from"./vendor.Whz5JOL71710727997925.js";import{_ as $}from"./default.vue_vue_type_script_setup_true_lang.8fluCWMQ1710727997925.js";import{_ as y}from"./pagesShow.vue_vue_type_script_setup_true_lang.PL43AZ611710727997925.js";import{_ as z}from"./precipitation.vue_vue_type_script_setup_true_lang.51zootEO1710727997925.js";import"./vanilla-307d3a93.esm.oDMQ5mjs1710727997925.js";import"./_commonjsHelpers.5-cIlDoe1710727997925.js";import"./LineSegments2.VW83iRZ61710727997925.js";const A=v({__name:"weather",setup(t){const a=x();w(()=>{a.value&&a.value.$refs.perspectiveCameraRef.position.set(750,500,800)});const e=n({speed:12,size:10,count:6e3,color:"#fff",type:"snow"}),d=n({areaX:1500,areaY:1e3,areaZ:1500}),m=n(s(s({},p(e)),p(d))),o=new B({title:"天气",expanded:!0}).addFolder({title:"下落物"});return o.addBinding(e,"speed",{label:"速度",min:0,max:30,step:1}),o.addBinding(e,"color",{label:"颜色"}),o.addBinding(e,"size",{label:"大小",min:0,max:26,step:1}),o.addBinding(e,"count",{label:"数量",min:1e3,max:1e4,step:100}),o.addBinding(e,"type",{view:"list",label:"类型",options:[{text:"雪",value:"snow"},{text:"雨",value:"rain"},{text:"点",value:"point"}]}),(P,F)=>(c(),R(b,null,[i($),i(y,{ref_key:"pagesShowRef",ref:a,autoRotate:!1},{ability:f(()=>[(c(),h(S,null,{default:f(()=>[i(z,k(C(m)),null,16)]),_:1}))]),_:1},512)],64))}});export{A as default};
