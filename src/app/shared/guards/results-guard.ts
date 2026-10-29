import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RecipeStore } from '../services/recipe-store';

export const resultsGuard: CanActivateFn = () => {
  const store = inject(RecipeStore);
  const router = inject(Router);
  if (store.generatedRecipes().length === 0) {
    return router.createUrlTree(['/ingredients']);
  }
  return true;
};
