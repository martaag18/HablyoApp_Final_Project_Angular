import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNavigationComponent } from './exercise-navigation.component';

describe('ExerciseNavigationComponent', () => {
  let component: ExerciseNavigationComponent;
  let fixture: ComponentFixture<ExerciseNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
