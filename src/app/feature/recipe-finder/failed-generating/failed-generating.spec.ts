import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FailedGenerating } from './failed-generating';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FailedGenerating', () => {
  let component: FailedGenerating;
  let fixture: ComponentFixture<FailedGenerating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedGenerating],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FailedGenerating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
