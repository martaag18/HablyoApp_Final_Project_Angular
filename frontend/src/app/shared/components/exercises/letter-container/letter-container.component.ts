import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { UnderlineDropzoneComponent } from '../underline-dropzone/underline-dropzone.component';

export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  standalone: true,
  imports: [NgClass, UnderlineDropzoneComponent],
  selector: 'app-letter-container',
  templateUrl: './letter-container.component.html',
  styleUrls: ['./letter-container.component.scss']
})
export class LetterContainerComponent {
  @Input() char: string = '';
  @Input() globalIndex: number = 0;

  // Tilde
  @Input() resultStateTilde: ValidationState = null;
  @Input() hasTilde: boolean = false;

  // P
  @Input() resultStateP: ValidationState = null;
  @Input() hasP: boolean = false;

  // Indica si esta letra debe mostrar el underline dropzone
  @Input() showUnderlineDropzone: boolean = false;
  
  // Valor y resultado del subrayado (si se muestra)
  @Input() underlineValue: 'none' | 'underline' = 'none';
  @Input() resultUnderline: ValidationState = null;

  // Emite evento al hacer drop en el underline
  @Output() droppedOnTilde = new EventEmitter<DragEvent>();
  @Output() droppedOnP = new EventEmitter<DragEvent>();
  @Output() droppedOnUnderline = new EventEmitter<DragEvent>();

  // Combina la validación Tilde y P en un “estado final”
  get finalState(): ValidationState {
    const t = this.resultStateTilde;
    const p = this.resultStateP;
    if (t === 'wrong' || p === 'wrong') return 'wrong';
    if (t === 'missed' || p === 'missed') return 'missed';
    if (t === 'correct' || p === 'correct') return 'correct';
    return null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.droppedOnTilde.emit(event);
    } else if (mark === 'P') {
      this.droppedOnP.emit(event);
    }
  }

  // Manejar drop en el underline
  onDropUnderline(event: DragEvent) {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'underline') {
      this.droppedOnUnderline.emit(event);
    }
  }
}
