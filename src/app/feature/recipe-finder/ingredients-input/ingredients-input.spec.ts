import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientsInput } from './ingredients-input';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('IngredientsInput', () => {
  let component: IngredientsInput;
  let fixture: ComponentFixture<IngredientsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsInput],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
