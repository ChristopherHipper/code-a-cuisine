import { computed, Service, signal } from '@angular/core';
import { ChoosenPreferences } from '../interfaces/ingredient';

@Service()
export class PreferencesStore {
  portions = signal<number>(2);
  persons = signal<number>(1);
  cookingTime = signal<string>('');
  cuisine = signal<string>('');
  diet = signal<string>('');
  readonly hasAllPreferences = signal<boolean>(false);
  readonly choosenPreferences = computed<ChoosenPreferences>(() => ({
    cookingTime: this.cookingTime().toLowerCase(),
    cuisine: this.cuisine().toLowerCase(),
    diet: this.diet().toLowerCase(),
    portions: this.portions(),
    persons: this.persons(),
  }));
}
