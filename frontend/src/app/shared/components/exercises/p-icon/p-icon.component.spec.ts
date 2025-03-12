import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIconComponent } from './p-icon.component';

describe('PIconComponent', () => {
  let component: PIconComponent;
  let fixture: ComponentFixture<PIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
