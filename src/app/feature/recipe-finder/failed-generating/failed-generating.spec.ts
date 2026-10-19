import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FailedGenerating } from './failed-generating';

describe('FailedGenerating', () => {
  let component: FailedGenerating;
  let fixture: ComponentFixture<FailedGenerating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedGenerating],
    }).compileComponents();

    fixture = TestBed.createComponent(FailedGenerating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
