import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsFooterComponent } from './instructions-footer.component';

describe('InstructionsFooterComponent', () => {
  let component: InstructionsFooterComponent;
  let fixture: ComponentFixture<InstructionsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
