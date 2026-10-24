import { createSessionClock } from './createSessionClock';

// React Native provides this public global at runtime, but its stable TS surface
// does not yet declare Performance. Keep the small runtime contract in this adapter.
declare const performance: { now(): number };

export function createRuntimeClock() {
  return createSessionClock({
    wallNowMs: () => Date.now(),
    monotonicNowMs: () => performance.now(),
  });
}
