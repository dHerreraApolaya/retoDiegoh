export type SessionState =
  | { readonly status: 'signed-out' }
  | {
      readonly status: 'active';
      readonly startedAtMs: number;
      readonly expiresAtMs: number;
    };

export const sessionDurationMs = 5 * 60 * 1_000;
