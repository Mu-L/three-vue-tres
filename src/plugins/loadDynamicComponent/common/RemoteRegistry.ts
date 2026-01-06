/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 09:42:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-06 08:49:38
 */
import { RemoteInstance } from './RemoteInstance'
import type { RemotePluginConfig } from './types'

export class RemoteRegistry {
  private static instance: RemoteRegistry
  private remotes = new Map<string, RemoteInstance>()

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new RemoteRegistry()
    }
    return this.instance
  }

  /** 注册或更新 remote */
  registerRemote(remoteName: string, resPath: string, path: string) {
    let remote = this.remotes.get(remoteName)

    if (!remote) {
      remote = new RemoteInstance(remoteName)
      this.remotes.set(remoteName, remote)
		}
		remote.setResPath(resPath)
    remote.setPath(path)
    return remote
	}
	getRemote(remoteName: string) {
		return this.remotes.get(remoteName)
	}

  /** 加载某个 remote 的配置 */
  async loadRemoteConfig(
    remoteName: string
  ): Promise<RemotePluginConfig> {
    const remote = this.remotes.get(remoteName)
    if (!remote) {
      throw new Error(`Remote "${remoteName}" not registered`)
    }
    return remote.loadConfig()
  }

  async getGeneralConfigNewBase(path: string) {
    this.registerRemote(
			'generalConfig',
			path + '/',
			path + '/assets/remoteEntry.js'
		)
    const generalConfig = await remoteRegistry.loadRemoteConfig('generalConfig') as any
    // 根据获得的 name 和 version 新建再注册或者获取对应的 remote
    this.registerRemote(
			generalConfig.name,
			path + '/',
			path + '/assets/remoteEntry.js'
		)
    const curConfig = await remoteRegistry.loadRemoteConfig(generalConfig.name) as any
    curConfig.serUrl = path
    return curConfig
  }

  /** 获取已加载配置 */
  getRemoteConfig(remoteName: string) {
    return this.remotes.get(remoteName)?.getConfig()
  }

  /** 加载全部 remote */
  async loadAll() {
    return Promise.all(
      [...this.remotes.values()].map(r => r.loadConfig())
    )
  }
}

export const remoteRegistry = RemoteRegistry.getInstance()