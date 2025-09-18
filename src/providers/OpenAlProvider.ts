import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, UniversalChunkProps } from '../types'

export class OpenAlProvider extends BaseProvider {
  private client: OpenAI

  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey,
      baseURL,
    })
  }

  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat.completions.create({
      model,
      messages: messages as any,
      stream: true,
    })

    const _this = this

    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield _this.transformResponse(chunk)
        }
      },
    }
  }

  protected transformResponse(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): UniversalChunkProps {
    const choice = chunk.choices[0]

    return {
      is_end: choice.finish_reason === 'stop',
      result: choice.delta.content || '',
    }
  }
}
