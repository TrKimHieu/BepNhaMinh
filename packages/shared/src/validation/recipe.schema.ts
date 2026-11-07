import { z } from 'zod';
import { INGREDIENT_UNITS, MEAL_TYPES, PAGINATION } from '../constants';

/**
 * Một nguồn schema duy nhất cho cả hai phía:
 * - backend dùng ở `middlewares/validate.ts` để chặn request sai
 * - mobile dùng ở form để hiện lỗi trước khi gửi
 */

export const ingredientSchema = z.object({
  name: z.string().trim().min(1, 'Tên nguyên liệu không được để trống').max(100),
  quantity: z.number().positive('Số lượng phải lớn hơn 0').max(100_000),
  unit: z.enum(INGREDIENT_UNITS),
});

export const recipeStepSchema = z.string().trim().min(1).max(500);

export const createRecipeSchema = z.object({
  title: z.string().trim().min(1, 'Tên món không được để trống').max(150),
  description: z.string().trim().max(2000).optional(),
  imageUrl: z.url('URL ảnh không hợp lệ').optional(),
  servings: z.number().int().min(1).max(50),
  prepMinutes: z.number().int().min(0).max(1440),
  cookMinutes: z.number().int().min(0).max(1440),
  ingredients: z.array(ingredientSchema).min(1, 'Cần ít nhất 1 nguyên liệu').max(100),
  steps: z.array(recipeStepSchema).min(1, 'Cần ít nhất 1 bước').max(50),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).default([]),
});

export const updateRecipeSchema = createRecipeSchema.partial();

export const mealPlanEntrySchema = z.object({
  recipeId: z.string().min(1),
  date: z.iso.date('Ngày phải có dạng YYYY-MM-DD'),
  mealType: z.enum(MEAL_TYPES),
  servings: z.number().int().min(1).max(50),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(PAGINATION.defaultPage),
  limit: z.coerce.number().int().min(1).max(PAGINATION.maxLimit).default(PAGINATION.defaultLimit),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
export type MealPlanEntryInput = z.infer<typeof mealPlanEntrySchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
