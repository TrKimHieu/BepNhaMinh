import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { AppError } from './errorHandler.js';

type Source = 'body' | 'query' | 'params';

/**
 * Validate + GHI ĐÈ dữ liệu đã parse.
 *
 * Express 5 biến `req.query` thành getter không ghi được, nên phải dùng
 * Object.defineProperty. Không có bước này thì `z.coerce.number()` trong
 * schema không có tác dụng ở controller: req.query.page vẫn là string.
 */
export const validate =
  (schema: ZodType, source: Source = 'body'): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      next(
        new AppError(
          400,
          'VALIDATION_ERROR',
          'Dữ liệu không hợp lệ',
          result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        ),
      );
      return;
    }

    Object.defineProperty(req, source, {
      value: result.data,
      writable: true,
      configurable: true,
      enumerable: true,
    });

    next();
  };
