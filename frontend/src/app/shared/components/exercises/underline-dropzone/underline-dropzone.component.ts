import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-underline-dropzone',
  templateUrl: './underline-dropzone.component.html',
  styleUrls: ['./underline-dropzone.component.scss']
})
export class UnderlineDropzoneComponent {
  @Input() underlineValue: 'none' | 'underline' = 'none';
  @Input() resultState: ValidationState = null;

  @Output() droppedOnUnderline = new EventEmitter<DragEvent>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.droppedOnUnderline.emit(event);
  }
}
