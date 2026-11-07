import { createApp } from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/database.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`Bếp Nhà Mình API — http://localhost:${env.PORT}/api/v1 (${env.NODE_ENV})`);
});

/**
 * Đóng server êm: ngừng nhận request mới, chờ request đang chạy xong,
 * rồi mới ngắt DB. Thiếu bước này, mỗi lần deploy sẽ có request bị đứt.
 */
const shutdown = (signal: string) => {
  console.log(`\n${signal} — đang đóng...`);
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
