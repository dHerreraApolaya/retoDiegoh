import { QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { AppState } from 'react-native';
import { createQueryClient } from './createQueryClient';

export function AppProviders({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    focusManager.setFocused(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', state => {
      focusManager.setFocused(state === 'active');
    });
    return () => {
      subscription.remove();
      queryClient.clear();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
