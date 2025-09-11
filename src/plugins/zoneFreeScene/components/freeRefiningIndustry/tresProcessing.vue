
    <template>
    <Suspense>
        <EffectComposerPmndrs v-if="isEffectComposerPmndrs">
            <BloomPmndrs v-if="isOneEffect('Bloom')" v-bind="postProcessing.configList.Bloom" />
            <ChromaticAberrationPmndrs
                v-if="isOneEffect('chromaticAberration')"
                :offset="new THREE.Vector2(postProcessing.configList.chromaticAberration.offsetX, postProcessing.configList.chromaticAberration.offsetY)"
                :radial-modulation="postProcessing.configList.chromaticAberration.radialModulation"
                :modulation-offset="postProcessing.configList.chromaticAberration.modulationOffset"
            />
            <GridPmndrs v-if="isOneEffect('grid')" v-bind="postProcessing.configList.grid" />
        </EffectComposerPmndrs>
    </Suspense>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as THREE from 'three'
import { EffectComposerPmndrs, BloomPmndrs, ChromaticAberrationPmndrs, GridPmndrs } from '@tresjs/post-processing'

const props = withDefaults(
    defineProps<{
        postProcessing?: any
    }>(),
    {
        postProcessing: {}
    },
)

const isEffectComposerPmndrs = computed(() => props.postProcessing.isOpenList.Bloom || props.postProcessing.isOpenList.chromaticAberration || props.postProcessing.isOpenList.grid)

const isOneEffect = (type: string) => {
    return props.postProcessing.isOpenList[type] && props.postProcessing.configList[type]
}
</script>
    