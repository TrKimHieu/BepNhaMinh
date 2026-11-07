import type { ErrorRequestHandler, RequestHandler } from 'express';
import { isProduction } from '../config/env.js';

/** Lỗi có chủ đích của ứng dụng — map thẳng ra HTTP, không log stack. */
export class AppError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'NOT_FOUND', message: 'Endpoint không tồn tại' });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      error: err.code,
      message: err.message,
      ...(err.details === undefined ? {} : { details: err.details }),
    });
    return;
  }

  console.error('[unhandled]', err);

  res.status(500).json({
    error: 'INTERNAL',
    message: 'Lỗi hệ thống',
    // Không bao giờ lộ stack trace ra ngoài ở production.
    ...(isProduction ? {} : { debug: err instanceof Error ? err.message : String(err) }),
  });
};
