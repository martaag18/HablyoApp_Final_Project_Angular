import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcDropzoneComponent } from './arc-dropzone.component';

describe('ArcDropzoneComponent', () => {
  let component: ArcDropzoneComponent;
  let fixture: ComponentFixture<ArcDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcDropzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
