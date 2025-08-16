/**
 * LazyMessage allows deferring string construction until it's actually needed.
 * This helps avoid unnecessary string manipulation, especially in cases where
 * the message is unlikely to be used (e.g., only shown on error).
 *
 * Prefer using a function when message evaluation is expensive or avoidable.
 */
export type LazyMessage = (() => string) | string;
