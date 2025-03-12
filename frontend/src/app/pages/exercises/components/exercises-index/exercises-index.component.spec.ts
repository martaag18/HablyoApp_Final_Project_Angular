import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesIndexComponent } from './exercises-index.component';

describe('ExercisesIndexComponent', () => {
  let component: ExercisesIndexComponent;
  let fixture: ComponentFixture<ExercisesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
