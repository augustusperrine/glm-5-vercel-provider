import { strict as assert } from 'node:assert';
import { models, makeProvider, ARGOLINK_BASE_URL } from '../src/provider.ts';

assert.deepEqual(models, ['glm-5.3', 'glm-5.2']);
assert.equal(ARGOLINK_BASE_URL, 'https://argolink.io/v1');
assert.throws(() => makeProvider(''), /apiKey is required/);
assert.equal(typeof makeProvider('test-only'), 'function');
