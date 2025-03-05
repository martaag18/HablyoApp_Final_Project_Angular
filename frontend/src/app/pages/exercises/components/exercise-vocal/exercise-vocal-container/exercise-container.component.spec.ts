import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseContainerComponent } from './exercise-container.component';

describe('ExerciseContainerComponent', () => {
  let component: ExerciseContainerComponent;
  let fixture: ComponentFixture<ExerciseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
