export type Unit = 'g' | 'ml' | 'pcs';

export interface Preference {
  category: string;
  icon: string;
  id: string;
  options: string[] | string;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: Unit;
}

export interface IngredientDraft {
  name: string;
  amount: number | null;
  unit: Unit;
}

export const UNIT_OPTIONS: readonly { value: Unit; label: string }[] = [
  { value: 'g', label: 'gram' },
  { value: 'ml', label: 'ml' },
  { value: 'pcs', label: 'pieces' },
];

export function defaultAmount(unit: Unit): number {
  return unit === 'pcs' ? 1 : 100;
}

export function normalizeName(name: string): string {
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
