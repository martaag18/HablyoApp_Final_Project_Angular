import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise2ExplanationComponent } from './exercise-2-explanation.component';

describe('Exercise2ExplanationComponent', () => {
  let component: Exercise2ExplanationComponent;
  let fixture: ComponentFixture<Exercise2ExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise2ExplanationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise2ExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
