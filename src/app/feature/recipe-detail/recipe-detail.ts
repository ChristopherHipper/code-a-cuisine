import { Component, computed, inject, input, numberAttribute, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Cookbook } from '../../shared/services/cookbook';
import { RecipeOverview } from './components/recipe-overview/recipe-overview';
import { RecipeIngredients } from './components/recipe-ingredients/recipe-ingredients';
import { RecipeDirection } from './components/recipe-direction/recipe-direction';

@Component({
  imports: [Header, RouterLink, RecipeOverview, RecipeIngredients, RecipeDirection],
  selector: 'app-recipe-detail',
  styleUrl: './recipe-detail.css',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  private router = inject(Router);
  private readonly cookbook = inject(Cookbook);
  readonly id = input.required({ transform: numberAttribute });
  protected readonly recipe = computed(() =>
    this.cookbook.cookbook().find((recipe) => recipe.id === this.id()),
  );
  protected readonly liked = signal(false);

  backToResults() {
    this.router.navigate(['/results']);
  }

  toggleLike() {
    this.liked.update((liked) => !liked);
  }
}
