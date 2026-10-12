import { computed, inject, Service } from '@angular/core';
import { IngredientsStore } from './ingredients-store';
import { Recipe } from '../interface/recipe';
import { PreferencesStore } from './preferences-store';

@Service()
export class RecipeStore {
  private readonly ingredientsStore = inject(IngredientsStore);
  private readonly preferencesStore = inject(PreferencesStore);
  readonly recipe = computed<Recipe>(() => ({
    ingredients: this.ingredientsStore.ingredients(),
    preferences: this.preferencesStore.choosenPreferences(),
  }));
}
