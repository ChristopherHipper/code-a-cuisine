import { Component, ElementRef, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import {
  defaultAmount,
  IngredientDraft,
  UNIT_OPTIONS,
} from '../../../../shared/interfaces/ingredient';
import { DUPLICATE_MESSAGE, ingredientSchema } from '../../ingredient-schema';
import { IngredientsStore } from '../../../../shared/services/ingredients-store';

@Component({
  imports: [FormField],
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.html',
})
export class IngredientForm {
  private readonly store = inject(IngredientsStore);
  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');

  protected readonly units = UNIT_OPTIONS;
  protected readonly submitAttempted = signal(false);
  protected readonly model = signal<IngredientDraft>({
    name: '',
    amount: defaultAmount('g'),
    unit: 'g',
  });
  protected readonly form = form(this.model, ingredientSchema);

  constructor() {
    // Follow the unit's default amount until the user types their own amount.
    effect(() => {
      const unit = this.form.unit().value();
      untracked(() => {
        if (!this.form.amount().dirty()) this.form.amount().value.set(defaultAmount(unit));
      });
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);

    submit(this.form, async () => {
      const { name, amount, unit } = this.model();
      if (this.store.add({ name, amount: amount!, unit }) === 'conflict') {
        return { kind: 'duplicate', message: DUPLICATE_MESSAGE, fieldTree: this.form.name };
      }

      this.form().reset({ name: '', amount: defaultAmount(unit), unit });
      this.submitAttempted.set(false);
      this.nameInput().nativeElement.focus();
      return undefined;
    });
  }
}
