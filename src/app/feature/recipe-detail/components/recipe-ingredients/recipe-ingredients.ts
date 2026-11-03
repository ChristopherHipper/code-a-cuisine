import { Component, computed, input } from '@angular/core';
import { AI_Recipe } from '../../../../shared/interfaces/recipe';

@Component({
  imports: [],
  selector: 'app-recipe-ingredients',
  styleUrl: './recipe-ingredients.css',
  templateUrl: './recipe-ingredients.html',
})
export class RecipeIngredients {
  readonly recipe = input<AI_Recipe>();
  protected readonly ownIngredients = computed(() =>
    this.recipe()?.ingredients.filter((ingredient) => ingredient.available),
  );
  protected readonly extraIngredients = computed(() =>
    this.recipe()?.ingredients.filter((ingredient) => !ingredient.available),
  );
}
