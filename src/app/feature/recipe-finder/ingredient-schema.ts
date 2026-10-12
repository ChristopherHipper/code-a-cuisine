import { required, schema, validate } from '@angular/forms/signals';
import { IngredientDraft } from '../../shared/interfaces/ingredient';

// Schema: definiert die Validierungsregeln für das Model.
// IngredientDraft gibt vor, welche Felder validiert werden können.
export const ingredientSchema = schema<IngredientDraft>((path) => {
  // Validierung: name darf nicht leer sein
  validate(path.name, ({ value }) =>
    value().trim() ? undefined : { kind: 'required', message: 'Please enter an ingredient.' },
  );
  // Validierung: amount muss vorhanden sein
  required(path.amount, { message: 'Please enter an amount.' });
  // Validierung: amount muss > 0 sein und bei "pcs" eine ganze Zahl
  validate(path.amount, ({ value, valueOf }) => {
    const amount = value();
    if (amount === null) return undefined;
    if (amount <= 0) return { kind: 'positive', message: 'Amount must be greater than 0.' };
    if (valueOf(path.unit) === 'pcs' && !Number.isInteger(amount)) {
      return { kind: 'integer', message: 'Pieces must be a whole number.' };
    }
    return undefined;
  });
});

export const DUPLICATE_MESSAGE = 'Already in list with a different unit.';
