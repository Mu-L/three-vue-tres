import{cp as d,a1 as p,ak as B,w,aw as N,aD as k,aE as C,o as h,c as y,Y as o,L as e,x as M,E as _,b1 as b,l as x,a2 as z,aq as I,r as E,a as n,aa as v,ab as S,G as P,ba as D,ac as G,ag as A,aG as F}from"./vendor.1SfJ1rT91715934934621.js";/* empty css                                                                                 */import{_ as j}from"./randomLoading.vue_vue_type_script_setup_true_lang.xUWhpzn21715934934621.js";import"./index.vue_vue_type_script_setup_true_lang.xxmkxTHw1715934934621.js";import"./starLoading.cIKWU4cs1715934934621.js";import"./cssLoaders.FNdhmzXt1715934934621.js";import"./bubbleLoading.2dQ7sL0Q1715934934621.js";function U(l,r,s){r.traverse(a=>{a.material&&(Array.isArray(a.material)?a.material.forEach(t=>{l.properties.remove(t),t.dispose()}):(l.properties.remove(a.material),a.material.dispose()))}),l.info.programs.length=0,l.compile(r,s)}const $=({focus:l=0,size:r=25,samples:s=10}={})=>{const a=d.shadowmap_pars_fragment;return d.shadowmap_pars_fragment=d.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP","#ifdef USE_SHADOWMAP\n\n    #define PENUMBRA_FILTER_SIZE float(".concat(r,")\n    #define RGB_NOISE_FUNCTION(uv) (randRGB(uv))\n    vec3 randRGB(vec2 uv) {\n      return vec3(\n        fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),\n        fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),\n        fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)\n      );\n    }\n    \n    vec3 lowPassRandRGB(vec2 uv) {\n      // 3x3 convolution (average)\n      // can be implemented as separable with an extra buffer for a total of 6 samples instead of 9\n      vec3 result = vec3(0);\n      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));\n      result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));\n      result *= 0.111111111; // 1.0 / 9.0\n      return result;\n    }\n    vec3 highPassRandRGB(vec2 uv) {\n      // by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal\n      // hp(x) = x - lp(x)\n      return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;\n    }\n    \n    \n    vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {\n      const float goldenAngle = 2.399963f; // radians\n      float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));\n      float theta = float(sampleIndex) * goldenAngle + angle;\n      float sine = sin(theta);\n      float cosine = cos(theta);\n      return vec2(cosine, sine) * r;\n    }\n    float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation\n      return (zReceiver - zBlocker) / zBlocker;\n    }\n    float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {\n      float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);\n      float blockerDepthSum = float(").concat(l,");\n      float blockers = 0.0;\n    \n      int j = 0;\n      vec2 offset = vec2(0.);\n      float depth = 0.;\n    \n      #pragma unroll_loop_start\n      for(int i = 0; i < ").concat(s,"; i ++) {\n        offset = (vogelDiskSample(j, ").concat(s,", angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;\n        depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));\n        if (depth < compare) {\n          blockerDepthSum += depth;\n          blockers++;\n        }\n        j++;\n      }\n      #pragma unroll_loop_end\n    \n      if (blockers > 0.0) {\n        return blockerDepthSum / blockers;\n      }\n      return -1.0;\n    }\n            \n    float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {\n      float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);\n      float shadow = 0.0f;\n      int j = 0;\n      vec2 vogelSample = vec2(0.0);\n      vec2 offset = vec2(0.0);\n      #pragma unroll_loop_start\n      for (int i = 0; i < ").concat(s,"; i++) {\n        vogelSample = vogelDiskSample(j, ").concat(s,", angle) * texelSize;\n        offset = vogelSample * (1.0 + filterRadius * float(").concat(r,"));\n        shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );\n        j++;\n      }\n      #pragma unroll_loop_end\n      return shadow * 1.0 / ").concat(s,".0;\n    }\n    \n    float PCSS (sampler2D shadowMap, vec4 coords) {\n      vec2 uv = coords.xy;\n      float zReceiver = coords.z; // Assumed to be eye-space z in this code\n      float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;\n      float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);\n      if (avgBlockerDepth == -1.0) {\n        return 1.0;\n      }\n      float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);\n      return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);\n    }")).replace("#if defined( SHADOWMAP_TYPE_PCF )","\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )"),(t,i,c)=>{d.shadowmap_pars_fragment=a,U(t,i,c)}},L=p({__name:"index",props:{enabled:{type:Boolean,default:!0},size:{default:25},focus:{default:0},samples:{default:10}},setup(l){const r=l,{camera:s,renderer:a,scene:t}=B();let i=null;const c=m=>{const{enabled:f,size:T,focus:O,samples:R}=m;i&&(i(a.value,t.value,s.value),i=null),f&&(i=$({focus:O,size:T,samples:R}),t.value.traverse(g=>{g instanceof N&&g.material.dispose()}))};return c(r),w(r,()=>{c(r)}),(m,f)=>null}}),H=["rotation"],W=["geometry","material"],q=["geometry","material"],Y=["geometry","material"],Z=["geometry","material"],V=["geometry","material"],J=["geometry","material"],K=["geometry","material"],Q=["geometry","material"],X=["geometry","material"],ee=["geometry","material"],ae=["geometry","material"],te=["geometry","material"],oe=["geometry"],re=o("TresMeshStandardMaterial",{transparent:"",opacity:.5},null,-1),se=[re],le=["geometry","material"],ie=["geometry","material"],ne=["geometry","material"],ce=["geometry","material"],me=p({__name:"roomMesh",async setup(l){let r,s;const{nodes:a,materials:t}=([r,s]=k(()=>C("./plugins/visualArts/model/room-transformed.glb",{draco:!0,decoderPath:"./draco/"})),r=await r,s(),r);return(i,c)=>(h(),y("TresGroup",{rotation:[-Math.PI/2,0,0]},[o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_2.geometry,material:e(t).Material},null,8,W),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_3.geometry,material:e(t)["Material.002"]},null,8,q),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_4.geometry,material:e(t)["Material.003"]},null,8,Y),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_6.geometry,material:e(t).krzeslo_1},null,8,Z),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_7.geometry,material:e(t).krzeslo_okno},null,8,V),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_8.geometry,material:e(t).krzeslo_prawe},null,8,J),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_9.geometry,material:e(t).krzeslo_srodek},null,8,K),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_10.geometry,material:e(t).podloga},null,8,Q),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_11.geometry,material:e(t).sciana_okno},null,8,X),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_12.geometry,material:e(t)["stolik.001"]},null,8,ee),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_16.geometry,material:e(t)["Material.006"]},null,8,ae),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_5.geometry,material:e(t)["Material.004"]},null,8,te),o("TresMesh",{geometry:e(a).Object_13.geometry},se,8,oe),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_14.geometry,material:e(t)["Material.002"]},null,8,le),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_15.geometry,material:e(t)["Material.005"]},null,8,ie),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_17.geometry,material:e(t).mata},null,8,ne),o("TresMesh",{castShadow:"",receiveShadow:"",geometry:e(a).Object_18.geometry,material:e(t).stolik},null,8,ce)],8,H))}}),de=o("TresMesh",{castShadow:"",position:[0,5,0]},[o("TresSphereGeometry"),o("TresMeshBasicMaterial",{color:"hotpink",roughness:1})],-1),u=p({__name:"sphere",setup(l){return(r,s)=>(h(),M(e(b),{floatFactor:15,speed:2},{default:_(()=>[de]),_:1}))}}),_e=o("TresPerspectiveCamera",{position:[5,2,10],fov:45,near:.1,far:1e3},null,-1),he=o("TresAmbientLight",{intensity:2},null,-1),ye=p({__name:"roomup",setup(l){const r=x(null);w(r,i=>{i&&(i.shadow.camera=new F(-8.5,8.5,8.5,-8.5,.1,20))});const s={clearColor:"#d0d0d0",windowSize:!0,toneMapping:D,toneMappingExposure:.8,shadows:!0},a=z({enabled:!0,size:25,focus:0,samples:10}),t=new I({title:"参数"});return t.addBinding(a,"enabled",{label:"开启PCSS"}),t.addBinding(a,"size",{label:"size",min:1,max:100,step:1}),t.addBinding(a,"focus",{label:"focus",min:0,max:2,step:.1}),t.addBinding(a,"samples",{label:"samples",min:1,max:20,step:1}),(i,c)=>{const m=E("TresCanvas");return h(),y(P,null,[n(e(j)),n(m,v(S(s)),{default:_(()=>[_e,n(e(G),{enableDamping:""}),he,n(e(b),null,{default:_(()=>[o("TresDirectionalLight",{ref_key:"dLight",ref:r,position:[5,5,-8],castShadow:"",intensity:5,"shadow-mapSize":2048,"shadow-bias":-.001},null,512)]),_:1}),(h(),M(A,null,{default:_(()=>[n(me,{scale:.5,position:[0,-1,0]})]),_:1})),n(u,{position:[0,5,-8]}),n(u,{position:[2,4,-8],scale:.9}),n(u,{position:[-2,2,-8],scale:.8}),n(e(L),v(S(a)),null,16)]),_:1},16)],64)}}});export{ye as default};
