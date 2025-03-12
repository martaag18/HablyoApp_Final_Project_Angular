import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlineDropzoneComponent } from './underline-dropzone.component';

describe('UnderlineDropzoneComponent', () => {
  let component: UnderlineDropzoneComponent;
  let fixture: ComponentFixture<UnderlineDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderlineDropzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderlineDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
