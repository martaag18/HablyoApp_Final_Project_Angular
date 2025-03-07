import { Injectable, inject } from '@angular/core';
import { ExerciseStateService } from './exercise-state.service';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  private state = inject(ExerciseStateService);

  dropTilde(letterIndex: number, mark: '´') {
    const tildeMark = [...this.state.tildeMark()];
    tildeMark[letterIndex] = mark; // '´'
    this.state.tildeMark.set(tildeMark);
  }

  dropP(letterIndex: number, mark: 'P') {
    const pMark = [...this.state.pMark()];
    pMark[letterIndex] = mark; // 'P'
    this.state.pMark.set(pMark);
  }

  dropArc(arcIndex: number, mark: 'arc') {
    const arcMark = [...this.state.arcMark()];
    arcMark[arcIndex] = mark; // 'arc'
    this.state.arcMark.set(arcMark);
  }

  dropUnderline(underlineIndex: number, mark: 'underline') {
    const underlineMark = [...this.state.underlineMark()];
    underlineMark[underlineIndex] = mark; // 'underline'
    this.state.underlineMark.set(underlineMark);
  }
  
  
}
