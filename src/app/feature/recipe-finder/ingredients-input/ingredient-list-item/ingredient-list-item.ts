import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
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
  private readonly injector = inject(Injector);
  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private readonly editButton = viewChild<ElementRef<HTMLButtonElement>>('editButton');

  readonly ingredient = input.required<Ingredient>();
  readonly removeRequested = output<void>();

  protected readonly units = UNIT_OPTIONS;
  protected readonly editing = signal(false);
  protected readonly submitAttempted = signal(false);
  protected readonly model = signal<IngredientDraft>({ name: '', amount: null, unit: 'g' });
  protected readonly form = form(this.model, ingredientSchema);

  protected startEdit(): void {
    const { name, amount, unit } = this.ingredient();
    this.form().reset({ name, amount, unit });
    this.submitAttempted.set(false);
    this.editing.set(true);
    afterNextRender(() => this.nameInput()?.nativeElement.focus(), { injector: this.injector });
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
    afterNextRender(() => this.editButton()?.nativeElement.focus(), { injector: this.injector });
  }
}
