import {
  createContext,
  useContext,
  useSyncExternalStore,
  type PropsWithChildren,
} from 'react';
import type { Session } from '../application/Session';

const SessionContext = createContext<Session | undefined>(undefined);

export function SessionProvider({
  session,
  children,
}: PropsWithChildren<{ session: Session }>) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error('SessionProvider is required.');
  }
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot);
  return { state, session };
}
