import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { InstructionsFooterComponent } from '../../../../../shared/components/exercises/instructions-footer/instructions-footer.component';
import { ArcDropzoneComponent } from '../../../../../shared/components/exercises/arc-dropzone/arc-dropzone.component';
import { ArcIconComponent } from '../../../../../shared/components/exercises/arc-icon/arc-icon.component';
import { LetterContainerComponent } from '../../../../../shared/components/exercises/letter-container/letter-container.component';
import { PIconComponent } from '../../../../../shared/components/exercises/p-icon/p-icon.component';
import { UnderlineIconComponent } from '../../../../../shared/components/exercises/underline-icon/underline-icon.component';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';
import { AccentIconComponent} from '../../../../../shared/components/exercises/accent-icon/accent-icon.component';
import { CircleIconComponent } from '../../../../../shared/components/exercises/circle-icon/circle-icon.component';

export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  selector: 'app-exercise-3-presentation',
  imports: [
    ArcIconComponent,
    PIconComponent,
    LetterContainerComponent,
    ArcDropzoneComponent,
    InstructionsFooterComponent,
    NgClass,
    UnderlineIconComponent,
    AccentIconComponent,
    CircleIconComponent,
  ],
  templateUrl: './exercise-3-presentation.component.html',
  styleUrls: ['./exercise-3-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 

})
export class Exercise3PresentationComponent {

  @Input() wordList: WordItem[] = [];

  // Accent
  @Input() accentMark: Array<'none' | '´'> = [];
  @Input() resultAccent: Array<ValidationState> = [];
  @Output() accentDropped = new EventEmitter<{ letterIndex: number; mark: '´' }>();

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

  // Circle
  @Input() circleMark: Array<'none' | 'circle'> = [];
  @Input() resultCircle: Array<ValidationState> = [];
  @Output() circleDropped = new EventEmitter<{ letterIndex: number; mark: 'circle' }>();


  // Indices de vocales dobles, enviados desde el container
  @Input() doubleVocalIndices: number[] = [];


  onDragStart(event: DragEvent, mark: '´' | 'arc' | 'P' | 'underline' | 'circle'): void {
    event.dataTransfer?.setData('text/plain', mark);
  }

  onDropAccent(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.accentDropped.emit({ letterIndex, mark: '´' });
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

  onDropCircle(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'circle') {
      this.circleDropped.emit({ letterIndex, mark: 'circle' });
    }
  }
}