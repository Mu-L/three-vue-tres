<template>
    <TresGroup :rotation-x="isRotation ? -Math.PI / 2 : 0">
        <primitive :object="tiles.group" />
    </TresGroup>
</template>

<script lang="ts" setup>
import { useTres, useLoop } from '@tresjs/core'
import { watch } from 'vue'
import { TilesRenderer } from '3d-tiles-renderer'
import { alignmentCenter, applyTransform } from '../common/utils'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexShader from '../shaders/buildingsShaderMaterial.vert'
import fragmentShader from '../shaders/buildingsShaderMaterial.frag'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'

const props = withDefaults(
    defineProps<{
        tilesUrl?: string
        isRotation?: boolean
        isRranslation?: boolean
        bulidingsColor?: string
        topColor?: string
        lightColor?: string
        borderWidth?: number
        opacity?: number
        gradient?: boolean
        speed?: number
        lineOpacity?: number
        linewidth?: number
        lineColor?: string
    }>(),
    {
        tilesUrl: './plugins/geokit/tiles/tileset.json',
        isRotation: true,
        isRranslation: true,
        bulidingsColor: '#e523ff',
        topColor: '#ffff00',
        lightColor: '#ffffff',
        borderWidth: 5,
        opacity: 0.8,
        gradient: true,
        speed: 1.0,
        lineOpacity: 1.0,
        linewidth: 1.0,
        lineColor: '#000000',
    },
)

//  https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/sz_ns/tileset.json
//  https://jdvop.oss-cn-qingdao.aliyuncs.com/mapv-data/titleset/shanghai/tileset.json
//  ./plugins/geokit/tiles/tileset.json

const timeDelta = { value: 0 }
const setEffectMaterial = (mesh: any) => {
    mesh.userData.builds = true
    const { geometry } = mesh
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    const { max, min } = geometry.boundingBox
    const buildingMaterial = new CustomShaderMaterial({
        baseMaterial: new THREE.MeshPhongMaterial(),
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        silent: true,
        uniforms: {
            uMax: { value: max },
            uMin: { value: min },
            uBorderWidth: { value: props.borderWidth },
            uCircleTime: { value: 5 },
            uColor: {
                value: new THREE.Color(props.bulidingsColor),
            },
            uOpacity: {
                value: props.opacity,
            },
            uLightColor: {
                value: new THREE.Color(props.lightColor),
            },
            uTopColor: {
                value: new THREE.Color(props.topColor),
            },
            uTime: timeDelta,
            uGradient: {
                value: props.gradient,
            },
        },
        depthWrite: true,
        depthTest: true,
        transparent: true,
        side: THREE.DoubleSide,
    })
    mesh.material.dispose()
    mesh.material = buildingMaterial
}
const edgesMaterial = new LineMaterial({
    color: props.lineColor,
    linewidth: props.linewidth,
    opacity: props.lineOpacity,
    transparent: true,
    depthWrite: false,
    depthTest: true,
}) as any
edgesMaterial.resolution.set(window.innerWidth, window.innerHeight)

const setEdgesLines = (mesh: any) => {
    const edges = new THREE.EdgesGeometry(mesh.geometry.clone())
    let geometry = new LineSegmentsGeometry()
    let wideEdges = geometry.fromEdgesGeometry(edges)
    const line = new LineSegments2(wideEdges, edgesMaterial)
    line.userData.lines = true
    line.applyMatrix4(mesh.matrix.clone())
    mesh.parent.add(line)
}
const onLoadModel = ({ scene }: any) => {
    scene.traverse((c: any) => {
        if (c.isMesh && c.material) {
            setEffectMaterial(c)
            setEdgesLines(c)
        }
    })
}

const { camera, renderer, sizes } = useTres()
const setCameraAndRenderer = (newTiles: any, camera: any, renderer: any) => {
    newTiles.setCamera(camera)
    newTiles.setResolutionFromRenderer(camera, renderer)
}
const makeNewTiles = () => {
    let newTiles = new TilesRenderer(props.tilesUrl as string) as any
    newTiles.fetchOptions.mode = 'cors'
    newTiles.errorTarget = 12

    newTiles.addEventListener('load-model', onLoadModel)
    newTiles.addEventListener('load-tile-set', () => {
        alignmentCenter(newTiles, props.isRotation, props.isRranslation)
    })
    newTiles.addEventListener('dispose-model', ({ scene }) => {
        scene.traverse((c: any) => {
            if (c.material) {
                c.material.dispose()
            }
            if (c.userData && c.userData.lines) {
                c.geometry.dispose()
                c.material.dispose()
            }
        })
    })

    setCameraAndRenderer(newTiles, camera.value, renderer)
    return newTiles
}
let tiles = makeNewTiles()

watch(
    camera,
    () => {
        if (camera.value) {
            setCameraAndRenderer(tiles, camera.value, renderer)
        }
    },
    { immediate: true },
)
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
    if (camera.value && sizes.width.value && tiles.update) {
        camera.value.updateMatrixWorld()
        tiles.update()
        timeDelta.value += delta * props.speed
    }
})

watch(
    () => [props.bulidingsColor, props.topColor, props.lightColor, props.borderWidth, props.opacity, props.gradient],
    ([bulidingsColor, topColor, lightColor, borderWidth, opacity]) => {
        tiles.group.traverse((mesh: any) => {
            if (mesh.isMesh && mesh.userData && mesh.userData.builds) {
                mesh.material.uniforms.uColor.value.set(bulidingsColor)
                mesh.material.uniforms.uTopColor.value.set(topColor)
                mesh.material.uniforms.uLightColor.value.set(lightColor)
                mesh.material.uniforms.uBorderWidth.value = borderWidth
                mesh.material.uniforms.uOpacity.value = opacity
                mesh.material.uniforms.uGradient.value = props.gradient
                mesh.material.needsUpdate = true
            }
        })
    },
)
watch(
    () => [props.lineColor, props.linewidth, props.lineOpacity],
    ([lineColor, linewidth, lineOpacity]) => {
        edgesMaterial.color.set(lineColor)
        edgesMaterial.linewidth = linewidth
        edgesMaterial.opacity = lineOpacity
        edgesMaterial.needsUpdate = true
    },
)
watch(
    () => props.tilesUrl,
    (tilesUrl) => {
        if (tilesUrl !== tiles.rootURL) {
            tiles.dispose()
            tiles = makeNewTiles()
        }
    },
)
watch(
    () => [props.isRotation, props.isRranslation],
    () => {
        if (tiles.group) {
            applyTransform(tiles.group, props.isRotation, props.isRranslation)
        }
    },
)
</script>
