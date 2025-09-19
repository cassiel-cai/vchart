export interface ProviderConfigItem {
  key: string
  label: string
  value: string
  type: 'text' | 'password' | 'number'
  required?: boolean
  placeholder?: string
}

// 百度千帆配置
export const qianfanConfig: ProviderConfigItem[] = [
  {
    key: 'accessKey',
    label: 'Access Key',
    value: '',
    type: 'text',
    required: true,
    placeholder: 'Access Key',
  },
  {
    key: 'secretKey',
    label: 'Secret Key',
    value: '',
    type: 'password',
    required: true,
    placeholder: 'Secret Key',
  },
]

// OpenAI配置
export const openaiConfig: ProviderConfigItem[] = [
  {
    key: 'apiKey',
    label: 'API Key',
    value: '',
    type: 'password',
    required: true,
    placeholder: 'API Key',
  },
  {
    key: 'baseUrl',
    label: 'Base URL',
    value: 'https://api.openai.com/v1',
    type: 'text',
    required: false,
    placeholder: 'Base URL',
  },
]

// 所有 Provider 的配置映射
export const providerConfigs: Record<string, ProviderConfigItem[]> = {
  qianfan: qianfanConfig,
  dashscope: openaiConfig,
  deepseek: openaiConfig,
}
