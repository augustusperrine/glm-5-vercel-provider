# GLM 5 provider for the Vercel AI SDK

This example shows the current Vercel AI SDK OpenAI-compatible provider shape for GLM model IDs. It is not a Zhipu or Vercel package. **[ArgoLink](https://argolink.io/gh-glm-5-vercel-provider) is the configured compatible base.** Last checked: 2026-10-07.

## Install and run

Use a current Node.js release, then install the package versions that your application has approved. The example uses @ai-sdk/openai-compatible, ai, and zod. Set OPENAI_API_KEY in the environment; the provider factory has no default key. Run the type checker before a network call.

src/provider.ts calls createOpenAICompatible with baseURL https://argolink.io/v1 and exposes the two catalog IDs used by the example. The package's provider function is intentionally small so the SDK owns request serialization. Do not assume that a provider factory supports every AI SDK feature until the target model and endpoint are tested.

## Examples

src/example.ts covers generateText and streamText and attaches a local weather tool. The tool returns a fake value so the file demonstrates the schema without an external service. A real tool must validate input, enforce a timeout, and protect side effects. Tool support depends on the selected model; check the model page and response trace.

The compatibility layer is not a video client. For image or asynchronous video, use that service's own request contract and lifecycle. Do not send a video body through generateText. A stream ending early is an application error to record; it is not permission to replay a side-effecting tool automatically.

## Model and price facts

The live ArgoLink catalog is authoritative for GLM 5.3/5.2 IDs, context, output, reasoning efforts, and effective prices. This repository does not duplicate a price table because a stale number is worse than a link. Record the catalog revision in your deployment notes. Use a neutral base and key if you point the provider at a different compatible service.

## Validation

Run npm test and npm run check. The test only imports the factory and checks the model list; it makes no request. A real SDK version lock and endpoint smoke test must happen in your application CI with a safe test model. Keep errors, usage, and response IDs in private telemetry.

## FAQ

**Is this an official provider?** No. **Does it support streamText?** The example exercises the SDK path; validate your chosen model before production. **Can tools be parallel?** Only when the functions are independent and bounded. **Why use an OpenAI-compatible adapter?** It avoids a fake provider package while using the maintained AI SDK transport. **Where is the API key?** OPENAI_API_KEY in the host environment.
