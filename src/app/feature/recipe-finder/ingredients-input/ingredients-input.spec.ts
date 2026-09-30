import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientsInput } from './ingredients-input';

describe('IngredientsInput', () => {
  let component: IngredientsInput;
  let fixture: ComponentFixture<IngredientsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsInput],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
