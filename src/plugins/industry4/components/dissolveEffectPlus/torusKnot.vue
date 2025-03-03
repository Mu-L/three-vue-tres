<template>
    <TresGroup>
        <TresMesh :geometry="knotGeometry">
            <material color="#636363" :metalness="2" :roughness="0" v-bind="$attrs" />
        </TresMesh>
        <Suspense>
            <particlesPoints :geo="knotGeometry" v-bind="$attrs" :uColor="$attrs.uEdgeColor" />
        </Suspense>
    </TresGroup>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import material from './material.vue'
import particlesPoints from './particlesPoints.vue'

const knotGeometry = new THREE.TorusKnotGeometry(3, 1, 64, 8, 2, 3)
</script>
