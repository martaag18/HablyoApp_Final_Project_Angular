import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise2IntroductionComponent } from './exercise-2-introduction.component';

describe('Exercise2IntroductionComponent', () => {
  let component: Exercise2IntroductionComponent;
  let fixture: ComponentFixture<Exercise2IntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise2IntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise2IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
