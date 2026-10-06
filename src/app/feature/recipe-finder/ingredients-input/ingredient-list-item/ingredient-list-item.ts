import { Component, inject, input, output, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import {
  Ingredient,
  IngredientDraft,
  UNIT_OPTIONS,
} from '../../../../shared/interfaces/ingredient';
import { DUPLICATE_MESSAGE, ingredientSchema } from '../../ingredient-schema';
import { IngredientsStore } from '../../../../shared/services/ingredients-store';
import { SlicePipe } from '@angular/common';

@Component({
  imports: [FormField, SlicePipe],
  selector: 'app-ingredient-list-item',
  templateUrl: './ingredient-list-item.html',
})
export class IngredientListItem {
  private readonly store = inject(IngredientsStore);

  readonly ingredient = input.required<Ingredient>(); //required = verpflichtent vom Parent zu übergeben <Ingredient> der Type der übergeben wird
  readonly removeRequested = output<void>();

  protected readonly units = UNIT_OPTIONS;
  protected readonly editing = signal(false);
  protected readonly submitAttempted = signal(false);
  protected readonly model = signal<IngredientDraft>({ name: '', amount: null, unit: 'g' });
  protected readonly form = form(this.model, ingredientSchema);

  protected startEdit(): void {
    //Nimmt die aktuellen Daten des Ingredients und fülle damit mein Edit-Formular damit es nicht leer ist
    const { name, amount, unit } = this.ingredient();
    this.form().reset({ name, amount, unit });
    this.submitAttempted.set(false);
    this.editing.set(true);
  }

  protected cancelEdit(): void {
    this.stopEditing();
  }

  protected onSave(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);

    submit(this.form, async () => {
      const { name, amount, unit } = this.model();
      const result = this.store.update(this.ingredient().id, { name, amount: amount!, unit });
      if (result === 'conflict') {
        return { kind: 'duplicate', message: DUPLICATE_MESSAGE, fieldTree: this.form.name };
      }
      this.stopEditing();
      return undefined;
    });
  }

  private stopEditing(): void {
    this.editing.set(false);
  }
}
