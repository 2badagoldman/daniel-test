// Minimal JSON notes API built on node:http (no dependencies).
import http from 'node:http';

export function createServer() {
  const notes = [];
  let nextId = 1;

  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const send = (status, body) => {
      res.writeHead(status, { 'content-type': 'application/json' });
      res.end(JSON.stringify(body));
    };

    if (req.method === 'GET' && url.pathname === '/notes') {
      return send(200, notes);
    }
    if (req.method === 'POST' && url.pathname === '/notes') {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      const { title, body = '' } = JSON.parse(raw || '{}');
      if (!title) return send(400, { error: 'title is required' });
      const note = { id: nextId++, title, body };
      notes.push(note);
      return send(201, note);
    }
    // TODO (feature): GET /notes/search?q=term  -> case-insensitive match on title or body
    // TODO (feature): DELETE /notes/:id          -> 204, or 404 if missing
    send(404, { error: 'not found' });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createServer().listen(3000, () => console.log('http://localhost:3000'));
}
