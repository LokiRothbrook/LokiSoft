/**
 * In-memory rate limiter for serverless environments
 * Tracks requests by IP address and session ID
 *
 * Note: This uses in-memory storage which works well for single-instance deployments.
 * For multi-instance/serverless, consider using Redis or Upstash.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory stores for IP and session tracking
const ipStore = new Map<string, RateLimitEntry>();
const sessionStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_IP = 3;
const MAX_REQUESTS_PER_SESSION = 5;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // Clean up every 5 minutes

// Cleanup old entries periodically to prevent memory leaks
let lastCleanup = Date.now();

function cleanupExpiredEntries(): void {
  const now = Date.now();

  // Only cleanup if enough time has passed
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
    return;
  }

  lastCleanup = now;

  for (const [key, entry] of ipStore.entries()) {
    if (now > entry.resetTime) {
      ipStore.delete(key);
    }
  }

  for (const [key, entry] of sessionStore.entries()) {
    if (now > entry.resetTime) {
      sessionStore.delete(key);
    }
  }
}

function checkLimit(
  store: Map<string, RateLimitEntry>,
  key: string,
  maxRequests: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or expired - create new
  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  // Entry exists and not expired
  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  // Increment count
  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: "ip" | "session";
  remaining: {
    ip: number;
    session: number;
  };
  resetIn: number;
}

/**
 * Check if a request should be rate limited
 * Uses both IP and session-based tracking for defense in depth
 */
export function checkRateLimit(
  ip: string | null,
  sessionId: string | null
): RateLimitResult {
  // Cleanup expired entries periodically
  cleanupExpiredEntries();

  // Default result for when we can't identify the client
  if (!ip && !sessionId) {
    return {
      allowed: true,
      remaining: { ip: MAX_REQUESTS_PER_IP, session: MAX_REQUESTS_PER_SESSION },
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  let ipResult = { allowed: true, remaining: MAX_REQUESTS_PER_IP, resetIn: RATE_LIMIT_WINDOW_MS };
  let sessionResult = { allowed: true, remaining: MAX_REQUESTS_PER_SESSION, resetIn: RATE_LIMIT_WINDOW_MS };

  // Check IP limit
  if (ip) {
    ipResult = checkLimit(ipStore, ip, MAX_REQUESTS_PER_IP);
    if (!ipResult.allowed) {
      return {
        allowed: false,
        reason: "ip",
        remaining: { ip: 0, session: sessionResult.remaining },
        resetIn: ipResult.resetIn,
      };
    }
  }

  // Check session limit
  if (sessionId) {
    sessionResult = checkLimit(sessionStore, sessionId, MAX_REQUESTS_PER_SESSION);
    if (!sessionResult.allowed) {
      return {
        allowed: false,
        reason: "session",
        remaining: { ip: ipResult.remaining, session: 0 },
        resetIn: sessionResult.resetIn,
      };
    }
  }

  return {
    allowed: true,
    remaining: { ip: ipResult.remaining, session: sessionResult.remaining },
    resetIn: Math.min(ipResult.resetIn, sessionResult.resetIn),
  };
}

/**
 * Get current rate limit status without incrementing counters
 */
export function getRateLimitStatus(
  ip: string | null,
  sessionId: string | null
): { ip: RateLimitEntry | null; session: RateLimitEntry | null } {
  return {
    ip: ip ? ipStore.get(ip) || null : null,
    session: sessionId ? sessionStore.get(sessionId) || null : null,
  };
}
