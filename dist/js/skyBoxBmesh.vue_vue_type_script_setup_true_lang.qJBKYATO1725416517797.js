import{bc as t,a6 as n}from"./three.VTQVqxMx1725416517797.js";import{l as r}from"./utils.PFlOIhME1725416517797.js";import{d as e,a5 as o,o as i,E as s,L as a,aj as c,ak as u}from"./@vue._6MD2XyK1725416517797.js";const f=g;!function(t,n){const r=g,e=d();for(;;)try{if(944377===-parseInt(r(187))/1+-parseInt(r(178))/2+parseInt(r(196))/3+-parseInt(r(203))/4+parseInt(r(214))/5+-parseInt(r(195))/6+parseInt(r(177))/7)break;e.push(e.shift())}catch(o){e.push(e.shift())}}();const l=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[g(216)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();!function(){l(this,(function(){const t=g,n=new RegExp(t(209)),r=new RegExp(t(205),"i"),e=m(t(208));n[t(215)](e+"chain")&&r[t(215)](e+"input")?m():e("0")}))()}();const p=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[g(216)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();function g(t,n){const r=d();return(g=function(t,n){return r[t-=175]})(t,n)}p(void 0,(function(){const t=g;let n;try{n=Function(t(198)+t(212)+");")()}catch(o){n=window}const r=n[t(182)]=n[t(182)]||{},e=[t(183),t(218),t(192),"error","exception",t(206),t(202)];for(let i=0;i<e[t(207)];i++){const n=p[t(180)][t(185)][t(197)](p),o=e[i],s=r[o]||n;n[t(193)]=p[t(197)](p),n[t(176)]=s.toString[t(197)](s),r[o]=n}}))();const v=[f(189)];function d(){const t=["function *\\( *\\)","TresMesh","LinearFilter",'{}.constructor("return this")( )',"BackSide","5512215BJFbZs","test","apply","\n\t\tuniform sampler2D uSkybox;\n\t\tvarying vec3 vFragPos;\n\t\tconst float PI = 3.14159265359;\n\t\tvoid main() {\n\t\t\t\tvec3 dir = normalize(vFragPos);\n\t\t\t\tfloat v = (asin(dir.y) + PI * 0.5) / (PI); \n\t\t\t\tfloat u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);\n\t\t\t\tgl_FragColor = texture2D(uSkybox, vec2(u, v));\n\t\t}","warn","magFilter","toString","6061944cqgsoZ","1537852nRosVj","texture","constructor","call","console","log","generateMipmaps","prototype","debu","80842GzhLaT","wrapS","args","\n\t\tvarying vec3 vFragPos;\n\n\t\tvoid main() {\n\t\t\t\tvFragPos = position.xyz;\n\t\t\t\tvec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);\n\t\t\t\tviewSpace.w = 1.0;\n\t\t\t\tgl_Position = projectionMatrix * viewSpace;    \n\t\t}","TresBoxGeometry","info","__proto__","gger","8149686hqtBMA","4912716jBIPFk","bind","return (function() ","TresShaderMaterial","stateObject","size","trace","1814324bkdVjq","while (true) {}","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","table","length","init"];return(d=function(){return t})()}const h=e({__name:"skyBoxBmesh",props:{texture:{},size:{default:1e3}},async setup(e){const l=f;let p,g;const d=e,h=([p,g]=o((()=>r(d[l(179)]))),p=await p,g(),p);h[l(188)]=h.wrapT=t,h[l(184)]=!1,h[l(175)]=n[l(211)],h.minFilter=n[l(211)];const m={uniforms:{uSkybox:{type:"t",value:h}},side:n[l(213)],vertexShader:l(190),fragmentShader:l(217),depthWrite:!0};return(t,n)=>{const r=l;return i(),s(r(210),null,[a(r(191),{args:[d[r(201)],d[r(201)],d[r(201)]]},null,8,v),a(r(199),c(u(m)),null,16)])}}});function m(t){function n(t){const r=g;if("string"==typeof t)return function(t){}[r(180)](r(204))[r(216)]("counter");1!==(""+t/t)[r(207)]||t%20==0?function(){return!0}.constructor(r(186)+r(194))[r(181)]("action"):function(){return!1}[r(180)]("debu"+r(194)).apply(r(200)),n(++t)}try{if(t)return n;n(0)}catch(r){}}export{h as _};
