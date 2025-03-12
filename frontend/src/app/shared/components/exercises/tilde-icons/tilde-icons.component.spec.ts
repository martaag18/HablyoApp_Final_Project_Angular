import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TildeIconsComponent } from './tilde-icons.component';

describe('TildeIconsComponent', () => {
  let component: TildeIconsComponent;
  let fixture: ComponentFixture<TildeIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TildeIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TildeIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
