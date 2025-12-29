/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 09:39:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2025-12-29 11:26:49
 */
// @ts-ignore
import { __federation_method_setRemote, __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

import type { RemotePluginConfig } from './types'

export class RemoteInstance {
  readonly remoteName: string
	private path = ''
	private resPath = ''
  private config: RemotePluginConfig | null = null
  private loading: Promise<any> | null = null

  constructor(remoteName: string) {
    this.remoteName = remoteName
  }

  setPath(path: string) {
    if (this.path === path && this.config) return

    this.path = path
    this.config = null
    this.loading = null

    __federation_method_setRemote(this.remoteName, {
      url: () => Promise.resolve(path),
      format: 'esm',
      from: 'vite'
    })
	}
	setResPath(resPath: string) {
		this.resPath = resPath;
		(window as any).__REMOTE_ASSET_MAP__ ??= {}
	}

  async loadConfig(): Promise<RemotePluginConfig> {
    if (this.config) return this.config
    if (this.loading) return this.loading

    this.loading = __federation_method_getRemote(
      this.remoteName,
      './config'
    )
      .then((wrap: any) =>
        __federation_method_unwrapDefault(wrap)
      )
      .then((config: RemotePluginConfig) => {
        this.validateConfig(config)
				this.config = config;
				// 静态资源路径映射
				(window as any).__REMOTE_ASSET_MAP__[config.name] = this.resPath
        return config
      })
      .finally(() => {
        this.loading = null
      })

    return this.loading
	}
	
	async loadComponentModule(comFile: string): Promise<any> {
		if (!this.config) {
			throw new Error(
				`[Remote ${this.remoteName}] config not loaded`
			)
		}
		return __federation_method_getRemote(
			this.remoteName,
			comFile
		).then((wrap: any) =>
			__federation_method_unwrapDefault(wrap)
		)
	}

  getConfig() {
    return this.config
  }

  async reload() {
    this.config = null
    this.loading = null
    return this.loadConfig()
  }

  private validateConfig(config: RemotePluginConfig) {
    if (!config?.name || !Array.isArray(config.components)) {
      throw new Error(
        `[Remote ${this.remoteName}] config schema invalid`
      )
    }
  }
}
