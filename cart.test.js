import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Cart } from '../src/cart.js';

test('adding the same item twice increases quantity', () => {
  const c = new Cart(0);
  c.add('apple', 1.5, 2);
  c.add('apple', 1.5, 3);
  assert.equal(c.items[0].qty, 5);
});

test('tax applies after discount', () => {
  const c = new Cart(0.1);
  c.add('shoes', 100);
  c.applyCode('SAVE25');
  assert.equal(c.total(), 82.5);
});

test('invalid code throws', () => {
  assert.throws(() => new Cart().applyCode('FREE'));
});
