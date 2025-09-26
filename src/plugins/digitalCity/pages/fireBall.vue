<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-19 16:26:48
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-09-26 14:11:33
-->

<template>
	<pagesShow>
		<template v-slot:ability>
			<fireBall />
		</template>
	</pagesShow>
</template>

<script setup lang="ts">

import pagesShow from '../components/pagesShow.vue'
import fireBall from '../components/fire/fireBall.vue'

</script>
