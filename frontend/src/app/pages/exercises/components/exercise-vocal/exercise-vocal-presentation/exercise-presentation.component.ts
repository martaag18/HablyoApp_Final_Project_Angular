import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstructionsFooterComponent } from '../../../../../shared/components/exercises/instructions-footer/instructions-footer.component';
import { ArcDropzoneComponent } from '../../../../../shared/components/exercises/arc-dropzone/arc-dropzone.component';
import { TildeIconComponent } from '../../../../../shared/components/exercises/tilde-icons/tilde-icons.component';
import { ArcIconComponent } from '../../../../../shared/components/exercises/arc-icon/arc-icon.component';
import { LetterContainerComponent } from '../../../../../shared/components/exercises/letter-container/letter-container.component';
import { NgClass } from '@angular/common';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';

@Component({
  standalone: true,
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

  /**
   * Maneja el inicio del drag y añade una clase para dispositivos móviles.
   * @param event Evento de inicio de arrastre.
   * @param mark Marca que se está arrastrando (ej.: '´' o 'arc').
   */
  onDragStart(event: DragEvent, mark: string): void {
    event.dataTransfer?.setData('text/plain', mark);
    if (window.innerWidth <= 768) {
      (event.target as HTMLElement).classList.add('small-drag');
    }
  }

  /**
   * Permite que el elemento destino reciba el drop.
   * @param event Evento de arrastrar sobre el elemento.
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Maneja el drop para la tilde y emite el evento correspondiente si la marca es válida.
   * @param event Evento drop.
   * @param letterIndex Índice de la letra donde se soltó la tilde.
   */
  onDropTilde(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.tildeDropped.emit({ letterIndex, mark });
    }
  }

  /**
   * Maneja el drop para el arco y emite el evento correspondiente si la marca es válida.
   * @param event Evento drop.
   * @param arcIndex Índice del arco donde se soltó el elemento.
   */
  onDropArc(event: DragEvent, arcIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'arc') {
      this.arcDropped.emit({ arcIndex, mark });
    }
  }
}
