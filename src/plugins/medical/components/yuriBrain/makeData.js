import * as THREE from 'three'
import { data } from './data'

export const randomRange = (min, max) => Math.random() * (max - min) + min
// const curves = []
// for (let i = 0; i < 100; i++){
//     const points = []
//     const length = randomRange(0.1, 1)
//     for (let j = 0; j < 100; j++) {
//         points.push(new THREE.Vector3().setFromSphericalCoords(
//             1,
//             Math.PI - (j / 100) * Math.PI*length,
//             (i / 100) * Math.PI * 2
//         )
//         )
//     }
//     const tempcurve = new THREE.CatmullRomCurve3(points)
//     curves.push(tempcurve)
// }

export const getBrainCurves = () => {
    const brainCurves = []
    const PATHS = data.economics[0].paths
    PATHS.forEach((path) => {
        const points = []
        for (let i = 0; i < path.length; i += 3) {
            points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]))
        }
        const tempcurve = new THREE.CatmullRomCurve3(points)
        brainCurves.push(tempcurve)
    })
    return brainCurves
}
