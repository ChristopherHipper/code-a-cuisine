import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeIngredients } from './recipe-ingredients';
import { RecipeStore } from '../../../../shared/services/recipe-store';

describe('RecipeIngredients', () => {
  let component: RecipeIngredients;
  let fixture: ComponentFixture<RecipeIngredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeIngredients],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeIngredients);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('recipe', TestBed.inject(RecipeStore).generatedRecipes()[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
