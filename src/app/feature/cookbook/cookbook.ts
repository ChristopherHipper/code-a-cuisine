import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Router } from '@angular/router';
import { MostLikedRecipe } from './components/most-liked-recipe/most-liked-recipe';

@Component({
  imports: [Header, MostLikedRecipe],
  selector: 'app-cookbook',
  styleUrl: './cookbook.css',
  templateUrl: './cookbook.html',
})
export class Cookbook {
  private router = inject(Router);

  backToStart() {
    this.router.navigate(['/']);
  }
}
