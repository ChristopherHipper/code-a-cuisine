import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Cookbook } from '../services/cookbook';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const detailGuard: CanActivateFn = (route) => {
  const store = inject(Cookbook);
  const router = inject(Router);
  const redirect = router.createUrlTree(['/ingredients']);
  const currentid = route.paramMap.get('id');
  if (currentid === null) {
    return redirect;
  }
  const id = Number(currentid);

  return toObservable(store.loaded).pipe(
    filter((loaded) => loaded),
    take(1),
    map(() => (store.cookbook().some((recipe) => recipe.id === id) ? true : redirect)),
  );
};
