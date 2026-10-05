import { createArgolinkGLM52 } from '../src/index.js';
const model = createArgolinkGLM52({ apiKey: process.env.ARGOLINK_API_KEY });
const result = await model.complete([{ role: 'user', content: 'List three safe retry rules' }], 'high');
console.log(JSON.stringify(result, null, 2));
