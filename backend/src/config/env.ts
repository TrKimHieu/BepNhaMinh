import 'dotenv/config';
import { z } from 'zod';

/**
 * Fail fast: biến môi trường sai thì server không được phép khởi động.
 * Một server chạy với JWT secret rỗng còn tệ hơn server không chạy.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().max(65_535).default(3000),

  DATABASE_URL: z.string().min(1, 'Thiếu DATABASE_URL'),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET phải >= 32 ký tự'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET phải >= 32 ký tự'),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),

  CORS_ORIGIN: z.string().default('*'),

  AWS_REGION: z.string().default('ap-southeast-1'),
  S3_BUCKET: z.string().min(1, 'Thiếu S3_BUCKET'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const lines = parsed.error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`);
  console.error(`Biến môi trường không hợp lệ:\n${lines.join('\n')}\n`);
  console.error('Xem backend/.env.example để biết danh sách biến cần có.');
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
