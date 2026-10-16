import { ChoosenPreferences, Ingredient } from '../interfaces/ingredient';

export interface Recipe {
  preferences: ChoosenPreferences;
  ingredients: Ingredient[];
}

export interface AI_Recipe {
  cooking_persons: string;
  id: number;
  title: string;
  cookingTime: number;
  cuisine: string;
  difficulty: string;
  dietPreference: string;
  portions: number;
  nutrition: {
    energie: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  ingredients: [
    {
      id: number;
      name: string;
      amount: number;
      unit: string;
      available: boolean;
    },
  ];
  cookingDirection: {
    seps: [
      {
        stepNumber: number;
        title: string;
        description: string;
        assignedPerson: number;
      },
    ];
  };
}
