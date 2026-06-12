import * as THREE from 'three'
import { SKETCH_LAYER_CONFIGS } from './config'

export async function createSketchLayers(loadedGltf: any, root: THREE.Object3D, renderer: THREE.WebGLRenderer) {
    const sketchRoot = root.getObjectByName('Canvas Sketch') || null
    const meshes: THREE.Mesh[] = []

    await Promise.all(
        SKETCH_LAYER_CONFIGS.map(async (config) => {
            const imageNode = root.getObjectByName(config.nodeName)
            if (!imageNode) return

            const texture = (await loadedGltf.parser.getDependency('texture', config.textureIndex)) as THREE.Texture
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

            const geometry = new THREE.PlaneGeometry(3004.32153, 2041.99988)
            flipPlaneTextureY(geometry)
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                color: config.color,
                opacity: config.opacity,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                side: THREE.DoubleSide,
            })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.name = `${config.nodeName}-SketchLayer`
            mesh.renderOrder = config.renderOrder
            imageNode.add(mesh)
            meshes.push(mesh)
        }),
    )

    function setVisible(visible: boolean) {
        if (sketchRoot) {
            sketchRoot.visible = visible
        }
        meshes.forEach((mesh) => {
            mesh.visible = visible
        })
    }

    function dispose() {
        meshes.forEach((mesh) => {
            mesh.geometry.dispose()
            const material = mesh.material as THREE.Material
            material.dispose()
            mesh.removeFromParent()
        })
    }

    setVisible(false)

    return {
        setVisible,
        dispose,
    }
}

function flipPlaneTextureY(geometry: THREE.BufferGeometry) {
    const uv = geometry.getAttribute('uv')
    if (!uv) return

    for (let index = 0; index < uv.count; index++) {
        uv.setY(index, 1 - uv.getY(index))
    }
    uv.needsUpdate = true
}
