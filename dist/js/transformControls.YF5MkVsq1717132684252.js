import{a5 as x,q as l,a6 as b,aW as g,r as w,o as u,C as c,J as B,ac as p,a7 as C,a8 as T,a9 as X,a as Y,T as v,ag as Z,a1 as a,b4 as M,a2 as k}from"./vendor.E5SXPLW-1717132684252.js";const y=a("TresPerspectiveCamera",{position:[3,3,3]},null,-1),S=a("TresBoxGeometry",null,null,-1),N=a("TresMeshNormalMaterial",null,null,-1),R=[S,N],G=a("TresSphereGeometry",null,null,-1),j=a("TresMeshNormalMaterial",null,null,-1),z=[G,j],V=a("TresAmbientLight",{intensity:1},null,-1),q=a("TresGridHelper",null,null,-1),A=x({__name:"transformControls",setup(P){const h={clearColor:"#82DBC5",shadows:!0,alpha:!1,shadowMapType:C,outputColorSpace:T,toneMapping:X},r=l(),i=l(),n=l();function d(s){n.value=s}const _=l(),e=b({mode:"translate",enabled:!0,space:"world",axis:"XYZ",size:1,showX:!0,showY:!0,showZ:!0}),{pane:t}=g();return t.addBlade({view:"list",label:"模式",options:[{text:"移动",value:"translate"},{text:"旋转",value:"rotate"},{text:"缩放",value:"scale"}],value:e.mode}).on("change",s=>{e.mode=s.value}),t.addBinding(e,"enabled",{label:"开启"}),t.addBlade({view:"list",label:"Space",options:[{text:"世界坐标",value:"world"},{text:"本地坐标",value:"local"}],value:e.space}).on("change",s=>{e.space=s.value}),t.addBlade({view:"list",label:"轴",options:[{text:"X",value:"X"},{text:"Y",value:"Y"},{text:"Z",value:"Z"},{text:"XY",value:"XY"},{text:"YZ",value:"YZ"},{text:"XZ",value:"XZ"},{text:"XYZ",value:"XYZ"}],value:e.axis}),t.addBinding(e,"size",{label:"大小",step:.01,min:0,max:10}),t.addBinding(e,"showX",{label:"显示X轴"}),t.addBinding(e,"showY",{label:"显示Y轴"}),t.addBinding(e,"showZ",{label:"显示Z轴"}),(s,o)=>{const m=w("TresCanvas");return u(),c(m,p(h,{ref_key:"context",ref:_,"window-size":""}),{default:B(()=>[y,Y(v(Z),{"make-default":""}),a("TresMesh",{ref_key:"boxRef",ref:r,position:[-2,1,0],onClick:o[0]||(o[0]=f=>d(r.value))},R,512),n.value?(u(),c(v(M),p({key:0,object:n.value},e),null,16,["object"])):k("",!0),a("TresMesh",{ref_key:"sphereRef",ref:i,position:[2,1,0],onClick:o[1]||(o[1]=f=>d(i.value))},z,512),V,q]),_:1},16)}}});export{A as default};
