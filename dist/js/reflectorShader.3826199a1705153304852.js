import{Z as l,$ as d,am as m,o as s,v as i,C as n,J as r,a7 as p,a as o,aa as c,aE as _,ah as f,a8 as u,a9 as h,V as a}from"./vendor.3829f59f1705153304852.js";import{_ as g}from"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.483894751705153304852.js";import"./ReflectorMaterial.b6a7d3871705153304852.js";import"./dither.glsl.1a24d3091705153304852.js";import"./OimoPhysicsBuffer.d26bdc701705153304852.js";const x=a("TresPerspectiveCamera",{position:[15,15,15],fov:45,near:.1,far:1e4,"look-at":[0,0,0]},null,-1),B=a("TresAmbientLight",{intensity:10},null,-1),v=a("TresMesh",{position:[0,2,-4]},[a("TresBoxGeometry",{args:[1,1,1]}),a("TresMeshNormalMaterial")],-1),G=l({__name:"reflectorShader",setup(b){const e=d({reflectivity:.49,mirror:.25,mixStrength:26,showGridHelper:!0}),t=new m({title:"镜面参数",expanded:!0});return t.addBinding(e,"reflectivity",{label:"反射率",min:.01,max:1,step:.01}),t.addBinding(e,"mirror",{label:"镜面化",min:0,max:1,step:.01}),t.addBinding(e,"mixStrength",{label:"混合",min:0,max:100,step:1}),t.addBinding(e,"showGridHelper",{label:"显示网格"}),(w,C)=>(s(),i(r(p),{clearColor:"#201919","window-size":""},{default:n(()=>[x,o(r(c),{enableDamping:""}),B,o(r(_),{args:[1,1,1],color:"orange",position:[3,1,0]}),v,(s(),i(f,null,{default:n(()=>[o(g,u(h(e)),null,16)]),_:1}))]),_:1}))}});export{G as default};
