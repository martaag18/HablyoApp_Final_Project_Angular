import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePresentationComponent } from './exercise-presentation.component';

describe('ExercisePresentationComponent', () => {
  let component: ExercisePresentationComponent;
  let fixture: ComponentFixture<ExercisePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisePresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
