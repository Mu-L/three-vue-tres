<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2023-11-28 10:04:13
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-22 16:54:41
-->
<template>
	<pagesShow ref="pagesShowRef">
		<template v-slot:ability>
			<markA :position="[210, 30, -50]" :scale="0.13" img="./plugins/digitalCity/image/znsba.png" :foremost="false" />

			<radraA :size="200" :radius="200" :position="[210, 30, -50]" color="#66ffff" />

			<markA :position="[-410, 19, -260]" :scale="200" img="./plugins/digitalCity/image/znsb-err.png"
				:sizeAttenuation="true" :foremost="true" />

			<radraB :position="[-410, 19, -260]" :height="0.5" :maxRadius="200" :scale-y="100" color="#ff0000" />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">
import pagesShow from '../components/pagesShow.vue'
import markA from '../components/buildings/buildingsMarkA.vue'
import radraA from '../components/radras/radraA.vue'
import radraB from '../components/radras/radraB.vue'
</script>
