import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationalSectionComponent } from './motivational-section.component';

describe('MotivationalSectionComponent', () => {
  let component: MotivationalSectionComponent;
  let fixture: ComponentFixture<MotivationalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivationalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
