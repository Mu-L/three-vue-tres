<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-06-15 10:12:29
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-28 17:12:34
-->
<template>
	<TresPoints :geometry="geometry">
		<TresPointsMaterial :size="0.01" color="#0000ff" />
	</TresPoints>
</template>
<script lang="ts" setup>
import { useLoader } from 'PLS/basic'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
const geometry = await useLoader((PLYLoader as any), './plugins/gaussianSplatting/model/luigi.ply') as any
geometry.computeVertexNormals()

</script>