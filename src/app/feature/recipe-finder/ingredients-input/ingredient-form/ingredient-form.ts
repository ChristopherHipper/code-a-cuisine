import { Component, inject, signal } from '@angular/core';
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

  protected readonly units = UNIT_OPTIONS;
  protected readonly submitAttempted = signal(false);

  // Model: enthält den Datenzustand und gibt die Struktur der Form vor.
  // Die User-Eingaben werden hier als aktueller Zustand gehalten.
  protected readonly model = signal<IngredientDraft>({
    name: '',
    amount: defaultAmount('g'),
    unit: 'g',
  });

  //Form-Signal: verbindet Model (Daten) und Schema (Validierung) und bildet das Formulargerüst
  protected readonly form = form(this.model, ingredientSchema);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);

    /*erstellt ein object aus dem Model informationen
    gibt dieses object an den service weiter
    eine Möglichkeit um mit den fehlern umzugehen:
    Kind = Kennzeichnet/identifiziert welcher Fehler aufgetreten ist. (auch  Banane möglich),
    Message = Die Fehlermeldung, die zu diesem Fehler gehört.
    fieldTree = welchem Formularfeld der Fehler zugeordnet werden soll
    */
    submit(this.form, async () => {
      const { name, amount, unit } = this.model();
      if (this.store.add({ name, amount: amount!, unit }) === 'conflict') {
        return { kind: 'duplicate', message: DUPLICATE_MESSAGE, fieldTree: this.form.name };
      }

      this.form().reset({ name: '', amount: defaultAmount(unit), unit });
      this.submitAttempted.set(false);
      return undefined;
    });
  }
}
