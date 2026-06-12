import * as THREE from 'three'
import type { FrameId, FrameRole, FrameTarget, MaterialLike, WheelId } from './types'

const frameMaterialByRole: Record<FrameId, Record<FrameRole, string>> = {
    '1': { main: 'Carbon', left: 'Carbon', right: 'Carbon' },
    '2': { main: 'PlasticMaterial', left: 'PlasticMaterial', right: 'PlasticMaterial' },
    '3': { main: 'PlasticMaterial 2', left: 'PlasticMaterial 2', right: 'PlasticMaterial 2' },
    '4': { main: 'BrushedMetal', left: 'BrushedMetal', right: 'BrushedMetal' },
    '5': { main: 'PlasticMaterial 1', left: 'PlasticMaterial 1 Var', right: 'PlasticMaterial 1 Var' },
    simgood: { main: 'Rahmen_sim', left: 'BeamLeft_sim', right: 'BeamRight_sim' },
    simbad: { main: 'Rahmen_sim bad part', left: 'BeamLeft_sim bad part', right: 'BeamRight_sim bad part' },
}

const wheelMaterialMap: Record<WheelId, string> = {
    '1': 'Color 1',
    '2': 'Color 4',
    '3': 'Color 5',
    '4': 'Color 2',
    '5': 'Color 3',
}

const wheelTargetNames = ['Shape_5559', 'Shape_5603 1', 'Shape_5559 1', 'Shape_5603', 'Shape_10432']
const frameMaterialNames = new Set(['Carbon', 'Rahmen'])
const hardwarePathMarkers = ['Daempfer_', 'Gummi-Metall', 'ISO_', 'Pedale', 'Steuersatz_']

export function collectMaterials(root: THREE.Object3D) {
    const materialMap = new Map<string, THREE.Material>()
    root.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (!mesh.isMesh) return

        getMaterials(mesh.material).forEach((material) => {
            if (material.name && !materialMap.has(material.name)) {
                materialMap.set(material.name, material)
            }
            const standardMaterial = material as THREE.MeshStandardMaterial
            if (standardMaterial.envMapIntensity !== undefined) {
                standardMaterial.envMapIntensity = 1.35
            }
        })
    })
    return materialMap
}

export function createMaterialController(root: THREE.Object3D, materialMap: Map<string, THREE.Material>) {
    const frameTargets = collectFrameTargets(root)
    const wheelTargets = resolveMeshTargets(root, wheelTargetNames)

    function applyFrame(frameId: FrameId) {
        const roleMap = frameMaterialByRole[frameId]
        frameTargets.forEach(({ mesh, role }) => {
            const material = materialMap.get(roleMap[role])
            if (material) {
                mesh.material = material
            }
        })
    }

    function applyWheel(wheelId: WheelId) {
        const sourceMaterial = materialMap.get(wheelMaterialMap[wheelId]) as THREE.MeshStandardMaterial | undefined
        if (!sourceMaterial?.color) return

        wheelTargets.forEach((mesh) => {
            getMaterials(mesh.material).forEach((material) => {
                const colorMaterial = material as THREE.MeshStandardMaterial
                if (!colorMaterial.color) return
                colorMaterial.color.copy(sourceMaterial.color)
                colorMaterial.needsUpdate = true
            })
        })
    }

    return {
        applyFrame,
        applyWheel,
    }
}

function collectFrameTargets(root: THREE.Object3D) {
    const targets: FrameTarget[] = []
    root.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (!mesh.isMesh || !isFramePaintMesh(mesh)) return
        targets.push({
            mesh,
            role: getFrameRole(mesh),
        })
    })
    return targets
}

function isFramePaintMesh(mesh: THREE.Mesh) {
    const materialNames = getMaterials(mesh.material).map((material) => material.name)
    if (!materialNames.some((name) => frameMaterialNames.has(name))) return false

    const path = getObjectPath(mesh)
    if (path.includes('ColorOptions')) return false
    if (hardwarePathMarkers.some((marker) => path.includes(marker))) return false

    return path.includes('RobertS2016_Rahmen_') || materialNames.includes('Carbon')
}

function getFrameRole(mesh: THREE.Mesh): FrameRole {
    const path = getObjectPath(mesh)
    if (path.includes('Schwinge_links') || path.includes('HR-Aufnahme_li')) return 'left'
    if (path.includes('Schwinge_rechts') || path.includes('HR-Aufnahme_re') || path.includes('Schaltwerkauge')) return 'right'
    return 'main'
}

function resolveMeshTargets(root: THREE.Object3D, names: string[]) {
    return names.map((name) => root.getObjectByName(name)).filter((object): object is THREE.Mesh => Boolean((object as THREE.Mesh | undefined)?.isMesh))
}

function getMaterials(material: MaterialLike) {
    return Array.isArray(material) ? material : [material]
}

function getObjectPath(object: THREE.Object3D) {
    const names: string[] = []
    let current: THREE.Object3D | null = object
    while (current) {
        names.unshift(current.name || '')
        current = current.parent
    }
    return names.join(' > ')
}
