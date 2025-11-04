<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-11-04 09:13:02
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-11-04 09:24:58
-->
<template>
    <component v-if="shapeComponent" :is="shapeComponent" :args="modelValue.args" />
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Plane,
  Ring,
  RoundedBox,
  Sphere,
  Tetrahedron,
  Torus,
  TorusKnot,
} from "@tresjs/cientos";

const shapeMap: Record<string, any> = {
  Box,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Plane,
  Ring,
  RoundedBox,
  Sphere,
  Tetrahedron,
  Torus,
  TorusKnot,
};

const props = defineProps<{
  modelValue: any
}>()

const shapeComponent = computed(() => {
  return shapeMap[props.modelValue?.type] ?? null;
});
</script>
