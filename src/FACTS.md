# Checked facts

Catalog snapshot checked 2026-10-07:

- `glm-5.3`: `POST /v1/chat/completions`; 1,000,000-token context; 128,000-token maximum output; reasoning `low`, `high`, `max`; default `max`; catalog marks thinking as always on and aliases `medium` to `high`, `xhigh` to `max`.
- `glm-5.2`: `POST /v1/chat/completions`; 1,000,000-token context; 128,000-token maximum output; reasoning `high`, `max`; default `max`; `reasoning_effort: none` turns thinking off.
- Both have an effective catalog rate of $1.12 per million input tokens and $3.52 per million output tokens; cached input is $0.208/M. Re-read the live model pages before budgeting.
- The Vercel AI SDK's current OpenAI-compatible factory is `createOpenAICompatible` from `@ai-sdk/openai-compatible`, with `baseURL` and `apiKey` options. The adapter is for the chat-completions contract; it is not a bespoke GLM provider package.
