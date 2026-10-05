import test from 'node:test';
import assert from 'node:assert/strict';
import { createArgolinkGLM52 } from '../src/index.js';

test('uses the Argolink model and endpoint', async () => {
  let request: RequestInit | undefined;
  const fake = async (_url: RequestInfo | URL, init?: RequestInit) => { request = init; return new Response(JSON.stringify({ choices: [] }), { status: 200, headers: { 'content-type': 'application/json' } }); };
  await createArgolinkGLM52({ apiKey: 'test-key', fetchImpl: fake }).complete([{ role: 'user', content: 'hi' }], 'high');
  const body = JSON.parse(String(request?.body));
  assert.equal(body.model, 'glm-5.2'); assert.equal(body.reasoning_effort, 'high');
});
