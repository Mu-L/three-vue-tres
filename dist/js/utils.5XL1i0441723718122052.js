import{a as t,B as n,q as e,bZ as r,C as o,j as s,Z as c}from"./three.eXhPIzTa1723718122052.js";import{x as i}from"./@fesjs.KgfPPsKU1723718122052.js";import{N as a}from"./@tresjs.GO-cpSrO1723718122052.js";import{c as u,d as f,a as p}from"./three-mesh-bvh.WfZkfET01723718122052.js";!function(t,n){const e=d,r=g();for(;;)try{if(112540===-parseInt(e(428))/1*(-parseInt(e(442))/2)+parseInt(e(410))/3+parseInt(e(390))/4*(-parseInt(e(436))/5)+-parseInt(e(462))/6+parseInt(e(397))/7+-parseInt(e(453))/8*(-parseInt(e(443))/9)+-parseInt(e(429))/10*(parseInt(e(435))/11))break;r.push(r.shift())}catch(o){r.push(r.shift())}}();const l=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e.apply(n,arguments);return e=null,t}}:function(){};return t=!1,r}}();!function(){l(this,(function(){const t=d,n=new RegExp(t(420)),e=new RegExp(t(439),"i"),r=I(t(425));n[t(422)](r+"chain")&&e.test(r+t(406))?I():r("0")}))()}();const h=function(){let t=!0;return function(n,e){const r=t?function(){if(e){const t=e[d(405)](n,arguments);return e=null,t}}:function(){};return t=!1,r}}();function g(){const t=["5420GpzJBW","Box3","set","uniforms","error","value","getSize","870247vHPCyj","info","toString","getY","gger","action","min","prototype","apply","input","side","log","call","124938cGaGzn","negate","getCenter","boundingBox","table","setAttribute","material","then","bind","count","function *\\( *\\)","forEach","test","warn","constructor","init","console","push","9952eGIDek","155630cLBhPq","depthTest",'{}.constructor("return this")( )',"applyMatrix4","length","debu","121ehGitT","380jwcKqo","attributes","exception","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","setY","sub","32ziilIZ","3573zHnAhs","max","position","return (function() ","children","counter","geometry","copy","while (true) {}","__proto__","2920NcVOou","disposeBoundsTree","computeBoundingBox","computeBoundsTree","trace","config","raycast","clone","string","500346MvFhcL","transparent","divideScalar","random","features","reflectivity","getX"];return(g=function(){return t})()}h(void 0,(function(){const t=d,n=function(){const t=d;let n;try{n=Function(t(446)+t(431)+");")()}catch(e){n=window}return n}(),e=n[t(426)]=n[t(426)]||{},r=[t(408),t(423),t(398),t(394),t(438),t(414),t(457)];for(let o=0;o<r[t(433)];o++){const n=h[t(424)][t(404)][t(418)](h),s=r[o],c=e[s]||n;n[t(452)]=h[t(418)](h),n[t(399)]=c[t(399)][t(418)](c),e[s]=n}}))();const m=(n,e=!1)=>{const r=d;n[r(455)]();const{max:o,min:s}=n[r(413)];n.deleteAttribute("uv");const c=o.x-s.x,i=o.y-s.y,a=[];for(let t=0;t<n[r(437)][r(445)].count;t++)e?(a[r(427)]((n.attributes[r(445)][r(468)](t)-(s.x+o.x)/2)/c),a[r(427)]((n[r(437)][r(445)][r(400)](t)-(s.y+o.y)/2)/i)):(a.push((n[r(437)][r(445)][r(468)](t)-s.x)/c),a[r(427)]((n[r(437)][r(445)].getY(t)-s.y)/i));const u=new Float32Array(a);n.setAttribute("uv",new t(u,2))};function d(t,n){const e=g();return(d=function(t,n){return e[t-=390]})(t,n)}const w=(t,n)=>new Promise(((e,r)=>{const o=d;i(t,{},{method:"get",mergeRequest:!0})[o(417)]((t=>{const r=o;n&&e(t[n]),e(t[r(466)])})).catch((t=>{console[o(394)](t),r(t)}))})),y=t=>{const n=d,e=(new(THREE[n(391)])).setFromObject(t),r=new THREE.Vector3;e.getCenter(r),t[n(447)][n(421)]((t=>{const e=n;t[e(445)][e(441)](r)})),t[n(445)][n(450)](r.negate())},x=()=>{const t=d;n[t(404)][t(456)]=u,n[t(404)][t(454)]=f,e[t(404)][t(459)]=p},b=async t=>{const n=d,e=await a(["./plugins/water/images/Water_1_M_Normal.jpg","./plugins/water/images/Water_2_M_Normal.jpg"]),i=t[n(449)][n(460)]();m(i),i[n(456)]();const u=new r(i,{color:new o("#fff"),scale:20,flowDirection:new s(1,1),textureWidth:1024,textureHeight:1024,normalMap0:e[0],normalMap1:e[1]});return u[n(416)][n(463)]=!0,u[n(416)].depthWrite=!0,u[n(416)][n(430)]=!0,u[n(416)][n(407)]=c,u.material[n(393)][n(458)][n(395)].w=20,u[n(416)][n(393)][n(467)][n(395)]=.46,u};function j(t){const n=d,e=[];for(let o=0;o<t[n(433)];o++)e[n(427)](new s(t[o].x,t[o].y));const r=new s;for(let o=0;o<e.length;o++)r.add(e[o]);r[n(464)](e[n(433)]);for(let o=0;o<e[n(433)];o++)e[o][n(441)](r);return{points:e,centerPoint:r}}function I(t){function n(t){const e=d;if(typeof t===e(461))return function(t){}.constructor(e(451)).apply(e(448));1!==(""+t/t).length||t%20==0?function(){return!0}[e(424)](e(434)+e(401))[e(409)](e(402)):function(){return!1}[e(424)](e(434)+e(401))[e(405)]("stateObject"),n(++t)}try{if(t)return n;n(0)}catch(e){}}export{y as a,j as g,x as i,w as l,m as r,b as s};
