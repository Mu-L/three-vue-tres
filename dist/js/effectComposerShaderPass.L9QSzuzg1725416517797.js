import{p as n,$ as t,d as e}from"./@tresjs.5lh7VmqZ1725416517797.js";import{bW as r,bX as o,a6 as s,bY as u,c6 as c}from"./three.VTQVqxMx1725416517797.js";import{d as a,b as i,a2 as l,o as f,E as p,L as h,F as d,e as g,f as m,g as v,j as y,u as w}from"./@vue._6MD2XyK1725416517797.js";import"./tweakpane.yHWGBmom1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";const b=I;!function(n,t){const e=I,r=S();for(;;)try{if(986022===-parseInt(e(501))/1+-parseInt(e(509))/2+-parseInt(e(510))/3*(-parseInt(e(457))/4)+parseInt(e(491))/5*(-parseInt(e(458))/6)+parseInt(e(485))/7+-parseInt(e(466))/8+-parseInt(e(465))/9*(-parseInt(e(478))/10))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const x=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[I(464)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){x(this,(function(){const n=I,t=new RegExp(n(503)),e=new RegExp(n(499),"i"),r=B("init");t[n(455)](r+n(463))&&e.test(r+n(502))?B():r("0")}))()}();const _=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[I(464)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();function I(n,t){const e=S();return(I=function(n,t){return e[n-=454]})(n,t)}_(void 0,(function(){const n=I;let t;try{t=Function('return (function() {}.constructor("return this")( ));')()}catch(o){t=window}const e=t[n(497)]=t[n(497)]||{},r=[n(481),n(467),n(500),n(469),n(505),n(504),n(460)];for(let s=0;s<r.length;s++){const t=_.constructor[n(480)][n(496)](_),o=r[s],u=e[o]||t;t[n(507)]=_[n(496)](_),t.toString=u[n(483)][n(496)](u),e[o]=t}}))();const T=[h(b(470),{args:[1,1,1]},null,-1),h("TresMeshNormalMaterial",null,null,-1)],j=[h(b(470),{args:[1,1,1]},null,-1),h(b(477),null,null,-1)];function S(){const n=["width","counter","strength","renderToScreen","TresMeshNormalMaterial","1102430rtWBqP","clearDepth","prototype","log","baseTexture","toString","\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n        ","1789683JGhXik","radius","stateObject","call","set","debu","20OaioXB","constructor","ShaderMaterial","ecLayerShaderPass","gger","bind","console","clear","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","info","886443BpGunB","input","function *\\( *\\)","table","exception","Vector2","__proto__","needsSwap","3423330UrLnBg","123LQDmXw","layers","addPass","render","length","test","\n            uniform sampler2D baseTexture;\n            uniform sampler2D bloomTexture;\n            varying vec2 vUv;\n            void main() {\n                gl_FragColor = ( vec4( 1.0 ) *texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );\n            }\n        ","166476NgoHNB","2268972ffSSUe","TresMesh","trace","while (true) {}","value","chain","apply","414Rpaysb","15491584aNjnlo","warn","renderTarget2","error","TresBoxGeometry","threshold","string"];return(S=function(){return n})()}const M=a({__name:b(494),setup(e){const a=i(),g=i(),{camera:m,renderer:v,scene:y,sizes:w}=n(),b={strength:.572,radius:.51,threshold:0};let x=null,_=null,S=null;l((()=>{const n=I;a[n(462)]&&a[n(462)][n(511)].set(0),g[n(462)]&&g[n(462)][n(511)][n(489)](1),w[n(473)][n(462)]&&(((n,t,e,c,a)=>{const i=I;x=new r(n,t);const l=new o(new(s[i(506)])(c,a),b[i(475)],b[i(486)],b[i(471)]);_=new u(e),_[i(476)]=!1,_.addPass(x),_[i(512)](l)})(y[n(462)],m[n(462)],v.value,w[n(473)][n(462)],w.height[n(462)]),(n=>{const t=I;S=new u(n);const e=new(s[t(493)])({uniforms:{baseTexture:{value:null},bloomTexture:{value:_[t(468)].texture}},vertexShader:t(484),fragmentShader:t(456),defines:{}}),r=new c(e,t(482));r[t(508)]=!0,S[t(512)](x),S.addPass(r)})(v[n(462)]))}));const{onLoop:M}=t();return M((()=>{const n=I;_&&S&&m[n(462)]&&(v[n(462)][n(498)](),m[n(462)].layers[n(489)](1),_[n(513)](),v[n(462)][n(479)](),m.value.layers[n(489)](0),S.render(y[n(462)],m[n(462)]))})),(n,t)=>{const e=I;return f(),p(d,null,[h(e(459),{ref_key:"normalBox",ref:a,position:[3,2,1]},T,512),h(e(459),{ref_key:"shineBox",ref:g,position:[0,2,-4]},j,512)],64)}}});function B(n){function t(n){const e=I;if(typeof n===e(472))return function(n){}[e(492)](e(461)).apply(e(474));1!==(""+n/n)[e(454)]||n%20==0?function(){return!0}[e(492)](e(490)+"gger")[e(488)]("action"):function(){return!1}[e(492)](e(490)+e(495))[e(464)](e(487)),t(++n)}try{if(n)return t;t(0)}catch(e){}}const k=z;!function(n,t){const e=z,r=N();for(;;)try{if(671319===parseInt(e(425))/1+-parseInt(e(422))/2+parseInt(e(428))/3+-parseInt(e(406))/4*(parseInt(e(404))/5)+parseInt(e(419))/6+-parseInt(e(402))/7+parseInt(e(397))/8)break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const P=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e.apply(t,arguments);return e=null,n}}:function(){};return n=!1,r}}();!function(){P(this,(function(){const n=z,t=new RegExp("function *\\( *\\)"),e=new RegExp(n(417),"i"),r=A(n(411));t[n(401)](r+n(429))&&e[n(401)](r+"input")?A():r("0")}))()}();const U=function(){let n=!0;return function(t,e){const r=n?function(){if(e){const n=e[z(423)](t,arguments);return e=null,n}}:function(){};return n=!1,r}}();function z(n,t){const e=N();return(z=function(n,t){return e[n-=388]})(n,t)}function N(){const n=["240558MMnyZG","TresAmbientLight","while (true) {}","1641996XUJVck","apply","exception","96323pGtQdp","context","prototype","3410628fasrzq","chain","renderer","toString","trace","console","stateObject",'{}.constructor("return this")( )',"debu","length","counter","10542504nnOmhI","TresPerspectiveCamera","return (function() ","warn","test","2899813QmcYfN","TresCanvas","3422645fKqNle","gger","4pVKBhQ","info","autoClear","tcRef","__proto__","init","constructor","value","bind","call","log","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","error"];return(N=function(){return n})()}U(void 0,(function(){const n=z;let t;try{t=Function(n(399)+n(393)+");")()}catch(o){t=window}const e=t[n(391)]=t[n(391)]||{},r=[n(416),n(400),n(407),n(418),n(424),"table",n(390)];for(let s=0;s<r[n(395)];s++){const t=U.constructor[n(427)][n(414)](U),o=r[s],u=e[o]||t;t[n(410)]=U[n(414)](U),t[n(389)]=u[n(389)][n(414)](u),e[o]=t}}))();const D=h(k(398),{position:[10,10,10]},null,-1),G=h(k(420),{intensity:1},null,-1),L=h("TresGridHelper",{args:[10,10]},null,-1),R=a({__name:"effectComposerShaderPass",setup(n){const t=i();return l((()=>{const n=z;if(t[n(413)]){t[n(413)][n(426)][n(388)].value[n(408)]=!1}})),(n,r)=>{const o=z,s=g(o(403));return f(),m(s,{renderMode:"manual","window-size":"",ref_key:o(409),ref:t},{default:v((()=>[D,G,y(w(e)),L,y(M)])),_:1},512)}}});function A(n){function t(n){const e=z;if("string"==typeof n)return function(n){}[e(412)](e(421)).apply(e(396));1!==(""+n/n)[e(395)]||n%20==0?function(){return!0}[e(412)]("debu"+e(405))[e(415)]("action"):function(){return!1}[e(412)](e(394)+e(405))[e(423)](e(392)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{R as default};
