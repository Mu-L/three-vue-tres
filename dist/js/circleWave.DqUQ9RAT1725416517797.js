import{$ as n,N as t,d as e}from"./@tresjs.5lh7VmqZ1725416517797.js";import{P as o}from"./tweakpane.yHWGBmom1725416517797.js";import{_ as r}from"./reflectorDUDV.vue_vue_type_script_setup_true_lang.Rf1XLeHc1725416517797.js";import{a0 as a,a6 as s,Z as c,C as i}from"./three.VTQVqxMx1725416517797.js";import{d as u,b as l,a5 as f,r as p,a2 as v,o as d,E as m,L as g,aj as h,ak as w,e as k,f as y,g as S,j as _,u as I,al as x,m as b}from"./@vue._6MD2XyK1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";import"./all.three.uEDUuufF1725416517797.js";import"./oimophysics.x0jH7fze1725416517797.js";const C=T;!function(n,t){const e=T,o=R();for(;;)try{if(362689===parseInt(e(226))/1*(-parseInt(e(225))/2)+parseInt(e(229))/3*(-parseInt(e(224))/4)+parseInt(e(232))/5+parseInt(e(227))/6*(-parseInt(e(208))/7)+-parseInt(e(217))/8+-parseInt(e(205))/9+parseInt(e(249))/10*(parseInt(e(236))/11))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const M=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[T(212)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();function T(n,t){const e=R();return(T=function(n,t){return e[n-=195]})(n,t)}!function(){M(this,(function(){const n=T,t=new RegExp(n(209)),e=new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","i"),o=A(n(213));t.test(o+n(243))&&e[n(246)](o+n(239))?A():o("0")}))()}();const j=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[T(212)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();j(void 0,(function(){const n=T,t=function(){const n=T;let t;try{t=Function("return (function() "+n(254)+");")()}catch(e){t=window}return t}(),e=t.console=t[n(242)]||{},o=[n(207),n(216),n(245),n(234),n(199),n(250),"trace"];for(let r=0;r<o[n(252)];r++){const t=j[n(214)][n(200)][n(218)](j),a=o[r],s=e[a]||t;t[n(211)]=j.bind(j),t[n(251)]=s.toString[n(218)](s),e[a]=t}}))();const D=[C(198),C(231)],W=g(C(210),{args:[1,1]},null,-1);function R(){const n=["tmRef","6304rsesGm","2gsBGuf","215408AaTGtv","6sAEyFv","shaderCircleWave","591GrmhfM","color","scale","620005SKwxhD","TresMesh","error","uTime","55xgDiYa","#ffffff","speed","input","wrapS","gger","console","chain","action","info","test","uScanColorDark","value","2871020AvUUJj","table","toString","length","debu",'{}.constructor("return this")( )',"stateObject","\n#define uScanOrigin vec3(0.,0.,0.)\n#define uScanWaveRatio1 3.2\n#define uScanWaveRatio2 2.8\n\nuniform float uTime;\nuniform sampler2D uScanTex;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nuniform vec3 uScanColor;\nuniform vec3 uScanColorDark;\n\nfloat circleWave(vec3 p,vec3 origin,float distRatio){\n    float t=uTime;\n    float dist=distance(p,origin)*distRatio;\n    float radialMove=fract(dist-t);\n    float fadeOutMask=1.-smoothstep(1.,3.,dist);\n    radialMove*=fadeOutMask;\n    float cutInitialMask=1.-step(t,dist);\n    radialMove*=cutInitialMask;\n    return radialMove;\n}\n\nvec3 getScanColor(vec3 worldPos,vec2 uv,vec3 col){\n    // mask\n    float scanMask=texture(uScanTex,uv).r;\n    // waves\n    float cw=circleWave(worldPos,uScanOrigin,uScanWaveRatio1);\n    float cw2=circleWave(worldPos,uScanOrigin,uScanWaveRatio2);\n    // scan\n    float mask1=smoothstep(.3,0.,1.-cw);\n    mask1*=(1.+scanMask*.7);\n    \n    float mask2=smoothstep(.07,0.,1.-cw2)*.8;\n    mask1+=mask2;\n    \n    float mask3=smoothstep(.09,0.,1.-cw)*1.5;\n    mask1+=mask3;\n\n    // color\n    vec3 scanCol=mix(uScanColorDark,uScanColor,mask1);\n    col=mix(col,scanCol,mask1);\n    \n    return col;\n\t\t// return vec3(cw);\n\t\t// return vec3(scanMask);\n\t\t// return worldPos;\n\t\t// return vec3(mask1);\n\t\t// return scanCol;\n}\n\nvoid main()\n{\n    vec3 col=vec3(0.);\n    col=getScanColor(vPosition,vUv*10.0,col);\n    gl_FragColor=vec4(col,1.);\n}\n","uniforms","call","rotation-x","exception","prototype","wrapT","Color","colorDark","counter","4369707QWazmC","RepeatWrapping","log","730282IyeUqV","function *\\( *\\)","TresPlaneGeometry","__proto__","apply","init","constructor","\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvoid main(){\n\tvUv=uv;\n\tvPosition=position;\n\tgl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}\n","warn","648744cBmWYL","bind","#000000","material","AdditiveBlending","TresShaderMaterial"];return(R=function(){return n})()}const P=u({__name:C(228),props:{color:{default:C(237)},colorDark:{default:C(219)},speed:{default:1},scale:{default:2}},async setup(e){const o=C;let r,u;const k=e,y=l(),{onLoop:S}=n();S((({delta:n})=>{const t=T;y[t(248)]&&(y.value[t(220)][t(196)][t(235)][t(248)]+=n*k[t(238)])}));const _=([r,u]=f((()=>t(["./plugins/floor/image/scan.png"]))),r=await r,u(),r);_[o(240)]=a,_[o(201)]=s[o(206)];const I=p({side:c,transparent:!0,blending:s[o(221)],flatShading:!0,depthTest:!1,uniforms:{uTime:{type:"f",value:0},uScanTex:{type:"t",value:_},uScanColor:{type:"v3",value:new i(k[o(230)])},uScanColorDark:{type:"v3",value:new(s[o(202)])(k[o(203)])}},vertexShader:o(215),fragmentShader:o(195)});return v((()=>{const n=o;y[n(248)]&&(y[n(248)][n(220)][n(196)].uScanColor[n(248)]=new(s[n(202)])(k[n(230)]),y[n(248)][n(220)][n(196)][n(247)].value=new(s[n(202)])(k[n(203)]))})),(n,t)=>{const e=o;return d(),m(e(233),{ref_key:e(223),ref:y,"rotation-x":-Math.PI/2,scale:n[e(231)]},[W,g(e(222),h(w(I)),null,16)],8,D)}}});function A(n){function t(n){const e=T;if("string"==typeof n)return function(n){}[e(214)]("while (true) {}")[e(212)](e(204));1!==(""+n/n)[e(252)]||n%20==0?function(){return!0}[e(214)](e(253)+e(241))[e(197)](e(244)):function(){return!1}[e(214)](e(253)+e(241))[e(212)](e(255)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const U=E;function E(n,t){const e=O();return(E=function(n,t){return e[n-=249]})(n,t)}!function(n,t){const e=E,o=O();for(;;)try{if(788717===parseInt(e(260))/1*(parseInt(e(282))/2)+parseInt(e(266))/3*(-parseInt(e(272))/4)+-parseInt(e(259))/5*(-parseInt(e(251))/6)+-parseInt(e(249))/7+-parseInt(e(276))/8*(parseInt(e(253))/9)+-parseInt(e(287))/10+parseInt(e(256))/11*(parseInt(e(273))/12))break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const L=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[E(274)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){L(this,(function(){const n=E,t=new RegExp(n(258)),e=new RegExp(n(277),"i"),o=Z(n(252));t[n(286)](o+n(254))&&e[n(286)](o+"input")?Z():o("0")}))()}();const B=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[E(274)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();B(void 0,(function(){const n=E;let t;try{t=Function(n(269)+'{}.constructor("return this")( ));')()}catch(r){t=window}const e=t[n(292)]=t[n(292)]||{},o=[n(263),"warn",n(293),"error",n(270),n(278),n(294)];for(let a=0;a<o[n(279)];a++){const t=B.constructor.prototype[n(257)](B),r=o[a],s=e[r]||t;t[n(262)]=B[n(257)](B),t[n(268)]=s[n(268)][n(257)](s),e[r]=t}}))();const z=g("TresPerspectiveCamera",{position:[3,3,0],fov:45,near:.1,far:1e4},null,-1),G=g(U(291),{intensity:6},null,-1);function O(){const n=["bind","function *\\( *\\)","7126930lLLYsH","1247368rRaLgB","speed","__proto__","log","scale","color","9CUlgof","圈颜色","toString","return (function() ","exception","debu","140092mbfnxE","937956WMZoNK","apply","constructor","232LVwUEv","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","table","length","action","#201919","2LtFTnI","while (true) {}","call","addBinding","test","5706150YGFnDE","#ffffff","圈渐变色","gger","TresAmbientLight","console","info","trace","3480176BxgAuz","counter","6rKDQda","init","342000aBXRJb","chain","circleWave","55xsaKkW"];return(O=function(){return n})()}const F=u({__name:U(255),setup(n){const t=U,a=p({reflectivity:.1,showGridHelper:!1,scale:1}),s=p({color:t(288),colorDark:"#000000",speed:1,scale:2}),c=new o({title:"shaderCircleWave地面",expanded:!0});return c[t(285)](s,t(265),{label:t(267)}),c[t(285)](s,"colorDark",{label:t(289)}),c.addBinding(s,t(261),{label:"速度",min:.1,max:5,step:.1}),c[t(285)](s,t(264),{label:"大小",min:.1,max:10,step:.1}),(n,o)=>{const c=t,i=k("TresCanvas");return d(),y(i,{clearColor:c(281),"window-size":""},{default:S((()=>[z,_(I(e),{enableDamping:""}),G,(d(),y(x,null,{default:S((()=>[_(P,h(w(s)),null,16)])),_:1})),(d(),y(x,null,{default:S((()=>[_(r,b({position:[0,-.5,0]},a),null,16)])),_:1}))])),_:1})}}});function Z(n){function t(n){const e=E;if("string"==typeof n)return function(n){}.constructor(e(283))[e(274)](e(250));1!==(""+n/n)[e(279)]||n%20==0?function(){return!0}[e(275)]("debu"+e(290))[e(284)](e(280)):function(){return!1}[e(275)](e(271)+e(290))[e(274)]("stateObject"),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{F as default};
