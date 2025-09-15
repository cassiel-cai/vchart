import { ChatCompletion } from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai'
import { readFile } from 'fs/promises'
import fs from 'fs'

// 使用百度文心一言千帆大模型
export async function run1() {
  const client = new ChatCompletion() // 创建千帆大模型客户端
  // 调用千帆大模型API
  const stream = await client.chat(
    {
      messages: [
        {
          role: 'user',
          content: '你好',
        },
        {
          role: 'assistant',
          content: '如果您有任何问题，请随时向我提问。',
        },
        {
          role: 'user',
          content: '我在上海，周末可以去哪里玩？',
        },
      ], // 消息
      stream: true, // 流式输出
    },
    'ERNIE-Speed-128K'
  ) // 使用ERNIE-Speed-128K模型
  // 流式输出
  for await (const chunk of stream as AsyncIterable<any>) {
    console.log(chunk, 'run1===>')
  }
}

// 使用阿里通义千问
const client = new OpenAI({
  apiKey: process.env['ALI_API_KEY'],
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

export async function run2() {
  const resp = await client.chat.completions.create({
    messages: [
      { role: 'system', content: '你现在是一个六岁的小孩，请模仿儿童可爱的口吻进行回答' },
      { role: 'user', content: '什么是万有引力' },
    ],
    model: 'qwen-turbo',
  })
  console.log(resp, 'run2===>')
}

// 使用阿里通义千问读图
export async function run3() {
  const imageBuffer = await readFile('/Users/orgin/Pictures/图片/loong.png')
  const base64Image = imageBuffer.toString('base64')
  const resp = await client.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '它是一张什么风格的图片',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    model: 'qwen-vl-plus',
  })
  console.log(resp, 'run3===>')
}

// 使用阿里通义千问读文件
export async function run4() {
  const fileObj = await client.files.create({
    file: fs.createReadStream('/Users/orgin/Downloads/绿链成果应用309展示方案规范/绿链成果应用309展示方案成果物汇总1012.xlsx'),
    purpose: 'file-extract' as any,
  })

  const resp = await client.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: '你是一个乐于助人的助手。',
      },
      {
        role: 'system',
        content: `fileid://${fileObj.id}`,
      },
      {
        role: 'user',
        content: '请总结出文件中的内容',
      },
    ],
    model: 'qwen-long',
  })
  console.log(resp, 'run4===>')
}
