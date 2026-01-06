<template>
	<component :is="getDynamicComponent()" />
</template>

<script setup lang="ts">
import { remoteRegistry } from '../common/RemoteRegistry'

const props = defineProps<{
	dynamicComProp: any,
	dcomType: string
}>()

const getDynamicComponent = () => {
    const ri = remoteRegistry.getRemote(props.dynamicComProp.name)
    if (ri) {
        return ri.getAsyncComponent(props.dcomType)
    } else {
        const tri = remoteRegistry.registerRemote(
            props.dynamicComProp.name,
            props.dynamicComProp.serUrl + '/',
            props.dynamicComProp.serUrl + '/assets/remoteEntry.js'
        )
        return tri.getAsyncComponent(props.dcomType)
    }
}
</script>