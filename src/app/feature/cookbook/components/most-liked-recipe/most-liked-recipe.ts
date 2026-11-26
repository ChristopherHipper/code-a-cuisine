import { Component, computed, inject } from '@angular/core';
import { Cookbook } from '../../../../shared/services/cookbook';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  imports: [RecipeCard],
  selector: 'app-most-liked-recipe',
  styleUrl: './most-liked-recipe.css',
  templateUrl: './most-liked-recipe.html',
})
export class MostLikedRecipe {
  private readonly cookbook = inject(Cookbook);
  protected readonly favRecipes = computed(() =>
    this.cookbook.cookbook().filter((recipe) => recipe.likes >= 20),
  );
}
