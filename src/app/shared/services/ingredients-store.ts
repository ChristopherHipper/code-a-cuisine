import { computed, Service, signal } from '@angular/core';
import { Ingredient, normalizeName } from '../interfaces/ingredient';

export type IngredientValues = Omit<Ingredient, 'id'>;

/** `conflict` means an ingredient with the same name but a different unit already exists. */
export type SaveResult = 'saved' | 'conflict';

@Service()
export class IngredientsStore {
  private readonly items = signal<Ingredient[]>([]);
  private nextId = 1;

  readonly ingredients = this.items.asReadonly();
  readonly hasIngredients = computed(() => this.items().length > 0);

  add(values: IngredientValues): SaveResult {
    const name = normalizeName(values.name);
    const existing = this.findByName(name);

    if (existing) {
      if (existing.unit !== values.unit) return 'conflict';
      this.items.update((items) =>
        items.map((item) =>
          item.id === existing.id ? { ...item, amount: item.amount + values.amount } : item,
        ),
      );
      return 'saved';
    }

    this.items.update((items) => [...items, { ...values, name, id: this.nextId++ }]);
    return 'saved';
  }

  update(id: number, values: IngredientValues): SaveResult {
    const name = normalizeName(values.name);
    const duplicate = this.findByName(name, id);

    if (duplicate) {
      if (duplicate.unit !== values.unit) return 'conflict';
      this.items.update((items) =>
        items
          .filter((item) => item.id !== id)
          .map((item) =>
            item.id === duplicate.id ? { ...item, amount: item.amount + values.amount } : item,
          ),
      );
      return 'saved';
    }

    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...values, name, id } : item)),
    );
    return 'saved';
  }

  remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  private findByName(name: string, excludeId?: number): Ingredient | undefined {
    const key = name.toLowerCase();
    return this.items().find((item) => item.id !== excludeId && item.name.toLowerCase() === key);
  }
}
