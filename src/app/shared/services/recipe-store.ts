import { computed, inject, Service, signal } from '@angular/core';
import { IngredientsStore } from './ingredients-store';
import { AI_Recipe, Recipe } from '../interfaces/recipe';
import { PreferencesStore } from './preferences-store';

@Service()
export class RecipeStore {
  private readonly ingredientsStore = inject(IngredientsStore);
  private readonly preferencesStore = inject(PreferencesStore);
  readonly recipe = computed<Recipe>(() => ({
    ingredients: this.ingredientsStore.ingredients(),
    preferences: this.preferencesStore.choosenPreferences(),
  }));
  generatedRecipes = signal<AI_Recipe[]>([]);
}
