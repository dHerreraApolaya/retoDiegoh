import { sessionDurationMs, type SessionState } from '../domain/SessionState';
import type { Session, SessionClock } from './Session';

type Dependencies = {
  readonly clock: SessionClock;
  readonly onSessionEnded: () => void;
};

/** Local demo access only. This is not an authentication or authorization boundary. */
export function createDemoSession({
  clock,
  onSessionEnded,
}: Dependencies): Session {
  const signedOut: SessionState = { status: 'signed-out' };
  let state: SessionState = signedOut;
  let lastObservedAtMs = 0;
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach(listener => listener());
  }

  function endSession() {
    if (state.status === 'signed-out') {
      return;
    }
    state = signedOut;
    // App composition clears user data before consumers see the closed session.
    onSessionEnded();
    notify();
  }

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    startDemoSession() {
      if (state.status === 'active') {
        return;
      }
      const nowMs = clock.nowMs();
      if (!Number.isFinite(nowMs) || nowMs < 0) {
        return;
      }
      lastObservedAtMs = nowMs;
      state = {
        status: 'active',
        startedAtMs: nowMs,
        expiresAtMs: nowMs + sessionDurationMs,
      };
      notify();
    },
    endSession,
    revalidate() {
      if (state.status === 'signed-out') {
        return;
      }
      const nowMs = clock.nowMs();
      if (
        !Number.isFinite(nowMs) ||
        nowMs < lastObservedAtMs ||
        nowMs >= state.expiresAtMs
      ) {
        endSession();
        return;
      }
      lastObservedAtMs = nowMs;
    },
  };
}
