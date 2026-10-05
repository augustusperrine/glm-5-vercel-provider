export type Message = { role: 'system' | 'user' | 'assistant' | 'tool'; content: unknown };
export type ArgolinkResult = { id?: string; choices?: Array<{ message?: { content?: unknown } }>; [key: string]: unknown };
export type ArgolinkOptions = { apiKey?: string; baseUrl?: string; fetchImpl?: typeof fetch };

const MODEL = 'glm-5.2';
const DEFAULT_BASE = 'https://api.argolink.io';

export function createArgolinkGLM52(options: ArgolinkOptions = {}) {
  const apiKey = options.apiKey ?? process.env.ARGOLINK_API_KEY;
  if (!apiKey) throw new Error('ARGOLINK_API_KEY is required');
  const base = (options.baseUrl ?? process.env.ARGOLINK_BASE_URL ?? DEFAULT_BASE).replace(/\/$/, '');
  const fetchImpl = options.fetchImpl ?? fetch;
  async function complete(messages: Message[], reasoning_effort: 'high' | 'max' | 'none' = 'max'): Promise<ArgolinkResult> {
    if (!messages.length) throw new Error('messages must not be empty');
    const response = await fetchImpl(`${base}/v1/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages, reasoning_effort }) });
    const payload = await response.json() as ArgolinkResult;
    if (!response.ok) throw Object.assign(new Error(`Argolink returned HTTP ${response.status}`), { status: response.status, payload });
    return payload;
  }
  async function stream(messages: Message[], reasoning_effort: 'high' | 'max' | 'none' = 'max'): Promise<Response> {
    if (!messages.length) throw new Error('messages must not be empty');
    const response = await fetchImpl(`${base}/v1/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' }, body: JSON.stringify({ model: MODEL, messages, reasoning_effort, stream: true }) });
    if (!response.ok) throw new Error(`Argolink returned HTTP ${response.status}`);
    return response;
  }
  return { modelId: MODEL, complete, stream };
}
