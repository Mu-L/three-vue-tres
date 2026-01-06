/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2025-12-29 09:39:35
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2026-01-05 15:47:17
 */
// @ts-ignore
import { __federation_method_setRemote, __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

import { defineAsyncComponent, type Component } from 'vue'
import type { RemotePluginConfig } from './types'

export class RemoteInstance {
  readonly remoteName: string
  private path = ''
  private resPath = ''
  private config: RemotePluginConfig | null = null
  private loading: Promise<any> | null = null

  /** 异步组件缓存（最终目标） */
  private asyncComponentCache = new Map<string, Component>()

  /** 模块加载缓存（底层） */
  private moduleCache = new Map<string, Promise<any>>()

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
    (window as any).__REMOTE_ASSET_MAP__ ??= {};
    // 静态资源路径映射
    (window as any).__REMOTE_ASSET_MAP__[this.remoteName] = this.resPath
  }

  async loadConfig(): Promise<RemotePluginConfig> {
    if (this.config) return this.config
    if (this.loading) return this.loading

    this.loading = __federation_method_getRemote(
      this.remoteName,
      './config'
    )
      .then((wrap: any) => __federation_method_unwrapDefault(wrap))
      .then((config: RemotePluginConfig) => {
        this.validateConfig(config)
        this.config = config;
        return config
      })
      .catch((err: any) => {
        this.config = null
        console.error(`[Remote ${this.remoteName}] load config failed:`, err)
        throw err
      })
      .finally(() => {
        this.loading = null
      })

    return this.loading
  }

  async loadComponentModule(comFile: string): Promise<any> {
    // if (!this.config) {
    //   throw new Error(
    //     `[Remote ${this.remoteName}] config not loaded`
    //   )
    // }

    // 1️⃣ 命中缓存（包含加载中 & 已完成）
    if (this.moduleCache.has(comFile)) {
      return this.moduleCache.get(comFile)!
    }

    const loadingPromise = __federation_method_getRemote(
      this.remoteName,
      comFile
    ).then((wrap: any) =>
      __federation_method_unwrapDefault(wrap)
    ).catch((err: any) => {
      // ❗失败要清缓存，避免一直拿到 reject 的 Promise
      this.moduleCache.delete(comFile)
      throw err
    })

    // 3️⃣ 写入缓存（在 await 之前）
    this.moduleCache.set(comFile, loadingPromise)

    return loadingPromise
  }

  /** 对外：获取异步组件（defineAsyncComponent 缓存） */
  getAsyncComponent(type: string) {
    if (this.asyncComponentCache.has(type)) {
      return this.asyncComponentCache.get(type)!
    }

    const comFile = `./${type}`

    const asyncComp = defineAsyncComponent(async () => {
      const mod = await this.loadComponentModule(comFile)
      return mod
    })

    this.asyncComponentCache.set(type, asyncComp)
    return asyncComp
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
