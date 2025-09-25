<script setup lang="ts">
import { watch, ref, nextTick, useAttrs, onMounted } from 'vue'
import { Html } from '@tresjs/cientos'
import { getUUID } from 'PLS/goView/lib/utils/global'

const props = withDefaults(
    defineProps<{
        center?: boolean
        transform?: boolean
        sprite?: boolean
        distanceFactor?: number
        domContent?: string
        domID?: string
        // canClick?: boolean
        // clickFun?: () => void
    }>(),
    {
        center: false, // 无法实时更新 故
        transform: false, // 无法实时更新 故
        sprite: false,
        distanceFactor: 1,
        domContent: `
                <div class="boxStyle1 pos-relative left-20 top--30 text-white" style="padding: 10px;border-left: 10px solid #336699;background-image: linear-gradient(132deg, #00336680, #00336610);">
                    这是正方形 📦
                </div>
            `,
        // canClick: true,
        // clickFun: () => {
        //     console.log('domPanel点击事件', event)
        // },
    },
)
const domID = props.domID ?? getUUID() // crypto.randomUUID()
const mustReBuildDom = ref(false)
const mustReBuildContent = ref(false)
watch(
    () => [props.transform, props.center, props.distanceFactor, props.domContent],
    () => {
        if (!mustReBuildDom.value) {
            mustReBuildDom.value = true
            nextTick(() => {
                mustReBuildDom.value = false
                mustReBuildContent.value = true
            })
        }
    },
)
const updateVisible = () => {
    let visible = true
    if (attrs.visible === undefined) {
        visible = true
    } else {
        if (attrs.visible === '' || attrs.visible) {
            visible = true
        } else {
            visible = false
        }
    }
    const dom = document.getElementById(domID)
    if (dom) {
        dom.style.display = visible ? '' : 'none'
    }
}
const attrs = useAttrs()
watch(
    () => attrs.visible,
    () => {
        updateVisible()
    },
)

const setDomContent = () => {
    const dom = document.getElementById(domID)
    if (dom) {
        dom.innerHTML = props.domContent
    }
    updateVisible()
}
watch(
    () => mustReBuildContent.value,
    (mrbc) => {
        if (mrbc) {
            nextTick(() => {
                setDomContent()
                mustReBuildContent.value = false
            })
        }
    },
)

onMounted(() => {
    nextTick(() => {
        setDomContent()
    })
})
</script>
<template>
    <Html wrapperClass="tvtDomPanelClass" v-if="!mustReBuildDom" :transform="transform" :sprite="sprite"
        :center="center" :distanceFactor="transform ? distanceFactor : undefined">
    <!-- <div class="childWrapper" v-html="domContent" @click="(event) => clickFun()" /> -->
    <!-- <div class="childWrapper" v-html="domContent" /> -->
    <div :id="domID" class="childWrapper" />

    </Html>
</template>

<style lang="less">
.tvtDomPanelClass>div:first-of-type {
    position: relative !important;
}

.tvtDomPanelClass {
    user-select: none;
    pointer-events: none !important;

    #inner,
    .childWrapper {
        user-select: none;
        pointer-events: none !important;
        // div {
        //     pointer-events: all !important;
        // }
    }
}
</style>
