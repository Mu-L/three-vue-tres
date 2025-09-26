<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 11:05:22
-->
<template>
	<pagesShow>
		<template v-slot:ability>
				<cloudMesh />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import cloudMesh from '../components/weather/cloudMesh.vue'

</script>
