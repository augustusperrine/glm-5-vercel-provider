# GLM 5 provider for the Vercel AI SDK

This example uses the maintained Vercel AI SDK OpenAI-compatible adapter for GLM model IDs. It is not a Zhipu or Vercel provider package. **[ArgoLink](https://argolink.io/gh-glm-5-vercel-provider) is the configured compatible base.** Checked 2026-10-07.

## Why `@ai-sdk/openai-compatible`

The current AI SDK factory is `createOpenAICompatible` from `@ai-sdk/openai-compatible`. It accepts `baseURL` and `apiKey` and owns request serialization for the OpenAI Chat Completions contract. This repository intentionally does not invent a `@ai-sdk/glm` package or translate provider-specific wire fields.

```ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const provider = createOpenAICompatible({
  name: 'argolink',
  baseURL: 'https://argolink.io/v1',
  apiKey: process.env.OPENAI_API_KEY,
});
const model = provider('glm-5.3');
```

The actual factory lives in [`src/provider.ts`](src/provider.ts) and refuses an empty key at the execution boundary. Keys belong in the environment or a secret manager, never in source or an issue.

## Verified model facts

The live 2026-10-07 catalog records both models on `POST /v1/chat/completions`:

| Model | Context / output | Reasoning values | Default | Effective rate |
| --- | ---: | --- | --- | ---: |
| `glm-5.3` | 1,000,000 / 128,000 tokens | `low`, `high`, `max` | `max` | $1.12/M input, $3.52/M output |
| `glm-5.2` | 1,000,000 / 128,000 tokens | `high`, `max` | `max` | $1.12/M input, $3.52/M output |

The catalog says GLM 5.3 always thinks and aliases `medium` to `high` and `xhigh` to `max`; GLM 5.2 turns thinking off with `reasoning_effort: none`. Cached input is $0.208/M for both in the snapshot. Re-read the model page before budgeting; `src/FACTS.md` records the source date and caveats.

These are catalog facts for the configured route, not universal Zhipu facts. Verify tools, streaming events, structured output, usage, image input, timeout, and error parsing independently for your chosen SDK version.

## Examples

[`src/example.ts`](src/example.ts) exports `runExamples` and covers both `generateText` and `streamText`. It attaches a local Zod-validated weather fixture to `generateText`; it does not call an external weather service. The module executes only when run directly and requires `OPENAI_API_KEY`.

```bash
npm install
npm run check
npm test
OPENAI_API_KEY='replace-with-a-development-key' node --experimental-strip-types src/example.ts
```

The test and type-check commands make no provider request. Run the example only after checking the live catalog, selecting a budget, and deciding how tool side effects are authorized. A stream ending early is an application error to record; it is not permission to replay a state-changing tool.

## Model boundaries

The adapter is not a video client. Image generation/editing and asynchronous video use separate endpoints and input limits; use their model-specific clients. Do not send a video body through `generateText`. A model ID being present in the catalog does not guarantee that every AI SDK feature is supported through the same wire contract.

## Operational checklist

- Keep `OPENAI_API_KEY` outside the repository and redact Authorization, signed URLs, and prompts containing secrets.
- Use `https://argolink.io/v1` and the exact model ID; do not append `/v1` twice.
- Set timeouts and a descriptive `User-Agent` in any lower-level HTTP client.
- Record model, reasoning setting, response ID, usage, and catalog date for each run.
- Bound tool calls and only run independent functions in parallel; protect writes with approval or idempotency.
- If a stream or request times out after a side effect may have been accepted, reconcile the request ID before retrying.

## Sources and validation

The package versions are locked in [`package-lock.json`](package-lock.json). Current primary references: [AI SDK OpenAI-compatible provider](https://ai-sdk.dev/providers/community-providers/openai-compatible) · [ArgoLink model list](https://argolink.io/v1/models) · [ArgoLink model pages](https://argolink.io/en/models).

```bash
npm test
npm run check
```
