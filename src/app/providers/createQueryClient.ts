import { QueryClient } from '@tanstack/react-query';

// Only non-sensitive remote data belongs in this cache. Never persist this client.
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: 1, staleTime: 30_000, gcTime: 300_000 },
      mutations: { retry: false },
    },
  });
}
