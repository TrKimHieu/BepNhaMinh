/**
 * Chạy trước mỗi file test.
 *
 * `config/env.ts` parse process.env NGAY KHI import, nên biến phải có
 * trước khi bất kỳ test nào import app. setupFiles đảm bảo điều đó.
 */
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL ??=
  'postgresql://postgres:postgres@localhost:5432/bepnhaminh_test?schema=public';
process.env.JWT_ACCESS_SECRET ??= 'test-access-secret-test-access-secret-01';
process.env.JWT_REFRESH_SECRET ??= 'test-refresh-secret-test-refresh-secret-1';
process.env.S3_BUCKET ??= 'bepnhaminh-test';
process.env.CORS_ORIGIN ??= '*';
