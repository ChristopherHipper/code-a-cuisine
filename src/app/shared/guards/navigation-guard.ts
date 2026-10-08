import { CanActivateFn, Router } from '@angular/router';
import { IngredientsStore } from '../services/ingredients-store';
import { inject } from '@angular/core';

export const navigationGuard: CanActivateFn = () => {
  const store = inject(IngredientsStore);
  const router = inject(Router);
  if (store.ingredients().length === 0) {
    return router.createUrlTree(['/ingredients']);
  }
  return true;
};
