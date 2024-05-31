import{a5 as f,at as h,aL as i,aa as y,o as p,c as g,a1 as n,ae as u,af as d,ad as v,ab as q,r as z,C as w,J as b,ac as C,a as m,T as M,ag as T}from"./vendor.E5SXPLW-1717132684252.js";const L="varying vec2 vUv;\nvoid main(){\n	gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n	vUv=uv;\n}",D="#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform vec3 u_mouse;\nuniform float u_time;\nvarying vec2 vUv;\nfloat sphere(vec3 p,float d){\n  return(length(p*2.)-d)/2.;\n}\n\nfloat sdPyramid(vec3 p,float h)\n{\n  float m2=h*h+.25;\n  \n  p.xz=abs(p.xz);\n  p.xz=(p.z>p.x)?p.zx:p.xz;\n  p.xz-=.5;\n  \n  vec3 q=vec3(p.z,h*p.y-.5*p.x,h*p.x+.5*p.y);\n  \n  float s=max(-q.x,0.);\n  float t=clamp((q.y-.5*p.z)/(m2+.25),0.,1.);\n  \n  float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;\n  float b=m2*(q.x+.5*t)*(q.x+.5*t)+(q.y-m2*t)*(q.y-m2*t);\n  \n  float d2=min(q.y,-q.x*m2-q.y*.5)>0.?0.:min(a,b);\n  \n  return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));\n}\nfloat sdBoxFrame(vec3 p,vec3 b,float e)\n{\n  p=abs(p)-b;\n  vec3 q=abs(p+e)-e;\n  return min(min(\n      length(max(vec3(p.x,q.y,q.z),0.))+min(max(p.x,max(q.y,q.z)),0.),\n      length(max(vec3(q.x,p.y,q.z),0.))+min(max(q.x,max(p.y,q.z)),0.)),\n      length(max(vec3(q.x,q.y,p.z),0.))+min(max(q.x,max(q.y,p.z)),0.));\n    }\n    mat2 rot2D(float angle){\n      float s=sin(angle);\n      float c=cos(angle);\n      return mat2(c,-s,s,c);\n    }\n    float map(vec3 p){\n      // p.xy*=rot2D(u_time);\n      vec3 pos=vec3(sin(u_time*10.),0.,0.);\n      float spheresdf=sphere(p,.5);\n      float BoxFramesdf=sdBoxFrame(p,vec3(.5,.3,.5),.025);\n      float entity=min(BoxFramesdf,spheresdf);\n      entity=min(sdPyramid(-p-vec3(1.,0.,0.),1.5),entity);\n      return entity;\n    }\n    \n    void main(){\n      vec3 ro=vec3(0.,0.,-4.);//起始位置\n      vec3 rd=normalize(vec3(vUv-.5,1.));//方向\n      // horizontal camera rotation\n      \n      ro.xz*=rot2D(-u_mouse.x*.001);\n      rd.xz*=rot2D(-u_mouse.x*.001);\n      ro.xy*=rot2D(-u_mouse.y*.001);\n      rd.xy*=rot2D(-u_mouse.y*.001);\n      float t=0.;\n      vec3 color=vec3(0.);\n      for(int i=0;i<80;i++){\n        vec3 p=ro+rd*t;\n        float d=map(p);\n        t+=d;\n        //优化效率\n        if(t>100.||d<.001){\n          break;\n        }\n        \n      }\n      color=vec3(t)*.2;\n      gl_FragColor=vec4(color,1.);\n      \n    }",P=["rotation"],B={ref:"TresTubeGeometryRef",args:[1e3,1e3]},F=f({__name:"rayMarchingMaterialCombination",setup(x){const{onLoop:a,onAfterLoop:r}=v(),e={transparent:!0,depthWrite:!0,depthTest:!0,side:h,vertexShader:L,fragmentShader:D,uniforms:{u_resolution:{value:new i(window.innerWidth,window.innerHeight)},u_mouse:{value:new i(0,0)},u_time:{value:0}}},s=window.innerWidth/2,c=window.innerHeight/2;let t=0,l=0;function _(o){t=o.clientX-s,l=o.clientY-c}return document.addEventListener("mousemove",_,!1),y(()=>{}),a(({elapsed:o})=>{e.uniforms.u_time.value+=.001,e.uniforms.u_mouse.value=new i(t,l)}),r(()=>{}),(o,k)=>(p(),g("TresMesh",{ref:"MeshRef",rotation:[Math.PI/2,0,0]},[n("TresPlaneGeometry",B,null,512),n("TresShaderMaterial",u(d(e)),null,16)],8,P))}}),S={ref:"perspectiveCameraRef",position:[0,1500,0],fov:45,near:1,far:1e4},R=n("TresAmbientLight",{color:"#ffffff"},null,-1),V=n("TresDirectionalLight",{position:[100,100,0],intensity:.5,color:"#ffffff"},null,-1),H=f({__name:"rayMarchingCombination",setup(x){const a={clearColor:"#000000",shadows:!0,alpha:!1,useLegacyLights:!0},r={autoRotate:!1,enableDamping:!0},{onLoop:e}=v();return e(({delta:s})=>{}),q(()=>{}),(s,c)=>{const t=z("TresCanvas");return p(),w(t,C(a,{"window-size":""}),{default:b(()=>[n("TresPerspectiveCamera",S,null,512),m(M(T),u(d(r)),null,16),R,V,m(F)]),_:1},16)}}});export{H as default};
