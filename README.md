# GLM 5.2 Vercel Provider

A narrow TypeScript provider boundary for applications that use the Vercel AI SDK style of `generateText`/`streamText` integration. It sends requests to Argolink's chat-compatible chat endpoint and keeps the model-specific reasoning rule in one place.

[GLM 5.2 model page →](https://argolink.io/gh-glm-5-vercel-provider) · [Argolink API docs →](https://argolink.io/gh-unified-api-docs)

## Model facts

`glm-5.2` uses `POST /v1/chat/completions`, has a 1,000,000-token context and 128,000-token maximum output. Reasoning defaults to `max`; `high` and `max` are accepted, while `reasoning_effort: "none"` turns thinking off for this model. Prices in the current catalog are $1.40/M input, $4.40/M output, and $0.26/M cached input.

## Usage

```ts
import { createArgolinkGLM52 } from './src/index.js';

const model = createArgolinkGLM52({ apiKey: process.env.ARGOLINK_API_KEY });
const result = await model.complete([{ role: 'user', content: 'Summarize this change' }]);
console.log(result.choices[0]?.message?.content);
```

The adapter deliberately returns the server JSON instead of hiding it behind a second response shape. `stream()` exposes the raw SSE response so the host can apply its own event parser.

## Validation

```bash
npm test
npm run typecheck
```
