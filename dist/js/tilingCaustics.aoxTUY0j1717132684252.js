var h=Object.defineProperty;var i=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var l=(n,t,e)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,c=(n,t)=>{for(var e in t||(t={}))_.call(t,e)&&l(n,e,t[e]);if(i)for(var e of i(t))b.call(t,e)&&l(n,e,t[e]);return n};import{a5 as p,aD as r,at as x,B as y,o as u,c as w,a1 as a,ae as f,af as v,ad as T,a6 as C,au as S,r as k,C as B,J as A,ac as M,a as d,T as P,ag as U}from"./vendor.E5SXPLW-1717132684252.js";const E="// Examples of variables passed from vertex to fragment shader\nvarying vec2 vUv;\n\nvoid main(){\n	// To pass variables to the fragment shader, you assign them here in the\n	// main function. Traditionally you name the varying with vAttributeName\n	vUv=uv;\n	\n	// This sets the position of the vertex in 3d space. The correct math is\n	// provided below to take into account camera and object data.\n	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",I="#define TAU 6.28318530718\n#define MAX_ITER 5\n\nuniform vec2 resolution;\nuniform vec3 backgroundColor;\nuniform vec3 color;\nuniform float speed;\nuniform vec2 flowSpeed;\nuniform float brightness;\nuniform float time;\n\nvarying vec2 vUv;\n\nvoid main(){\n	vec2 uv=(vUv.xy+(time*flowSpeed))*resolution;\n	\n	vec2 p=mod(uv*TAU,TAU)-250.;\n	vec2 i=vec2(p);\n	\n	float c=1.;\n	float inten=.005;\n	\n	for(int n=0;n<MAX_ITER;n++){\n		float t=time*speed*(1.-(3.5/float(n+1)));\n		i=p+vec2(cos(t-i.x)+sin(t+i.y),sin(t-i.y)+cos(t+i.x));\n		c+=1./length(vec2(p.x/(sin(i.x+t)/inten),p.y/(cos(i.y+t)/inten)));\n	}\n	\n	c/=float(MAX_ITER);\n	c=1.17-pow(c,brightness);\n	\n	vec3 rgb=vec3(pow(abs(c),8.));\n	\n	gl_FragColor=vec4(rgb*color+backgroundColor,length(rgb)+.1);\n}",R=["rotation-x"],N=a("TresPlaneGeometry",{args:[10,10]},null,-1),V=p({__name:"tilingCaustics",props:{speed:{default:.478},backgroundColor:{},color:{default:"#fff"},flowSpeed:{default:{x:.01,y:.01}},brightness:{default:1.5}},setup(n){const t=n,e={uniforms:{resolution:{type:"v2",value:{x:1,y:1}},backgroundColor:{type:"c",value:new r(t.color)},color:{type:"c",value:new r("#fff")},speed:{type:"f",value:t.speed},flowSpeed:{type:"v2",value:t.flowSpeed},brightness:{type:"f",value:t.brightness},time:{type:"f",value:.1}},vertexShader:E,fragmentShader:I,side:x,transparent:!0,depthWrite:!1,depthTest:!0},{onLoop:o}=T();return o(({delta:s})=>{e.uniforms.time.value+=s}),y(()=>t,()=>{e.uniforms.speed.value=t.speed,e.uniforms.brightness.value=t.brightness,e.uniforms.backgroundColor.value=new r(t.color)},{deep:!0}),(s,m)=>(u(),w("TresMesh",{"rotation-x":-Math.PI/2,"position-y":1},[N,a("TresShaderMaterial",f(v(e)),null,16)],8,R))}}),X=a("TresPerspectiveCamera",{position:[10,10,10]},null,-1),$=a("TresAmbientLight",{intensity:1},null,-1),j=a("TresGridHelper",{args:[10,10]},null,-1),G=p({__name:"tilingCaustics",setup(n){const t={clearColor:"#222"},e=C({color:"#fff",speed:.1,brightness:1.5,flowSpeed:{x:.01,y:.01}}),o=new S({title:"参数",expanded:!0});return o.addBinding(e,"color",{label:"颜色"}),o.addBinding(e,"speed",{label:"速度",min:.1,max:1,step:.1}),o.addBinding(e,"brightness",{label:"亮度",min:.1,max:2,step:.1}),o.addBinding(e,"flowSpeed",{label:"流动速度",picker:"inline",expanded:!0,x:{min:.01,step:.02,max:.6,inverted:!0},y:{min:.01,step:.02,max:.6,inverted:!0}}),(s,m)=>{const g=k("TresCanvas");return u(),B(g,M(t,{"window-size":""}),{default:A(()=>[X,$,d(P(U)),j,d(V,f(v(c({},e))),null,16)]),_:1},16)}}});export{G as default};
