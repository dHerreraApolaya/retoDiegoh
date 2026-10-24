import { useEffect } from 'react';
import { AppState } from 'react-native';
import {
  focusManager,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import ReactTestRenderer from 'react-test-renderer';
import { AppProviders } from './AppProviders';

describe('AppProviders', () => {
  it('updates focus on lifecycle changes and clears cached data on unmount', async () => {
    const subscribe = jest.spyOn(AppState, 'addEventListener');
    let client: QueryClient | undefined;
    let root: ReactTestRenderer.ReactTestRenderer | undefined;

    function Probe(): null {
      const queryClient = useQueryClient();
      useEffect(() => {
        client = queryClient;
      }, [queryClient]);
      return null;
    }

    try {
      await ReactTestRenderer.act(() => {
        root = ReactTestRenderer.create(
          <AppProviders>
            <Probe />
          </AppProviders>,
        );
      });
      const listener = subscribe.mock.calls.find(
        ([event]) => event === 'change',
      )?.[1];
      expect(listener).toBeDefined();
      listener?.('background');
      expect(focusManager.isFocused()).toBe(false);
      listener?.('active');
      expect(focusManager.isFocused()).toBe(true);

      client?.setQueryData(['masked-summary'], { masked: true });
      await ReactTestRenderer.act(() => root?.unmount());
      expect(client?.getQueryData(['masked-summary'])).toBeUndefined();
    } finally {
      subscribe.mockRestore();
      focusManager.setFocused(undefined);
    }
  });
});
