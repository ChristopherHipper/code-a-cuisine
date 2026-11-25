import { Component, computed, input } from '@angular/core';
import { AI_Recipe } from '../../../../shared/interfaces/recipe';
import { ChefBadge } from '../chef-badge/chef-badge';

@Component({
  imports: [ChefBadge],
  selector: 'app-recipe-overview',
  styleUrl: './recipe-overview.css',
  templateUrl: './recipe-overview.html',
})
export class RecipeOverview {
  readonly recipe = input<AI_Recipe>();
  protected readonly cookingPersons = computed(() =>
    Array.from({ length: this.recipe()?.persons ?? 0 }),
  );
  protected readonly nutritions = computed(() => this.recipe()?.nutritions[0]);
}
