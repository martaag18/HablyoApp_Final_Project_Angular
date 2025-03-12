import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { InstructionsFooterComponent } from '../../../../../shared/components/exercises/instructions-footer/instructions-footer.component';
import { ArcDropzoneComponent } from '../../../../../shared/components/exercises/arc-dropzone/arc-dropzone.component';
import { TildeIconComponent } from '../../../../../shared/components/exercises/tilde-icons/tilde-icons.component';
import { ArcIconComponent } from '../../../../../shared/components/exercises/arc-icon/arc-icon.component';
import { LetterContainerComponent } from '../../../../../shared/components/exercises/letter-container/letter-container.component';
import { PIconComponent } from '../../../../../shared/components/exercises/p-icon/p-icon.component';
import { UnderlineIconComponent } from '../../../../../shared/components/exercises/underline-icon/underline-icon.component';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';

export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  selector: 'app-exercise-doble-vocal-presentation',
  imports: [
    TildeIconComponent,
    ArcIconComponent,
    PIconComponent,
    LetterContainerComponent,
    ArcDropzoneComponent,
    InstructionsFooterComponent,
    NgClass,
    UnderlineIconComponent,
  ],
  templateUrl: './exercise-doble-vocal-presentation.component.html',
  styleUrls: ['./exercise-doble-vocal-presentation.component.scss']
})
export class ExerciseDobleVocalPresentationComponent {

  @Input() wordList: WordItem[] = [];

  // Tilde
  @Input() tildeMark: Array<'none' | '´'> = [];
  @Input() resultTilde: Array<ValidationState> = [];
  @Output() tildeDropped = new EventEmitter<{ letterIndex: number; mark: '´' }>();

  // Arc
  @Input() arcMark: Array<'none' | 'arc'> = [];
  @Input() resultArc: Array<ValidationState> = [];
  @Output() arcDropped = new EventEmitter<{ arcIndex: number; mark: 'arc' }>();

  // P
  @Input() pMark: Array<'none' | 'P'> = [];
  @Input() resultP: Array<ValidationState> = [];
  @Output() pDropped = new EventEmitter<{ letterIndex: number; mark: 'P' }>();

  // Underline
  @Input() underlineMark: Array<'none' | 'underline'> = [];
  @Input() resultUnderline: Array<ValidationState> = [];
  @Output() underlineDropped = new EventEmitter<{ underlineIndex: number; mark: 'underline' }>();

  // Indices de vocales dobles, enviados desde el container
  @Input() vdobleIndices: number[] = [];


  onDragStart(event: DragEvent, mark: '´' | 'arc' | 'P' | 'underline'): void {
    event.dataTransfer?.setData('text/plain', mark);
  }

  onDropTilde(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.tildeDropped.emit({ letterIndex, mark: '´' });
    }
  }

  onDropArc(event: DragEvent, arcIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'arc') {
      this.arcDropped.emit({ arcIndex, mark: 'arc' });
    }
  }


  onDropP(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'P') {
      this.pDropped.emit({ letterIndex, mark: 'P' });
    }
  }

  onDropUnderline(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'underline') {
      this.underlineDropped.emit({ underlineIndex: letterIndex, mark: 'underline' });
    }
  }
}