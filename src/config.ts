import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { AppConfig, DFFAULT_CONFIG } from './types'

let configPath = path.join(app.getPath('userData'), 'config.json')
let config = { ...DFFAULT_CONFIG }

export const configManager = {
  async load() {
    try {
      const data = await fs.promises.readFile(configPath, 'utf-8')
      const parsedData = JSON.parse(data)
      config = { ...DFFAULT_CONFIG, ...parsedData }
    } catch (error) {
      await this.save()
    }

    return config
  },

  async save() {
    await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')
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
