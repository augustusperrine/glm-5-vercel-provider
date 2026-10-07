import { generateText, streamText, tool } from 'ai';
import { z } from 'zod';
import { makeProvider } from './provider.js';
const provider = makeProvider(process.env.OPENAI_API_KEY ?? '');
const weather = tool({ description: 'Return a local fake weather value', inputSchema: z.object({city:z.string()}), execute: async ({city}) => ({city, temperatureC: 20}) });
const result = await generateText({ model: provider('glm-5.3'), prompt: 'Explain a bounded retry policy.', tools: { weather } });
console.log(result.text);
const stream = streamText({ model: provider('glm-5.3'), prompt: 'Give one concise checklist.' });
for await (const part of stream.textStream) process.stdout.write(part);
