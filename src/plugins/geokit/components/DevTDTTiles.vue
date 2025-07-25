<template>
    <TDTTiles :url="url" tk="890a908c5d3f6c77232b60964d74f180" />
</template>
<script setup lang="ts">
import { TDTTiles } from '@icegl/geokit'

const isDev = process.env.NODE_ENV === 'development'

const url = isDev ? '/tianditu.map' : 'https://t0.tianditu.gov.cn'
</script>
