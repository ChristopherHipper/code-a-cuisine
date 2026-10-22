import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { RecipeStore } from '../../../shared/services/recipe-store';
import { IngredientsStore } from '../../../shared/services/ingredients-store';
import { PreferencesStore } from '../../../shared/services/preferences-store';
import { Cookbook } from '../../../shared/services/cookbook';

@Component({
  imports: [Header, NgOptimizedImage, RouterLink],
  selector: 'app-results',
  styleUrl: './results.css',
  templateUrl: './results.html',
})
export class Results {
  protected readonly cookbook = inject(Cookbook);
  private readonly router = inject(Router);
  private readonly recipeStore = inject(RecipeStore);
  private readonly ingredientsStore = inject(IngredientsStore);
  private readonly preferencesStore = inject(PreferencesStore);
  protected readonly recipes = this.recipeStore.generatedRecipes;
  private readonly firstRecipe = computed(() => this.recipes()[0]);
  protected readonly difficulty = computed(
    () => this.firstRecipe()?.difficulty.toLowerCase() ?? '',
  );
  protected readonly tags = computed(() => {
    const recipe = this.firstRecipe();
    if (!recipe) return [];
    return [recipe.cuisine, recipe.difficulty].filter(Boolean).map(this.capitalize);
  });

  async generateNewRecipe(): Promise<void> {
    await this.router.navigate(['/ingredients']);
    this.recipeStore.generatedRecipes.set([]);
    this.ingredientsStore.clear();
    this.preferencesStore.reset();
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
