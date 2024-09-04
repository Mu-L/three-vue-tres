import{p as t,$ as e,N as n,t as o,d as r}from"./@tresjs.5lh7VmqZ1725416517797.js";import{B as s,q as i,C as a,f as p,V as c,cj as l,Z as u,cM as m}from"./three.VTQVqxMx1725416517797.js";import{l as f}from"./utils.CfHZ88O81725416517797.js";import{u as d}from"./@tweenjs.l4oyssFo1725416517797.js";import{f as j}from"./utils.crwMjidV1725416517797.js";import{c as h,d as y,a as g}from"./three-mesh-bvh.wPvA9dFk1725416517797.js";import{a5 as v,b as w,a2 as T,o as b,E as M,F as I,W as _,f as k,g as z,L as x,I as E,m as L,u as S,J as C,d as O,r as B,e as D,j as G,aj as P,ak as Z,al as A}from"./@vue._6MD2XyK1725416517797.js";import{m as F}from"./d3-geo.Vj6_5KAI1725416517797.js";import"./tweakpane.yHWGBmom1725416517797.js";import"./@vueuse.L-salR9N1725416517797.js";import"./@fesjs.ILazvsHx1725416517797.js";import"./vue-router.oJSnFzhA1725416517797.js";import"./lodash-es.kYt-_xTG1725416517797.js";import"./@qlin.yHhFDldE1725416517797.js";import"./pinia.QjdSMCYS1725416517797.js";import"./@floating-ui.BPbuo5Gx1725416517797.js";import"./@juggle.7yjBMqoW1725416517797.js";import"./http.75wsbWjt1725416517797.js";import"./axios.FVFoCDiv1725416517797.js";import"./color.gxrnAbwV1725416517797.js";import"./@amap.LUDXTi4z1725416517797.js";import"./color-string.66QMfrR21725416517797.js";import"./color-name.gAqnPJZD1725416517797.js";import"./simple-swizzle.csr_98op1725416517797.js";import"./is-arrayish.cXfKR_n81725416517797.js";import"./color-convert.nxoEZjxr1725416517797.js";import"./lodash.pS3Xd-E71725416517797.js";import"./naive-ui.RIrFbcMx1725416517797.js";import"./css-render.EXZu-xcP1725416517797.js";import"./@emotion.ZD_ZYAgY1725416517797.js";import"./@css-render.hBFBlhKL1725416517797.js";import"./seemly.SjiSeX2v1725416517797.js";import"./vooks.B7vvHd1-1725416517797.js";import"./evtd.DtfwxtIl1725416517797.js";import"./vueuc.ryFgoe-G1725416517797.js";import"./vdirs.wIHQhDen1725416517797.js";import"./treemate.dcEdf2le1725416517797.js";import"./date-fns.FoNnBjN01725416517797.js";import"./date-fns-tz.-_lqegeN1725416517797.js";import"./async-validator.-YBkpS4I1725416517797.js";import"./d3-array.AhNJy1f41725416517797.js";const H=["position"],R=["blending","map"],q=["name","renderOrder","pCenter"],W=["args"],U=["color","side"],$=["renderOrder","position-z"],J=["position"],N=x("TresLineBasicMaterial",{color:16777215,linewidth:.5},null,-1),V=["renderOrder"],Q=["position"],X=x("TresLineBasicMaterial",{color:0,linewidth:.5},null,-1),K={__name:"jiangSuMapMesh",async setup(r){let O,B;s.prototype.computeBoundsTree=h,s.prototype.disposeBoundsTree=y,i.prototype.raycast=g;const D=([O,B]=v((()=>f("./plugins/simpleGIS/json/320000_full.json","features"))),O=await O,B(),O),{map:G}=([O,B]=v((()=>n({map:"./plugins/simpleGIS/image/icon.png"}))),O=await O,B(),O),P=D[0].properties.centroid,Z=F();Z.center(P).translate([0,0]);const A=[];D.forEach((t=>{const e=new a("hsl( ".concat(16,", ").concat(30*Math.random()+55,"%, ").concat(30*Math.random()+55,"%)")).getHex(),n=.3*Math.random()+.3,{centroid:o,oneCenter:r,center:s,name:i}=t.properties,{coordinates:p,type:c}=t.geometry,l=o||r||s||[0,0],u=Z(l);u[1]=-u[1],u[2]=n,A.push({type:"Html",position:u,name:i});const f=Z(l);f[1]=.2-f[1],f[2]=n+.22,A.push({type:"Sprite",position:f}),p.forEach((t=>{function o(t){const o=new m;t.forEach(((t,e)=>{const[n,r]=Z(t);0===e?o.moveTo(n,-r):o.lineTo(n,-r)})),A.push({type:"Shape",shape:o,name:i,color:e,depth:n,pCenter:f});const r=[];t.forEach((t=>{const[e,n]=Z(t);r.push(e,-n,0)})),A.push({type:"Line",points:new Float32Array(r),depth:n})}"MultiPolygon"===c&&t.forEach((t=>o(t))),"Polygon"===c&&o(t)}))}));const K=w();T((()=>{K.value&&((t=>{t.rotation.x=-Math.PI/2;const e=(new p).setFromObject(t).getCenter(new c),n=[0,0];t.position.x=t.position.x-e.x-n[0],t.position.z=t.position.z-e.z-n[1]})(K.value),K.value.children.forEach((t=>{"Mesh"===t.type&&t.geometry.computeBoundsTree()})))}));const Y=t=>{t.object.material.opacity=.4},tt=t=>{t.eventObject.material.opacity=1},{camera:et,controls:nt}=t(),ot=t=>{const e=new c;e.x=t.point.x,e.y=t.point.y+10,e.z=t.point.z,j(et,e,nt)},{onBeforeLoop:rt}=e();rt((()=>{d()}));const st={wrapperClass:"wrapper",as:"div",center:!0,sprite:!0,prepend:!0,transform:!0};return(t,e)=>(b(),M("TresGroup",{ref_key:"tgRef",ref:K},[(b(),M(I,null,_(A,((t,e)=>(b(),M(I,{key:"".concat(e)},["Html"===t.type?(b(),k(S(o),L({key:0,ref_for:!0},st,{position:t.position}),{default:z((()=>[x("span",null,E(t.name),1)])),_:2},1040,["position"])):C("",!0),"Sprite"===t.type?(b(),M("TresSprite",{key:1,position:t.position,scale:.3,renderOrder:1e3},[x("TresSpriteMaterial",{color:16711680,blending:l,map:S(G)},null,8,R)],8,H)):C("",!0),"Shape"===t.type?(b(),M("TresMesh",{key:2,name:t.name,renderOrder:e,pCenter:t.pCenter,onPointerEnter:Y,onPointerLeave:tt,onClick:ot},[x("TresExtrudeGeometry",{args:[t.shape,{depth:t.depth,bevelEnabled:!1}]},null,8,W),x("TresMeshStandardMaterial",{color:t.color,emissive:0,roughness:.45,metalness:.8,transparent:!0,side:u},null,8,U)],40,q)):C("",!0),"Line"===t.type?(b(),M(I,{key:3},[x("TresLine",{renderOrder:e,"position-z":t.depth+1e-4},[x("TresBufferGeometry",{position:[t.points,3]},null,8,J),N],8,$),x("TresLine",{renderOrder:e,"position-z":-1e-4},[x("TresBufferGeometry",{position:[t.points,3]},null,8,Q),X],8,V)],64)):C("",!0)],64)))),64))],512))}},Y=lt;!function(t,e){const n=lt,o=et();for(;;)try{if(730501===parseInt(n(145))/1+parseInt(n(144))/2*(parseInt(n(133))/3)+parseInt(n(154))/4*(-parseInt(n(153))/5)+parseInt(n(129))/6*(-parseInt(n(155))/7)+parseInt(n(143))/8+parseInt(n(160))/9*(-parseInt(n(140))/10)+-parseInt(n(150))/11)break;o.push(o.shift())}catch(r){o.push(o.shift())}}();const tt=function(){let t=!0;return function(e,n){const o=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,o}}();function et(){const t=["info","155UeDcuN","31196JofqcW","7dbincd","table","TresDirectionalLight","call",'{}.constructor("return this")( )',"117qvMeOs","bind","stateObject","input","TresPerspectiveCamera","test","850524WiwERk","debu","console","TresAmbientLight","740910iidAvj","TresCanvas","gger","constructor","#ffdbd1","log","toString","585720QFmrWX","warn","chain","4203048LgjRZE","8nuUDtr","745909jwSkVr","length","apply","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","prototype","4220810oPZuHm","function *\\( *\\)"];return(et=function(){return t})()}!function(){tt(this,(function(){const t=lt,e=new RegExp(t(151)),n=new RegExp(t(148),"i"),o=mt("init");e[t(128)](o+t(142))&&n[t(128)](o+t(163))?mt():o("0")}))()}();const nt=function(){let t=!0;return function(e,n){const o=t?function(){if(n){const t=n.apply(e,arguments);return n=null,t}}:function(){};return t=!1,o}}();nt(void 0,(function(){const t=lt,e=function(){const t=lt;let e;try{e=Function("return (function() "+t(159)+");")()}catch(n){e=window}return e}(),n=e[t(131)]=e[t(131)]||{},o=[t(138),t(141),t(152),"error","exception",t(156),"trace"];for(let r=0;r<o[t(146)];r++){const e=nt[t(136)][t(149)][t(161)](nt),s=o[r],i=n[s]||e;e.__proto__=nt.bind(nt),e[t(139)]=i[t(139)][t(161)](i),n[s]=e}}))();const ot=x(Y(127),{position:[0,12,0],fov:75,near:.1,far:1e3,up:[0,0,-1]},null,-1),rt=x(Y(132),{intensity:8.8},null,-1),st=x("TresDirectionalLight",{position:[0,10,5],intensity:.2},null,-1),it=x(Y(157),{position:[0,10,-5],intensity:.2},null,-1),at=x("TresDirectionalLight",{position:[5,10,0],intensity:.2},null,-1),pt=x(Y(157),{position:[-5,10,0],intensity:.2},null,-1),ct=x("TresGridHelper",{args:[20,10]},null,-1);function lt(t,e){const n=et();return(lt=function(t,e){return n[t-=127]})(t,e)}const ut=O({__name:"jiangSuMap",setup(t){const e=Y,n=B({clearColor:e(137),alpha:!0,antialias:!0}),o=B({enableDamping:!0,dampingFactor:.05,makeDefault:!0});return(t,s)=>{const i=D(e(134));return b(),k(i,L(n,{"window-size":""}),{default:z((()=>[ot,G(S(r),P(Z(o)),null,16),rt,st,it,at,pt,ct,(b(),k(A,null,{default:z((()=>[G(K)])),_:1}))])),_:1},16)}}});function mt(t){function e(t){const n=lt;if("string"==typeof t)return function(t){}[n(136)]("while (true) {}")[n(147)]("counter");1!==(""+t/t)[n(146)]||t%20==0?function(){return!0}[n(136)](n(130)+n(135))[n(158)]("action"):function(){return!1}[n(136)](n(130)+n(135))[n(147)](n(162)),e(++t)}try{if(t)return e;e(0)}catch(n){}}export{ut as default};
