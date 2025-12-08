<template>
	<TresGroup>
    
        <Suspense>
            <ribbonArrow 
                :position="[-135.023,0.1,10.726]" 
                :rotation="[-1.55,0,0]" 
                :scale="[5,5,5]" 
                name="滚动箭头组件" uuid="9d8aa48a-5303-4227-b335-f1740742de50"
                :castShadow="false" :receiveShadow="false" :renderOrder="0" :visible="true"
                v-bind="eMeshState0" />
        </Suspense>
        
        <Suspense>
            <ribbonArrow 
                :position="[95.032,0.1,-45.215]" 
                :rotation="[-1.5915919188276957,-0.00017482726218845442,-3.1331871250633148]" 
                :scale="[5,5,5]" 
                name="滚动箭头组件" uuid="13b3c540-85ec-4529-93e8-a00027f08a3a"
                :castShadow="false" :receiveShadow="false" :renderOrder="0" :visible="true"
                v-bind="eMeshState1" />
        </Suspense>
        </TresGroup>
</template>

<script setup lang="ts">
import { extendMakeEvent } from '@/common/forEditor'
import { ribbonArrow } from 'PLS/floor'
            
        const eMeshState0 = {"length":60,"speed":1,"width":1.4,"bendPosition":1,"curvature":0.33,"backgroundColor":"#D32709","backgroundAlpha":0.25,"segments":240,"arrowColor":"#ffffff","arrowWidth":5.2,"arrowHeight":5.6,"arrowSpacing":4.6,"arrowOffset":0,"arrowLineWidth":18,"arrowStyle":"chevron","pixelWorldScale":0.066}
        
        const eMeshState1 = {"length":60,"speed":1,"width":1.4,"bendPosition":1,"curvature":0.33,"backgroundColor":"#0949D3","backgroundAlpha":0.25,"segments":240,"arrowColor":"#ffffff","arrowWidth":5.2,"arrowHeight":5.6,"arrowSpacing":4.6,"arrowOffset":0,"arrowLineWidth":18,"arrowStyle":"chevron","pixelWorldScale":0.066}
        </script>