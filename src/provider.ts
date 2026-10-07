import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const ARGOLINK_BASE_URL = 'https://argolink.io/v1';
export const models = ['glm-5.3', 'glm-5.2'] as const;

export function makeProvider(apiKey: string) {
  if (!apiKey) throw new Error('apiKey is required at the execution boundary');
  return createOpenAICompatible({
    name: 'argolink',
    baseURL: ARGOLINK_BASE_URL,
    apiKey,
  });
}
