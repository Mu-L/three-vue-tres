import{a5 as N,aH as k,aI as M,ao as z,at as H,aL as F,aV as Y,b6 as D,q as R,aa as W,o as v,c as B,a1 as t,T as r,a as b,J as y,ap as A,K as O,aA as X,aD as E,cC as J,cq as K,ba as j,B as T,ae as V,af as q,ad as Q,bc as U,bx as Z,a6 as G,cD as ee,ah as I,au as te,r as oe,ac as L,ag as ae,b5 as se,C,ak as x}from"./vendor.E5SXPLW-1717132684252.js";/* empty css                                                                                 */import{_ as re}from"./randomLoading.vue_vue_type_script_setup_true_lang.1Mu5VAOm1717132684252.js";import"./vanilla.aW4U1Ukw1717132684252.js";import{_ as ie}from"./skyBoxDmesh.vue_vue_type_script_setup_true_lang.mNpdRled1717132684252.js";import"./OimoPhysicsBuffer.b5DejoFC1717132684252.js";import"./vanilla.esm.5.5.0.-fe623FZ1717132684252.js";import"./PackedMipMapGenerator.SqZzumRc1717132684252.js";import{_ as ne}from"./gridPlusCom.vue_vue_type_script_setup_true_lang.YtAqSsgt1717132684252.js";import{g as P}from"./index.A-uui1DV1717132684252.js";import{m as ce}from"./BufferGeometryUtils.Ga3MQiuz1717132684252.js";import{_ as le}from"./index.vue_vue_type_script_setup_true_lang.mBDu0P301717132684252.js";import"./starLoading.-4r_CWIf1717132684252.js";import"./cssLoaders.ib6ZIO651717132684252.js";import"./bubbleLoading.bfeG_mi41717132684252.js";import"./vanilla.8-DC9lKw1717132684252.js";import"./object_hash.3ShajMuP1717132684252.js";import"./_commonjsHelpers.5-cIlDoe1717132684252.js";import"./_commonjs-dynamic-modules.h-SxKiO41717132684252.js";import"./builtins-300es.Tm_BdSQ71717132684252.js";import"./shaderMaterial.2sI038hQ1717132684252.js";import"./index.EUHP41j-1717132684252.js";import"./MeshTransmissionMaterial.oyh1JDkR1717132684252.js";import"./MeshDiscardMaterial.9wzPPxuL1717132684252.js";const me=["object","rotation-y"],ue=["rotation","geometry","material"],pe=t("h1",{class:"text-xs p-0.5 rounded -mt-10 text-white font-bold",style:{"font-size":"78rem",width:"5em","text-align":"center","margin-top":"1em",scale:"0.7 1.5"}}," 楼宇分层 ",-1),de=N({__name:"officeBuild",async setup(S){let o,u;const{scene:p}=([o,u]=k(()=>M("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalPark/officeBuild.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),{scene:i,raycaster:_,camera:a}=z();p.traverse(l=>{l.isMesh&&(l.frustumCulled=!1,l.material.side=H,l.castShadow=!0,l.receiveShadow=!0,l.material.emissive=l.material.color,l.material.emissiveMap=l.material.map,l.material.emissiveIntensity=.8,l.material.envmap=i.value.background)});const d=p.clone();let n="";const c=()=>{var l;(l=p.getObjectByName(n))==null||l.traverse(f=>{f.isMesh&&(f.material=d.getObjectByName(f.name).material,f.castShadow=!0,f.receiveShadow=!0)})};window.addEventListener("pointermove",l=>{const f=new F;f.x=l.clientX/window.innerWidth*2-1,f.y=-(l.clientY/window.innerHeight)*2+1,_.value.setFromCamera(f,a.value);const e=_.value.intersectObject(p,!0);if(e.length>0&&e[0]&&e[0].object&&e[0].object.parent){if(n===e[0].object.parent.name)return;c(),e[0].object.parent.traverse(w=>{w.isMesh&&(w.material=new Y({color:"#00d1ff",transparent:!0,opacity:.7,emissiveMap:w.material.map,emissiveIntensity:2}),w.castShadow=!1,w.receiveShadow=!1)}),n=e[0].object.parent.name}else n&&(c(),n="")});let s="";window.addEventListener("click",l=>{const f=new F;f.x=l.clientX/window.innerWidth*2-1,f.y=-(l.clientY/window.innerHeight)*2+1,_.value.setFromCamera(f,a.value);const e=_.value.intersectObject(p,!0);if(e.length>0&&e[0]&&e[0].object&&e[0].object.parent){if(s==="runing")return;if(s===e[0].object.parent.name){P.to(e[0].object.parent.position,{z:d.getObjectByName(s).position.z,duration:2,ease:"power1.inOut",onComplete:()=>{s=""}}),s="runing";return}s&&P.to(p.getObjectByName(s).position,{z:d.getObjectByName(s).position.z,duration:2,ease:"power1.inOut",onComplete:()=>{s=""}}),P.to(e[0].object.parent.position,{z:d.getObjectByName(e[0].object.parent.name).position.z-40,duration:2,ease:"power1.inOut",onComplete:()=>{s=e[0].object.parent.name}}),s="runing"}});const g=new D({roughness:.3,metalness:.05,color:"#3a4f75",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1}),{scene:m}=([o,u]=k(()=>M("./plugins/digitalPark/model/arctic_tooltip.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),h=R(null);return W(()=>{h.value&&P.to(h.value.rotation,{y:Math.PI*2.5,duration:3,ease:"power1.inOut",repeat:-1,yoyo:!0})}),(l,f)=>(v(),B(O,null,[t("primitive",{object:r(p),"cast-shadow":"","receive-shadow":"",position:[13.5,0,-45],scale:[.2,.3,.2],name:"办公大厅","rotation-y":Math.PI},null,8,me),t("TresMesh",{ref_key:"tooltipRef",ref:h,scale:[.05,.02,.004],rotation:[0,Math.PI/2,0],position:[12,25,-35],geometry:r(m).getObjectByName("Arctic_Tooltip_lambert4_0").geometry,material:r(g)},[b(r(A),{center:!0,transform:""},{default:y(()=>[pe]),_:1})],8,ue)],64))}}),_e=["object","rotation-y"],he=["rotation","geometry","material"],fe=t("h1",{class:"text-xs p-0.5 rounded -mt-10 text-white font-bold",style:{"font-size":"78rem",width:"4em","text-align":"center","margin-top":"1em"}},"实验楼",-1),be={__name:"laboratoryBuild",async setup(S){let o,u;const{scene:p}=([o,u]=k(()=>M("./plugins/digitalPark/model/laboratoryBuild.gltf",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),{scene:i}=z(),_=[],a=[];p.traverse(m=>{m.updateMatrixWorld(!0),m.isMesh&&(m.geometry.applyMatrix4(m.matrixWorld),_.push(m.geometry),m.material.emissiveMap=m.material.map,m.material.emissiveIntensity=.1,m.material.envmap=i.value.background,a.push(m.material))});const d=ce(_,!0),n=new X(d,a),{scene:c}=([o,u]=k(()=>M("./plugins/digitalPark/model/arctic_tooltip.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),s=new D({roughness:.3,metalness:.05,color:"#b07560",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1}),g=R(null);return W(()=>{g.value&&P.to(g.value.rotation,{y:Math.PI*2.5,duration:3,ease:"power1.inOut",repeat:-1,yoyo:!0})}),(m,h)=>(v(),B(O,null,[t("primitive",{object:r(n),"cast-shadow":"","receive-shadow":"",position:[-33,0,7],scale:[.7,1.2,.7],name:"实验楼","rotation-y":Math.PI/2},null,8,_e),t("TresMesh",{ref_key:"tooltipRef",ref:g,scale:[.03,.02,.004],rotation:[0,Math.PI/2,0],position:[-32,27,12],geometry:r(c).getObjectByName("Arctic_Tooltip_lambert4_0").geometry,material:r(s)},[b(r(A),{center:!0,transform:""},{default:y(()=>[fe]),_:1})],8,he)],64))}},ge=["object"],ve=["rotation","geometry"],we=t("h1",{class:"text-xs p-0.5 rounded -mt-10 text-#ffff99 font-bold",style:{"font-size":"78rem",width:"4em","text-align":"center","margin-top":"1em"}}," 别追我 ",-1),$=3e-4,ye={__name:"car",props:{darkModel:{type:Boolean,default:!1}},async setup(S){let o,u;const p=S,i={color:"#ffda99",roughness:.21,reflectivity:1,attenuationColor:"#ffda35",attenuationDistance:2,chromaticAberration:.05,anisotropicBlur:.1,distortion:1.8,temporalDistortion:0,backside:!1,thickness:1,backsideThickness:.5},{scene:_}=z(),{scene:a,nodes:d,materials:n}=([o,u]=k(()=>M("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/lambo.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o);a.children[0].scale.setScalar(.02),d.glass_003.scale.setScalar(2.7),n.FrameBlack.roughness=0,n.FrameBlack.metalness=.75,n.Chrome.metalness=1,n.Chrome.roughness=0,n.BreakDiscs.metalness=.2,n.BreakDiscs.roughness=.2,n.TiresGum.metalness=0,n.TiresGum.roughness=.4,n.GreyElements.metalness=0,d.yellow_WhiteCar_0.material=new D({roughness:.3,metalness:.05,color:"#ffda35",envMapIntensity:.75,clearcoatRoughness:0,clearcoat:1}),Object.values(d).forEach(e=>{e.isMesh&&(e.name.startsWith("glass")&&e.geometry.computeVertexNormals(),e.name==="silver_001_BreakDiscs_0"&&(e.material=n.BreakDiscs.clone(),e.material.color=new E("#ddd")),e.castShadow=!0,e.receiveShadow=!0,e.material.emissiveMap=e.material.map,e.material.emissiveIntensity=.1,e.material.envmap=_.value.background)});const c=new J(16777215);a.add(c),a.add(c.target),c.angle=Math.PI/4,c.position.set(0,2,5),c.target.position.set(0,1,7),c.penumbra=.1,c.decay=.01,c.intensity=3,c.castShadow=!0,c.shadow.mapSize.width=1024,c.shadow.mapSize.height=1024,c.shadow.camera.near=.1,c.shadow.camera.far=1e3,c.shadow.camera.bias=.005,c.visible=!0;const{scene:s}=([o,u]=k(()=>M("./plugins/digitalPark/model/arctic_tooltip.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),g=new K([new j(10,1.5,35),new j(35,1.5,35),new j(35,1.5,-80),new j(47,1.5,-80),new j(47,1.5,35),new j(100,1.5,35),new j(100,1.5,47),new j(-100,1.5,47),new j(-100,1.5,35)]);g.curveType="catmullrom",g.closed=!0,g.tension=.2;const m=R(null);let h=0;const l=()=>{if(g)if(h<=1-$){const e=g.getPointAt(h),w=g.getPointAt(h+$);e&&w&&(m.value.position.set(e.x,e.y+6,e.z),a.position.set(e.x,e.y,e.z),a.lookAt(w.x,w.y,w.z)),h+=$}else h=0};T(m,e=>{e&&P.to(m.value.rotation,{y:Math.PI*2.5,duration:3,ease:"power1.inOut",repeat:-1,yoyo:!0})}),T(()=>p.darkModel,e=>{c&&(c.visible=e)},{immediate:!0});const{onLoop:f}=Q();return f(()=>{l()}),(e,w)=>(v(),B(O,null,[t("primitive",{object:r(a)},null,8,ge),t("TresMesh",{ref_key:"tooltipRef",ref:m,scale:[.03,.02,.004],rotation:[0,Math.PI/2,0],position:[10,6,35],geometry:r(s).getObjectByName("Arctic_Tooltip_lambert4_0").geometry},[b(r(A),{center:!0,transform:""},{default:y(()=>[we]),_:1}),b(r(le),V(q(i)),null,16)],8,ve)],64))}},je=["object"],ke=N({__name:"sculpture",props:{darkModel:{type:Boolean,default:!1}},async setup(S){let o,u;const p=S,{scene:i}=([o,u]=k(()=>M("./plugins/digitalPark/model/vr_sculpture_park/scene.gltf",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),{scene:_}=z();return i.traverse(async a=>{a.isMesh&&(a.material.emissiveMap=a.material.map,a.material.emissive=a.material.color,a.material.envmap=_.value.background,a.castShadow=!0,a.receiveShadow=!0,a.frustumCulled=!1),a.isObject3D&&(a.frustumCulled=!1,a.castShadow=!0,a.receiveShadow=!0)}),T(()=>p.darkModel,a=>{i&&i.traverse(async d=>{d.isMesh&&(a===!1?d.material.emissiveIntensity=.6:d.material.emissiveIntensity=0)})},{immediate:!0}),(a,d)=>(v(),B("primitive",{"cast-shadow":"","receive-shadow":"",object:r(i),name:"主场景"},null,8,je))}}),Me={position:[10,0,0]},Se={position:[-33*4,0,40.4]},Ce=["object"],xe={position:[-33*3,0,40.4]},Pe=["object"],Be={position:[-33*2,0,40.4]},Te=["object"],Oe={position:[-33,0,40.4]},ze=["object"],Ge={position:[0,0,40.4]},Ie=["object"],$e={position:[33*2-5.5,0,40.4]},Ne=["object"],De={position:[33*3-5.5,0,40.4]},Re=["object"],Ae={position:[-3.3,-.2,18]},Fe={position:[0,0,0]},Le=["object"],We={position:[0,0,33*1]},Ee=["object"],Ve={position:[0,0,33*2]},qe=["object"],He={position:[0,0,33*3]},Ye=["object"],Xe={position:[0,0,33*5-6]},Je=["object"],Ke={position:[0,0,33*6-6]},Qe=["object"],Ue={__name:"street",async setup(S){let o,u;const{nodes:p}=([o,u]=k(()=>M("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/digitalPark/low_poly_street_v3.glb",{draco:!0,decoderPath:"./draco/"})),o=await o,u(),o),i=p.Sketchfab_model.getObjectByName("Cube497_530");i.children[0].receiveShadow=!0;const _=p.Sketchfab_model.getObjectByName("Cube549_582");_.children[0].receiveShadow=!0;const a=p.Sketchfab_model.getObjectByName("Cube550_583");a.children[0].receiveShadow=!0;const d=p.Sketchfab_model.getObjectByName("Cube551_854");d.children[0].receiveShadow=!0;const n=p.Sketchfab_model.getObjectByName("Cube552_855");n.children[0].receiveShadow=!0;const c=p.Sketchfab_model.getObjectByName("Cube553_856");c.children[0].receiveShadow=!0;const s=new U;s.add(i,_,a,d,n,c),s.scale.setScalar(.83),s.rotation.set(0,.008,0);const g=new Z().setFromObject(s),m=new j;g.getCenter(m),s.position.x=-m.x,s.position.y=-m.y,s.position.z=-m.z;const h=s.clone();return h.rotateY(Math.PI/2),(l,f)=>(v(),B(O,null,[t("TresGroup",Me,[t("TresGroup",Se,[t("primitive",{object:r(s).clone()},null,8,Ce)]),t("TresGroup",xe,[t("primitive",{object:r(s).clone()},null,8,Pe)]),t("TresGroup",Be,[t("primitive",{object:r(s).clone()},null,8,Te)]),t("TresGroup",Oe,[t("primitive",{object:r(s).clone()},null,8,ze)]),t("TresGroup",Ge,[t("primitive",{object:r(s).clone()},null,8,Ie)]),t("TresGroup",$e,[t("primitive",{object:r(s).clone()},null,8,Ne)]),t("TresGroup",De,[t("primitive",{object:r(s).clone()},null,8,Re)])]),t("TresGroup",Ae,[t("TresGroup",Fe,[t("primitive",{object:r(h).clone()},null,8,Le)]),t("TresGroup",We,[t("primitive",{object:r(h).clone()},null,8,Ee)]),t("TresGroup",Ve,[t("primitive",{object:r(h).clone()},null,8,qe)]),t("TresGroup",He,[t("primitive",{object:r(h).clone()},null,8,Ye)]),t("TresGroup",Xe,[t("primitive",{object:r(h).clone()},null,8,Je)]),t("TresGroup",Ke,[t("primitive",{object:r(h).clone()},null,8,Qe)])])],64))}},Ze=t("TresPerspectiveCamera",{position:[40,30,82],fov:45,near:.1,far:1e4},null,-1),et=t("TresAmbientLight",{intensity:.1},null,-1),St=N({__name:"simplePark",setup(S){const o=G({shadows:!0,shadowMap:!0,shadowMapType:ee,windowSize:!0}),u=G({enableDamping:!0,dampingFactor:.05}),p=G({cellSize:10,cellThickness:1,cellColor:"#4c4c4c",sectionColor:"#bbc26b",sectionSize:50,sectionThickness:3,fadeDistance:600,fadeStrength:3,followCamera:!1,infiniteGrid:!0}),i=I();T(i,n=>{n&&(i.value.shadow.mapSize.set(1024*5,1024*5),i.value.shadow.bias=-1e-5,i.value.shadow.color=new E(0),i.value.shadow.camera.near=.5,i.value.shadow.camera.far=5e4,i.value.shadow.camera.top=300,i.value.shadow.camera.right=300,i.value.shadow.camera.left=-300,i.value.shadow.camera.bottom=-300)});const _=I(!1),a=new te,d=I();return a.addBinding(_,"value",{label:"黑夜模式"}),T(_,n=>{i.value&&(i.value.visible=!n,d.value&&(d.value.context.scene.value.backgroundIntensity=n?0:1))}),(n,c)=>{const s=oe("TresCanvas");return v(),B(O,null,[b(r(re)),b(s,L(o,{ref_key:"tcRef",ref:d}),{default:y(()=>[Ze,b(r(ae),V(q(u)),null,16),et,b(r(se),null,{default:y(()=>[t("TresDirectionalLight",{ref_key:"TDirectionalLight",ref:i,position:[80,80,-8],intensity:3,castShadow:!0},null,512)]),_:1}),(v(),C(x,null,{default:y(()=>[b(de)]),_:1})),(v(),C(x,null,{default:y(()=>[b(be)]),_:1})),(v(),C(x,null,{default:y(()=>[b(Ue)]),_:1})),(v(),C(x,null,{default:y(()=>[b(ke,{darkModel:_.value},null,8,["darkModel"])]),_:1})),(v(),C(x,null,{default:y(()=>[b(ye,{darkModel:_.value},null,8,["darkModel"])]),_:1})),b(r(ne),L({args:[100,100]},p,{position:[0,-10,0]}),null,16),(v(),C(x,null,{default:y(()=>[b(r(ie),{environment:!1,texture:"https://cdn.polyhaven.com/asset_img/primary/kloofendal_48d_partly_cloudy_puresky.png?width=1920"})]),_:1}))]),_:1},16)],64)}}});export{St as default};
