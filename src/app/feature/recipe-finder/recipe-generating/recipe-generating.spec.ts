import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeGenerating } from './recipe-generating';

describe('RecipeGenerating', () => {
  let component: RecipeGenerating;
  let fixture: ComponentFixture<RecipeGenerating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeGenerating],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeGenerating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
