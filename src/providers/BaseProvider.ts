import { ChatMessageProps } from '../types'

export abstract class BaseProvider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<any>
} // 抽象类
