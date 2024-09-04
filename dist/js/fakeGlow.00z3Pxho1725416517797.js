import{d as n,H as t}from"./@tresjs.5lh7VmqZ1725416517797.js";import{k as o,bj as e,C as r,aN as i,Z as a,x as s,q as l,a6 as c,A as u}from"./three.VTQVqxMx1725416517797.js";import{P as f}from"./tweakpane.yHWGBmom1725416517797.js";import{d as p,r as g,a2 as d,e as v,o as m,f as w,g as h,j as y,u as b,L as I,al as x}from"./@vue._6MD2XyK1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";function j(){var n=["info","516893nybTrT","apply","gger","glowSharpness","console","function *\\( *\\)","constructor","action","stateObject","counter","bind","__proto__","#00d5ff","falloff","blendMode","side","prototype","829653oAAXEs","warn","call","input","return (function() ","6ZjSNTK","trace","glowInternalRadius","setValues","glowColor","2xJfNvA","length","string","3108292OOBKIt","chain","debu","vertexShader","\n      uniform vec3 glowColor;\n      uniform float falloff;\n      uniform float glowSharpness;\n      uniform float glowInternalRadius;\n      uniform float opacity;\n\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main()\n      {\n        // Normal\n        vec3 normal = normalize(vNormal);\n        if(!gl_FrontFacing)\n            normal *= - 1.0;\n        vec3 viewDirection = normalize(cameraPosition - vPosition);\n        float fresnel = dot(viewDirection, normal);\n        fresnel = pow(fresnel, glowInternalRadius + 0.1);\n        float falloff = smoothstep(0., falloff, fresnel);\n        float fakeGlow = fresnel;\n        fakeGlow += fresnel * glowSharpness;\n        fakeGlow *= falloff;\n        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));\n\n        #include <tonemapping_fragment>\n        #include <colorspace_fragment>\n      } \n      ","init","blending","140LgiQzQ","6150963rKyLPG","while (true) {}","toString","transparent","uniforms","2386200yPRGMo","9508617mmBsRd","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","depthTest",'{}.constructor("return this")( )',"test"];return(j=function(){return n})()}!function(n,t){for(var o=P,e=j();;)try{if(459680===parseInt(o(168))/1*(-parseInt(o(195))/2)+-parseInt(o(185))/3+parseInt(o(198))/4+-parseInt(o(205))/5+parseInt(o(190))/6*(-parseInt(o(206))/7)+parseInt(o(161))/8+parseInt(o(162))/9)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();var _=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[P(169)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){_(this,(function(){var n=P,t=new RegExp(n(173)),o=new RegExp(n(163),"i"),e=R(n(203));t[n(166)](e+n(199))&&o.test(e+n(188))?R():e("0")}))()}();var S=function(){var n=!0;return function(t,o){var e=n?function(){if(o){var n=o[P(169)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();S(void 0,(function(){for(var n=P,t=function(){var n,t=P;try{n=Function(t(189)+t(165)+");")()}catch(o){n=window}return n}(),o=t[n(172)]=t[n(172)]||{},e=["log",n(186),n(167),"error","exception","table",n(191)],r=0;r<e[n(196)];r++){var i=S[n(174)][n(184)][n(178)](S),a=e[r],s=o[a]||i;i[n(179)]=S[n(178)](S),i[n(208)]=s[n(208)][n(178)](s),o[a]=i}}))();const T=class extends o{constructor(n={}){var t=P;super(),this[t(201)]="\n      varying vec3 vPosition;\n      varying vec3 vNormal;\n\n      void main() {\n        vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * viewMatrix * modelPosition;\n        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);\n        vPosition = modelPosition.xyz;\n        vNormal = modelNormal.xyz;\n\n      }\n    ",this.fragmentShader=t(202),this[t(160)]={opacity:new e(void 0!==n.opacity?n.opacity:1),glowInternalRadius:new e(void 0!==n[t(192)]?n.glowInternalRadius:6),glowSharpness:new e(void 0!==n[t(171)]?n.glowSharpness:.5),falloff:new e(void 0!==n[t(181)]?n.falloff:.1),glowColor:new e(void 0!==n[t(194)]?new r(n[t(194)]):new r(t(180)))},this[t(193)](n),this[t(164)]=void 0!==n[t(164)]&&n[t(164)],this[t(204)]=void 0!==n[t(182)]?n[t(182)]:i,this[t(209)]=!0,this[t(183)]=void 0!==n.side?n.side:a}};function P(n,t){var o=j();return(P=function(n,t){return o[n-=160]})(n,t)}function R(n){function t(n){var o=P;if(typeof n===o(197))return function(n){}[o(174)](o(207))[o(169)](o(177));1!==(""+n/n)[o(196)]||n%20==0?function(){return!0}[o(174)](o(200)+o(170))[o(187)](o(175)):function(){return!1}[o(174)](o(200)+"gger")[o(169)](o(176)),t(++n)}try{if(n)return t;t(0)}catch(o){}}const k=z;function z(n,t){const o=Z();return(z=function(n,t){return o[n-=190]})(n,t)}!function(n,t){const o=z,e=Z();for(;;)try{if(694157===parseInt(o(194))/1*(parseInt(o(256))/2)+parseInt(o(192))/3*(-parseInt(o(236))/4)+parseInt(o(243))/5+-parseInt(o(209))/6+-parseInt(o(230))/7*(parseInt(o(215))/8)+-parseInt(o(193))/9+parseInt(o(231))/10)break;e.push(e.shift())}catch(r){e.push(e.shift())}}();const C=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[z(246)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();!function(){C(this,(function(){const n=z,t=new RegExp(n(235)),o=new RegExp(n(216),"i"),e=D("init");t[n(238)](e+n(240))&&o[n(238)](e+n(220))?D():e("0")}))()}();const G=function(){let n=!0;return function(t,o){const e=n?function(){if(o){const n=o[z(246)](t,arguments);return o=null,n}}:function(){};return n=!1,e}}();G(void 0,(function(){const n=z,t=function(){const n=z;let t;try{t=Function(n(248)+n(190)+");")()}catch(o){t=window}return t}(),o=t[n(219)]=t.console||{},e=["log",n(203),n(255),n(222),n(254),"table","trace"];for(let r=0;r<e.length;r++){const t=G.constructor.prototype[n(249)](G),i=e[r],a=o[i]||t;t[n(214)]=G[n(249)](G),t[n(251)]=a[n(251)].bind(a),o[i]=t}}))();const A=I(k(247),{position:[0,25,25],near:.1,fov:65},null,-1),N=I("TresAmbientLight",{intensity:1.5},null,-1),M=I(k(245),{position:[100,100,60],intensity:20},null,-1),F=I(k(202),{args:[20,10]},null,-1),E={position:[0,6,0]},K=I(k(207),null,[I(k(250),{args:[4,.5,128,128]}),I(k(206),{color:"blue",roughness:.2,clearcoat:1})],-1),L=[k(225)];function Z(){const n=["TresTorusKnotGeometry","toString","Color","glowInternalRadius","exception","info","6HXAoFT","value","TresCanvas",'{}.constructor("return this")( )',"falloff","154107UJYHpp","1754910btPofn","219039drMWAE","neg-x.jpg","https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/images/skyBox/6jpg/","pos-y.jpg","内半径","glowSharpness","#a058c1","side","TresGridHelper","warn","length","stateObject","TresMeshPhysicalMaterial","TresMesh","TorusKnotGeometry","3871320sFSOvj","counter","primitive","neg-z.jpg","FrontSide","__proto__","8pPxbTK","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","pos-z.jpg","清晰度","console","input","debu","error","gger","TresGroup","object","addBinding","string","DoubleSide","glowColor","9042887Jhszvq","28279270usYaGC","uniforms","call","constructor","function *\\( *\\)","88bNQglj","while (true) {}","test","neg-y.jpg","chain","材质面","action","2356410kaypLp","opacity","TresDirectionalLight","apply","TresPerspectiveCamera","return (function() ","bind"];return(Z=function(){return n})()}const B=p({__name:"fakeGlow",setup(o){const e=k,r=new f({title:"辉光参数",expanded:!0}),i=g({glowColor:e(200),falloff:1.4,glowInternalRadius:3.7,glowSharpness:0,opacity:1,side:s,depthTest:!1}),a=new T,p=new l(new(c[e(208)])(4,3.8,128,128),a);return r[e(226)](i,e(229),{label:"颜色"}),r[e(226)](i,"falloff",{label:"衰减",min:0,max:10,step:.1}),r[e(226)](i,e(253),{label:e(198),min:-5,max:5,step:.1}),r[e(226)](i,e(199),{label:e(218),min:0,max:10,step:.1}),r[e(226)](i,e(244),{label:"透明",min:0,max:1,step:.1}),r[e(226)](i,e(201),{label:e(241),options:{FrontSide:c[e(213)],BackSide:u,DoubleSide:c[e(228)]}}),d((()=>{const n=e;a[n(232)][n(191)].value=i[n(191)],a[n(232)][n(229)][n(257)]=new(c[n(252)])(i[n(229)]),a.uniforms[n(253)][n(257)]=i.glowInternalRadius,a[n(232)][n(199)][n(257)]=i[n(199)],a.uniforms.opacity[n(257)]=i[n(244)],a.side=i[n(201)]})),(o,r)=>{const i=e,a=v(i(258));return m(),w(a,{"window-size":""},{default:h((()=>[A,N,M,y(b(n),{autoRotate:""}),F,I(i(224),E,[K,I(i(211),{object:b(p)},null,8,L)]),(m(),w(x,null,{default:h((()=>[y(b(t),{files:["pos-x.jpg",i(195),i(197),i(239),i(217),i(212)],path:i(196)})])),_:1}))])),_:1})}}});function D(n){function t(n){const o=z;if(typeof n===o(227))return function(n){}[o(234)](o(237))[o(246)](o(210));1!==(""+n/n)[o(204)]||n%20==0?function(){return!0}[o(234)](o(221)+o(223))[o(233)](o(242)):function(){return!1}[o(234)](o(221)+o(223))[o(246)](o(205)),t(++n)}try{if(n)return t;t(0)}catch(o){}}export{B as default};
