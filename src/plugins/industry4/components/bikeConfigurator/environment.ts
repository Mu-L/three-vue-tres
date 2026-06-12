import * as THREE from 'three'
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js'
import { ENVIRONMENT_FILES } from './config'
import type { EnvironmentId } from './types'

export class BikeEnvironment {
    private background: THREE.Texture | null = null
    private target: THREE.WebGLRenderTarget | null = null
    private requestId = 0
    private loader = new HDRLoader()

    constructor(
        private renderer: THREE.WebGLRenderer,
        private scene: THREE.Scene,
    ) {}

    async set(environmentId: EnvironmentId) {
        const requestId = ++this.requestId
        const texture = await this.loader.loadAsync(ENVIRONMENT_FILES[environmentId])
        if (requestId !== this.requestId) {
            texture.dispose()
            return
        }

        const pmrem = new THREE.PMREMGenerator(this.renderer)
        texture.mapping = THREE.EquirectangularReflectionMapping
        const nextTarget = pmrem.fromEquirectangular(texture)

        this.background?.dispose()
        this.target?.dispose()

        this.background = texture
        this.target = nextTarget
        this.scene.environment = nextTarget.texture
        this.scene.background = texture
        pmrem.dispose()
    }

    dispose() {
        this.requestId++
        this.background?.dispose()
        this.target?.dispose()
    }
}
