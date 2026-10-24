import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { AppState, type AppStateStatus } from 'react-native';
import { useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';
import { AppProviders } from '../../../app/providers/AppProviders';
import {
  RootNavigator,
  type RootStackParamList,
} from '../../../navigation/RootNavigator';

describe('Login/Home session flow (BDD: SESSION-01 to SESSION-08)', () => {
  let nowMs: number;
  let client: QueryClient;
  let lifecycle: jest.SpyInstance;
  let listeners: Set<(state: AppStateStatus) => void>;

  function CacheProbe() {
    const queryClient = useQueryClient();
    useEffect(() => {
      client = queryClient;
    }, [queryClient]);
    return null;
  }

  function mountApp() {
    const navigationRef = createNavigationContainerRef<RootStackParamList>();
    const view = render(
      <AppProviders sessionClock={{ nowMs: () => nowMs }}>
        <CacheProbe />
        <RootNavigator navigationRef={navigationRef} />
      </AppProviders>,
    );
    return { ...view, navigationRef };
  }

  async function login() {
    fireEvent.press(
      screen.getByRole('button', { name: 'Iniciar sesión de prueba' }),
    );
    expect(await screen.findByRole('header', { name: 'Home' })).toBeVisible();
  }

  beforeEach(() => {
    jest.useFakeTimers();
    nowMs = 1_000;
    listeners = new Set();
    lifecycle = jest.spyOn(AppState, 'addEventListener');
    lifecycle.mockImplementation((event, listener) => {
      if (event === 'change') listeners.add(listener);
      return {
        remove: () => {
          listeners.delete(listener);
        },
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  function changeAppState(state: 'active' | 'background') {
    act(() => listeners.forEach(listener => listener(state)));
  }

  it('given a fresh launch, then only Login is available and no previous Home can be restored', async () => {
    const app = mountApp();
    expect(screen.getByRole('header', { name: 'Login' })).toBeVisible();
    expect(screen.queryByRole('header', { name: 'Home' })).toBeNull();
    await login();
    expect(screen.queryByRole('header', { name: 'Login' })).toBeNull();
    app.unmount();
    const restarted = mountApp();
    expect(screen.getByRole('header', { name: 'Login' })).toBeVisible();
    expect(screen.queryByRole('header', { name: 'Home' })).toBeNull();
    restarted.unmount();
  });

  it('given Home, when signing out, then Login replaces its history and user cache is cleared', async () => {
    const app = mountApp();
    await login();
    client.setQueryData(['demo-summary'], { masked: true });
    fireEvent.press(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(await screen.findByRole('header', { name: 'Login' })).toBeVisible();
    expect(app.navigationRef.canGoBack()).toBe(false);
    expect(screen.queryByRole('header', { name: 'Home' })).toBeNull();
    expect(client.getQueryData(['demo-summary'])).toBeUndefined();
    app.unmount();
  });

  it('given an active session, when five minutes elapse, then it returns to Login and clears cached data', async () => {
    const app = mountApp();
    await login();
    client.setQueryData(['demo-summary'], { masked: true });
    nowMs += 299_999;
    act(() => jest.advanceTimersByTime(299_999));
    expect(screen.getByRole('header', { name: 'Home' })).toBeVisible();
    nowMs += 1;
    act(() => jest.advanceTimersByTime(1));
    expect(await screen.findByRole('header', { name: 'Login' })).toBeVisible();
    expect(client.getQueryData(['demo-summary'])).toBeUndefined();
    app.unmount();
  });

  it('given Home in background below five minutes, when resumed, then it stays active without renewal', async () => {
    const app = mountApp();
    await login();
    changeAppState('background');
    nowMs += 240_000;
    changeAppState('active');
    expect(screen.getByRole('header', { name: 'Home' })).toBeVisible();
    nowMs += 60_000;
    changeAppState('active');
    expect(await screen.findByRole('header', { name: 'Login' })).toBeVisible();
    app.unmount();
  });

  it('given suspended timers, when resuming after five minutes, then the expired Home is removed', async () => {
    const app = mountApp();
    await login();
    changeAppState('background');
    nowMs += 600_000;
    changeAppState('active');
    expect(await screen.findByRole('header', { name: 'Login' })).toBeVisible();
    expect(app.navigationRef.canGoBack()).toBe(false);
    app.unmount();
  });

  it('given an active app, when closed, then user data is cleared and later lifecycle events cannot restore access', async () => {
    const app = mountApp();
    await login();
    client.setQueryData(['demo-summary'], { masked: true });
    app.unmount();
    expect(client.getQueryCache().getAll()).toHaveLength(0);
    nowMs += 600_000;
    changeAppState('active');
    const restarted = mountApp();
    expect(screen.getByRole('header', { name: 'Login' })).toBeVisible();
    expect(screen.queryByRole('header', { name: 'Home' })).toBeNull();
    restarted.unmount();
  });
});
