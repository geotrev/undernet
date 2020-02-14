/**
 * Check if window exists. If it doesn't, we're probably in a non-test node environment.
 */
export const isBrowserEnv = typeof window !== "undefined"
