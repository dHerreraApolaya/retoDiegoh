import { QueryClientProvider, focusManager } from '@tanstack/react-query';
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type PropsWithChildren,
} from 'react';
import { AppState } from 'react-native';
import { createQueryClient } from './createQueryClient';
import {
  createDemoSession,
  SessionProvider,
  type SessionClock,
} from '../../modules/features/session';
import { createRuntimeClock } from '../runtimeClock';

export function AppProviders({
  children,
  sessionClock,
}: PropsWithChildren<{
  readonly sessionClock?: SessionClock;
}>): React.JSX.Element {
  const [queryClient] = useState(createQueryClient);
  const [clock] = useState(() => sessionClock ?? createRuntimeClock());
  const [session] = useState(() =>
    createDemoSession({
      clock,
      onSessionEnded: () => queryClient.clear(),
    }),
  );
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot);

  useEffect(() => {
    if (state.status !== 'active') {
      return;
    }
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleExpiry() {
      const snapshot = session.getSnapshot();
      if (snapshot.status !== 'active') {
        return;
      }
      timeout = setTimeout(
        () => {
          session.revalidate();
          // A timer can fire early; keep the original deadline rather than renew.
          scheduleExpiry();
        },
        Math.max(1, snapshot.expiresAtMs - clock.nowMs()),
      );
    }
    scheduleExpiry();
    return () => clearTimeout(timeout);
  }, [session, clock, state]);

  useEffect(() => {
    focusManager.setFocused(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', appState => {
      if (appState === 'active') {
        // Revalidate before resuming queries; background timers may be suspended.
        session.revalidate();
      }
      focusManager.setFocused(appState === 'active');
    });
    return () => {
      subscription.remove();
      session.endSession();
      queryClient.clear();
    };
  }, [queryClient, session]);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
