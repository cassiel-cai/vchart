import { ChatMessageProps, UniversalChunkProps } from '../types'

export abstract class BaseProvider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<any>
  protected abstract transformResponse(chunk: any): UniversalChunkProps
} // 抽象类
