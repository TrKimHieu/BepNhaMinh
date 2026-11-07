import type { IngredientUnit, MealType } from '../constants';

/** Chuỗi ISO 8601 UTC, ví dụ "2026-11-07T10:30:00.000Z" */
export type IsoDateString = string;

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: IsoDateString;
}

export type FamilyRole = 'OWNER' | 'MEMBER';

export interface Family {
  id: string;
  name: string;
  inviteCode: string;
  createdAt: IsoDateString;
}

export interface FamilyMember {
  userId: string;
  familyId: string;
  role: FamilyRole;
  joinedAt: IsoDateString;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: IngredientUnit;
}

export interface Recipe {
  id: string;
  familyId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  tags: string[];
  createdById: string;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface MealPlanEntry {
  id: string;
  familyId: string;
  recipeId: string;
  /** Ngày theo lịch địa phương, dạng "2026-11-07" */
  date: string;
  mealType: MealType;
  servings: number;
}

export interface ShoppingListItem {
  name: string;
  quantity: number;
  unit: IngredientUnit;
  /** Tên các món dùng nguyên liệu này, để người đi chợ biết nó dùng làm gì */
  usedBy: string[];
}

export interface Paginated<T> {
  items: T[];
  meta: { page: number; limit: number; total: number };
}
