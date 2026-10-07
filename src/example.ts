import { generateText, streamText, tool } from 'ai';
import { z } from 'zod';
import { makeProvider } from './provider.ts';

const weather = tool({
  description: 'Return a local fixture weather value',
  inputSchema: z.object({ city: z.string().min(1).max(80) }),
  execute: async ({ city }) => ({ city, temperatureC: 20 }),
});

export async function runExamples(apiKey: string) {
  const provider = makeProvider(apiKey);
  const result = await generateText({
    model: provider('glm-5.3'),
    prompt: 'Explain a bounded retry policy in three sentences.',
    tools: { weather },
  });
  const stream = streamText({ model: provider('glm-5.2'), prompt: 'Give one concise checklist.' });
  let streamed = '';
  for await (const part of stream.textStream) streamed += part;
  return { text: result.text, streamed };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('set OPENAI_API_KEY before running the example');
  const output = await runExamples(key);
  console.log(output.text);
  console.log(output.streamed);
}
