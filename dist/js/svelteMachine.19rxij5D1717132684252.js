import{ee as C,bq as A,bl as $,ba as O,cq as T,bf as F,a5 as x,ao as M,bc as E,o as b,c as P,a1 as p,K as j,ad as S,ef as B,aH as z,q as R,ab as K,a as w,T as f,a6 as U,B as J,J as L,ae as W,af as H,b8 as N,ag as q,C as G,ak as I}from"./vendor.E5SXPLW-1717132684252.js";import{l as D,b as V}from"./utils.CQuuoz6D1717132684252.js";/* empty css                                                                                 */import{l as Y}from"./cssLoaders.ib6ZIO651717132684252.js";import"./_commonjsHelpers.5-cIlDoe1717132684252.js";import"./_commonjs-dynamic-modules.h-SxKiO41717132684252.js";window.THREE=C;const h={scene:null,renderer:null,camera:null,sizes:null},c={get renderer(){var e;return(e=h.renderer)==null?void 0:e.value},loader:new A,get scene(){var e;return(e=h.scene)==null?void 0:e.value},get camera(){var e;return(e=h.camera)==null?void 0:e.value},get width(){var e,t;return(t=(e=h.sizes)==null?void 0:e.width)==null?void 0:t.value},get height(){var e,t;return(t=(e=h.sizes)==null?void 0:e.height)==null?void 0:t.value},get dom(){var e;return(e=h.renderer)==null?void 0:e.value.domElement.parentElement},get canvas(){var e;return(e=h.renderer)==null?void 0:e.value.domElement},events:{},init(e,t,n,s){h.scene=e,h.renderer=t,h.camera=n,h.sizes=s},load(e){const t={"1d0e8871-bd60-47f9-8ab7-232dabd30201":[{name:"SpotLightEvent",source:"this.shadow.mapSize.width = 1024 * 2\nthis.shadow.mapSize.height = 1024 * 2\nthis.shadow.camera.near = 1\nthis.shadow.camera.far = 10\nthis.shadow.bias = -0.0075\nthis.shadow.radius = 24\nthis.target.position.copy(this.position.clone().setY(0))\nfunction update( event ) {}"}],"beea1423-1e37-47ab-9443-f8429259e120":[{name:"dirb",source:"this.shadow.mapSize.width = 1024 * 2\nthis.shadow.mapSize.height = 1024 * 2\nthis.shadow.camera.near = 1\nthis.shadow.camera.far = 50\nthis.shadow.camera.top = 80\nthis.shadow.camera.bottom = -80\nthis.shadow.camera.left = -80\nthis.shadow.camera.right = 80\nthis.shadow.radius = 24\nthis.shadow.bias = -0.0075\nfunction update( event ) {}"}],"31517222-A9A7-4EAF-B5F6-60751C0BABA3":[{name:"senceScirpt",source:"this.environment.mapping = THREE.EquirectangularReflectionMapping;\nthis.environment.colorSpace = THREE.SRGBColorSpace;\nfunction update( event ) {}"}]};this.events={init:[],start:[],stop:[],keydown:[],keyup:[],pointerdown:[],pointerup:[],pointermove:[],update:[]};let n="player,renderer,scene,camera";const s={};for(const a in this.events)n+=",".concat(a),s[a]=a;const r=JSON.stringify(s).replace(/\"/g,"");for(const a in t){let u=a;a===e.uuid&&(u=this.scene.uuid);const d=this.scene.getObjectByProperty("uuid",u,!0);if(d===void 0){console.warn("player: Script without object.",u);continue}const m=t[a];for(let o=0;o<m.length;o++){const v=m[o],y=new Function(n,"".concat(v.source,"\nreturn ").concat(r,";")).bind(d)(this,this.renderer,this.scene,this.camera);for(const i in y)if(y[i]!==void 0){if(this.events[i]===void 0){console.warn("player: Event type not supported (",i,")");continue}this.events[i].push(y[i].bind(d))}}this.dispatch(this.events.init,arguments)}},dispatch(e,t){for(let n=0,s=e.length;n<s;n++)e[n](t)},setCamera(e){console.warn("暂时不考虑摄像机的设置函数",e)},setScene(e){console.warn("暂时不考虑场景的设置函数",e)},setPixelRatio(e){console.warn("暂时不考虑像素比的设置函数",e)},setSize(e){console.warn("暂时不考虑尺寸的设置函数",e)},dispose(){console.warn("暂时不考虑释放资源的函数")},onKeyDown(e){c.dispatch(c.events.keydown,e)},onKeyUp(e){c.dispatch(c.events.keyup,e)},onPointerDown(e){c.dispatch(c.events.pointerdown,e)},onPointerUp(e){c.dispatch(c.events.pointerup,e)},onPointerMove(e){c.dispatch(c.events.pointermove,e)},play(){document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp),document.addEventListener("pointerdown",this.onPointerDown),document.addEventListener("pointerup",this.onPointerUp),document.addEventListener("pointermove",this.onPointerMove),this.dispatch(this.events.start,null)},stop(){document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp),document.removeEventListener("pointerdown",this.onPointerDown),document.removeEventListener("pointerup",this.onPointerUp),document.removeEventListener("pointermove",this.onPointerMove),this.dispatch(this.events.stop,arguments)},render(e,t){this.dispatch(this.events.update,{time:e,delta:t})}},Q=[{x:-16.017528533935547,y:2.4581613540649414,z:53.098697662353516},{x:-11.40013599395752,y:2.4513251781463623,z:43.62754821777344},{x:-7.9051361083984375,y:2.4462289810180664,z:36.4436149597168},{x:-5.53253173828125,y:2.442873001098633,z:31.546899795532227},{x:-4.282320976257324,y:2.4412572383880615,z:28.937395095825195},{x:-3.9756288528442383,y:2.4410974979400635,z:28.24086570739746},{x:-3.7963345050811768,y:2.4410974979400635,z:27.74983024597168},{x:-3.6438193321228027,y:2.4410974979400635,z:27.253768920898438},{x:-3.5180840492248535,y:2.4410974979400635,z:26.75269317626953},{x:-3.419203519821167,y:2.4411063194274902,z:26.243703842163086},{x:-3.3517673015594482,y:2.4416656494140625,z:25.55027961730957},{x:-3.318483829498291,y:2.4430952072143555,z:24.5682430267334},{x:-3.319352865219116,y:2.445394515991211,z:23.297592163085938},{x:-3.354374647140503,y:2.448564052581787,z:21.73832893371582},{x:-3.4121222496032715,y:2.4521596431732178,z:19.611284255981445},{x:-3.461057662963867,y:2.454956293106079,z:16.145946502685547},{x:-3.49935245513916,y:2.456882953643799,z:11.297648429870605},{x:-3.5270066261291504,y:2.457939386367798,z:5.066390037536621},{x:-3.544764518737793,y:2.4581613540649414,z:-2.423649311065674},{x:-3.565464973449707,y:2.4581613540649414,z:-9.03036880493164},{x:-3.5937604904174805,y:2.4581613540649414,z:-13.977668762207031},{x:-3.629650592803955,y:2.4581613540649414,z:-17.265522003173828},{x:-3.673135280609131,y:2.4581613540649414,z:-18.893949508666992},{x:-3.7082104682922363,y:2.4581613540649414,z:-19.473438262939453},{x:-3.7077581882476807,y:2.4581613540649414,z:-20.038450241088867},{x:-3.6713337898254395,y:2.4581613540649414,z:-20.605941772460938},{x:-3.5989370346069336,y:2.4581613540649414,z:-21.175914764404297},{x:-3.3510568141937256,y:2.4581613540649414,z:-22.262161254882812},{x:-1.7961064577102661,y:2.4581615924835205,z:-28.032060623168945},{x:1.3139424324035645,y:2.4581618309020996,z:-39.39905548095703},{x:5.9790754318237305,y:2.458162546157837,z:-56.36309814453125},{x:12.19931411743164,y:2.458163261413574,z:-78.92425537109375}],X=!1,Z={points:Q,closed:X};function ee(e){const t=e.points,n=[];for(const r of t){const a=r.x,u=r.y,d=r.z;n.unshift(new O(a,u,d))}const s=new T(n);return s.closed=e.closed,s}const g=ee(Z),_=new $;function te(e){const t=g.points.length/2,n=new F(e.geometry,e.material,t);n.userData={progresses:[]};for(let s=0;s<t;s++){const r=s/(t-1),a=g.getPointAt(r);n.userData.progresses[s]=r,_.setPosition(a),n.setMatrixAt(s,_)}return n}function ne(e){const t=e.userData.progresses;for(let n=0;n<e.count;n++){const s=g.getPointAt(t[n]);_.setPosition(s),e.setMatrixAt(n,_),t[n]+=5e-4,t[n]>1&&(t[n]=0)}e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere()}function se(e){const t=[];t.push(e[2].clone()),t.push(e[4].clone()),t.push(e[5].clone()),t.push(e[2].clone()),t.push(e[5].clone()),t.push(e[4].clone()),t.push(e[2].clone()),t.push(e[4].clone());for(let n=0;n<t.length;n++){const s=n/t.length*.6;t[n].userData={progress:s};const r=g.getPointAt(s);t[n].position.copy(r),t[n].visible=!0}return t}function oe(e){for(let t=0;t<e.length;t++){e[t].userData.progress+=5e-4,e[t].userData.progress>.6&&(e[t].userData.progress=0);const n=e[t].userData.progress,s=g.getPointAt(n);e[t].name==="flat_item"&&(s.y=1.5),e[t].position.copy(s)}}function ie(e){const t=[];for(let n=0;n<6;n++){t.push(e[3].clone());const s=1-n/6*.4-.04;t[n].userData={progress:s};const r=g.getPointAt(s);t[n].position.copy(r),t[n].visible=!0}return t}function re(e){for(let t=0;t<e.length;t++){e[t].userData.progress+=5e-4,e[t].userData.progress>1&&(e[t].userData.progress=1-5/6*.4-.04);const n=e[t].userData.progress,s=g.getPointAt(n);e[t].position.copy(s)}}const ae=["object"],ce=["object"],ue=["object"],le=["object"],pe=["object"],de=["object"],he=["object"],me=x({__name:"firstLevel-bf61e255d699",props:{object:{}},setup(e){const t=e,{scene:n}=M(),s=te(t.object[1]);n.value.add(s);const r=se(t.object),a=new E;a.position.set(0,1,0),a.add(...r),n.value.add(a);const u=ie(t.object),d=new E;d.add(...u),d.position.set(0,1,0),n.value.add(d);const{onLoop:m}=S();return m(({delta:o,elapsed:v})=>{s&&ne(s),r&&oe(r),u&&re(u)}),(o,v)=>(b(),P(j,null,[p("primitive",{object:o.object[0]},null,8,ae),p("primitive",{object:o.object[1],visible:!1},null,8,ce),p("primitive",{object:o.object[2]},null,8,ue),p("primitive",{object:o.object[4]},null,8,le),p("primitive",{object:o.object[5]},null,8,pe),p("primitive",{object:o.object[6]},null,8,de),p("primitive",{object:o.object[3]},null,8,he)],64))}}),ve=["object"],fe=["object"],ge=["object"],ye=["object"],we=["object"],be=x({__name:"scene",async setup(e){let t,n;const{scene:s,renderer:r,camera:a,sizes:u}=M();c.init(s,r,a,u);const d=new B,m=([t,n]=z(()=>D("./plugins/tresEditor/svelteMachine/json/scene.json")),t=await t,n(),t);if(m.geometries){for(const i of m.geometries)if(i.data&&i.data.startsWith("url:")){let l=i.data.slice(4);l.startsWith("geometries/")&&(l="./plugins/tresEditor/svelteMachine/".concat(l)),i.data=([t,n]=z(()=>D(l)),t=await t,n(),t)}}if(m.images){for(const i of m.images)if(i.url&&i.url.startsWith("url:")){let l=i.url.slice(4);l.startsWith("images/")&&(l="./plugins/tresEditor/svelteMachine/".concat(l)),i.url=([t,n]=z(()=>V(l)),t=await t,n(),t)}}const o=d.parse(m),v=R(null);K(()=>{if(s.value.background=o.background,s.value.environment=o.environment,s.value.fog=o.fog,c.load(o),c.play(),v.value){const i=v.value;i.target.position.set(-3.8,0,-2.3),s.value.add(i.target),i.angle=Math.PI/2.5}});const{onLoop:y}=S();return y(({delta:i,elapsed:l})=>{if(c.renderer&&c.render(l*1e3,i*1e3),v.value){const k=v.value;k.intensity=100+Math.sin(l*2)*100}}),(i,l)=>(b(),P(j,null,[p("primitive",{object:f(o).children[0]},[w(me,{object:f(o).children[0].children},null,8,["object"])],8,ve),p("primitive",{object:f(o).children[1]},null,8,fe),p("primitive",{object:f(o).children[2]},null,8,ge),p("primitive",{object:f(o).children[3]},null,8,ye),p("primitive",{object:f(o).children[4],ref_key:"spotLightRef",ref:v},null,8,we)],64))}}),Le=x({__name:"svelteMachine",setup(e){const t=U({clearColor:"#201919",windowSize:!0,antialias:!0,shadows:!0,shadowMapType:2,toneMapping:3,toneMappingExposure:1.75}),n={metadata:{version:4.6,type:"Object",generator:"Object3D.toJSON"},object:{type:"PerspectiveCamera",name:"Camera",layers:1,matrix:[-.6267758441936044,-27755575615628914e-33,.7791996157182023,0,.48061725621232265,.787112942007701,.3866009176850464,0,-.6133181019392243,.6168088978962458,-.49334337870258826,0,-80.48773984917322,89.13969162136891,-91.54490099940386,1],up:[0,1,0],fov:50,zoom:1,near:.01,far:1e3,focus:10,aspect:1.1063238359972203,filmGauge:35,filmOffset:0}},r=new B().parse(n),a=R(null);return J(()=>a.value,u=>{u.copy(r)}),(u,d)=>(b(),P(j,null,[w(f(Y)),w(f(N),W(H(t)),{default:L(()=>[w(f(q)),p("TresPerspectiveCamera",{ref_key:"cameraRef",ref:a,uuid:"9ca45c84-3c16-48da-b0a2-9e469abea3d1",name:"Camera"},null,512),(b(),G(I,null,{default:L(()=>[w(be)]),_:1}))]),_:1},16)],64))}});export{Le as default};
