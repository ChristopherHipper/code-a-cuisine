import { ChoosenPreferences, Ingredient } from '../interfaces/ingredient';

export interface Recipe {
  preferences: ChoosenPreferences;
  ingredients: Ingredient[];
}

export interface AI_Recipe {
  persons: number;
  id: number;
  title: string;
  cooking_time: number;
  cuisine: string;
  difficulty: string;
  preference: string;
  portions: number;
  nutritions: {
    energie: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }[];
  ingredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    available: boolean;
  }[];
  cooking_description: {
    stepNumber: number;
    title: string;
    description: string;
    assignedPerson: number;
  }[];
}
