var t=Object.defineProperty,e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,r=(e,n,i)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,a=(t,a)=>{for(var o in a||(a={}))n.call(a,o)&&r(t,o,a[o]);if(e)for(var o of e(a))i.call(a,o)&&r(t,o,a[o]);return t};import"./reflectorDiffuse.vue_vue_type_script_setup_true_lang.ssr8PtJY1721048663624.js";import"./reflectorDUDV.vue_vue_type_script_setup_true_lang.V9wWavgb1721048663624.js";import"./reflectorShaderMesh.vue_vue_type_script_setup_true_lang.5DNz-lxG1721048663624.js";import{j as o,U as s,C as l,k as c,W as u,ba as p,h as f,a5 as x,V as v,aj as m}from"./three.HEgnMaTu1721048663624.js";import{a as h,r as w}from"./@tresjs.Xiq_TH801721048663624.js";import{u as g}from"./index.3f2gHe7y1721048663624.js";import{F as d,C as y}from"./three-stdlib.Bcxn6yVp1721048663624.js";import{d as S}from"./@vue.ApkyOKE71721048663624.js";import"./whiteFloorMesh.vue_vue_type_script_setup_true_lang.yyF0hivw1721048663624.js";import"./gridPlusCom.vue_vue_type_script_setup_true_lang.p7_2B-jb1721048663624.js";import"./videoFloor.vue_vue_type_script_setup_true_lang.L9CntHVE1721048663624.js";function P(){const t=["exception",'\n\n\t// Without original size argument for power of two targets\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level ) {\n\n\t\t// the fraction of the uv space used by the target mip\n\t\tfloat targetSubview = 1.0 / pow( 2.0, float( level ) );\n\t\tfloat widthRatio = 2.0 / 3.0;\n\t\tvec2 scaledDimensions = vec2( targetSubview * widthRatio, targetSubview );\n\n\t\t// all levels > 0 are on the right third of the texture\n\t\t// y is offset from the bottom\n\t\tvec2 offset = vec2(\n\t\t\tlevel > 0 ? widthRatio : 0.0,\n\t\t\tlevel > 0 ? targetSubview : 0.0\n\t\t);\n\n\t\tvec2 samplePoint = mix( offset, offset + scaledDimensions, uv );\n\t\treturn texture2D( tex, samplePoint );\n\n\t}\n\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level ) {\n\n\t\tfloat ratio = mod( level, 1.0 );\n\t\tint minLevel = int( floor( level ) );\n\t\tint maxLevel = int( ceil( level ) );\n\n\t\tvec4 minValue = packedTexture2DLOD( tex, uv, minLevel );\n\t\tvec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel );\n\n\t\treturn mix( minValue, maxValue, ratio );\n\n\t}\n\n\t// With original size argument\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {\n\n\t\tfloat floatLevel = float( level );\n\t\tvec2 atlasSize;\n\t\tatlasSize.x = floor( originalPixelSize.x * 1.5 );\n\t\tatlasSize.y = originalPixelSize.y;\n\n\t\t// we stop making mip maps when one dimension == 1\n\t\tfloat maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );\n\t\tfloatLevel = min( floatLevel, maxLevel );\n\n\t\t// use inverse pow of 2 to simulate right bit shift operator\n\t\tvec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );\n\t\tvec2 pixelOffset = vec2(\n\t\t\tfloatLevel > 0.0 ? originalPixelSize.x : 0.0,\n\t\t\tfloatLevel > 0.0 ? currentPixelDimensions.y : 0.0\n\t\t);\n\n\t\t// "minPixel / atlasSize" samples the top left piece of the first pixel\n\t\t// "maxPixel / atlasSize" samples the bottom right piece of the last pixel\n\t\tvec2 minPixel = pixelOffset;\n\t\tvec2 maxPixel = pixelOffset + currentPixelDimensions;\n\t\tvec2 samplePoint = mix( minPixel, maxPixel, uv );\n\t\tsamplePoint /= atlasSize;\n\n\t\tvec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );\n\t\tsamplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );\n\t\tsamplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );\n\n\t\treturn texture2D( tex, samplePoint );\n\n\t}\n\n\tvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level, vec2 originalPixelSize ) {\n\n\t\tfloat ratio = mod( level, 1.0 );\n\t\tint minLevel = int( floor( level ) );\n\t\tint maxLevel = int( ceil( level ) );\n\n\t\tvec4 minValue = packedTexture2DLOD( tex, uv, minLevel, originalPixelSize );\n\t\tvec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel, originalPixelSize );\n\n\t\treturn mix( minValue, maxValue, ratio );\n\n\t}\n\n',"test","6036QJPFsY","log","input","toString","warn","trace","table","gger","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","1687otXmdG","1981944NZGTEO","bind","counter","length","1223850hMQyRM","114516rowzpF","160445tvNrAO","action","info","call",'{}.constructor("return this")( )',"8ZJmmzi","init","293622fUVBHU","__proto__","constructor","while (true) {}","12TCwmOc","console","apply","50424oNOdRD","debu"];return(P=function(){return t})()}const z=b;!function(t,e){const n=b,i=P();for(;;)try{if(191779===parseInt(n(358))/1+-parseInt(n(366))/2+-parseInt(n(338))/3+-parseInt(n(335))/4*(-parseInt(n(359))/5)+-parseInt(n(343))/6*(-parseInt(n(352))/7)+parseInt(n(364))/8*(-parseInt(n(353))/9)+parseInt(n(357))/10)break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const _=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[b(337)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function b(t,e){const n=P();return(b=function(t,e){return n[t-=334]})(t,e)}!function(){_(this,(function(){const t=b,e=new RegExp("function *\\( *\\)"),n=new RegExp(t(351),"i"),i=A(t(365));e[t(342)](i+"chain")&&n[t(342)](i+t(345))?A():i("0")}))()}();const I=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[b(337)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();I(void 0,(function(){const t=b,e=function(){const t=b;let e;try{e=Function("return (function() "+t(363)+");")()}catch(n){e=window}return e}(),n=e[t(336)]=e[t(336)]||{},i=[t(344),t(347),t(361),"error",t(340),t(349),t(348)];for(let r=0;r<i[t(356)];r++){const e=I[t(368)].prototype.bind(I),a=i[r],o=n[a]||e;e[t(367)]=I[t(354)](I),e[t(346)]=o[t(346)][t(354)](o),n[a]=e}}))();const M=z(341);function A(t){function e(t){const n=b;if("string"==typeof t)return function(t){}[n(368)](n(334))[n(337)](n(355));1!==(""+t/t).length||t%20==0?function(){return!0}[n(368)](n(339)+n(350))[n(362)](n(360)):function(){return!1}[n(368)]("debu"+n(350))[n(337)]("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}function E(t,e){const n=L();return(E=function(t,e){return n[t-=157]})(t,e)}const D=E;function L(){const t=["__proto__","4473sxNSMN","function *\\( *\\)","constructor","3000550PmdVqA","error","toString","798321JVARzn","4436179UPQkjW","input",'{}.constructor("return this")( )',"defines","length","apply","action","726GYqLJX","206109FezBnL","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","bind","chain","12488qMpyFb","\n\t\tvarying vec2 vUv;\n\t\tvoid main() {\n\n\t\t\t#include <begin_vertex>\n\t\t\t#include <project_vertex>\n\t\t\tvUv = uv;\n\n\t\t}\n\t","1211756JXvLeD","10sRWJNh","table","debu","test","prototype","exception","1120qFDJNx","\n\t\tvarying vec2 vUv;\n\t\tuniform sampler2D map;\n\t\tuniform int parentLevel;\n\t\tuniform vec2 parentMapSize;\n\t\tuniform vec2 originalMapSize;\n\n\t\t","console","gger","return (function() ","trace","string","clone","log","call","2czCooS"];return(L=function(){return t})()}!function(t,e){const n=E,i=L();for(;;)try{if(331564===-parseInt(n(191))/1*(-parseInt(n(174))/2)+-parseInt(n(182))/3+parseInt(n(157))/4+-parseInt(n(179))/5+parseInt(n(190))/6*(parseInt(n(195))/7)+-parseInt(n(164))/8*(-parseInt(n(176))/9)+-parseInt(n(158))/10*(-parseInt(n(183))/11))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const U=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[E(188)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){U(this,(function(){const t=E,e=new RegExp(t(177)),n=new RegExp(t(192),"i"),i=V("init");e[t(161)](i+t(194))&&n[t(161)](i+t(184))?V():i("0")}))()}();const T=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[E(188)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function j(t){const e=E,n=a({},t);return e(186)in t&&(n[e(186)]=a({},t.defines)),"uniforms"in t&&(n.uniforms=s[e(171)](t.uniforms)),n}T(void 0,(function(){const t=E;let e;try{e=Function(t(168)+t(185)+");")()}catch(r){e=window}const n=e[t(166)]=e[t(166)]||{},i=[t(172),"warn","info",t(180),t(163),t(159),t(169)];for(let a=0;a<i[t(187)];a++){const e=T[t(178)][t(162)].bind(T),r=i[a],o=n[r]||e;e[t(175)]=T[t(193)](T),e[t(181)]=o.toString.bind(o),n[r]=e}}))();const O={defines:{X_IS_EVEN:1,Y_IS_EVEN:1},uniforms:{map:{value:null},originalMapSize:{value:new o},parentMapSize:{value:new o},parentLevel:{value:0}},vertexShader:D(196),fragmentShader:D(165)+M+"\n\n\t\t#if X_IS_EVEN && Y_IS_EVEN\n\n\t\t#define SAMPLES 4\n\t\t#define WIDTH 2\n\t\t#define HEIGHT 2\n\n\t\t#elif X_IS_EVEN\n\n\t\t#define SAMPLES 6\n\t\t#define WIDTH 2\n\t\t#define HEIGHT 3\n\n\t\t#elif Y_IS_EVEN\n\n\t\t#define SAMPLES 6\n\t\t#define WIDTH 3\n\t\t#define HEIGHT 2\n\n\t\t#else\n\n\t\t#define SAMPLES 9\n\t\t#define WIDTH 3\n\t\t#define HEIGHT 3\n\n\t\t#endif\n\n\t\tvec4 sampleAt( vec2 uv ) {\n\n\t\t\treturn packedTexture2DLOD( map, uv, parentLevel, originalMapSize );\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvec2 childMapSize = parentMapSize / 2.0;\n\t\t\t// vec2 childPixelSize = 1.0 / childMapSize;\n\t\t\t// vec2 halfChildPixelSize = childPixelSize / 2.0;\n\t\t\tvec2 childPixelPos = floor( vUv * childMapSize );\n\n\t\t\tvec2 parentPixelSize = 1.0 / parentMapSize;\n\t\t\tvec2 halfParentPixelSize = parentPixelSize / 2.0;\n\t\t\tvec2 parentPixelPos = childPixelPos * 2.0;\n\n\t\t\tvec2 baseUv = ( parentPixelPos / parentMapSize ) + halfParentPixelSize;\n\n\t\t\tvec4 samples[ SAMPLES ];\n\t\t\tfloat weights[ SAMPLES ];\n\n\t\t\t#if X_IS_EVEN && Y_IS_EVEN\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = 0.25;\n\t\t\tweights[ 1 ] = 0.25;\n\t\t\tweights[ 2 ] = 0.25;\n\t\t\tweights[ 3 ] = 0.25;\n\n\t\t\t#elif X_IS_EVEN\n\n\t\t\tfloat wx0 = 0.5;\n\t\t\tfloat wx1 = 0.5;\n\n\t\t\tfloat yden = 2.0 * parentMapSize.y + 1.0;\n\t\t\tfloat wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;\n\t\t\tfloat wy1 = ( parentMapSize.y ) / yden;\n\t\t\tfloat wy2 = ( parentPixelPos.y + 1.0 ) / yden;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\n\t\t\tweights[ 2 ] = wx0 * wy1;\n\t\t\tweights[ 3 ] = wx1 * wy1;\n\n\t\t\tweights[ 4 ] = wx0 * wy2;\n\t\t\tweights[ 5 ] = wx1 * wy2;\n\n\t\t\t#elif Y_IS_EVEN\n\n\t\t\tfloat xden = 2.0 * parentMapSize.x + 1.0;\n\t\t\tfloat wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;\n\t\t\tfloat wx1 = ( parentMapSize.x ) / xden;\n\t\t\tfloat wx2 = ( parentPixelPos.x + 1.0 ) / xden;\n\n\t\t\tfloat wy0 = 0.5;\n\t\t\tfloat wy1 = 0.5;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\t\t\tweights[ 2 ] = wx2 * wy0;\n\n\t\t\tweights[ 3 ] = wx0 * wy1;\n\t\t\tweights[ 4 ] = wx1 * wy1;\n\t\t\tweights[ 5 ] = wx2 * wy1;\n\n\t\t\t#else\n\n\t\t\tfloat xden = 2.0 * parentMapSize.x + 1.0;\n\t\t\tfloat wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;\n\t\t\tfloat wx1 = ( parentMapSize.x ) / xden;\n\t\t\tfloat wx2 = ( parentPixelPos.x + 1.0 ) / xden;\n\n\t\t\tfloat yden = 2.0 * parentMapSize.y + 1.0;\n\t\t\tfloat wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;\n\t\t\tfloat wy1 = ( parentMapSize.y ) / yden;\n\t\t\tfloat wy2 = ( parentPixelPos.y + 1.0 ) / yden;\n\n\t\t\tsamples[ 0 ] = sampleAt( baseUv );\n\t\t\tsamples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n\t\t\tsamples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );\n\n\t\t\tsamples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n\t\t\tsamples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n\t\t\tsamples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );\n\n\t\t\tsamples[ 6 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 7 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\t\t\tsamples[ 8 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\n\t\t\tweights[ 0 ] = wx0 * wy0;\n\t\t\tweights[ 1 ] = wx1 * wy0;\n\t\t\tweights[ 2 ] = wx2 * wy0;\n\n\t\t\tweights[ 3 ] = wx0 * wy1;\n\t\t\tweights[ 4 ] = wx1 * wy1;\n\t\t\tweights[ 5 ] = wx2 * wy1;\n\n\t\t\tweights[ 6 ] = wx0 * wy2;\n\t\t\tweights[ 7 ] = wx1 * wy2;\n\t\t\tweights[ 8 ] = wx2 * wy2;\n\n\t\t\t#endif\n\n\t\t\t<mipmap_logic>\n\n\t\t}\n\t"};function V(t){function e(t){const n=E;if(typeof t===n(170))return function(t){}.constructor("while (true) {}")[n(188)]("counter");1!==(""+t/t).length||t%20==0?function(){return!0}[n(178)](n(160)+n(167))[n(173)](n(189)):function(){return!1}.constructor(n(160)+n(167))[n(188)]("stateObject"),e(++t)}try{if(t)return e;e(0)}catch(n){}}const N=k;!function(t,e){const n=k,i=H();for(;;)try{if(430798===-parseInt(n(273))/1+parseInt(n(283))/2+-parseInt(n(305))/3+-parseInt(n(284))/4*(parseInt(n(307))/5)+parseInt(n(330))/6*(parseInt(n(288))/7)+parseInt(n(282))/8*(-parseInt(n(310))/9)+parseInt(n(312))/10*(parseInt(n(303))/11))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const R=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[k(278)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){R(this,(function(){const t=k,e=new RegExp(t(263)),n=new RegExp(t(256),"i"),i=X(t(293));e[t(319)](i+t(258))&&n.test(i+"input")?X():i("0")}))()}();const C=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,i}}();C(void 0,(function(){const t=k;let e;try{e=Function("return (function() "+t(280)+");")()}catch(r){e=window}const n=e[t(299)]=e.console||{},i=[t(313),t(322),t(272),"error",t(270),t(269),t(267)];for(let a=0;a<i[t(259)];a++){const e=C.constructor[t(308)].bind(C),r=i[a],o=n[r]||e;e[t(301)]=C[t(277)](C),e[t(289)]=o.toString[t(277)](o),n[r]=e}}))();const F=new l;function k(t,e){const n=H();return(k=function(t,e){return n[t-=256]})(t,e)}class W{constructor(t){const e=k;!t&&(t="\n\n\t\t\t\t#pragma unroll_loop\n\t\t\t\tfor ( int i = 0; i < SAMPLES; i ++ ) {\n\n\t\t\t\t\tgl_FragColor += samples[ i ] * weights[ i ];\n\n\t\t\t\t}\n\n\t\t\t");const n=j(O);n[e(262)]=n[e(262)][e(321)](/<mipmap_logic>/g,t);const i=new Array(4);i[0]=new c(j(n)),i[0].defines.X_IS_EVEN=0,i[0].defines[e(295)]=0,i[1]=new c(j(n)),i[1][e(326)][e(324)]=1,i[1].defines[e(295)]=0,i[2]=new c(j(n)),i[2][e(326)][e(324)]=0,i[2][e(326)][e(295)]=1,i[3]=new c(j(n)),i[3][e(326)][e(324)]=1,i[3].defines[e(295)]=1;const r=new u;r.texture[e(291)]=p,r[e(318)].magFilter=p,this[e(304)]=r,this[e(281)]=new d(new c(y)),this[e(309)]=new d(null),this._mipMaterials=i}update(t,e,n,i=!1){const r=k;t.isWebGLRenderTarget&&(t=t.texture);const o=n.autoClear,s=n[r(290)](),l=n[r(292)]();n[r(298)](F);const c=this[r(281)],u=this._mipQuad,p=this._swapTarget,x=this[r(294)];let v,m;i?(v=f[r(287)](t[r(297)].width),m=f[r(287)](t.image.height)):(v=Math[r(328)](t[r(297)][r(257)]),m=Math.floor(t[r(297)][r(261)]));const h=Math[r(328)](1.5*v),w=Math[r(328)](m);e[r(311)](h,w),p[r(318)][r(314)]!==e.texture.type?(p[r(320)](),p[r(315)](e),p[r(318)][r(297)]=a({},p[r(318)].image)):p.setSize(h,w),n[r(329)]=!1,n[r(276)](0),n[r(260)](),c[r(300)].uniforms[r(279)][r(317)]=t,c[r(275)][r(306)](v,m,0,0,h,w),n[r(286)](e),n.clear(),c[r(316)](n),n.setRenderTarget(p),n.clear(),c[r(316)](n);let g=v,d=m,y=0;for(;g>1&&d>1;){const t=x[(g%2==0?1:0)|(d%2==0?2:0)];t[r(265)][r(268)][r(317)]=p[r(318)],t[r(265)][r(271)][r(317)]=y,t.uniforms.parentMapSize.value[r(296)](g,d),t[r(265)][r(327)].value.set(v,m),u[r(300)]=t,g=Math[r(328)](g/2),d=Math[r(328)](d/2);const i=w-2*d;n.setRenderTarget(e),u[r(275)][r(306)](g,d,-v,-i,h,w),u.render(n),n[r(286)](p),t[r(265)][r(268)][r(317)]=e[r(318)],u[r(316)](n),y++}return n.setRenderTarget(l),n[r(260)](s),n[r(276)](F),n.autoClear=o,y+1}[N(320)](){const t=N;this[t(304)][t(320)](),this[t(309)].dispose(),this[t(281)].dispose(),this[t(294)][t(323)]((t=>t.dispose()))}}function H(){const t=["__proto__","debu","242JNZKUy","_swapTarget","293787aKJCDS","setViewOffset","10935bsdUyM","prototype","_mipQuad","2979ZbmBaD","setSize","513680YhYMbc","log","type","copy","render","value","texture","test","dispose","replace","warn","forEach","X_IS_EVEN","constructor","defines","originalMapSize","floor","autoClear","6bMiXKJ","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","width","chain","length","setClearAlpha","height","fragmentShader","function *\\( *\\)","gger","uniforms","counter","trace","map","table","exception","parentLevel","info","428793WPanTm","call","camera","setClearColor","bind","apply","tDiffuse",'{}.constructor("return this")( )',"_copyQuad","16064eIzPVL","979676uaMQgH","1228CtJHUe","stateObject","setRenderTarget","floorPowerOfTwo","4715501wyGuHh","toString","getClearAlpha","minFilter","getRenderTarget","init","_mipMaterials","Y_IS_EVEN","set","image","getClearColor","console","material"];return(H=function(){return t})()}function X(t){function e(t){const n=k;if("string"==typeof t)return function(t){}[n(325)]("while (true) {}")[n(278)](n(266));1!==(""+t/t)[n(259)]||t%20==0?function(){return!0}[n(325)](n(302)+n(264))[n(274)]("action"):function(){return!1}[n(325)](n(302)+n(264))[n(278)](n(285)),e(++t)}try{if(t)return e;e(0)}catch(n){}}!function(t,e){const n=G,i=Q();for(;;)try{if(707815===-parseInt(n(355))/1+parseInt(n(339))/2+parseInt(n(404))/3*(parseInt(n(357))/4)+parseInt(n(374))/5+-parseInt(n(358))/6+-parseInt(n(401))/7*(parseInt(n(386))/8)+parseInt(n(392))/9)break;i.push(i.shift())}catch(r){i.push(i.shift())}}();const Z=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n[G(352)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){Z(this,(function(){const t=G,e=new RegExp(t(372)),n=new RegExp(t(334),"i"),i=$("init");e.test(i+t(344))&&n[t(384)](i+t(388))?$():i("0")}))()}();const J=function(){let t=!0;return function(e,n){const i=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function Q(){const t=["212132FCeAFU","3539508VyNwzK","render","gger","Vector4","multiply","dot","sign","applyMatrix4","constructor","value","parent","visible","depth","setRenderTarget","function *\\( *\\)","getWorldPosition","2611660liNSin","length","matrixWorldInverse","stateObject","info","table","set","log","__proto__","bind","test","Matrix4","4168XAgFbl","state","input",'{}.constructor("return this")( )',"forEach","elements","9697041IwTaNo","counter","normal","multiplyScalar","buffers","return (function() ","toString","clear","sub","13153aguzwZ","prototype","negate","45Mcaoip","ignoreObjects","projectPoint","while (true) {}","debu","trace","PerspectiveCamera","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","exception","console","matrixWorld","add","2389376GXBvkl","Quaternion","constant","Plane","reflect","chain","projectionMatrix","call","UnsignedByteType","copy","Vector3","resolution","position","apply","getRenderTarget","getWorldQuaternion","1313272ItKtFg","string"];return(Q=function(){return t})()}J(void 0,(function(){const t=G;let e;try{e=Function(t(397)+t(389)+");")()}catch(r){e=window}const n=e[t(336)]=e[t(336)]||{},i=[t(381),"warn",t(378),"error",t(335),t(379),t(332)];for(let a=0;a<i[t(375)];a++){const e=J[t(366)][t(402)].bind(J),r=i[a],o=n[r]||e;e[t(382)]=J[t(383)](J),e[t(398)]=o[t(398)][t(383)](o),n[r]=e}}))();const Y=S({__name:"reflectorMipMap",props:{parent:{},resolution:{default:512},ignoreObjects:{default:[]}},setup(t,{expose:e}){const n=G,i=t,r=new(x[n(342)]),a=new(x[n(385)]),o=new(x[n(333)]),s=new W,l=g({width:i.resolution,height:i[n(350)],settings:{type:x[n(347)]}}),c=g({width:i.resolution,height:i[n(350)],settings:{type:x[n(347)]}}),{camera:u,renderer:p,scene:f}=h(),{onBeforeLoop:d}=w();return d((()=>{const t=n;(()=>{const t=n;if(!u[t(367)])return;r[t(380)](new v(0,1,0),0),r[t(365)](i[t(368)][t(337)]),o[t(348)](u[t(367)]);const e=new(x[t(349)])(0,0,1).clone()[t(403)](),s=u[t(367)][t(373)](new(x[t(349)]));e[t(343)](r[t(394)]);const c=new v;r[t(329)](s,c);const h=c.clone();h[t(400)](s),h[t(338)](c),o[t(351)].copy(h);const w=new(x[t(349)])(0,0,-1);w.applyQuaternion(u[t(367)][t(354)](new(x[t(340)]))),w[t(338)](s);const g=new v;i.parent.getWorldPosition(g),g[t(400)](w),g.reflect(r[t(394)])[t(403)](),g[t(338)](i[t(368)].getWorldPosition(new(x[t(349)]))),o.up[t(380)](0,1,0),o.applyQuaternion(u[t(367)].getWorldQuaternion(new(x[t(340)]))),o.up[t(343)](r.normal),o.lookAt(g),o.updateMatrixWorld();const d=new(x[t(385)]);d.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),d[t(362)](o[t(345)]),d.multiply(o[t(376)]),a[t(348)](d),r.applyMatrix4(o[t(376)]);const y=new m(r[t(394)].x,r[t(394)].y,r[t(394)].z,r[t(341)]),S=o[t(345)],P=new(x[t(361)]);P.x=(Math[t(364)](y.x)+S.elements[8])/S[t(391)][0],P.y=(Math[t(364)](y.y)+S[t(391)][9])/S[t(391)][5],P.z=-1,P.w=(1+S[t(391)][10])/S[t(391)][14],y[t(395)](2/y[t(363)](P)),S[t(391)][2]=y.x,S[t(391)][6]=y.y,S[t(391)][10]=y.z+1,S[t(391)][14]=y.w;const z=p[t(367)][t(353)]();p.value[t(371)](l[t(367)]),p[t(367)][t(387)][t(396)][t(370)].setMask(!0),!1===p[t(367)].autoClear&&p[t(367)][t(399)](),i.ignoreObjects[t(390)]((e=>e[t(369)]=!1)),p[t(367)][t(359)](f[t(367)],o),i[t(405)][t(390)]((t=>t.visible=!0)),p.value[t(371)](z)})(),l.value&&c[t(367)]&&p.value&&s.update(l[t(367)].texture,c[t(367)],p.value)})),e({matrix:a,renderTarget:c}),(t,e)=>null}});function G(t,e){const n=Q();return(G=function(t,e){return n[t-=329]})(t,e)}function $(t){function e(t){const n=G;if(typeof t===n(356))return function(t){}.constructor(n(330))[n(352)](n(393));1!==(""+t/t)[n(375)]||t%20==0?function(){return!0}[n(366)](n(331)+n(360))[n(346)]("action"):function(){return!1}[n(366)]("debu"+n(360))[n(352)](n(377)),e(++t)}try{if(t)return e;e(0)}catch(n){}}!function(t,e){for(var n=tt,i=q();;)try{if(667091===-parseInt(n(295))/1+-parseInt(n(312))/2*(-parseInt(n(296))/3)+-parseInt(n(323))/4+-parseInt(n(299))/5+-parseInt(n(303))/6*(-parseInt(n(315))/7)+parseInt(n(301))/8*(parseInt(n(310))/9)+parseInt(n(320))/10*(parseInt(n(318))/11))break;i.push(i.shift())}catch(r){i.push(i.shift())}}();var B=function(){var t=!0;return function(e,n){var i=t?function(){if(n){var t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,i}}();!function(){B(this,(function(){var t=tt,e=new RegExp("function *\\( *\\)"),n=new RegExp(t(300),"i"),i=et(t(307));e[t(291)](i+t(325))&&n[t(291)](i+t(302))?et():i("0")}))()}();var K=function(){var t=!0;return function(e,n){var i=t?function(){if(n){var t=n[tt(293)](e,arguments);return n=null,t}}:function(){};return t=!1,i}}();function q(){var t=["test","bind","apply","gger","115734DXAvBj","378KuByJx","error","trace","915085iBkxlp","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","144XrFEit","input","2454YIUduh","stateObject","while (true) {}","log","init","constructor","length","122373CGuXUl","info","11162KvcFJO","counter",'{}.constructor("return this")( )',"833OrHlxh","debu","__proto__","9578272jmLWHL","console","10Tbyexo","string","warn","3606132jNlizp","table","chain","action","prototype"];return(q=function(){return t})()}function tt(t,e){var n=q();return(tt=function(t,e){return n[t-=289]})(t,e)}function et(t){function e(t){var n=tt;if(typeof t===n(321))return function(t){}[n(308)](n(305)).apply(n(313));1!==(""+t/t)[n(309)]||t%20==0?function(){return!0}[n(308)](n(316)+n(294)).call(n(289)):function(){return!1}[n(308)](n(316)+n(294)).apply(n(304)),e(++t)}try{if(t)return e;e(0)}catch(n){}}K(void 0,(function(){var t,e=tt;try{t=Function("return (function() "+e(314)+");")()}catch(l){t=window}for(var n=t[e(319)]=t[e(319)]||{},i=[e(306),e(322),e(311),e(297),"exception",e(324),e(298)],r=0;r<i.length;r++){var a=K.constructor[e(290)][e(292)](K),o=i[r],s=n[o]||a;a[e(317)]=K.bind(K),a.toString=s.toString[e(292)](s),n[o]=a}}))();export{Y as _};
