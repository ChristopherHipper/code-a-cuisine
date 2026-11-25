import { Component, computed, input } from '@angular/core';
import { AI_Recipe } from '../../../../shared/interfaces/recipe';
import { ChefBadge } from '../chef-badge/chef-badge';

@Component({
  imports: [ChefBadge],
  selector: 'app-recipe-direction',
  styleUrl: './recipe-direction.css',
  templateUrl: './recipe-direction.html',
})
export class RecipeDirection {
  readonly recipe = input<AI_Recipe>();
  protected readonly steps = computed(() => this.recipe()?.cooking_description);
}
