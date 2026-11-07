import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../../src/app';

/**
 * Smoke test: app khởi tạo được, route trả đúng shape, 404 trả JSON chứ không phải HTML.
 * Không cần DB — Prisma chỉ kết nối ở query đầu tiên.
 */
describe('health', () => {
  const app = createApp();

  it('GET /health trả 200 và uptime', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', env: 'test' });
    expect(typeof res.body.uptime).toBe('number');
  });

  it('GET /api/v1/ping trả pong', async () => {
    const res = await request(app).get('/api/v1/ping');

    expect(res.status).toBe(200);
    expect(res.body.pong).toBe(true);
    expect(res.body.prefix).toBe('/api/v1');
  });

  it('route lạ trả 404 dạng JSON', async () => {
    const res = await request(app).get('/khong-ton-tai');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('NOT_FOUND');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});
