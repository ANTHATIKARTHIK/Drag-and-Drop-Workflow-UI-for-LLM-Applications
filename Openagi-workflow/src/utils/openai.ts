import OpenAI from 'openai';
import { Message } from '../types';

export async function callOpenAI(
  apiKey: string,
  messages: Message[],
  model: string = 'gpt-3.5-turbo',
  maxTokens: number = 2000,
  temperature: number = 0.5
) {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const completion = await openai.chat.completions.create({
    model: model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
    messages,
    max_tokens: maxTokens,
    temperature,
  });

  return completion.choices[0]?.message?.content || 'No response generated';
}