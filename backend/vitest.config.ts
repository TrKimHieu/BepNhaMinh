import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup.ts'],
    // Integration test dùng DB thật trong CI (service postgres), không mock.
    testTimeout: 15_000,
  },
});
