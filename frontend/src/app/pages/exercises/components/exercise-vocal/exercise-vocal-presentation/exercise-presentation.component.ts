//Responsabilidad -> mostrar información y notificar al componente contenedor (emite eventos) o a los servicios cuando se produce alguna acción del usuario. 

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstructionsFooterComponent } from '../../../../../shared/components/exercises/instructions-footer/instructions-footer.component';
import { ArcDropzoneComponent } from '../../../../../shared/components/exercises/arc-dropzone/arc-dropzone.component';
import { TildeIconComponent } from '../../../../../shared/components/exercises/tilde-icons/tilde-icons.component';
import { ArcIconComponent } from '../../../../../shared/components/exercises/arc-icon/arc-icon.component';
import { LetterContainerComponent } from '../../../../../shared/components/exercises/letter-container/letter-container.component';
import { NgClass } from '@angular/common';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';

@Component({
  imports: [
    TildeIconComponent,
    ArcIconComponent,
    LetterContainerComponent,
    ArcDropzoneComponent,
    InstructionsFooterComponent,
    NgClass
  ],
  selector: 'app-exercise-presentation',
  templateUrl: './exercise-presentation.component.html',
  styleUrls: ['./exercise-presentation.component.scss'],
})
export class ExercisePresentationComponent {

  @Input() wordList: WordItem[] = [];

  @Input() tildeMark: Array<'none' | '´'> = [];
  @Input() arcMark: Array<'none' | 'arc'> = [];

  @Input() resultTilde: Array<'correct' | 'wrong' | 'missed' | null> = [];
  @Input() resultArc: Array<'correct' | 'wrong' | 'missed' | null> = [];

  @Output() tildeDropped = new EventEmitter<{ letterIndex: number; mark: '´' }>();
  @Output() arcDropped = new EventEmitter<{ arcIndex: number; mark: 'arc' }>();


  //Manejo inicio del drag
  //Objeto dataTransfer forma parte de la API de drag & drop de JS -> para almacenar datos mientras se realiza el arrastre(drag). Se guarda info (como el tipo de marca) para recuperarla cuando se suelte el elemento (drop)
  onDragStart(event: DragEvent, mark: string): void {
    event.dataTransfer?.setData('text/plain', mark);
  }

  onDropTilde(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.tildeDropped.emit({ letterIndex, mark });
    }
  }


  onDropArc(event: DragEvent, arcIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'arc') {
      this.arcDropped.emit({ arcIndex, mark });
    }
  }
}
