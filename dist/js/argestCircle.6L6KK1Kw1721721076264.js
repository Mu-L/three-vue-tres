import{$ as t,d as n}from"./@tresjs.tWkmYPO61721721076264.js";import{Z as e,aN as o}from"./three.fnkrvySq1721721076264.js";import{d as r,e as i,o as s,f as a,g as c,J as u,j as f,u as l,aj as v,ak as p,m as d}from"./@vue.Q1VpS3901721721076264.js";import"./tweakpane.yHWGBmom1721721076264.js";import"./@vueuse._hUvP73U1721721076264.js";const g=h;!function(t,n){const e=h,o=j();for(;;)try{if(689474===parseInt(e(166))/1+parseInt(e(189))/2+parseInt(e(194))/3+-parseInt(e(180))/4+parseInt(e(165))/5*(-parseInt(e(173))/6)+parseInt(e(196))/7+-parseInt(e(169))/8)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const m=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[h(177)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();function h(t,n){const e=j();return(h=function(t,n){return e[t-=154]})(t,n)}function j(){const t=["TresAxesHelper","while (true) {}","uTime",'{}.constructor("return this")( )',"1535lNkaMP","368496UDzwDM","perspectiveCameraRef","debu","747440gymUBM","action","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","gger","822HzLhNO","chain","console","bind","apply","TresCanvas","string","4191232hDfvlJ","test","return (function() ","exception","error","#000000","prototype","TresAmbientLight","table","2010188OeiXgJ","#ffffff","constructor","stateObject","TresShaderMaterial","1197030YnxfPg","toString","701197YXbhbM","counter","function *\\( *\\)","TresPerspectiveCamera","argestCircle","TresMesh","info","uniforms"];return(j=function(){return t})()}!function(){m(this,(function(){const t=h,n=new RegExp(t(155)),e=new RegExp(t(171),"i"),o=z("init");n.test(o+t(174))&&e[t(181)](o+"input")?z():o("0")}))()}();const y=function(){let t=!0;return function(n,e){const o=t?function(){if(e){const t=e[h(177)](n,arguments);return e=null,t}}:function(){};return t=!1,o}}();y(void 0,(function(){const t=h,n=function(){const t=h;let n;try{n=Function(t(182)+t(164)+");")()}catch(e){n=window}return n}(),e=n.console=n[t(175)]||{},o=["log","warn",t(159),t(184),t(183),t(188),"trace"];for(let r=0;r<o.length;r++){const n=y.constructor[t(186)][t(176)](y),i=o[r],s=e[i]||n;n.__proto__=y[t(176)](y),n[t(195)]=s[t(195)][t(176)](s),e[i]=n}}))();const x={ref:g(167),position:[600,750,-1221],fov:45,near:1,far:1e4},T=u(g(187),{color:g(190)},null,-1),b=u("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:g(190)},null,-1),w=["rotation-x"],_=u("TresPlaneGeometry",{args:[400,400]},null,-1),k=u(g(161),{args:[1e3],position:[0,19,0]},null,-1),D=u("TresGridHelper",{args:[6e3,100],position:[0,19,0]},null,-1),M=r({__name:g(157),setup(r){const m=g,h={clearColor:m(185),shadows:!0,alpha:!1,useLegacyLights:!0},j={autoRotate:!0,enableDamping:!0},y={uniforms:{uTime:{type:"f",value:0}},vertexShader:"varying vec2 vUv;\nvoid main(){\n\tvUv=uv;\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}",fragmentShader:"varying vec2 vUv;\nuniform float uTime;\nstruct VoronoiData{\n\tfloat dist;\n\tfloat edgedist;\n\tvec2 edgenormal;\n\tvec2 point;\n};\n\nvec2 hash22(vec2 p)\n{\n\tvec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));\n\tp3+=dot(p3,p3.yzx+33.33);\n\treturn fract((p3.xx+p3.yz)*p3.zy);\n}\nVoronoiData voronoi2dedges(vec2 uv){\n\tvec2 n=floor(uv);\n\tvec2 f=fract(uv);\n\t\n\tvec2 mg,mr;\n\t\n\tfloat md=8.;\n\tfor(int j=-1;j<=1;j++)\n\tfor(int i=-1;i<=1;i++){\n\t\tvec2 g=vec2(i,j);\n\t\tvec2 o=hash22(n+g);\n\t\tvec2 r=g+o-f;\n\t\tfloat d=dot(r,r);\n\t\t\n\t\tif(d<md){\n\t\t\tmd=d;\n\t\t\tmr=g+o;\n\t\t}\n\t}\n\t\n\tfloat med=8.;\n\tvec2 men=vec2(0);\n\tfor(int j=-2;j<=2;j++)\n\tfor(int i=-2;i<=2;i++){\n\t\tvec2 g=vec2(i,j);\n\t\tg+=hash22(n+g);\n\t\tvec2 k=g-mr;\n\t\t\n\t\tfloat d=dot(k,k);\n\t\tif(d>0.){\n\t\t\tfloat l=dot(g+mr-2.*f,k)*.5/sqrt(d);\n\t\t\tif(l<med){\n\t\t\t\tmen=k;\n\t\t\t\tmed=l;\n\t\t\t}\n\t\t}\n\t}\n\treturn VoronoiData(md,med,normalize(men),mr+n);\n}\n\nvoid main(){\n\tvec2 uv=vUv*10.+vec2(0.,uTime);\n\tvec2 p=voronoi2dedges(uv).point;\n\tVoronoiData v;\n\tfor(int i=0;i<32;i++){\n\t\tVoronoiData v=voronoi2dedges(p);\n\t\tp+=-v.edgenormal*.2/float(i+1);\n\t}\n\tgl_FragColor=vec4(\n\t\tsmoothstep(0.,.1,distance(uv,p))*\n\t\tsmoothstep(0.,.01,voronoi2dedges(uv).edgedist)*\n\t\tsmoothstep(0.,.01,abs(distance(uv,p)-voronoi2dedges(p).edgedist))\n\t);\n}",side:e,blending:o,depthWrite:!1,transparent:!0},{onLoop:M}=t();return M((({delta:t})=>{const n=m;y[n(160)][n(163)].value+=t})),(t,e)=>{const o=m,r=i(o(178));return s(),a(r,d(h,{"window-size":""}),{default:c((()=>[u(o(156),x,null,512),f(l(n),v(p(j)),null,16),T,b,u(o(158),{ref:"quanMeshRef",position:[0,100,0],"rotation-x":2*Math.PI/360*90},[_,u(o(193),v(p(y)),null,16)],8,w),k,D])),_:1},16)}}});function z(t){function n(t){const e=h;if(typeof t===e(179))return function(t){}[e(191)](e(162))[e(177)](e(154));1!==(""+t/t).length||t%20==0?function(){return!0}[e(191)](e(168)+e(172)).call(e(170)):function(){return!1}[e(191)](e(168)+"gger")[e(177)](e(192)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{M as default};
