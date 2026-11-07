import { Router } from 'express';
import { API_PREFIX } from '@bepnhaminh/shared';

export const router = Router();

/** Smoke test: `curl http://localhost:3000/api/v1/ping` */
router.get('/ping', (_req, res) => {
  res.json({ pong: true, at: new Date().toISOString(), prefix: API_PREFIX });
});

// Các module tiếp theo, mỗi cái là một file trong routes/:
// router.use('/auth', authRoutes);
// router.use('/families', familyRoutes);
// router.use('/recipes', recipeRoutes);
// router.use('/meal-plans', mealPlanRoutes);
// router.use('/shopping-list', shoppingListRoutes);
