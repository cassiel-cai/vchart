import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { AppConfig, DFFAULT_CONFIG } from './types'

let configPath = path.join(app.getPath('userData'), 'config.json')
let config = { ...DFFAULT_CONFIG }

export const configManager = {
  async load() {
    try {
      const data = await fs.readFile(configPath, 'utf-8' as any)
      config = { ...DFFAULT_CONFIG, ...JSON.parse(data as any) }
    } catch {
      await this.save()
    }
  },

  async save() {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8' as any)
    return config
  },

  async update(newConfig: Partial<AppConfig>) {
    config = { ...config, ...newConfig }
    await this.save()
    return config
  },

  get() {
    return config
  },
}
