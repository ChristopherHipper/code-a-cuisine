import { ChoosenPreferences, Ingredient } from '../interfaces/ingredient';

export interface Recipe {
  preferences: ChoosenPreferences;
  ingredients: Ingredient[];
}
