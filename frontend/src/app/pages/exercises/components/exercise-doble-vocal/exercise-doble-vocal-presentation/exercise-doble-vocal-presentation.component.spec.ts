import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDobleVocalPresentationComponent } from './exercise-doble-vocal-presentation.component';

describe('ExerciseDobleVocalPresentationComponent', () => {
  let component: ExerciseDobleVocalPresentationComponent;
  let fixture: ComponentFixture<ExerciseDobleVocalPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDobleVocalPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseDobleVocalPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
