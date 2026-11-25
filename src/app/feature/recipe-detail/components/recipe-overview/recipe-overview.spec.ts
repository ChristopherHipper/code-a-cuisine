import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeOverview } from './recipe-overview';
import { RecipeStore } from '../../../../shared/services/recipe-store';

describe('RecipeOverview', () => {
  let component: RecipeOverview;
  let fixture: ComponentFixture<RecipeOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeOverview);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('recipe', TestBed.inject(RecipeStore).generatedRecipes()[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
