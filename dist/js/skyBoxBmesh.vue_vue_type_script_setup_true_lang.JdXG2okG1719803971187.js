import{a5 as t}from"./three.BsQyBKrV1719803971187.js";import{l as n}from"./utils.9FtToc9s1719803971187.js";import{d as r,a3 as e,o,D as i,J as s,aj as a,ak as c}from"./@vue.CpOXM7bB1719803971187.js";const u=v;function f(){const t=["1314481fnrJnR","\n\t\tvarying vec3 vFragPos;\n\n\t\tvoid main() {\n\t\t\t\tvFragPos = position.xyz;\n\t\t\t\tvec4 viewSpace = vec4(mat3(modelViewMatrix) * position, 0.0);\n\t\t\t\tviewSpace.w = 1.0;\n\t\t\t\tgl_Position = projectionMatrix * viewSpace;    \n\t\t}","TresBoxGeometry","toString","info","chain","exception","generateMipmaps","args","length","table","TresShaderMaterial","gger","function *\\( *\\)","5JZajrA","trace","6cQmQfU","counter","warn","action","init","debu","LinearFilter","359232IPJjuS","prototype","magFilter","return (function() ","stateObject","console","apply","4854762CBwItg","while (true) {}","size","2sxzeVK","constructor",'{}.constructor("return this")( )',"wrapS","bind","wrapT","log","error","506120SWAQCi","11209704SMAfIx","texture","TresMesh","ClampToEdgeWrapping","6272356UZBjmw","test","BackSide","1682698UGsfhc","input"];return(f=function(){return t})()}!function(t,n){const r=v,e=f();for(;;)try{if(952017===parseInt(r(295))/1*(parseInt(r(279))/2)+-parseInt(r(269))/3+parseInt(r(292))/4*(parseInt(r(311))/5)+-parseInt(r(313))/6*(parseInt(r(297))/7)+-parseInt(r(288))/8+-parseInt(r(276))/9+-parseInt(r(287))/10)break;e.push(e.shift())}catch(o){e.push(e.shift())}}();const p=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[v(275)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();!function(){p(this,(function(){const t=v,n=new RegExp(t(310)),r=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),e=d(t(266));n.test(e+t(302))&&r[t(293)](e+t(296))?d():e("0")}))()}();const l=function(){let t=!0;return function(n,r){const e=t?function(){if(r){const t=r[v(275)](n,arguments);return r=null,t}}:function(){};return t=!1,e}}();l(void 0,(function(){const t=v,n=function(){const t=v;let n;try{n=Function(t(272)+t(281)+");")()}catch(r){n=window}return n}(),r=n[t(274)]=n.console||{},e=[t(285),t(264),t(301),t(286),t(303),t(307),t(312)];for(let o=0;o<e[t(306)];o++){const n=l[t(280)][t(270)][t(283)](l),i=e[o],s=r[i]||n;n.__proto__=l.bind(l),n[t(300)]=s.toString[t(283)](s),r[i]=n}}))();const g=[u(305)],m=r({__name:"skyBoxBmesh",props:{texture:{},size:{default:1e3}},async setup(r){const f=u;let p,l;const m=r,v=([p,l]=e((()=>n(m[f(289)]))),p=await p,l(),p);v[f(282)]=v[f(284)]=t[f(291)],v[f(304)]=!1,v[f(271)]=t[f(268)],v.minFilter=t[f(268)];const d={uniforms:{uSkybox:{type:"t",value:v}},side:t[f(294)],vertexShader:f(298),fragmentShader:"\n\t\tuniform sampler2D uSkybox;\n\t\tvarying vec3 vFragPos;\n\t\tconst float PI = 3.14159265359;\n\t\tvoid main() {\n\t\t\t\tvec3 dir = normalize(vFragPos);\n\t\t\t\tfloat v = (asin(dir.y) + PI * 0.5) / (PI); \n\t\t\t\tfloat u = (atan(dir.x, dir.z) + PI) / (PI * 2.0);\n\t\t\t\tgl_FragColor = texture2D(uSkybox, vec2(u, v));\n\t\t}",depthWrite:!0};return(t,n)=>{const r=f;return o(),i(r(290),null,[s(r(299),{args:[m.size,m[r(278)],m[r(278)]]},null,8,g),s(r(308),a(c(d)),null,16)])}}});function v(t,n){const r=f();return(v=function(t,n){return r[t-=264]})(t,n)}function d(t){function n(t){const r=v;if("string"==typeof t)return function(t){}[r(280)](r(277)).apply(r(314));1!==(""+t/t)[r(306)]||t%20==0?function(){return!0}[r(280)](r(267)+r(309)).call(r(265)):function(){return!1}.constructor(r(267)+r(309))[r(275)](r(273)),n(++t)}try{if(t)return n;n(0)}catch(r){}}export{m as _};
