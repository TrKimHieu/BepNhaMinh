export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
export type MealType = (typeof MEAL_TYPES)[number];

export const MEAL_TYPE_LABEL: Record<MealType, string> = {
  breakfast: 'Sáng',
  lunch: 'Trưa',
  dinner: 'Tối',
  snack: 'Phụ',
};

export const INGREDIENT_UNITS = [
  'g',
  'kg',
  'ml',
  'l',
  'tsp',
  'tbsp',
  'piece',
  'bunch',
  'pinch',
] as const;
export type IngredientUnit = (typeof INGREDIENT_UNITS)[number];

export const INGREDIENT_UNIT_LABEL: Record<IngredientUnit, string> = {
  g: 'gam',
  kg: 'kg',
  ml: 'ml',
  l: 'lít',
  tsp: 'thìa cà phê',
  tbsp: 'thìa canh',
  piece: 'cái',
  bunch: 'bó',
  pinch: 'nhúm',
};

/** Tiền tố chung cho toàn bộ endpoint. Sửa ở đây thì cả hai phía đổi theo. */
export const API_PREFIX = '/api/v1';

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;
