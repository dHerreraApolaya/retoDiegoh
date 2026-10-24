import { createDemoSession } from '../../features/session';

describe('demo session (BDD: SESSION-01 to SESSION-08)', () => {
  let nowMs: number;
  let cachedSummary: string | undefined;

  function createSession() {
    return createDemoSession({
      clock: { nowMs: () => nowMs },
      onSessionEnded: () => {
        cachedSummary = undefined;
      },
    });
  }

  beforeEach(() => {
    nowMs = 1_000;
    cachedSummary = 'synthetic-summary';
  });

  it('given a fresh app, when session starts, then it is signed out', () => {
    expect(createSession().getSnapshot()).toEqual({ status: 'signed-out' });
  });

  it('given Login, when demo access is requested, then it lasts exactly five minutes', () => {
    const session = createSession();
    session.startDemoSession();
    expect(session.getSnapshot()).toEqual({
      status: 'active',
      startedAtMs: 1_000,
      expiresAtMs: 301_000,
    });
    nowMs = 300_999;
    session.revalidate();
    expect(session.getSnapshot().status).toBe('active');
    nowMs = 301_000;
    session.revalidate();
    expect(session.getSnapshot()).toEqual({ status: 'signed-out' });
    expect(cachedSummary).toBeUndefined();
  });

  it('given an active session, when start is repeated, then its deadline is unchanged', () => {
    const session = createSession();
    session.startDemoSession();
    const snapshot = session.getSnapshot();
    nowMs += 60_000;
    session.startDemoSession();
    expect(session.getSnapshot()).toEqual(snapshot);
  });

  it('given an active session, when the user logs out repeatedly, then it remains signed out without cached user data', () => {
    const session = createSession();
    session.startDemoSession();
    session.endSession();
    session.endSession();
    expect(session.getSnapshot().status).toBe('signed-out');
    expect(cachedSummary).toBeUndefined();
  });

  it('given an earlier session, when the app restarts, then no session is restored', () => {
    const previous = createSession();
    previous.startDemoSession();
    expect(createSession().getSnapshot().status).toBe('signed-out');
  });

  it('given background time below the deadline, when revalidated, then it remains active', () => {
    const session = createSession();
    session.startDemoSession();
    nowMs += 240_000;
    session.revalidate();
    expect(session.getSnapshot().status).toBe('active');
    expect(cachedSummary).toBe('synthetic-summary');
  });

  it('given suspended timers past expiry, when resumed, then it closes immediately', () => {
    const session = createSession();
    session.startDemoSession();
    nowMs += 600_000;
    session.revalidate();
    session.revalidate();
    expect(session.getSnapshot().status).toBe('signed-out');
    expect(cachedSummary).toBeUndefined();
  });

  it('given a closed session, when logging in again, then it has a fresh deadline', () => {
    const session = createSession();
    session.startDemoSession();
    session.endSession();
    nowMs += 60_000;
    session.startDemoSession();
    expect(session.getSnapshot()).toEqual({
      status: 'active',
      startedAtMs: 61_000,
      expiresAtMs: 361_000,
    });
  });

  it('given a subscriber, when a session closes, then it sees signed-out state with no cached user data', () => {
    const session = createSession();
    let observedStatus: string | undefined;
    let observedSummary: string | undefined;
    const unsubscribe = session.subscribe(() => {
      observedStatus = session.getSnapshot().status;
      observedSummary = cachedSummary;
    });
    session.startDemoSession();
    expect(observedStatus).toBe('active');
    session.endSession();
    expect(observedStatus).toBe('signed-out');
    expect(observedSummary).toBeUndefined();
    unsubscribe();
    session.startDemoSession();
    expect(observedStatus).toBe('signed-out');
  });

  it.each([NaN, Infinity, -1])(
    'given invalid clock time %s, then access fails closed',
    invalid => {
      nowMs = invalid;
      const session = createSession();
      session.startDemoSession();
      expect(session.getSnapshot().status).toBe('signed-out');
    },
  );

  it('given an active session, when its monotonic clock moves backwards, then it closes', () => {
    const session = createSession();
    session.startDemoSession();
    nowMs -= 1;
    session.revalidate();
    expect(session.getSnapshot().status).toBe('signed-out');
  });
});
