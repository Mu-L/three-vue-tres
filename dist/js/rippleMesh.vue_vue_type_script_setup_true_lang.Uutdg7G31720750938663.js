import{a5 as n,C as t}from"./three.c_4mN3mZ1720750938663.js";import{r as e}from"./@tresjs.toBU36DO1720750938663.js";import{g as o}from"./utils.w2KUWsKA1720750938663.js";import{d as r,b as i,a2 as s,o as a,D as c,J as u,u as f,aj as l,ak as p}from"./@vue.ApkyOKE71720750938663.js";const v=g;!function(n,t){const e=g,o=y();for(;;)try{if(326400===parseInt(e(199))/1+-parseInt(e(212))/2*(parseInt(e(241))/3)+parseInt(e(196))/4*(-parseInt(e(242))/5)+parseInt(e(207))/6*(-parseInt(e(221))/7)+-parseInt(e(235))/8*(parseInt(e(201))/9)+-parseInt(e(243))/10*(-parseInt(e(229))/11)+parseInt(e(238))/12)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const m=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[g(225)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){m(this,(function(){const n=g,t=new RegExp(n(197)),e=new RegExp(n(200),"i"),o=w(n(231));t.test(o+n(204))&&e.test(o+n(250))?w():o("0")}))()}();const d=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[g(225)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();d(void 0,(function(){const n=g;let t;try{t=Function(n(248)+'{}.constructor("return this")( ));')()}catch(r){t=window}const e=t.console=t[n(240)]||{},o=[n(226),n(227),"info",n(205),n(208),"table","trace"];for(let i=0;i<o.length;i++){const t=d[n(211)][n(209)][n(203)](d),r=o[i],s=e[r]||t;t[n(228)]=d[n(203)](d),t[n(236)]=s[n(236)][n(203)](s),e[r]=t}}))();const h=[v(224),"uv"];function y(){const n=["error","gger","504LLARjW","exception","prototype","call","constructor","16FLlEnZ","height","ShaderChunk","Color","tresMeshRef","num","TresMesh","\n}\n","speed","12901boqAVX","time","action","position","apply","log","warn","__proto__","1364341cbpuHR","uvs","init","fog_pars_vertex","debu","stateObject","2162512YfmfkJ","toString","color","1894692jshwbE","fog_vertex","console","25041WRYPfH","55085kPfXxi","40dPOaIW","length","TresBufferGeometry","set","DoubleSide","return (function() ","pv2","input","uniforms","value","rippleMesh","\n  precision lowp float;\n  precision lowp int;\n  uniform float time;\n  uniform float opacity;\n  uniform vec3 color;\n  uniform float num;\n  uniform float speed;\n  varying vec2 vUv;\n  void main() {\n    vec4 fragColor = vec4(0.);\n    float sin = sin((vUv.y - time * speed) * 10. * num);\n    float high = 0.92;\n    float medium = 0.4;\n    if (sin > high) {\n      fragColor = vec4(mix(vec3(.8, 1., 1.), color, (1. - sin) / (1. - high)), 1.);\n    } else if(sin > medium) {\n      fragColor = vec4(color, mix(1., 0., 1.-(sin - medium) / (high - medium)));\n    } else {\n      fragColor = vec4(color, 0.);\n    }\n    vec3 fade = mix(color, vec3(0., 0., 0.), vUv.y);\n    fragColor = mix(fragColor, vec4(fade, 1.), 0.85);\n    gl_FragColor = vec4(fragColor.rgb, fragColor.a * opacity * (1. - vUv.y));\n  }\n\t","counter","44aCfHXD","function *\\( *\\)","opacity","285474XzLYzz","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","9rWDsHs","TresShaderMaterial","bind","chain"];return(y=function(){return n})()}function g(n,t){const e=y();return(g=function(n,t){return e[n-=191]})(n,t)}const x=r({__name:v(193),props:{positionSrc:{default:[{x:0,y:0},{x:10,y:10}]},color:{default:"#ffff00"},opacity:{default:.8},height:{default:100},num:{default:8},speed:{default:.15}},setup(r){const m=v,d=r,y=i(),g={side:n[m(247)],transparent:!0,depthWrite:!1,depthTest:!0,vertexShader:"\nprecision lowp float;\nprecision lowp int;\n"+n[m(214)][m(232)]+"\nvarying vec2 vUv;\nvoid main() {\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    "+n[m(214)][m(239)]+m(219),fragmentShader:m(194),uniforms:{time:{type:m(249),value:0},color:{type:m(230),value:new t(d[m(237)])},opacity:{type:m(249),value:d[m(198)]},num:{type:m(249),value:d.num},speed:{type:m(249),value:d.speed}}};let x=null,w=null;const{centerPoint:_,points:C}=o(d.positionSrc);!function(n=[],t){const e=m,o=[],r=[];for(let i=0,s=o[e(244)],a=r[e(244)];i<n[e(244)]-1;i++){let e=1,c=n[i],u=n[i+1];o[s++]=c.x,o[s++]=0,o[s++]=c.y,r[a++]=0,r[a++]=0,o[s++]=u.x,o[s++]=0,o[s++]=u.y,r[a++]=1,r[a++]=0,o[s++]=c.x,o[s++]=t,o[s++]=c.y,r[a++]=0,r[a++]=e,o[s++]=c.x,o[s++]=t,o[s++]=c.y,r[a++]=0,r[a++]=e,o[s++]=u.x,o[s++]=0,o[s++]=u.y,r[a++]=1,r[a++]=0,o[s++]=u.x,o[s++]=t,o[s++]=u.y,r[a++]=1,r[a++]=e}x=new Float32Array(o),w=new Float32Array(r)}(C,d[m(213)]);const{onLoop:I}=e();return I((({delta:n})=>{const t=m;g.uniforms[t(222)][t(192)]+=n})),s((()=>{const t=m;d[t(237)]&&(g[t(191)][t(237)].value=new(n[t(215)])(d[t(237)])),d[t(198)]&&(g[t(191)][t(198)][t(192)]=d[t(198)]),d[t(217)]&&(g.uniforms[t(217)][t(192)]=d[t(217)]),d[t(220)]&&(g[t(191)].speed.value=d[t(220)]),y.value&&y[t(192)].position[t(246)](_.x,y[t(192)][t(224)].y,_.y)})),(n,t)=>{const e=m;return a(),c(e(218),{renderOrder:2200,ref_key:e(216),ref:y},[u(e(245),{position:[f(x),3],uv:[f(w),2]},null,8,h),u(e(202),l(p(g)),null,16)],512)}}});function w(n){function t(n){const e=g;if("string"==typeof n)return function(n){}.constructor("while (true) {}")[e(225)](e(195));1!==(""+n/n)[e(244)]||n%20==0?function(){return!0}[e(211)](e(233)+e(206))[e(210)](e(223)):function(){return!1}[e(211)](e(233)+e(206))[e(225)](e(234)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{x as _};
