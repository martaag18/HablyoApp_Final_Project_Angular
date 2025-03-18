// Responsibility -> display information and notify the parent component (emit events) or services when a user action occurs.

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstructionsFooterComponent } from '../../../../../shared/components/exercises/instructions-footer/instructions-footer.component';
import { ArcDropzoneComponent } from '../../../../../shared/components/exercises/arc-dropzone/arc-dropzone.component';
import { ArcIconComponent } from '../../../../../shared/components/exercises/arc-icon/arc-icon.component';
import { LetterContainerComponent } from '../../../../../shared/components/exercises/letter-container/letter-container.component';
import { NgClass } from '@angular/common';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';
import { AccentIconComponent } from '../../../../../shared/components/exercises/accent-icon/accent-icon.component';

@Component({
  imports: [
    ArcIconComponent,
    LetterContainerComponent,
    ArcDropzoneComponent,
    InstructionsFooterComponent,
    NgClass,
    AccentIconComponent
  ],
  selector: 'app-exercise1-presentation',
  templateUrl: './exercise1-presentation.component.html',
  styleUrls: ['./exercise1-presentation.component.scss'],
})
export class Exercise1PresentationComponent {
  
  @Input() wordList: WordItem[] = [];

  @Input() accentMark: Array<'none' | '´'> = [];
  @Input() arcMark: Array<'none' | 'arc'> = [];

  @Input() resultAccent: Array<'correct' | 'wrong' | 'missed' | null> = [];
  @Input() resultArc: Array<'correct' | 'wrong' | 'missed' | null> = [];

  @Output() accentDropped = new EventEmitter<{ letterIndex: number; mark: '´' }>();
  @Output() arcDropped = new EventEmitter<{ arcIndex: number; mark: 'arc' }>();

  // Drag start handling
  // The dataTransfer object is part of the JS drag & drop API -> it stores data while dragging.
  // We save info (such as the mark type) to retrieve it when the element is dropped.
  onDragStart(event: DragEvent, mark: string): void {
    event.dataTransfer?.setData('text/plain', mark);
  }

  onDropAccent(event: DragEvent, letterIndex: number): void {
    event.preventDefault();
    const mark = event.dataTransfer?.getData('text/plain');
    if (mark === '´') {
      this.accentDropped.emit({ letterIndex, mark });
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
