import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAlProvider } from './OpenAlProvider'
import { configManager } from '../config'

export function createProvider(providerName: string): BaseProvider {
  const config = configManager.get()
  const providerSettings = config.providerSettings?.[providerName] || {}
  switch (providerName) {
    case 'qianfan':
      if (!providerSettings.accessKey || !providerSettings.secretKey) {
        throw new Error('缺少千帆 API 配置： 请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerSettings.accessKey, providerSettings.secretKey)
    case 'dashscope':
      if (!providerSettings.apiKey || !providerSettings.baseUrl) {
        throw new Error('缺少通义千问 API 配置： 请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAlProvider(providerSettings.apiKey, providerSettings.baseUrl)
    case 'deepseek':
      if (!providerSettings.apiKey || !providerSettings.baseUrl) {
        throw new Error('缺少DeepSeek API 配置： 请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAlProvider(providerSettings.apiKey, providerSettings.baseUrl)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
