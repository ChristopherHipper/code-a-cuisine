import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IngredientsStore } from '../../../shared/services/ingredients-store';
import { Header } from '../../../shared/components/header/header';

@Component({
  imports: [Header],
  selector: 'app-preferences',
  styleUrl: './preferences.css',
  templateUrl: './preferences.html',
})
export class Preferences {
  protected readonly store = inject(IngredientsStore);
  portions = signal<number>(2);
  persons = signal<number>(1);

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
}
