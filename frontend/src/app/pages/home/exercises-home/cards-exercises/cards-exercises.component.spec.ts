import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsExercisesComponent } from './cards-exercises.component';

describe('CardsExercisesComponent', () => {
  let component: CardsExercisesComponent;
  let fixture: ComponentFixture<CardsExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsExercisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
