import { Service, signal } from '@angular/core';
import { AI_Recipe } from '../interfaces/recipe';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Service()
export class Cookbook {
  private readonly data = signal<AI_Recipe[]>([]);
  supabase = createClient(environment.ApiUrl, environment.ApiKey);
  readonly cookbook = this.data.asReadonly();

  constructor() {
    this.getCookbook();
  }

  async getCookbook() {
    const { data: recipes, error } = await this.supabase.from('recipes').select(`*,
      ingredients(*),
      nutritions(*),
      cooking_description(*)`);
    if (error) {
      throw error;
    }
    if (recipes) {
      this.data.set(recipes);
    }
    console.log('cookbook: ', this.cookbook());
  }

  getSupabaseId(title: string): number {
    const recipe = this.cookbook().find((recipe) => recipe.title === title);
    const firstRecipe = this.cookbook()[0];
    if (recipe) {
      return recipe.id;
    }
    return firstRecipe?.id;
  }
}
