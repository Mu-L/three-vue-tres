<template>
	<TresGroup>
		<Suspense>
			<Text3D v-if="loadedFont" :text="text" :font="font" :size="size" :height="height" :curveSegments="curveSegments"
				:bevelEnabled="bevelEnabled" :bevelThickness="bevelThickness" :bevelSize="bevelSize" :bevelOffset="bevelOffset"
				:bevelSegments="bevelSegments" :center="center" :needUpdates="true">
				<MaterialSelector :type="materialType" :material-props="materialProps" />
			</Text3D>
		</Suspense>
	</TresGroup>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useLoader } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { MaterialSelector } from 'PLS/basic'
import { type MaterialType as mType  } from 'PLS/basic/components/forCientos/MaterialSelector/materials'

const props = defineProps({
	ttfUrl: {
		default: './plugins/UIdemo/fonts/优设标题黑.ttf',
	},
	text: {
		default: '3D文字展示组件',
	},
	size: {
		default: 0.5,
	},
	height: {
		default: 0.2,
	},
	curveSegments: {
		default: 5,
	},
	bevelEnabled: {
		default: true,
	},
	bevelThickness: {
		default: 0.05,
	},
	bevelSize: {
		default: 0.02,
	},
	bevelOffset: {
		default: 0,
	},
	bevelSegments: {
		default: 4,
	},
	center: {
		default: true,
	},
	materialType: {
		type: String as () => mType,
		default: 'MeshStandardMaterial',
	},
	materialProps: {
		type: Object,
		required: true
	},
})


const fontLoader = new FontLoader()
const { state: ttf } = useLoader(
	TTFLoader,
	props.ttfUrl,
)

const loadedFont = ref(false)
let font: any = null
watch(
	() => ttf.value,
	(f) => {
		if (f) {
			font = fontLoader.parse(f)
			loadedFont.value = true
		}
	},
	{ immediate: true }
)
</script>