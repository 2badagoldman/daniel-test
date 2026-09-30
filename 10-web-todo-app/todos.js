// Pure todo-list logic used by index.html.
export function addTodo(list, text) {
  const trimmed = text.trim();
  // BUG: blank todos are allowed
  return [...list, { id: list.length + 1, text: trimmed, done: false }]; // BUG: ids repeat after deletes
}

export function toggle(list, id) {
  return list.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function remove(list, id) {
  return list.filter((t) => t.id !== id);
}

export function filterTodos(list, filter) {
  if (filter === 'active') return list.filter((t) => t.done); // BUG: inverted
  if (filter === 'completed') return list.filter((t) => !t.done); // BUG: inverted
  return list;
}

export function remaining(list) {
  return list.filter((t) => !t.done).length;
}
