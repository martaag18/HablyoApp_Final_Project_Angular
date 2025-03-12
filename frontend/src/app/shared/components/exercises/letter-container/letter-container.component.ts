import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { UnderlineDropzoneComponent } from '../underline-dropzone/underline-dropzone.component';
import { ValidationState } from '../../../types/validation-state.type';
@Component({
  imports: [NgClass, UnderlineDropzoneComponent],
  selector: 'app-letter-container',
  templateUrl: './letter-container.component.html',
  styleUrls: ['./letter-container.component.scss']
})
export class LetterContainerComponent {

  @Input() char: string = ''; //Almacena caracter que se muestra en el contenedor
  @Input() globalIndex: number = 0; //posicion absoluta de la letra

  // Tilde
  @Input() resultStateTilde: ValidationState = null; //almacena estado validación tilde
  @Input() hasTilde: boolean = false; //indica si se ha colocado tile en esa letra

  // P
  @Input() resultStateP: ValidationState = null; //almacena estado validación p
  @Input() hasP: boolean = false; //indica si se ha colocado p en esa letra

  // Underline
  @Input() showUnderlineDropzone: boolean = false; // Indica si esta letra debe mostrar el underline dropzone
  @Input() underlineValue: 'none' | 'underline' = 'none'; //Indica si letra está subrayada o no
  @Input() resultUnderline: ValidationState = null; //estado validación underline


  @Output() droppedOnTilde = new EventEmitter<DragEvent>();
  @Output() droppedOnP = new EventEmitter<DragEvent>();
  @Output() droppedOnUnderline = new EventEmitter<DragEvent>();

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

  onDropUnderline(event: DragEvent) {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'underline') {
      this.droppedOnUnderline.emit(event);
    }
  }
}
