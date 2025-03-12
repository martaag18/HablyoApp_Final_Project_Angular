import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocalHomeComponent } from './vocal-home.component';

describe('VocalHomeComponent', () => {
  let component: VocalHomeComponent;
  let fixture: ComponentFixture<VocalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
