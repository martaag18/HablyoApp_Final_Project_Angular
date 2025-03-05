import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-letter-container',
  templateUrl: './letter-container.component.html',
  styleUrls: ['./letter-container.component.scss']
})
export class LetterContainerComponent {
  @Input() char: string = '';
  @Input() globalIndex: number = 0; // para identificar la letra
  @Input() resultState: ValidationState = null; // 'correct', 'wrong', 'missed'
  @Input() hasTilde: boolean = false; // si la letra tiene la tilde

  @Output() droppedOnLetter = new EventEmitter<DragEvent>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.droppedOnLetter.emit(event);
  }
}
