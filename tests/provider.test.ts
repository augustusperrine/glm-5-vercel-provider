import { strict as assert } from 'node:assert';
import { models, makeProvider } from '../src/provider.js';
assert.deepEqual(models, ['glm-5.3','glm-5.2']);
assert.equal(typeof makeProvider('test-only'), 'function');
