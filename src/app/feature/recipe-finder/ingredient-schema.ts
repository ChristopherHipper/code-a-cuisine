import { required, schema, validate } from '@angular/forms/signals';
import { IngredientDraft } from '../../shared/interfaces/ingredient';

export const ingredientSchema = schema<IngredientDraft>((path) => {
  validate(path.name, ({ value }) =>
    value().trim() ? undefined : { kind: 'required', message: 'Please enter an ingredient.' },
  );

  required(path.amount, { message: 'Please enter an amount.' });

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
