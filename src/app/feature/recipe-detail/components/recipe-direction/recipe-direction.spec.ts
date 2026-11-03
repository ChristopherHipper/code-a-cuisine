import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDirection } from './recipe-direction';
import { RecipeStore } from '../../../../shared/services/recipe-store';

describe('RecipeDirection', () => {
  let component: RecipeDirection;
  let fixture: ComponentFixture<RecipeDirection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDirection],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDirection);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('recipe', TestBed.inject(RecipeStore).generatedRecipes()[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
