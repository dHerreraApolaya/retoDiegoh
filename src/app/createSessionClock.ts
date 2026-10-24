import type { SessionClock } from '../modules/features/session';

type TimeSources = {
  readonly wallNowMs: () => number;
  readonly monotonicNowMs: () => number;
};

/** Count device sleep as elapsed time without letting clock rollback renew access. */
export function createSessionClock({
  wallNowMs,
  monotonicNowMs,
}: TimeSources): SessionClock {
  const originWallMs = wallNowMs();
  const originMonotonicMs = monotonicNowMs();
  let lastWallMs = originWallMs;
  let lastMonotonicMs = originMonotonicMs;
  let elapsedMs = 0;

  return {
    nowMs() {
      const wallMs = wallNowMs();
      const monotonicMs = monotonicNowMs();
      if (
        ![originWallMs, originMonotonicMs, wallMs, monotonicMs].every(
          Number.isFinite,
        ) ||
        originWallMs < 0 ||
        originMonotonicMs < 0 ||
        wallMs < lastWallMs ||
        monotonicMs < lastMonotonicMs
      ) {
        return NaN;
      }
      lastWallMs = wallMs;
      lastMonotonicMs = monotonicMs;
      elapsedMs = Math.max(
        elapsedMs,
        wallMs - originWallMs,
        monotonicMs - originMonotonicMs,
      );
      return elapsedMs;
    },
  };
}
