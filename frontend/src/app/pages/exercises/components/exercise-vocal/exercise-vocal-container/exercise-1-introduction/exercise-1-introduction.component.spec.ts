import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise1IntroductionComponent } from './exercise-1-introduction.component';

describe('Exercise1IntroductionComponent', () => {
  let component: Exercise1IntroductionComponent;
  let fixture: ComponentFixture<Exercise1IntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise1IntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise1IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
