import{Y as b,j as m,az as _,a5 as y,ae as w,Z as u,o as d,s,B as C,I as p,V as g}from"./vendor-524e5929.js";import{_ as f,l as h,a as B,b as x}from"./pagesShow.vue_vue_type_style_index_0_lang-4a631ac6.js";import"./_commonjsHelpers-725317a4.js";const L=b({__name:"buildings",async setup(k){let e,r;const n=m(!1),c=([e,r]=_(()=>h()),e=await e,r(),e);n.value=!0,y(()=>{const l=new w({title:"建筑效果",expanded:!0}),o=l.addFolder({title:"线条"});o.addBinding(i,"show",{label:"显示"}),o.addBinding(i,"color",{label:"颜色"}),o.addBinding(i,"width",{label:"宽度",min:0,max:10,step:1}),o.addBinding(i,"opacity",{label:"透明度",min:0,max:1,step:.1});const t=l.addFolder({title:"建筑物"});t.addBinding(a,"show",{label:"显示"}),t.addBinding(a,"bulidingsColor",{label:"楼宇颜色"}),t.addBinding(a,"gradient",{label:"渐变"}),t.addBinding(a,"opacity",{label:"透明度",min:0,max:1,step:.1}),t.addBinding(a,"landColor",{label:"地面颜色"})});const i=u({width:1,color:"#000",opacity:1,show:!0}),a=u({bulidingsColor:"#e523ff",landColor:"#112233",opacity:.9,show:!0,gradient:!0});return(l,o)=>(d(),s(f,{showBuildings:!1},{ability:C(()=>[a.show&&n.value?(d(),s(B,{key:0,model:p(c),bulidingsColor:a.bulidingsColor,landColor:a.landColor,gradient:a.gradient,opacity:a.opacity},null,8,["model","bulidingsColor","landColor","gradient","opacity"])):g("",!0),i.show&&n.value?(d(),s(x,{key:1,builds:p(c).city,width:i.width,color:i.color,opacity:i.opacity},null,8,["builds","width","color","opacity"])):g("",!0)]),_:1}))}});export{L as default};
