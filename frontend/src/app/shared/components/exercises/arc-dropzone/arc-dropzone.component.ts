import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-arc-dropzone',
  templateUrl: './arc-dropzone.component.html',
  styleUrls: ['./arc-dropzone.component.scss']
})
export class ArcDropzoneComponent {
  @Input() arcValue: 'none' | 'arc' = 'none';
  @Input() resultState: ValidationState = null;

  @Output() droppedOnArc = new EventEmitter<DragEvent>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.droppedOnArc.emit(event);
  }
}
