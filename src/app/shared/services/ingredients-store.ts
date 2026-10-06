import { computed, Service, signal } from '@angular/core';
import { Ingredient, normalizeName } from '../interfaces/ingredient';

// IngredientValues: entspricht type Ingredient, aber ohne die id (weil die id zu dem zeitpunkt noch nicht exisitiert und erst beim add gesetz wird)
export type IngredientValues = Omit<Ingredient, 'id'>;

/** `conflict` means an ingredient with the same name but a different unit already exists. */
export type SaveResult = 'saved' | 'conflict';

@Service()
export class IngredientsStore {
  // Interner Zustand: kann gelesen und verändert werden. (nur store kann ihn ändern)
  private readonly items = signal<Ingredient[]>([]);
  private nextId = 1;
  // Öffentlicher Zustand: nur lesbar.
  readonly ingredients = this.items.asReadonly();
  readonly hasIngredients = computed(() => this.items().length > 0);

  // Fügt eine Zutat hinzu oder erhöht deren Menge.
  // Bei gleicher Zutat mit anderer Einheit → 'conflict'.
  add(values: IngredientValues): SaveResult {
    const name = normalizeName(values.name); // Name vereinheitlichen (z. B. Leerzeichen entfernen)
    const existing = this.findByName(name); // Prüfen, ob Zutat bereits existiert

    if (existing) {
      if (existing.unit !== values.unit) return 'conflict'; // Gleicher Name, aber andere Einheit → Fehler
      this.items.update((items) =>
        // Gleiche Zutat + gleiche Einheit → Menge addieren
        items.map(
          (item) =>
            item.id === existing.id ? { ...item, amount: item.amount + values.amount } : item, // ...kopiert das vorhandene item, addiert die amounts
        ),
      );
      return 'saved';
    }
    // Zutat existiert noch nicht → neue Zutat mit ID hinzufügen
    this.items.update((items) => [...items, { ...values, name, id: this.nextId++ }]); //...items = kopiert alle vorhandenen Items in ein neues Array
    return 'saved'; // ...values = übernimmt die Werte der neuen Zutat, name = überschreibt den Namen mit dem normalisierten Namen, id = fügt eine neue ID hinzu
  }

  update(id: number, values: IngredientValues): SaveResult {
    const name = normalizeName(values.name);
    const duplicate = this.findByName(name, id);

    if (duplicate) {
      if (duplicate.unit !== values.unit) return 'conflict';
      this.items.update((items) =>
        items
          .filter((item) => item.id !== id) //das aktuelle zu bearbeitende item herausfiltern
          .map(
            (item) =>
              //mit den restlichen herausifnden wleches das duplicierte ist.
              item.id === duplicate.id ? { ...item, amount: item.amount + values.amount } : item, // das imte nehmen und den amount vom zu bearbeitenden und duplivierten addieren
          ),
      );
      return 'saved';
    }

    this.items.update(
      (items) => items.map((item) => (item.id === id ? { ...values, name, id } : item)), //wenn es kein duplicat gibt. Mit map ein neues items array erstellen und und das zu bearbeitende überchreiben
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
