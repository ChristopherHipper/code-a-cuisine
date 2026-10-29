import { Routes } from '@angular/router';
import { LandingPage } from './feature/landing/landing-page';
import { IngredientsInput } from './feature/recipe-finder/ingredients-input/ingredients-input';
import { Preferences } from './feature/recipe-finder/preferences/preferences';
import { navigationGuard } from './shared/guards/navigation-guard';
import { Results } from './feature/recipe-finder/results/results';
import { resultsGuard } from './shared/guards/results-guard';
import { detailGuard } from './shared/guards/detail-guard';

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
    path: 'results',
    component: Results,
    canActivate: [resultsGuard],
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./feature/recipe-detail/recipe-detail').then((m) => m.RecipeDetail),
    canActivate: [detailGuard],
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
