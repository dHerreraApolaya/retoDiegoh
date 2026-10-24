import { createQueryClient } from './createQueryClient';

describe('createQueryClient', () => {
  it('isolates data between application instances', () => {
    const first = createQueryClient();
    const second = createQueryClient();
    first.setQueryData(['account-summary'], { masked: true });

    expect(second.getQueryData(['account-summary'])).toBeUndefined();
    first.clear();
    second.clear();
  });
});
