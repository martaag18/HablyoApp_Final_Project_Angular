import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseActionsComponent } from './exercise-actions.component';

describe('ExerciseActionsComponent', () => {
  let component: ExerciseActionsComponent;
  let fixture: ComponentFixture<ExerciseActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
