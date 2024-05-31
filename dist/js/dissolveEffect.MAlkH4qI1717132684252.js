import{aH as B,aI as j,aD as f,b6 as E,bj as F,aa as G,o as v,c as D,T as r,ad as V,a5 as $,a6 as S,au as O,q as U,r as N,a as t,J as g,ac as k,K as H,ag as q,ae as z,af as L,C as P,ak as M,a1 as p,at as I}from"./vendor.E5SXPLW-1717132684252.js";import{_ as A}from"./component.vue_vue_type_script_setup_true_lang.AkDJLVOP1717132684252.js";import{_ as d}from"./vanilla.esm.5.5.0.-fe623FZ1717132684252.js";/* empty css                                                                                 */import{l as J}from"./bubbleLoading.bfeG_mi41717132684252.js";import"./OimoPhysicsBuffer.b5DejoFC1717132684252.js";import{_ as K}from"./reflectorDUDV.vue_vue_type_script_setup_true_lang.w2v-YJjK1717132684252.js";import"./PackedMipMapGenerator.SqZzumRc1717132684252.js";import{_ as Q}from"./lamboEffect.vue_vue_type_script_setup_true_lang.aH4lJ9Kx1717132684252.js";import"./object_hash.3ShajMuP1717132684252.js";import"./_commonjsHelpers.5-cIlDoe1717132684252.js";import"./_commonjs-dynamic-modules.h-SxKiO41717132684252.js";import"./dither.glsl.y2WXw1t-1717132684252.js";import"./Reflector.D1REcKVJ1717132684252.js";import"./EffectComposer.hKpSDIPf1717132684252.js";import"./Pass.tq3Txdzw1717132684252.js";import"./OutputPass.tgFsIId91717132684252.js";import"./UnrealBloomPass.aaOycp5W1717132684252.js";const X=["object","rotation"],Y={__name:"dissolveEffectModel",props:{edgeColor:{default:1118481},edgeWidth:{default:.03},dissolveSpeed:{default:.003},funRef:{appear:null,disappear:null}},async setup(T,{expose:_}){let l,n;const o=T,{scene:x,nodes:i,materials:a}=([l,n]=B(()=>j("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb",{draco:!0,decoderPath:"./draco/"})),l=await l,n(),l);Object.values(i).forEach(e=>{e.isMesh&&(e.name.startsWith("glass")&&e.geometry.computeVertexNormals(),e.name==="silver_001_BreakDiscs_0"&&(e.material=a.BreakDiscs.clone(),e.material.color=new f("#ddd")))}),i.glass_003.scale.setScalar(2.7),a.FrameBlack.color=new f("black"),a.FrameBlack.roughness=0,a.FrameBlack.metalness=.75,a.Chrome.color=new f("#333"),a.Chrome.metalness=1,a.Chrome.roughness=0,a.BreakDiscs.color=new f("#555"),a.BreakDiscs.metalness=.2,a.BreakDiscs.roughness=.2,a.TiresGum.color=new f("#181818"),a.TiresGum.metalness=0,a.TiresGum.roughness=.4,a.GreyElements.color=new f("#292929"),a.GreyElements.metalness=0,i.yellow_WhiteCar_0.material=new E({roughness:.3,metalness:.05,color:"#111",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1});const C=([l,n]=B(()=>F(["./plugins/digitalCity/image/smokeparticle.png","./plugins/industry4/image/dissolve.jpg"])),l=await l,n(),l);let c=[],u=!1,y={dissolveProgress:0,noiseTexture:C[0],edgeColorTexture:C[1]},h=o.dissolveSpeed;const b=()=>{if(!u){u=!0,h=o.dissolveSpeed;for(let e of c)e.uniforms.dissolveSpeed={value:h},e.uniforms.dissolveProgress={value:0}}},w=()=>{if(!u){u=!0,h=-o.dissolveSpeed;for(let e of c)e.uniforms.dissolveSpeed={value:h},e.uniforms.dissolveProgress={value:1}}};o.funRef.appear=b,o.funRef.disappear=w,_({appear:b,disappear:w}),Object.values(i).forEach(e=>{if(e.isMesh){e.frustumCulled=!1;const m=e.material;m.transparent=!0,m.onBeforeCompile=s=>{c.push(s),s.uniforms.edgeColor={value:new f(o.edgeColor)},s.uniforms.edgeWidth={value:o.edgeWidth},s.uniforms.dissolveSpeed={value:o.dissolveSpeed},s.uniforms.dissolveProgress={value:y.dissolveProgress},s.uniforms.noiseTexture={value:y.noiseTexture},s.uniforms.edgeColorTexture={value:y.edgeColorTexture},s.vertexShader=s.vertexShader.replace("#include <common>",["varying vec2 xUv;","#include <common>"].join("\n")),s.vertexShader=s.vertexShader.replace("#include <uv_vertex>",["xUv = uv;","#include <uv_vertex>"].join("\n")),s.fragmentShader=s.fragmentShader.replace("#include <common>","#include <common>\n             uniform float dissolveProgress;\n             uniform float edgeWidth;\n             uniform vec3 edgeColor;\n             uniform sampler2D noiseTexture;\n             uniform sampler2D edgeColorTexture;\n             varying vec2 xUv;\n            "),s.fragmentShader=s.fragmentShader.replace("#include <dithering_fragment>","#include <dithering_fragment>\n                float noiseValue = texture2D(noiseTexture, xUv).r;\n              	vec4 finalColor = texture2D(edgeColorTexture, xUv);\n\n								vec3 mixedColor = mix(finalColor.rgb, edgeColor, 0.5);\n								finalColor.rgb = mixedColor;\n\n                // vec4 finalColor = linearToOutputTexel( vec4(edgeColor, gl_FragColor.a) );\n								float alpha = step(noiseValue - edgeWidth, dissolveProgress);\n                gl_FragColor.a = alpha;\n								float useOrigin = step(noiseValue, dissolveProgress);\n								gl_FragColor.rgb = mix(finalColor.rgb, gl_FragColor.rgb, useOrigin);")}}});const{onLoop:R}=V();return R(({dt:e})=>{if(u)for(let m of c){let{dissolveProgress:s,dissolveSpeed:W}=m.uniforms;s.value+=W.value,s.value<0&&(u=!1),s.value>1&&(u=!1)}}),G(()=>{if(o.dissolveSpeed)for(let e of c)e.uniforms.dissolveSpeed.value=o.dissolveSpeed;if(o.edgeColor)for(let e of c)e.uniforms.edgeColor.value=new f(o.edgeColor);if(o.edgeWidth)for(let e of c)e.uniforms.edgeWidth.value=o.edgeWidth}),(e,m)=>(v(),D("primitive",{object:r(x),scale:.015,rotation:[0,Math.PI/1.5,0]},null,8,X))}},Z=p("TresPerspectiveCamera",{position:[0,10,15],fov:25,near:.1,far:1e4},null,-1),ee=p("TresHemisphereLight",{intensity:.5},null,-1),oe=["rotation"],se=p("TresRingGeometry",{args:[.9,1,4,1]},null,-1),te=["side"],ae=["rotation"],re=p("TresRingGeometry",{args:[.9,1,3,1]},null,-1),ie=["side"],Te=$({__name:"dissolveEffect",setup(T){const _=S({clearColor:"#15151a",antialias:!1,logarithmicDepthBuffer:!0,disableRender:!0}),l=S({autoRotate:!0}),n=new O({title:"溶解参数",expanded:!0}),o=S({edgeColor:"#111111",edgeWidth:.03,dissolveSpeed:.003,funRef:{appear:null,disappear:null}});n.addBinding(o,"edgeColor",{label:"颜色"}),n.addBinding(o,"edgeWidth",{label:"宽度",min:0,max:.13,step:.01}),n.addBinding(o,"dissolveSpeed",{label:"速度",min:.001,max:.01,step:.001});const x=n.addButton({title:"显示",label:"模型"}),i=U(null);return x.on("click",()=>{i.value.appear?i.value.appear():i.value.funRef.appear()}),n.addButton({title:"消失",label:"模型"}).on("click",()=>{i.value.appear?i.value.disappear():i.value.funRef.disappear()}),(C,c)=>{const u=N("TresCanvas");return v(),D(H,null,[t(r(J)),t(u,k(_,{"window-size":""}),{default:g(()=>[Z,t(r(q),z(L(l)),null,16),ee,(v(),P(M,null,{default:g(()=>[t(Y,k(o,{ref_key:"dissolveEffectModelRef",ref:i}),null,16)]),_:1})),(v(),P(M,null,{default:g(()=>[t(r(K),{position:[0,-1.562,0],reflectivity:2.6,showGridHelper:!1,scale:1.5})]),_:1})),p("TresMesh",{scale:4,position:[3,-1.161,-1.5],rotation:[-Math.PI/2,0,Math.PI/2.5]},[se,p("TresMeshStandardMaterial",{color:"white",roughness:.75,side:I},null,8,te)],8,oe),p("TresMesh",{scale:4,position:[-3,-1.161,-1],rotation:[-Math.PI/2,0,Math.PI/2.5]},[re,p("TresMeshStandardMaterial",{color:"white",roughness:.75,side:I},null,8,ie)],8,ae),(v(),P(M,null,{default:g(()=>[t(r(A),{resolution:512},{default:g(()=>[t(r(d),{intensity:2,position:[0,1,3],scale:[10,1,1]}),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-6],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,-3],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,0],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,3],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,6],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-x":Math.PI/2,position:[0,4,9],scale:[10,1,1]},null,8,["rotation-x"]),t(r(d),{intensity:2,"rotation-y":Math.PI/2,position:[-50,2,0],scale:[100,2,1]},null,8,["rotation-y"]),t(r(d),{intensity:2,"rotation-y":-Math.PI/2,position:[50,2,0],scale:[100,2,1]},null,8,["rotation-y"]),t(r(d),{form:"ring",color:"red",intensity:10,scale:2,position:[10,5,10]})]),_:1})]),_:1})),t(Q)]),_:1},16)],64)}}});export{Te as default};
