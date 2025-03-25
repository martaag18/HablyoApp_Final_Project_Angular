import { Injectable, inject } from '@angular/core';
import { ExerciseStateService } from '../state/exercise-state.service';

/**
 * Handles drag & drop operations and updates the corresponding marks
 * in the global state service (ExerciseStateService).
 */
@Injectable({ providedIn: 'root' })
export class DragDropService {
  private state = inject(ExerciseStateService); // service that stores (via signals) the marks (accent, P, arc, underline)

  /**
   * Updates the accent mark at the specified letter index.
   * @param letterIndex - The position of the letter where the accent is dropped.
   * @param mark - The accent mark ('´').
   */
  dropAccent(letterIndex: number, mark: '´') {
    const accentMark = [...this.state.accentMark()];
    accentMark[letterIndex] = mark; // '´'
    this.state.accentMark.set(accentMark);
  }

  /**
   * Updates the P mark at the specified letter index.
   * @param letterIndex - The position of the letter where 'P' is dropped.
   * @param mark - The P mark ('P').
   */
  dropP(letterIndex: number, mark: 'P') {
    const pMark = [...this.state.pMark()];
    pMark[letterIndex] = mark; // 'P'
    this.state.pMark.set(pMark);
  }

  /**
   * Updates the arc mark between words at the specified index.
   * @param arcIndex - The position between words where 'arc' is dropped.
   * @param mark - The arc mark ('arc').
   */
  dropArc(arcIndex: number, mark: 'arc') {
    const arcMark = [...this.state.arcMark()];
    arcMark[arcIndex] = mark; // 'arc'
    this.state.arcMark.set(arcMark);
  }

  /**
   * Updates the underline mark at the specified letter index.
   * @param underlineIndex - The position of the letter where 'underline' is dropped.
   * @param mark - The underline mark ('underline').
   */
  dropUnderline(underlineIndex: number, mark: 'underline') {
    const underlineMark = [...this.state.underlineMark()];
    underlineMark[underlineIndex] = mark; // 'underline'
    this.state.underlineMark.set(underlineMark);
  }

  /**
   * Updates the circle mark at the specified letter index.
   * @param letterIndex - The position of the letter where 'circle' is dropped.
   * @param mark - The circle mark ('circle').
   */
  dropCircle(letterIndex: number, mark: 'circle') {
    const circleMark = [...this.state.circleMark()];
    circleMark[letterIndex] = mark; // 'circle'
    this.state.circleMark.set(circleMark);
  }
}

/**
 * FLOW:
 * 1. The user drops a mark on the UI.
 * 2. The parent component calls DragDropService with the index and the mark.
 * 3. The service updates the corresponding array of marks in the global state (ExerciseStateService).
 * 4. The UI automatically reflects the updated mark in the correct position (thanks to reactive Signals).
 */
