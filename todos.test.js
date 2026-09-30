import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addTodo, toggle, remove, filterTodos } from '../todos.js';

test('filters work', () => {
  let l = addTodo(addTodo([], 'a'), 'b');
  l = toggle(l, 1);
  assert.deepEqual(filterTodos(l, 'active').map((t) => t.text), ['b']);
  assert.deepEqual(filterTodos(l, 'completed').map((t) => t.text), ['a']);
});

test('blank todos are rejected', () => {
  assert.throws(() => addTodo([], '   '));
});

test('ids stay unique after delete', () => {
  let l = addTodo(addTodo([], 'a'), 'b');
  l = addTodo(remove(l, 1), 'c');
  const ids = l.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});
