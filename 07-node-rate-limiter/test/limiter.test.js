import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RateLimiter } from '../limiter.js';

const clock = () => { let t = 0; const f = () => t; f.advance = (ms) => { t += ms; }; return f; };

test('blocks after limit', () => {
  const rl = new RateLimiter({ limit: 2, windowMs: 1000, now: clock() });
  assert.deepEqual([rl.allow('a'), rl.allow('a'), rl.allow('a')], [true, true, false]);
});

test('keys are independent', () => {
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now: clock() });
  assert.equal(rl.allow('a'), true);
  assert.equal(rl.allow('b'), true);
});

test('window resets', () => {
  const now = clock();
  const rl = new RateLimiter({ limit: 1, windowMs: 1000, now });
  rl.allow('a');
  now.advance(1000);
  assert.equal(rl.allow('a'), true);
});
