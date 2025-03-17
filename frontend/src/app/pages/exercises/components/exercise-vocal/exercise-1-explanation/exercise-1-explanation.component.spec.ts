import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise1ExplanationComponent } from './exercise-1-explanation.component';

describe('Exercise1ExplanationComponent', () => {
  let component: Exercise1ExplanationComponent;
  let fixture: ComponentFixture<Exercise1ExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise1ExplanationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise1ExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
