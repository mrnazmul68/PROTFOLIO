interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface RateLimitStore {
  __portfolioRateLimit?: Map<string, RateLimitRecord>;
}

/**
 * Lightweight in-memory limiter for the contact endpoint.
 * This is a first line of defence only; use a durable store (e.g. Redis)
 * if the site receives meaningful traffic or runs across many instances.
 */
export function checkRateLimit(
  identifier: string,
  limit = 4,
  windowMs = 10 * 60 * 1000,
): { allowed: boolean; retryAfterSeconds: number } {
  const globalStore = globalThis as unknown as RateLimitStore;
  const store =
    globalStore.__portfolioRateLimit ??
    (globalStore.__portfolioRateLimit = new Map<string, RateLimitRecord>());

  const now = Date.now();
  const current = store.get(identifier);

  if (!current || current.resetAt <= now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  store.set(identifier, current);

  if (store.size > 500) {
    for (const [key, value] of store) {
      if (value.resetAt <= now) store.delete(key);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
