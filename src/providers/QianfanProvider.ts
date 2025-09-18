import { ChatCompletion } from '@baiducloud/qianfan'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, BaiduChunkProps, UniversalChunkProps } from '../types'

export class QianfanProvider extends BaseProvider {
  private client: any
  constructor(accessKey: string, secretKey: string) {
    super()
    this.client = new ChatCompletion({ QIANFAN_ACCESS_KEY: accessKey, QIANFAN_SECRET_KEY: secretKey, ENABLE_OAUTH: true })
  }

  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat(
      {
        messages,
        stream: true,
      },
      model
    )

    const _this = this

    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield _this.transformResponse(chunk)
        }
      },
    }
  }

  protected transformResponse(chunk: BaiduChunkProps): UniversalChunkProps {
    return {
      is_end: chunk.is_end,
      result: chunk.result,
    }
  }
}
