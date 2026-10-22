import { computed, inject, Service, signal } from '@angular/core';
import { IngredientsStore } from './ingredients-store';
import { AI_Recipe, Recipe } from '../interfaces/recipe';
import { PreferencesStore } from './preferences-store';

@Service()
export class RecipeStore {
  private readonly ingredientsStore = inject(IngredientsStore);
  private readonly preferencesStore = inject(PreferencesStore);
  readonly recipe = computed<Recipe>(() => ({
    ingredients: this.ingredientsStore.ingredients(),
    preferences: this.preferencesStore.choosenPreferences(),
  }));
  generatedRecipes = signal<AI_Recipe[]>([
    {
      id: 1,
      title: 'Deftiger Gulasch-Kartoffel-Eintopf mit Brokoli',
      cookingTime: 25,
      cuisine: 'german',
      difficulty: 'quick',
      dietPreference: 'vegetarian',
      cooking_persons: 1,
      portions: 2,
      nutrition: { energie: 450, protein: 18, fat: 22, carbohydrates: 42 },
      ingredients: [
        { id: 1, name: 'Kartoffeln', amount: 400, unit: 'g', available: true },
        { id: 2, name: 'Zwiebeln', amount: 1, unit: 'Stück', available: true },
        { id: 3, name: 'Eier', amount: 2, unit: 'Stück', available: true },
        { id: 4, name: 'Butter', amount: 20, unit: 'g', available: true },
        { id: 5, name: 'Salz', amount: 2, unit: 'g', available: true },
        { id: 6, name: 'Pfeffer', amount: 1, unit: 'g', available: true },
      ],
      cookingDirection: {
        seps: [
          {
            stepNumber: 1,
            title: 'Zutaten vorbereiten',
            description:
              'Kartoffeln schälen und in dünne Scheiben schneiden. Zwiebel schälen und würfeln.',
            assignedPerson: 1,
          },
          {
            stepNumber: 2,
            title: 'Kartoffeln braten',
            description:
              'Butter in einer Pfanne erhitzen. Kartoffeln und Zwiebeln etwa 15–20 Minuten goldbraun braten. Mit Salz und Pfeffer würzen.',
            assignedPerson: 1,
          },
          {
            stepNumber: 3,
            title: 'Spiegeleier zubereiten',
            description:
              'Eier in einer zweiten Pfanne braten und zusammen mit den Bratkartoffeln servieren.',
            assignedPerson: 1,
          },
        ],
      },
    },
    {
      id: 2,
      title: 'Kalter Penne-Feta Fusion-Salat',
      cookingTime: 25,
      cuisine: 'german',
      difficulty: 'quick',
      dietPreference: 'vegetarian',
      cooking_persons: 1,
      portions: 2,
      nutrition: { energie: 420, protein: 16, fat: 20, carbohydrates: 40 },
      ingredients: [
        { id: 1, name: 'Kartoffeln', amount: 400, unit: 'g', available: true },
        { id: 2, name: 'Zwiebeln', amount: 1, unit: 'Stück', available: true },
        { id: 3, name: 'Eier', amount: 2, unit: 'Stück', available: true },
        { id: 4, name: 'Butter', amount: 20, unit: 'g', available: true },
        { id: 5, name: 'Salz', amount: 2, unit: 'g', available: true },
        { id: 6, name: 'Pfeffer', amount: 1, unit: 'g', available: true },
        { id: 7, name: 'Geriebener Käse', amount: 50, unit: 'g', available: false },
      ],
      cookingDirection: {
        seps: [
          {
            stepNumber: 1,
            title: 'Gemüse vorbereiten',
            description:
              'Kartoffeln schälen und in kleine Würfel schneiden. Zwiebel schälen und fein würfeln.',
            assignedPerson: 1,
          },
          {
            stepNumber: 2,
            title: 'Kartoffeln anbraten',
            description:
              'Butter in einer Pfanne erhitzen und Kartoffeln sowie Zwiebeln etwa 20 Minuten braten. Mit Salz und Pfeffer würzen.',
            assignedPerson: 1,
          },
          {
            stepNumber: 3,
            title: 'Eier und Käse hinzufügen',
            description:
              'Eier verquirlen, über die Kartoffeln geben und stocken lassen. Geriebenen Käse darüberstreuen und schmelzen lassen.',
            assignedPerson: 1,
          },
        ],
      },
    },
    {
      id: 3,
      title: 'Bratwurststampf mit Ketchup',
      cookingTime: 30,
      cuisine: 'german',
      difficulty: 'quick',
      dietPreference: 'vegetarian',
      cooking_persons: 1,
      portions: 2,
      nutrition: { energie: 460, protein: 19, fat: 24, carbohydrates: 39 },
      ingredients: [
        { id: 1, name: 'Kartoffeln', amount: 400, unit: 'g', available: true },
        { id: 2, name: 'Zwiebeln', amount: 1, unit: 'Stück', available: true },
        { id: 3, name: 'Eier', amount: 2, unit: 'Stück', available: true },
        { id: 4, name: 'Butter', amount: 20, unit: 'g', available: true },
        { id: 5, name: 'Salz', amount: 2, unit: 'g', available: true },
        { id: 6, name: 'Pfeffer', amount: 1, unit: 'g', available: true },
        { id: 7, name: 'Sahne', amount: 100, unit: 'ml', available: false },
        { id: 8, name: 'Geriebener Käse', amount: 50, unit: 'g', available: false },
      ],
      cookingDirection: {
        seps: [
          {
            stepNumber: 1,
            title: 'Kartoffeln vorbereiten',
            description: 'Kartoffeln schälen, in dünne Scheiben schneiden und die Zwiebel würfeln.',
            assignedPerson: 1,
          },
          {
            stepNumber: 2,
            title: 'Zutaten schichten',
            description:
              'Eine Auflaufform mit Butter einfetten. Kartoffeln und Zwiebeln darin verteilen. Eier mit Sahne, Salz und Pfeffer verquirlen und darübergeben.',
            assignedPerson: 1,
          },
          {
            stepNumber: 3,
            title: 'Auflauf backen',
            description:
              'Geriebenen Käse darüberstreuen und den Auflauf bei 200 °C etwa 20 Minuten backen, bis die Eier gestockt und die Kartoffeln gar sind.',
            assignedPerson: 1,
          },
        ],
      },
    },
  ]);
}
