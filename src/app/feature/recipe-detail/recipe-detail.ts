import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Cookbook } from '../../shared/services/cookbook';

@Component({
  imports: [Header, RouterLink],
  selector: 'app-recipe-detail',
  styleUrl: './recipe-detail.css',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  private readonly cookbook = inject(Cookbook);
  readonly id = input.required({ transform: numberAttribute });
  protected readonly recipe = computed(() =>
    this.cookbook.cookbook().find((recipe) => recipe.id === this.id()),
  );
}
