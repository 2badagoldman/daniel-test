import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server.js';

let server, base;
before(async () => {
  server = createServer().listen(0);
  await new Promise((r) => server.once('listening', r));
  base = `http://localhost:${server.address().port}`;
  for (const n of [{ title: 'Groceries', body: 'milk, eggs' }, { title: 'Ideas', body: 'Buy MILK stock' }, { title: 'Todo' }]) {
    await fetch(`${base}/notes`, { method: 'POST', body: JSON.stringify(n) });
  }
});
after(() => server.close());

test('search matches title or body, case-insensitive', async () => {
  const res = await fetch(`${base}/notes/search?q=milk`);
  assert.equal(res.status, 200);
  assert.deepEqual((await res.json()).map((n) => n.title), ['Groceries', 'Ideas']);
});

test('delete removes a note', async () => {
  assert.equal((await fetch(`${base}/notes/3`, { method: 'DELETE' })).status, 204);
  assert.equal((await fetch(`${base}/notes/3`, { method: 'DELETE' })).status, 404);
});

test('post without title is rejected', async () => {
  const res = await fetch(`${base}/notes`, { method: 'POST', body: '{}' });
  assert.equal(res.status, 400);
});
