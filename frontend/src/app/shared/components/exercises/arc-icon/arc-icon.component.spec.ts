import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcIconComponent } from './arc-icon.component';

describe('ArcIconComponent', () => {
  let component: ArcIconComponent;
  let fixture: ComponentFixture<ArcIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
