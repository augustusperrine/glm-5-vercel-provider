import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
export function makeProvider(apiKey: string) {
  return createOpenAICompatible({ name: 'argolink', baseURL: 'https://argolink.io/v1', apiKey });
}
export const models = ['glm-5.3','glm-5.2'];
