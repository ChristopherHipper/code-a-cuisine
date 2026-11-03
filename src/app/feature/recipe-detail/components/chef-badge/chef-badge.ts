import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  templateUrl: './chef-badge.html',
  selector: 'app-chef-badge',
  host: {
    class: 'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-lg font-medium',
    '[class]': 'isEven() ? evenClasses : oddClasses',
  },
})
export class ChefBadge {
  readonly chef = input<number>();
  protected readonly isEven = computed(() => this.chef()! % 2 === 0);
  protected readonly oddClasses = 'bg-light-sage';
  protected readonly evenClasses = 'bg-cremy-hover';
}
