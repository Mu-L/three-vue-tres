import{Z as n,ai as a,aj as s,o as r,c as _,J as l}from"./vendor.3829f59f1705153304852.js";const m=["object"],b=n({__name:"model",async setup(i){let e,t;const{nodes:o}=([e,t]=a(()=>s("https://opensource-1314935952.cos.ap-nanjing.myqcloud.com/model/industry4/plane/scene.gltf",{draco:!0})),e=await e,t(),e);console.log(o),o.Sketchfab_model.getObjectByName("Floor").removeFromParent();const c=o.Sketchfab_model.getObjectByName("Cube006_Avion_0");return c.castShadow=!0,(d,u)=>(r(),_("primitive",{object:l(o).Sketchfab_model},null,8,m))}});export{b as _};
