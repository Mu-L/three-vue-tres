import{_ as t,m as n}from"./gl-matrix.oVMHBNGj1721048663624.js";import{i as e,r,d as o}from"./ice-utils.9Bso220k1721048663624.js";import{d as i,q as a,o as c,D as u}from"./@vue.ApkyOKE71721048663624.js";const s=T;!function(t,n){const e=T,r=l();for(;;)try{if(502593===parseInt(e(247))/1+parseInt(e(240))/2+-parseInt(e(234))/3+parseInt(e(277))/4*(parseInt(e(261))/5)+parseInt(e(218))/6*(-parseInt(e(236))/7)+-parseInt(e(264))/8*(parseInt(e(260))/9)+parseInt(e(192))/10*(parseInt(e(250))/11))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const f=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[T(228)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){f(this,(function(){const t=T,n=new RegExp(t(186)),e=new RegExp(t(246),"i"),r=p("init");n[t(210)](r+t(270))&&e[t(210)](r+t(196))?p():r("0")}))()}();const _=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[T(228)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function l(){const t=["height","error","return (function() ","RGBA","UNSIGNED_BYTE","multiply","TEXTURE_2D","vertexAttribPointer","apply","NEAREST","clearColor","getUniformLocation","log","texParameteri","1461765FkwViq","action","180929Mryidc","bindTexture","clientWidth","counter","663026ocHyju","mat4","webgl","canvaswebgl","DEPTH_TEST","length","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","365293llhxod","constructor","TRIANGLES","13618eARctj",'{}.constructor("return this")( )',"a_texcoord","DEPTH_BUFFER_BIT","viewport","__proto__","while (true) {}","call","stateObject","trace","9rtDkHR","105GlrKBW","querySelector","\nattribute vec4 a_position;\nattribute vec2 a_texcoord;\nuniform mat4 u_matrix;\nvarying vec2 v_texcoord;\nvoid main() {\n  gl_Position = u_matrix * a_position;\n  v_texcoord = a_texcoord;\n}","1366784yreZCv","drawArrays","500px","string","toString","pixelStorei","chain","TEXTURE_WRAP_T","enableVertexAttribArray","STATIC_DRAW","#canvaswebgl","enable","getContext","65820QuBwDp","texImage2D","ARRAY_BUFFER","clear","COLOR_ATTACHMENT0","bufferData","LINEAR","function *\\( *\\)","create","exception","bindFramebuffer","createBuffer","uniform1i","3670wUzCjt","COLOR_BUFFER_BIT","uniformMatrix4fv","debu","input","useProgram","TEXTURE_WRAP_S","bind","gger","bindBuffer","getAttribLocation","u_texture","FRAMEBUFFER","perspective","framebufferTexture2D","CLAMP_TO_EDGE","clientHeight","lookAt","test","console","createTexture","CULL_FACE","width","table","canvas","rotate","78qoQLNu","u_matrix"];return(l=function(){return t})()}_(void 0,(function(){const t=T,n=function(){const t=T;let n;try{n=Function(t(222)+t(251)+");")()}catch(e){n=window}return n}(),e=n[t(211)]=n[t(211)]||{},r=[t(232),"warn","info",t(221),t(188),t(215),t(259)];for(let o=0;o<r.length;o++){const n=_.constructor.prototype[t(199)](_),i=r[o],a=e[i]||n;n[t(255)]=_[t(199)](_),n[t(268)]=a[t(268)].bind(a),e[i]=n}}))();const E={id:s(243),style:{height:"500px",width:s(266)}};function T(t,n){const e=l();return(T=function(t,n){return e[t-=185]})(t,n)}const A=s(263),R=i({__name:"webglFrameBuffer",setup(i){const s=function(){const i=T,a=document[i(262)](i(274)),c=null==a?void 0:a[i(276)](i(242));if(!c)return;var u=e(c,A,"\nprecision mediump float;\nvarying vec2 v_texcoord;\nuniform sampler2D u_texture;\nvoid main(){\n\tgl_FragColor=texture2D(u_texture, v_texcoord.xy);\n}\n"),s=c[i(202)](u,"a_position"),f=c[i(202)](u,i(252)),_=c[i(231)](u,i(219)),l=c[i(231)](u,i(203)),E=c.createBuffer();c[i(201)](c[i(279)],E),function(t){const n=T;var e=new Float32Array([-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,.5,.5,.5,.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,.5,.5,.5,-.5,.5,.5,.5]);t[n(282)](t[n(279)],e,t[n(273)])}(c);var R=c[i(190)]();c[i(201)](c.ARRAY_BUFFER,R),function(t){const n=T;t[n(282)](t[n(279)],new Float32Array([0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,1,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,1,0,0,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,1,0,0,1,1,1]),t[n(273)])}(c);var p=c[i(212)]();c.bindTexture(c[i(226)],p);{const t=0,n=c.RGBA,e=1,r=1,o=0,a=c[i(223)],u=c.UNSIGNED_BYTE,s=new Uint8Array([255,255,0,255]),f=1;c[i(269)](c.UNPACK_ALIGNMENT,f),c.texImage2D(c[i(226)],t,n,e,r,o,a,u,s),c[i(233)](c[i(226)],c.TEXTURE_MIN_FILTER,c.NEAREST),c[i(233)](c[i(226)],c.TEXTURE_MAG_FILTER,c[i(229)]),c.texParameteri(c[i(226)],c[i(198)],c[i(207)]),c[i(233)](c[i(226)],c.TEXTURE_WRAP_T,c[i(207)])}const m=c[i(212)]();c[i(237)](c[i(226)],m);{const t=0,n=c[i(223)],e=0,r=c.RGBA,o=c[i(224)],a=null;c[i(278)](c[i(226)],t,n,256,256,e,r,o,a),c[i(233)](c[i(226)],c.TEXTURE_MIN_FILTER,c[i(185)]),c[i(233)](c[i(226)],c.TEXTURE_WRAP_S,c[i(207)]),c.texParameteri(c[i(226)],c[i(271)],c[i(207)])}const x=c.createFramebuffer();c[i(189)](c[i(204)],x);const F=c[i(281)];c[i(206)](c[i(204)],F,c[i(226)],m,0);var v=o(0),d=0;function b(e){const r=i;c[r(197)](u),c.enableVertexAttribArray(s),c.bindBuffer(c[r(279)],E);var o=3,a=c.FLOAT,T=!1,A=0,p=0;c[r(227)](s,o,a,T,A,p),c[r(272)](f),c[r(201)](c.ARRAY_BUFFER,R);o=2,a=c.FLOAT,T=!1,A=0,p=0;c.vertexAttribPointer(f,o,a,T,A,p);var m=t[r(241)].create();t[r(241)][r(205)](m,-30,e,.1,1e4);let x=t[r(241)][r(187)]();x=t[r(241)][r(217)](x,x,v,[0,1,0]);var F=t[r(241)].create();n[r(209)](F,[0,0,2],[0,0,0],[0,1,0]);let d=t[r(241)][r(187)]();t[r(241)][r(225)](d,F,x);var b=t[r(241)][r(187)]();t[r(241)].multiply(b,m,d),c[r(194)](_,!1,b),c[r(191)](l,0),c[r(265)](c[r(249)],0,36)}requestAnimationFrame((function t(n){const e=i;var o=(n*=.001)-d;d=n,v+=-.4*o,r(c[e(216)]),c[e(275)](c[e(213)]),c.enable(c[e(244)]);c.bindFramebuffer(c[e(204)],x),c[e(237)](c[e(226)],p),c[e(254)](0,0,256,256),c[e(230)](0,1,0,1),c.clear(c.COLOR_BUFFER_BIT|c[e(253)]);b(1);c[e(189)](c.FRAMEBUFFER,null),c[e(237)](c[e(226)],m),c[e(254)](0,0,c[e(216)][e(214)],c[e(216)][e(220)]),c[e(230)](1,1,1,1),c[e(280)](c[e(193)]|c.DEPTH_BUFFER_BIT);b(c.canvas[e(238)]/c[e(216)][e(208)]);requestAnimationFrame(t)}))};return a((()=>{s()})),(t,n)=>(c(),u("canvas",E))}});function p(t){function n(t){const e=T;if(typeof t===e(267))return function(t){}[e(248)](e(256))[e(228)](e(239));1!==(""+t/t)[e(245)]||t%20==0?function(){return!0}[e(248)]("debu"+e(200))[e(257)](e(235)):function(){return!1}.constructor(e(195)+"gger")[e(228)](e(258)),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{R as default};
