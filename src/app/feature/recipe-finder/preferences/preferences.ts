import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IngredientsStore } from '../../../shared/services/ingredients-store';
import { Header } from '../../../shared/components/header/header';
import { Router } from '@angular/router';
import { Preference } from '../../../shared/interfaces/ingredient';

@Component({
  imports: [Header],
  selector: 'app-preferences',
  styleUrl: './preferences.css',
  templateUrl: './preferences.html',
})
export class Preferences {
  private readonly router = inject(Router);
  private readonly store = inject(IngredientsStore);
  protected readonly portions = signal<number>(2);
  protected readonly persons = signal<number>(1);
  protected readonly preferences = signal<Preference[]>([
    {
      category: 'Coocking time',
      options: ['Quick', 'Medium', 'Complex'],
    },
    {
      category: 'Cousine',
      options: ['German', 'Italien', 'Indien', 'Japanes', 'Gourmet', 'Fusion'],
    },
    {
      category: 'Diet preferences',
      options: ['Vegetarien', 'Vegan', 'Keto', 'No preferences'],
    },
  ]);
  private readonly choosenPreferences = signal<string[]>([]);

  increase(signal: WritableSignal<number>, max: number): void {
    if (signal() >= max) {
      return;
    }
    signal.set(signal() + 1);
  }

  decrease(signal: WritableSignal<number>): void {
    if (signal() <= 1) {
      return;
    }
    signal.set(signal() - 1);
  }

  backToIngredients() {
    this.store.clear();
    this.router.navigate(['/ingredients']);
  }

  selectPreference(preference: string) {
    console.log(preference);
  }
}
