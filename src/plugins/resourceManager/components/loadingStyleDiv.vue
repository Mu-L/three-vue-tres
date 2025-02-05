<template>
    <div
        v-if="!Resource.hasAllFinished.value"
        class="absolute bg-grey-600 t-0 l-0 w-full h-full z-99999999 flex justify-center items-center text-black font-mono bg-black"
    >
        <div class="text-white">
            <div class="loader">
                <svg viewBox="0 0 800 600" xml:space="preserve">
                    <symbol id="single">
                        <path
                            d="M357.5,211.693c0,35.741,16.598,67.6,42.5,88.307
		c25.902-20.707,42.5-52.566,42.5-88.307s-16.598-67.6-42.5-88.307C374.098,144.094,357.5,175.953,357.5,211.693z"
                        />
                    </symbol>
                    <g id="leaf">
                        <use class="flo" v-for="index in 36" :key="index" xlink:href="#single" />
                    </g>
                </svg>
            </div>
            <span class="pspan" v-if="showProgress">{{ Resource.progress.value }} %</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Resource } from 'PLS/resourceManager'

const props = withDefaults(
    defineProps<{
        isDemo?: boolean
        showProgress?: boolean
    }>(),
    {
        isDemo: false,
        showProgress: true,
    },
)

const animloop = () => {
    if (Resource.progress.value++ > 100) {
        Resource.progress.value = 0
    }
    requestAnimationFrame(animloop)
}
if (props.isDemo) {
    requestAnimationFrame(animloop)
}
</script>

<style lang="scss" scoped>
#leaf {
    fill-opacity: 0.56;
    fill: #5384ff;
}

@for $i from 0 through 35 {
    .flo:nth-child(36n + #{$i}) {
        animation: leaf#{$i} 0.1 * 36s 0s ease both infinite;
    }

    @keyframes leaf#{$i} {
        0% {
            opacity: 0;
            transform: rotate(($i - 1) * 10deg);
            transform-origin: 400px 300px;
        }

        #{calc(($i) / 35)*100}% {
            opacity: 0;
            transform: rotate(($i - 1) * 10deg);
            transform-origin: 400px 300px;
        }

        #{calc($i / 35)*100 + 0.2}% {
            opacity: 0.3;
            transform: rotate($i * 10deg);
            transform-origin: 400px 300px;
        }

        100% {
            opacity: 0.3;
            transform: rotate($i * 10deg);
            transform-origin: 400px 300px;
        }
    }
}

.loader {
    width: 400px;
}

.pspan {
    text-align: center;
    width: 100%;
    display: block;
    margin-top: -50px;
}
</style>
