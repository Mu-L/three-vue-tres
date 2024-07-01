import{b as n}from"./pagesShow.vue_vue_type_script_setup_true_lang.AbQGR5j71719803971187.js";import{bY as t,a5 as e,bW as o,c5 as r,cf as i}from"./three.BsQyBKrV1719803971187.js";import{a as s,r as u}from"./@tresjs.rn1P_YDI1719803971187.js";import{d as a,a2 as c,r as l,o as p,f,g as d,j as v,aj as m,ak as h}from"./@vue.CpOXM7bB1719803971187.js";import{P}from"./tweakpane.qqn77PB81719803971187.js";import"./three-custom-shader-material.rzwTEM2R1719803971187.js";import"./object-hash.4kGk0kP-1719803971187.js";import"./@amap.cIAWtN1R1719803971187.js";import"./jszip.Q9Kx2fWV1719803971187.js";import"./glsl-tokenizer.m00Vcg5f1719803971187.js";import"./glsl-token-string.vSzYTBTq1719803971187.js";import"./glsl-token-functions.HqnkbJtH1719803971187.js";import"./@vueuse.T5wlwfAk1719803971187.js";const x=S;!function(n,t){const e=S,o=j();for(;;)try{if(743887===parseInt(e(196))/1+-parseInt(e(182))/2*(-parseInt(e(206))/3)+parseInt(e(203))/4*(-parseInt(e(221))/5)+-parseInt(e(175))/6*(-parseInt(e(219))/7)+-parseInt(e(174))/8*(parseInt(e(216))/9)+-parseInt(e(189))/10*(-parseInt(e(177))/11)+parseInt(e(209))/12*(parseInt(e(171))/13))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const w=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[S(220)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){w(this,(function(){const n=S,t=new RegExp(n(192)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=y(n(185));t[n(194)](o+n(211))&&e[n(194)](o+n(227))?y():o("0")}))()}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[S(220)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function S(n,t){const e=j();return(S=function(n,t){return e[n-=169]})(n,t)}g(void 0,(function(){const n=S;let t;try{t=Function(n(180)+n(186)+");")()}catch(r){t=window}const e=t[n(183)]=t[n(183)]||{},o=[n(178),n(188),"info",n(207),n(181),n(208),n(229)];for(let i=0;i<o.length;i++){const t=g[n(173)][n(215)][n(172)](g),r=o[i],s=e[r]||t;t[n(212)]=g[n(172)](g),t[n(222)]=s[n(222)][n(172)](s),e[r]=t}}))();const b=a({__name:x(179),props:{color:{default:x(223)},uScalenum:{default:150},uScaleone:{default:24},uWidth:{default:1},speed:{default:1},uPosition:{default:{x:0,y:0}}},setup(n){const a=n,{renderer:l,scene:p,camera:f,sizes:d}=s();let v,m=0,h=null,P=null;c((()=>{const n=S;d[n(184)][n(202)]&&(v=d[n(184)].value,m=d[n(169)][n(202)],(()=>{const n=S;h=new t(l[n(202)]);const s=new(e[n(170)])(v,m);h.readBuffer[n(210)]=!0,h[n(195)].depthTexture=s;const u=new o(p.value,f[n(202)]);h.addPass(u),P=new r(new(e[n(197)])({uniforms:{time:{value:0},tDiffuse:{value:null},depthTexture:{value:s},uProjectionInverse:{value:f.value[n(224)]},uMatrixWorld:{value:f[n(202)].matrixWorld},uColor:{value:new(e[n(225)])(a.color)},uScalenum:{value:a[n(198)]},uScaleone:{value:a.uScaleone},uWidth:{value:a[n(228)]},uPosition:{value:new(e[n(199)])(a[n(217)].x,a[n(217)].y)}},vertexShader:"varying vec2 vUv;\nvarying vec3 vPosition;\n\nvoid main(){\n\tvUv=uv;\n\tvPosition=position;\n\tgl_Position=vec4(position,1.);\n}\n",fragmentShader:"varying vec2 vUv;\nvarying vec3 vPosition;\nuniform sampler2D tDiffuse;\nuniform sampler2D depthTexture;\n\nuniform mat4 uProjectionInverse;\nuniform mat4 uMatrixWorld;\n\nuniform float time;\nuniform vec3 uColor;\nuniform float uScalenum;//最大范围\nuniform float uScaleone;//单条圈间距\nuniform float uWidth;//单条厚度\nuniform vec2 uPosition;//位置\n\nvec3 WorldPosFromDepth(float depth){\n\tfloat z=(depth-.5)*2.;\n\tvec4 clipSpacePosition=vec4(vPosition.xy,z,1.);\n\tvec4 viewSpacePosition=uProjectionInverse*clipSpacePosition;\n\tviewSpacePosition/=viewSpacePosition.w;\n\tvec4 worldSpacePosition=uMatrixWorld*viewSpacePosition;\n\treturn worldSpacePosition.xyz;\n}\nvec3 WorldPosFromDepth2(float depth){\n\t// 规范化设备坐标系 ndc (Normalized Device Coordinates)\n\tvec4 ndc=vec4(vPosition.x,vPosition.y,((depth-.5)*2.),1.);\n\t// 根据视图中的位置和深度逆向MVP (ModelViewProjectionMatrix) 以获取真实渲染的位置\n\tvec4 worldSpacePosition=uMatrixWorld*uProjectionInverse*ndc;\n\t// 由于透视相机视图区域是一个截锥体 在乘以矩阵后，结果不在同一个射影空间上（这意味着 w 分量不是每个顶点的 1）\n\t// 为了完成转换，我们需要将向量的每个分量除以 w 分量本身\n\t// 这一步正常渲染时在GPU中做 我们复原需要手动处理\n\tworldSpacePosition/=worldSpacePosition.w;\n\treturn worldSpacePosition.xyz;\n}\n\nvoid main(){\n\tvec4 base=texture2D(tDiffuse,vUv);//之前的纹理\n\tfloat depth=texture2D(depthTexture,vUv).r;\n\t\n\t// vec3 pos=WorldPosFromDepth(depth);\n\tvec3 pos=WorldPosFromDepth2(depth);\n\tpos.x=pos.x+uPosition.x;\n\tpos.z=pos.z+uPosition.y;\n\tfloat dis=distance(pos.xz,vec2(0,0));\n\tvec3 color=vec3(base);\n\tif(pos.y<=0.){\n\t\tdiscard;\n\t}\n\tif(dis<uScalenum){\n\t\tvec3 scanT=uColor;\n\t\tfloat wave=fract((dis-time*10.)/uScaleone);\n\t\tif(wave<uWidth){\n\t\t\tfloat p=wave/uWidth;\n\t\t\tcolor=mix(color,scanT+.1,p*(1.-(dis/uScalenum)));\n\t\t}\n\t}\n\tgl_FragColor=vec4(color,1.);\n}\n"})),h[n(214)](P);const c=new r(i);h.addPass(c)})())}));const{onLoop:x}=u();return x((({elapsed:n})=>{const t=S;h&&(h[t(191)](),P[t(226)].time[t(202)]+=a[t(187)]/60)})),c((()=>{const n=S;P&&(a[n(204)]&&(P.material[n(226)][n(200)].value=new(e[n(225)])(a[n(204)])),a.uScalenum&&(P[n(201)][n(226)][n(198)].value=a.uScalenum),a[n(218)]&&(P[n(201)].uniforms[n(218)][n(202)]=a[n(218)]),a.uWidth&&(P.material[n(226)][n(228)][n(202)]=a[n(228)]),a[n(217)]&&P[n(201)][n(226)][n(217)][n(202)].set(a[n(217)].x,a.uPosition.y))})),(n,t)=>null}});function y(n){function t(n){const e=S;if(typeof n===e(205))return function(n){}[e(173)]("while (true) {}").apply("counter");1!==(""+n/n).length||n%20==0?function(){return!0}[e(173)]("debu"+e(193))[e(190)]("action"):function(){return!1}.constructor(e(213)+"gger")[e(220)](e(176)),t(++n)}try{if(n)return t;t(0)}catch(e){}}function j(){const n=["uScalenum","Vector2","uColor","material","value","576992dfKjCX","color","string","3tZyITd","error","table","3456fqgJFP","depthBuffer","chain","__proto__","debu","addPass","prototype","9cDTPxD","uPosition","uScaleone","15869msdsAf","apply","5UJGnLl","toString","#FFF","projectionMatrixInverse","Color","uniforms","input","uWidth","trace","height","DepthTexture","26182ZAJSil","bind","constructor","10004584YJQdbo","2070oPvPxO","stateObject","858198CqmXRU","log","buildingsPassA","return (function() ","exception","794510sRWvTC","console","width","init",'{}.constructor("return this")( )',"speed","warn","30rgBDej","call","render","function *\\( *\\)","gger","test","readBuffer","145252PmlMGK","ShaderMaterial"];return(j=function(){return n})()}function I(){const n=["counter","#00b4fb","11740088ABuyES","uWidth","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","action","23FOGlqs","length","call","trace","buildingsPassA","prototype","warn","单条圈宽度","inline","init","1797675PHZrhi","stateObject","test","803810DtduXE","addBinding","46792DlpMeJ","23541690ZkBZgY","log","exception","9hiOYFl","6oTbtmh","return (function() ","error","input","toString","5209008XkCTcb","gger",'{}.constructor("return this")( )',"bind","uPosition","string","chain","constructor","debu","__proto__","speed","apply","2821107EFhCri"];return(I=function(){return n})()}const _=z;!function(n,t){const e=z,o=I();for(;;)try{if(796246===parseInt(e(319))/1*(-parseInt(e(334))/2)+-parseInt(e(312))/3+-parseInt(e(344))/4+-parseInt(e(329))/5+parseInt(e(339))/6*(parseInt(e(332))/7)+parseInt(e(315))/8+-parseInt(e(338))/9*(-parseInt(e(335))/10))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const W=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(311)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){W(this,(function(){const n=z,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(317),"i"),o=T(n(328));t[n(331)](o+n(350))&&e[n(331)](o+n(342))?T():o("0")}))()}();const D=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[z(311)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function z(n,t){const e=I();return(z=function(n,t){return e[n-=310]})(n,t)}D(void 0,(function(){const n=z,t=function(){const n=z;let t;try{t=Function(n(340)+n(346)+");")()}catch(e){t=window}return t}(),e=t.console=t.console||{},o=[n(336),n(325),"info",n(341),n(337),"table",n(322)];for(let r=0;r<o[n(320)];r++){const t=D[n(351)][n(324)][n(347)](D),i=o[r],s=e[i]||t;t[n(353)]=D[n(347)](D),t[n(343)]=s[n(343)][n(347)](s),e[i]=t}}))();const F=a({__name:_(323),setup(t){const e=_,o=l({color:e(314),uScalenum:250,uScaleone:82,uWidth:.2,speed:10,uPosition:{x:0,y:0}}),r=new P({title:"后期效果",expanded:!0});return r[e(333)](o,"color",{label:"圈颜色"}),r[e(333)](o,"uScalenum",{label:"最大范围",min:1,max:500,step:10}),r.addBinding(o,"uScaleone",{label:"单条圈间距",min:1,max:100,step:1}),r.addBinding(o,e(316),{label:e(326),min:0,max:1,step:.01}),r[e(333)](o,e(310),{label:"速度",min:1,max:20,step:1}),r[e(333)](o,e(348),{picker:e(327),label:"位置",expanded:!0,x:{min:-1e3,max:1e3,step:10},y:{min:-1e3,max:1e3,step:10}}),(t,e)=>(p(),f(n,{disableRender:!0,showAxesHelper:!1},{ability:d((()=>[v(b,m(h(o)),null,16)])),_:1}))}});function T(n){function t(n){const e=z;if(typeof n===e(349))return function(n){}[e(351)]("while (true) {}").apply(e(313));1!==(""+n/n)[e(320)]||n%20==0?function(){return!0}[e(351)](e(352)+e(345))[e(321)](e(318)):function(){return!1}[e(351)](e(352)+e(345))[e(311)](e(330)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{F as default};
