import { ProviderProps } from './types'

export const providers: ProviderProps[] = [
  {
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthvnext.bing.com%2Fth%2Fid%2FOIP.WZEsF8Yzchv1bEJgr7AiZAHaHa%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=faedd4207db5610e08ce727948a7610ac03740bc72bb0cd029a3baf9fa5304a4&ipo=images',
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01',
  },
  {
    id: 2,
    name: 'dashscope',
    title: '阿里灵积',
    desc: '通义千问 阿里巴巴推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KgYRABrOrO5Fi-DIkSGFhgHaHa%3Fpid%3DApi&f=1&ipt=9e4e41655f5e05c65c17d0548f367af30df492f76ed8a66227cb99fdb49428b5&ipo=images',
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01',
  },
  {
    id: 3,
    name: 'deepseek',
    title: 'DeepSeek',
    desc: 'DeepSeek 深度求索推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KgYRABrOrO5Fi-DIkSGFhgHaHa%3Fpid%3DApi&f=1&ipt=9e4e41655f5e05c65c17d0548f367af30df492f76ed8a66227cb99fdb49428b5&ipo=images',
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01',
  },
]
