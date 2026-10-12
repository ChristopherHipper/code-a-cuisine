import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { IngredientsStore } from '../../../shared/services/ingredients-store';
import { IngredientForm } from './ingredient-form/ingredient-form';
import { IngredientListItem } from './ingredient-list-item/ingredient-list-item';

@Component({
  imports: [Header, IngredientForm, IngredientListItem, RouterLink],
  selector: 'app-ingredients-input',
  styleUrl: './ingredients-input.css',
  templateUrl: './ingredients-input.html',
})
export class IngredientsInput {
  protected readonly store = inject(IngredientsStore);

  protected remove(id: number): void {
    this.store.remove(id);
  }
}
