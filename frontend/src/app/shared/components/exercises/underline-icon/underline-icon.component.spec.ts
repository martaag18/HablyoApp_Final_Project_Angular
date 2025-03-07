import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlineIconComponent } from './underline-icon.component';

describe('UnderlineIconComponent', () => {
  let component: UnderlineIconComponent;
  let fixture: ComponentFixture<UnderlineIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderlineIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderlineIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
