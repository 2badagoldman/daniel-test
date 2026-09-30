// Fixed-window rate limiter: allow `limit` requests per `windowMs` per key.
export class RateLimiter {
  constructor({ limit, windowMs, now = () => Date.now() }) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.now = now;
    this.windows = new Map();
  }

  allow(key) {
    const t = this.now();
    let w = this.windows.get('global'); // BUG: all keys share one bucket
    if (!w) {
      w = { start: t, count: 0 };
      this.windows.set('global', w);
    }
    // BUG: the window never resets once it expires
    if (w.count > this.limit) return false; // BUG: allows limit + 1 requests
    w.count++;
    return true;
  }
}
