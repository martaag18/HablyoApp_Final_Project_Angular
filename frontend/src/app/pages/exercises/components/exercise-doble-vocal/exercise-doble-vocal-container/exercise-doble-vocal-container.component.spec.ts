import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDobleVocalContainerComponent } from './exercise-doble-vocal-container.component';

describe('ExerciseDobleVocalContainerComponent', () => {
  let component: ExerciseDobleVocalContainerComponent;
  let fixture: ComponentFixture<ExerciseDobleVocalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDobleVocalContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseDobleVocalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
