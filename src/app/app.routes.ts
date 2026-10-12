import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing/landing-page';
import { IngredientsInput } from './feature/recipe-finder/ingredients-input/ingredients-input';
import { Preferences } from './feature/recipe-finder/preferences/preferences';
import { navigationGuard } from './shared/guards/navigation-guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'ingredients',
    component: IngredientsInput,
  },
  {
    path: 'preferences',
    component: Preferences,
    canActivate: [navigationGuard],
  },
  {
    path: 'cookbook',
    loadComponent: () => import('./feature/cookbook/cookbook').then((m) => m.Cookbook),
  },
];
