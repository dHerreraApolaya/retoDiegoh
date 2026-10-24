import { createSessionClock } from '../../../app/createSessionClock';

describe('elapsed session clock', () => {
  it('counts background sleep even when the performance clock is suspended', () => {
    let wallMs = 1_000_000;
    let monotonicMs = 10;
    const clock = createSessionClock({
      wallNowMs: () => wallMs,
      monotonicNowMs: () => monotonicMs,
    });
    expect(clock.nowMs()).toBe(0);
    wallMs += 300_000;
    expect(clock.nowMs()).toBe(300_000);
    monotonicMs += 60_000;
    wallMs += 60_000;
    expect(clock.nowMs()).toBe(360_000);
  });

  it('does not extend the deadline when the wall clock is moved backwards', () => {
    let wallMs = 1_000_000;
    const clock = createSessionClock({
      wallNowMs: () => wallMs,
      monotonicNowMs: () => 10,
    });
    wallMs -= 1;
    expect(clock.nowMs()).toBeNaN();
  });

  it('keeps elapsed time progressing when performance time is ahead of wall time', () => {
    let monotonicMs = 10;
    const clock = createSessionClock({
      wallNowMs: () => 1_000_000,
      monotonicNowMs: () => monotonicMs,
    });
    monotonicMs += 300_000;
    expect(clock.nowMs()).toBe(300_000);
  });

  it.each([NaN, Infinity])('rejects an invalid clock value %s', value => {
    const clock = createSessionClock({
      wallNowMs: () => value,
      monotonicNowMs: () => 10,
    });
    expect(clock.nowMs()).toBeNaN();
  });
});
