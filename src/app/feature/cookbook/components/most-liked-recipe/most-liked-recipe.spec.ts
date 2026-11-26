import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostLikedRecipe } from './most-liked-recipe';

describe('MostLikedRecipe', () => {
  let component: MostLikedRecipe;
  let fixture: ComponentFixture<MostLikedRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostLikedRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(MostLikedRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
