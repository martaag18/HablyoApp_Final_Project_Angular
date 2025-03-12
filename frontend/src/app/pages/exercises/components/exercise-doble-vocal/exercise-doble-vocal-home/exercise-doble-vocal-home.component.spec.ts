import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDobleVocalHomeComponent } from './exercise-doble-vocal-home.component';

describe('ExerciseDobleVocalHomeComponent', () => {
  let component: ExerciseDobleVocalHomeComponent;
  let fixture: ComponentFixture<ExerciseDobleVocalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDobleVocalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseDobleVocalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
