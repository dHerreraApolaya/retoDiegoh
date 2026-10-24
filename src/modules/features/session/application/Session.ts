import type { SessionState } from '../domain/SessionState';

export interface SessionClock {
  /** Monotonic elapsed milliseconds within this process, including background time. */
  nowMs(): number;
}

export interface Session {
  getSnapshot(): SessionState;
  subscribe(listener: () => void): () => void;
  startDemoSession(): void;
  endSession(): void;
  revalidate(): void;
}
