import{$ as n,d as t}from"./@tresjs.tWkmYPO61721721076264.js";import{aN as e}from"./three.fnkrvySq1721721076264.js";import{d as o,r as i,e as r,o as a,f as s,g as c,j as u,u as l,J as f,aj as p,ak as d,m}from"./@vue.Q1VpS3901721721076264.js";import"./tweakpane.yHWGBmom1721721076264.js";import"./@vueuse._hUvP73U1721721076264.js";const h=I;!function(n,t){const e=I,o=_();for(;;)try{if(429848===parseInt(e(415))/1*(-parseInt(e(378))/2)+-parseInt(e(397))/3*(parseInt(e(379))/4)+parseInt(e(380))/5+parseInt(e(382))/6*(-parseInt(e(394))/7)+parseInt(e(422))/8+parseInt(e(398))/9+-parseInt(e(402))/10*(-parseInt(e(418))/11))break;o.push(o.shift())}catch(i){o.push(o.shift())}}();const g=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[I(386)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();!function(){g(this,(function(){const n=I,t=new RegExp(n(409)),e=new RegExp(n(406),"i"),o=z("init");t[n(420)](o+n(416))&&e[n(420)](o+"input")?z():o("0")}))()}();const v=function(){let n=!0;return function(t,e){const o=n?function(){if(e){const n=e[I(386)](t,arguments);return e=null,n}}:function(){};return n=!1,o}}();v(void 0,(function(){const n=I;let t;try{t=Function(n(403)+n(384)+");")()}catch(i){t=window}const e=t[n(411)]=t[n(411)]||{},o=[n(399),"warn",n(381),n(389),n(412),n(387),n(385)];for(let r=0;r<o.length;r++){const t=v[n(391)][n(383)][n(417)](v),i=o[r],a=e[i]||t;t[n(408)]=v[n(417)](v),t[n(401)]=a.toString[n(417)](a),e[i]=t}}))();const P=f(h(373),{position:[5,5,5],fov:45,near:.1,far:1e3,"look-at":[-8,3,-3]},null,-1),w=f(h(372),{intensity:.5},null,-1),x={position:[-2,-2,-2]},y=[h(396),"a-scale"],S=f(h(400),{position:[0,2,4],intensity:1,"cast-shadow":""},null,-1),T=f(h(377),null,null,-1);function _(){const n=["TresCanvas","stateObject","77017tqVAUw","chain","bind","10417418LgYZCX","string","test","random","668864PGxgWf","debu","gger","call","TresAmbientLight","TresPerspectiveCamera","\n  void main()\n    {\n      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n      float strength = 0.05 / distanceToCenter - 0.1;\n\n      gl_FragColor = vec4(1.0, 1.0, 1.0, strength);\n    }\n  ","devicePixelRatio","TresShaderMaterial","TresGridHelper","20eZrvgq","44340YqCiRS","669170PfNgcD","info","48vJyxrF","prototype",'{}.constructor("return this")( )',"trace","apply","table","min","error","value","constructor","black","shaderParticles","320180bcPbwv","length","position","183wupXff","1175445OYAXYo","log","TresDirectionalLight","toString","20eyFHVN","return (function() ","uTime","\n  uniform float uPixelRatio;\n  uniform float uSize;\n  uniform float uTime;\n  attribute float aScale;\n\n  void main()\n  {\n      vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n      modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;\n      vec4 viewPosition = viewMatrix * modelPosition;\n      vec4 projectionPosition = projectionMatrix * viewPosition;\n\n      gl_Position = projectionPosition;\n      gl_PointSize = aScale * uSize * uPixelRatio;\n      gl_PointSize *= (1.0 / - viewPosition.z);\n  }\n  ","\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)","TresPoints","__proto__","function *\\( *\\)","action","console","exception"];return(_=function(){return n})()}const b=3e3,j=o({__name:h(393),setup(o){const g=h,v=i({clearColor:g(392),shadows:!0,alpha:!1}),_={transparent:!0,blending:e,depthWrite:!1,vertexShader:g(405),fragmentShader:g(374),uniforms:{uSize:{value:100},uPixelRatio:{value:Math[g(388)](window[g(375)],2)},uTime:{value:0}}},j=new Float32Array(9e3),I=new Float32Array(b);for(let n=0;n<b;n++)j[3*n+0]=4*Math.random(),j[3*n+1]=4*Math.random(),j[3*n+2]=4*Math[g(421)](),I[n]=Math[g(421)]();const{onLoop:z}=n();return z((({elapsed:n})=>{const t=g;_.uniforms[t(404)][t(390)]=n})),(n,e)=>{const o=g,i=r(o(413));return a(),s(i,m(v,{"window-size":""}),{default:c((()=>[P,u(l(t)),w,f(o(407),x,[f("TresBufferGeometry",{position:[l(j),3],"a-scale":[l(I),1]},null,8,y),f(o(376),p(d(_)),null,16)]),S,T])),_:1},16)}}});function I(n,t){const e=_();return(I=function(n,t){return e[n-=370]})(n,t)}function z(n){function t(n){const e=I;if(typeof n===e(419))return function(n){}[e(391)]("while (true) {}")[e(386)]("counter");1!==(""+n/n)[e(395)]||n%20==0?function(){return!0}[e(391)](e(423)+e(370))[e(371)](e(410)):function(){return!1}[e(391)]("debu"+e(370))[e(386)](e(414)),t(++n)}try{if(n)return t;t(0)}catch(e){}}export{j as default};
