import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterContainerComponent } from './letter-container.component';

describe('LetterContainerComponent', () => {
  let component: LetterContainerComponent;
  let fixture: ComponentFixture<LetterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
