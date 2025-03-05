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
  imports: [TildeIconComponent, ArcIconComponent, LetterContainerComponent, ArcDropzoneComponent, InstructionsFooterComponent, NgClass],
  selector: 'app-exercise-presentation',
  templateUrl: './exercise-presentation.component.html',
  styleUrls: ['./exercise-presentation.component.scss'],
})
export class ExercisePresentationComponent {
  @Input() wordList: WordItem[] = [];

  // Tildes
  @Input() annotation: Array<'none' | '´'> = [];
  // Arcos
  @Input() arcs: Array<'none' | 'arc'> = [];

  // Resultados => 'correct', 'wrong', 'missed', o null
  @Input() resultLetters: Array<'correct' | 'wrong' | 'missed' | null> = [];
  @Input() resultArcs: Array<'correct' | 'wrong' | 'missed' | null> = [];

  @Output() letterDropped = new EventEmitter<{ letterIndex: number; mark: '´' }>();
  @Output() arcDropped = new EventEmitter<{ arcIndex: number; mark: 'arc' }>();

  onDragStart(event: DragEvent, mark: string) {
    event.dataTransfer?.setData('text/plain', mark);
    if (window.innerWidth <= 768) {
      (event.target as HTMLElement).classList.add('small-drag');
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDropLetter(event: DragEvent, letterIndex: number) {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.letterDropped.emit({ letterIndex, mark });
    }
  }

  onDropArc(event: DragEvent, arcIndex: number) {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === 'arc') {
      this.arcDropped.emit({ arcIndex, mark });
    }
  }

}