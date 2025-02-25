import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarSignupComponent } from './webinar-signup.component';

describe('WebinarSignupComponent', () => {
  let component: WebinarSignupComponent;
  let fixture: ComponentFixture<WebinarSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebinarSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebinarSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
