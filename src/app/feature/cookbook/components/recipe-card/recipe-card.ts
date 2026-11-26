import { Component, input } from '@angular/core';
import { AI_Recipe } from '../../../../shared/interfaces/recipe';

@Component({
  imports: [],
  selector: 'app-recipe-card',
  styleUrl: './recipe-card.css',
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
  readonly recipe = input<AI_Recipe>();
}
